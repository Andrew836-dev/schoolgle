(function($) {
  $(() => {
    $(".sidenav").sidenav();
    $(".parallax").parallax();
    $("select").formSelect();
    const signUpForm = $("form#signup");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", event => {
      event.preventDefault();
      const userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };

      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      // signUpUser(userData.email, userData.password);
      console.log("redirect");
      window.location.replace("/search");
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
      $.post("/api/signup", {
        email: email,
        password: password
      })
        .then(() => {
          window.location.replace("/search");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
})(jQuery);
// end of jQuery name space
