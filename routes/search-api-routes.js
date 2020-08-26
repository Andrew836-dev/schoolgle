/* eslint-disable prettier/prettier */
// Requiring our models and passport as we've configured it
// Plus the google maps client library
const db = require("../models");
const { Client } = require("@googlemaps/google-maps-services-js");
const mapsKey =
  process.env.MAPS_API || "AIzaSyDUY_bM0I-lgMSBK8EPtYt71RRqHWRClMc";
const client = new Client({});
const Op = db.Sequelize.Op;

module.exports = function (app) {
  // Route for searching schools by conditions in the request body
  app.post("/api/schools/", (req, res) => {
    console.log("Searching : ", req.body);
    db.School.findAll({
      where: req.body
    }).then(dbSchools => {
      res.json(dbSchools);
    });
  });

  app.post("/api/schools/nearby/", (req, res) => {
    client
      .placesNearby({
        params: {
          key: mapsKey,
          location: [req.body.latitude, req.body.longitude],
          keyword: "School",
          rankby: "distance"
        }
      })
      .then(({ data }) => {
        // console.log(data);
        res.json(data);
      })
      .catch(({ response }) => {
        res.status(response.status).send(response.data.status);
      });
  });

  // Route for searching schools by name
  app.post("/api/schools/name/:name", (req, res) => {
    const conditions = {
      [Op.and]: {
        schoolName: {
          [Op.like]: req.params.name + "%"
        },
        schoolType: {
          [Op.or]: req.body.schoolType
            ? req.body.schoolType
            : ["Primary", "Secondary", "Combined", "Special"]
        }
      }
    };
    if (req.body) {
      console.log(req.body);
    }
    console.log("Searching : ", req.params.name);
    db.School.findAll({
      attributes: ["schoolName"],
      where: conditions
    }).then(dbNames => {
      dbNames.forEach(name => console.log(name.dataValues));
      res.json(dbNames);
    });
  });

  app.post("/api/schools/type/:type", (req, res) => {
    const conditions = {
      schoolType: req.params.type
    };
    if (req.body) {
      console.log(req.body);
    }
    console.log("Searching : ", req.params.type);
    db.School.findAll({
      // attributes: ["schoolType"],
      where: conditions
    }).then(dbTypes => {
      res.json(dbTypes);
    });
  });
};
