const fs = require("fs");
const path = require("path");
const db = require("../models");

module.exports = function() {
  db.sequelize.sync().then(() => {
    fs.readFile(
      path.join(__dirname, "../db/schoolLocationSeeds.csv"),
      "utf8",
      (err, data) => {
        if (err) {
          throw err;
        }
        processLocations(
          data
            .trim()
            .split("\n")
            .slice(1)
        );
      }
    );
  });
};

function processLocations(data) {
  if (data.length === 0) {
    return require("./injectProfiles")();
  }
  const schoolData = data.splice(0, 1)[0].split(",");
  let i = 0;
  const schoolObject = {
    acaraSMLID: schoolData[++i],
    ageID: schoolData[++i],
    schoolName: schoolData[++i],
    suburb: schoolData[++i],
    state: schoolData[++i],
    postcode: schoolData[++i],
    schoolSector: schoolData[++i],
    schoolType: schoolData[++i],
    campusType: schoolData[++i],
    reportingType: schoolData[++i],
    latitude: schoolData[++i],
    longitude: schoolData[++i],
    remotenessCode: schoolData[++i],
    remotenessName: schoolData[++i],
    meshBlock: schoolData[++i],
    statisticArea1: schoolData[++i],
    statisticArea2: schoolData[++i],
    statisticArea2Name: schoolData[++i],
    statisticArea3: schoolData[++i],
    statisticArea3Name: schoolData[++i],
    statisticArea4: schoolData[++i],
    statisticArea4Name: schoolData[++i],
    localGovernmentArea: schoolData[++i],
    localGovernmentAreaName: schoolData[++i]
  };
  // console.log(schoolObject);
  db.School.create(schoolObject).then(() => {
    processLocations(data);
  });
}
