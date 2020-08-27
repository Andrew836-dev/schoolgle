// Requiring path to so we can use relative routes to our HTML files
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/account");
    }
    res.render("landingPage");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/account");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/account", isAuthenticated, (req, res) => {
    db.School.findAll({
      include: {
        model: db.User,
        where: { id: req.user.id }
      }
    }).then(schools => {
      console.log("returned object..............");
      console.log(schools);
      res.render("account", { school: schools });
    });

    // db.SchoolgleList.findAll({
    //   where: {
    //     "$SchoolgleList.UserId$": req.user.id
    //   },
    //   include: [db.School]
    // }).then(schools => {
    //   console.log("returned object..............");
    //   console.log(schools);
    //   res.render("account", { school: schools });
    // });
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/search", isAuthenticated, (req, res) => {
    res.render("searchpage");
  });
};
