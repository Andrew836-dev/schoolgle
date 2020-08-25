const fs = require("fs");
const path = require("path");
const db = require("../models");

module.exports = function() {
  db.sequelize.sync().then(() => {
    fs.readFile(
      path.join(__dirname, "../db/SASchoolProfiles.csv"),
      "utf8",
      (err, data) => {
        if (err) {
          throw err;
        }
        processProfiles(
          data
            .trim()
            .split("\n")
            .slice(1)
        );
      }
    );
  });
};

function checkNumber(input) {
  if (isNaN(parseInt(input))) {
    return 0;
  }
  return input;
}

function processProfiles(data) {
  if (data.length === 0) {
    return;
  }
  const schoolData = data
    .splice(0, 1)[0]
    .split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/g);
  let i = 10;
  const schoolObject = {
    schoolURL: schoolData[++i],
    governingBody: schoolData[++i],
    governingBodyURL: schoolData[++i],
    yearRange: schoolData[++i],
    geoLocation: schoolData[++i],
    ICSEA: checkNumber(schoolData[++i]),
    ICSEAPercent: checkNumber(schoolData[++i]),
    bottomSEA: checkNumber(schoolData[++i]),
    lowerMiddleSEA: checkNumber(schoolData[++i]),
    upperMiddleSEA: checkNumber(schoolData[++i]),
    topSEA: checkNumber(schoolData[++i]),
    teachingStaff: checkNumber(schoolData[++i]),
    teachingStaffFTE: checkNumber(schoolData[++i]),
    nonTeachingStaff: checkNumber(schoolData[++i]),
    nonTeachingStaffFTE: checkNumber(schoolData[++i]),
    enrolmentsTotal: checkNumber(schoolData[++i]),
    enrolmentsGirls: checkNumber(schoolData[++i]),
    enrolmentsBoys: checkNumber(schoolData[++i]),
    enrolmentsFTE: checkNumber(schoolData[++i]),
    enrolmentsIndigenous: checkNumber(schoolData[++i]),
    enrolmentsLOTE: checkNumber(schoolData[++i])
  };
  // console.log(schoolObject);
  db.School.update(schoolObject, {
    where: {
      acaraSMLID: schoolData[1]
    }
  }).then(() => {
    processProfiles(data);
  });
}
