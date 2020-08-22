// Requiring our models and passport as we've configured it
// Plus the google maps client library
const db = require("../models");
const { Client, Status } = require("@googlemaps/google-maps-services-js");
const mapsKey = process.env.MAPS_API || "AIzaSyDUY_bM0I-lgMSBK8EPtYt71RRqHWRClMc";
const client = new Client({});

client
  .reverseGeocode({
    params: {
      // eslint-disable-next-line camelcase
      result_type: "street_address",
      latlng: [-42.871256, 147.371473],
      key: mapsKey
    },
    timeout: 1000 // milliseconds
  })
  .then(r => {
    console.log(r.data.status);
    r.data.results.forEach(result => console.log(result.formatted_address));
    console.log(r.data.results);
  })
  .catch(e => {
    console.log(e.response.data.error_message);
  });
module.exports = function(app) {
  // Route for logging user out
  app.get("/api/maps", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
