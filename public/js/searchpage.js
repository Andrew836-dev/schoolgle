$(document).ready(() => {
  $("select").formSelect();
  let schoolgleList = [];
  console.log("new page");
  $.get("/api/user_data").then(data => {
    schoolgleList = [JSON.parse(data.schoolgleList)];
    console.log(schoolgleList);
  });
  $(document).on("click", ".schoolButton", function() {
    console.log("in btn");
    const id = parseInt($(this).attr("data-id"));
    console.log(id);
    schoolgleList.push(id);
    console.log(schoolgleList);
    console.log(JSON.stringify(schoolgleList));
    $.ajax({
      type: "PUT",
      url: "http://localhost:8080/api/schoolgle",
      contentType: "application/json",
      schoolgleList: JSON.stringify(schoolgleList)
    })
      .done(() => {
        console.log("SUCCESS");
      })
      .fail(msg => {
        console.log("FAIL");
      })
      .always(msg => {
        console.log("ALWAYS");
      });
    // $.put("/api/schoolgle", {
    //   schoolgleList: JSON.stringify(schoolgleList)
    // });
  });
});
