$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(data => {
  //   $(".account-name").text(data.firstName);
  // });

  $.get("/api/user_data").then(data => {
    $(".account-name").text(data.firstName); //Adds User first name into Nav
    $(".badge").text(data.schoolgleList); //Shows the number of school added to list on the badge
  });

  $(document).on("click", "a.deleteBtn", deleteSchoogleList);

  function deleteSchoogleList() {
    const currentId = $(this).data("id");
    // console.log(currentId);
    $.ajax({
      method: "DELETE",
      url: "/api/user/list/" + currentId
    }).then(() => {
      location.reload();
    });
  }
});
