$(document).ready(() => {
  // $("select").formSelect();
  const $schoolContainer = $(".school-container");

  let schools = [];

  $("#submitBtn").on("click", () => {
    event.preventDefault();
    console.log("submitted");
    const postcode = $("#searchInput")
      .val()
      .trim();
    console.log(postcode);

    getSchoolsByPostcode(postcode);
  });

  function getSchoolsByPostcode(postcode) {
    $.get("/api/schools/" + postcode, data => {
      console.log(data);
      schools = data;
      initRows();
    });
  }

  // function getSchoolsByType(schoolType) {
  //   $.get("/api/schools/" + schoolType, data => {
  //     console.log(data);
  //     schools = data;
  //     initRows();
  //   });
  // }

  // function getSchoolsByState(state) {
  //   $.get("/api/schools/" + state, data => {
  //     console.log(data);
  //     schools = data;
  //     initRows();
  //   });
  // }

  function initRows() {
    $schoolContainer.empty();
    const rowsToAdd = [];
    for (let i = 0; i < schools.length; i++) {
      rowsToAdd.push(createSchoolRows(schools[i]));
    }
    $schoolContainer.prepend(rowsToAdd);
  }

  function createSchoolRows(schools) {
    const $newInputRow = $(
      [
        "<li>",
        "<a href='#!' class='collection-item black-text'>",
        schools.schoolName,
        "<p>Type: <span class='school-type'>",
        schools.schoolType,
        "</span></p>",
        "<p>State: <span class='school-type'>",
        schools.state,
        "</span></p>",
        "</a>",
        "</li>"
      ].join("")
    );

    $newInputRow.data("schools", schools);

    return $newInputRow;
  }
});
