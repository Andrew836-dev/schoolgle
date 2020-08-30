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
// /*
//  * use google maps api built-in mechanism to attach dom events
//  */
// google.maps.event.addDomListener(window, "load", () => {
//   /*
//    * create map
//    */
//   // This Lat and Long is close to the centre of Australia
//   // center = new google.maps.LatLng(-25.808678, 134.918921);
//   center = new google.maps.LatLng(-34.9285, 138.6007);
//   map = new google.maps.Map(document.getElementById("map_div"), {
//     center: center,
//     // ,
//     // zoom 4 is most of australia, 6 is about 1 state, 10 is a full city, 14 is a suburb.
//     zoom: 14,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });

//   /*
//    * create infowindow (which will be used by markers)
//    */
//   const infoWindow = new google.maps.InfoWindow();

//   /*
//    * marker creater function
//    */
//   function createSchoolMarker(school) {
//     const marker = new google.maps.Marker({
//       position: new google.maps.LatLng(school.latitude, school.longitude),
//       map: map
//       // the icon option can be used for a custom marker
//       // icon: "https://maps.gstatic.com/mapfiles/place_api/icons/school-71.png"
//     });
//     const html = htmlGenerator[window.location.pathname](school);
//     google.maps.event.addListener(marker, "click", function() {
//       infoWindow.setContent(html);
//       infoWindow.open(map, this);
//       map.setCenter(this.position);
//     });
//     return marker;
//   }

// const htmlGenerator = {
//   "/account": function(school) {
//     return `
//   <h6>${school.schoolName}</h6>
//   <p>${school.schoolSector}, ${school.schoolType}</p>
//   `;
//   },
//   "/search": function(school) {
//     return `
//     <h6>${school.schoolName}</h6>
//     <p>${school.schoolSector}, ${school.schoolType}</p>
//     <button class='schoolButton' data-id='${school.id}'>Add</button>`;
//   }
// };

//   /*
//    * Clear all markers from the map
//    */
//   function clearAllMarkers() {
//     markerArray.forEach(marker => marker.setMap(null));
//     markerArray.length = 0;
//   }

//   /*
//    * add markers to map
//    */
//   function getMarkers(conditions) {
//     $.post("/api/schools/", conditions).then(schools => {
//       clearAllMarkers();
//       schools.forEach(school => markerArray.push(createSchoolMarker(school)));
//       if (markerArray.length) {
//         map.setCenter(markerArray[0].position);
//       } else {
//         // make an error message display
//       }
//     });
//   }

//   $("#search-button").on("click", event => {
//     event.preventDefault();
//     const searchTerm = $("#search-text")
//       .val()
//       .trim();
//     const schoolType = $("#school-type").val();
//     if (schoolType === "School Type") {
//       delete conditions.schoolType;
//     } else {
//       conditions.schoolType = schoolType;
//     }
//     if (isNaN(parseInt(searchTerm))) {
//       delete conditions.postcode;
//       conditions.schoolName = searchTerm;
//     } else if (searchTerm.length === 4) {
//       delete conditions.schoolName;
//       conditions.postcode = searchTerm;
//       getMarkers(conditions);
//     } else {
//       // error message for missing search term
//     }
//   });

//   if (window.location.search.match(/postcode/g)) {
//     conditions.postcode = window.location.search.match(/\d{4}/g)[0];
//   }
//   if (window.location.search.match(/schoolType/g)) {
//     conditions.schoolType = window.location.search
//       .match(/schoolType=[A-Za-z]+/g)[0]
//       .split("=")[1];
//   }
//   console.log(conditions);
//   getMarkers(conditions);
// });
