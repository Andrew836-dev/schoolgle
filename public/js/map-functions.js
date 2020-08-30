/* eslint-disable no-unused-vars */
/* eslint-disable indent */
// indent and prettier were conflicting on this file
function getSchoolsByPostcode(postcode) {
  const body = {
    postcode: postcode,
    schoolType: getTypeTerm(),
    state: getStateTerm()
  };
  return $.post("/api/schools/", body);
}

// schoolName here should be a string
// conditions is an object of the search conditions
function getSchoolsByName(schoolName) {
  const conditions = {
    schoolType: getTypeTerm(),
    state: getStateTerm()
  };
  return $.post("/api/schools/name/" + schoolName, conditions);
}

// get the school type from the form and put it into sequelize format
function getTypeTerm() {
  switch ($("#school-type").val()) {
    case null:
      return ["Primary", "Secondary", "Combined", "Special"];
    default:
      return [$("#school-type").val()];
  }
}

// get the state from the form and put it into sequelize format
function getStateTerm() {
  switch ($("#state")) {
    default:
      return ["SA"];
  }
}

function accountInit() {
  const schoolgleMarkers = [];
  $("tr").each(function() {
    if ($(this).children("td").length > 0) {
      schoolgleMarkers.push({
        latitude: parseFloat($(this).data("lat")),
        longitude: parseFloat($(this).data("long")),
        schoolName: $(this).children("td")[0].textContent,
        yearRange: $(this).children("td")[2].textContent,
        schoolSector: $(this).children("td")[3].textContent,
        enrolmentsTotal: parseInt($(this).data("enrolments")),
        enrolmentsFTE: parseFloat($(this).data("enrolmentsfte")),
        teachingStaffFTE: parseFloat($(this).data("teachersfte"))
      });
    }
  });
  return schoolgleMarkers;
}

const htmlGenerator = {
  "/account": function(school) {
    return `
  <h6>${school.schoolName}</h6>
  <p>${school.schoolSector}, ${school.yearRange}</p>
  <p>Student/Teacher Ratio: ${(
    school.enrolmentsFTE / school.teachingStaffFTE
  ).toFixed(1)}</p>
  <p>Total students: ${school.enrolmentsTotal}</p>
  `;
  },
  "/search": function(school) {
    return `
    <h6>${school.schoolName}</h6>
    <p>${school.schoolSector}, ${school.schoolType}</p>
    <button class='schoolButton' data-id='${school.id}'>Add</button>`;
  }
};
