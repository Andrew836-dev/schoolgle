$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".account-name").text(data.firstName);
    schoolgleList = JSON.parse(data.schoolgleList);
    console.log(schoolgleList);
    console.log(data);
  });

  //   let schoolgleList = [];
  // $.get("/api/user_data").then(data => {
  //   schoolgleList = [...JSON.parse(data.schoolgleList)]
  // });
  // $("button").on("click", () => {
  //     schoolgleList.push(school.acaraSMLID);
  //     $.put("/api/user", {
  //       schoolgleList: JSON.stringify(schoolgleList);
  //     });
  // });
});
