$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form#signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const firstNameInput = $("input#first_name");
  const lastNameInput = $("input#last_name");
  const streetInput = $("input#street-input");
  const suburbInput = $("input#suburb-input");
  const postcodeInput = $("input#postcode-input");
  const stateInput = $("select#state-input");
  // const passwordInputTwo = $("input#password-input2");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    console.log("clicked");
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      address: streetInput.val().trim(),
      suburb: suburbInput.val().trim(),
      postcode: postcodeInput.val().trim(),
      state: stateInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    console.log(userData);
    $.post("/api/signup", {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      suburb: userData.suburb,
      postcode: userData.postcode,
      state: userData.state
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
