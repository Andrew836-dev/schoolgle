$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".account-name").text(data.firstName);
  });

  $(document).on("click", "i.deleteBtn", deleteSchoogleList);

  function deleteSchoogleList() {
    const currentId = $(this)
      .parent()
      .data("id");
    console.log(currentId);
    $.ajax({
      method: "DELETE",
      url: "/api/user/list/" + currentId
    }).then(() => {
      location.reload();
    });
  }
});
