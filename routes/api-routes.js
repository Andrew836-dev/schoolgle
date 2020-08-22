// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
<<<<<<< HEAD
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      suburb: req.body.suburb,
      state: req.body.state,
      postcode: req.body.postcode,
      email: req.body.email,
      password: req.body.password
    })
=======
    console.log(req.body);
    db.User.create(req.body)
>>>>>>> 45152b1e8e03cd0c7689c2dd7cd05826fce882ad
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        // Error handling to send a prettier response for invalid sign up attempts
        // Start with a generic error message
        let responseMessage = "An error occured";
        if (err.errors) {
          // sequelize validation errors use this format
          const error = err.errors[0];
          if (error.message === "users.email must be unique") {
            // I personally don't like broadcasting the name of the table out, even if it is an obvious one
            responseMessage = "That email is already in use";
          } else if (error.message === "Validation isEmail on email failed") {
            responseMessage = "Please enter a valid email";
          } else {
            // This will print the error to the console so it can be viewed and handled in a later version
            console.log(error, "Unexpected Error Type");
          }
        } else {
          // This will print the error to the console if it doesn't follow the normal sequelize format
          console.log(err, "Unexpected Error format");
        }
        console.log(responseMessage);
        res.status(401).json(responseMessage);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      const user = req.user;
      user.password = "";
      res.json(user);
    }
  });

  app.get("/api/schools/:postcode", (req, res) => {
    postcode = req.params.postcode;
    console.log("Searching : ", postcode);
    db.Schools.findAll({
      where: {
        postcode: postcode
      }
    }).then(dbSchools => {
      res.json(dbSchools);
    });
  });
};
