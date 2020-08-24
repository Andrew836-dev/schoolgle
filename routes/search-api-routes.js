// Requiring our models and passport as we've configured it
// Plus the google maps client library
const db = require("../models");
const { Client } = require("@googlemaps/google-maps-services-js");
const mapsKey =
  process.env.MAPS_API || "AIzaSyDUY_bM0I-lgMSBK8EPtYt71RRqHWRClMc";
const client = new Client({});
const Op = db.Sequelize.Op;

// client
//   .reverseGeocode({
//     params: {
//       // eslint-disable-next-line camelcase
//       result_type: "street_address",
//       latlng: [-42.871256, 147.371473],
//       key: mapsKey
//     },
//     timeout: 1000 // milliseconds
//   })
//   .then(r => {
//     console.log(r.data.status);
//     if (r.data.status === Status.OK) {
//       r.data.results.forEach(result => console.log(result.formatted_address));
//       console.log(r.data.results);
//     }
//   })
//   .catch(e => {
//     console.log(e.response.data.error_message);
//   });
module.exports = function(app) {
  // Route for searching schools by postcode
  app.get("/api/schools/postcode/:postcode", (req, res) => {
    const postcode = req.params.postcode;
    console.log("Searching : ", postcode);
    db.School.findAll({
      where: {
        postcode: postcode
      }
    }).then(dbSchools => {
      res.json(dbSchools);
    });
  });

  app.get("/api/schools/nearby/", (req, res) => {
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
  app.get("/api/schools/name/:name", (req, res) => {
    const name = req.params.name;
    console.log("Searching : ", name);
    db.School.findAll({
      attributes: ["schoolName"],
      where: {
        schoolName: {
          [Op.like]: `${name}%`
        }
      }
    }).then(dbNames => {
      res.json(dbNames);
    });
  });
};
