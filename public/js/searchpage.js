/* eslint-disable indent */
/* eslint-disable prettier/prettier */
$(document).ready(() => {
  $("select").formSelect();

  /*
   * declare map as a global variable
   */
  let map;
  let center = [-25.808678, 134.918921];
  /*
   * declare array for storing marker objects
   */
  const markerArray = [];

  /*
   * use google maps api built-in mechanism to attach dom events
   */
  google.maps.event.addDomListener(window, "load", () => {
    /* This code borrows from http://jsfiddle.net/salman/4mtyu/ */

    /*
     * create map
     */
    // This Lat and Long is close to the centre of Australia
    // center = new google.maps.LatLng(-25.808678, 134.918921);
    center = new google.maps.LatLng(-34.9285, 138.6007);
    map = new google.maps.Map(document.getElementById("map_div"), {
      center: center,
      // ,
      // zoom 4 is most of australia, 6 is about 1 state, 10 is a full city, 14 is a suburb.
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    /*
     * create infowindow (which will be used by markers)
     */
    const infoWindow = new google.maps.InfoWindow();

    /*
     * marker creater function
     */
    function createSchoolMarker(school) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(school.latitude, school.longitude),
        map: map
        // the icon option can be used for a custom marker
        // icon: "http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
      });
      const html = `
    <h6>${school.schoolName}</h6>
    <p>${school.schoolSector}, ${school.schoolType}</p>
    <p>${school.suburb}, ${school.postcode}</p>
    <button class='schoolButton' data-id='${school.id}'>Add</button>`;
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(html);
        infoWindow.open(map, this);
        map.setCenter(this.position);
      });
      return marker;
    }

    /*
     * Clear all markers from the map
     */
    function clearAllMarkers() {
      markerArray.forEach(marker => marker.setMap(null));
      markerArray.length = 0;
    }
    // map.setCenter(markerArray[0].position);
    // $("select").formSelect();
    const $schoolContainer = $(".school-container");

    let schools = [];

    $("#submitBtn").on("click", () => {
      event.preventDefault();
      console.log("submitted");
      const searchTerm = $("#searchInput")
        .val()
        .trim();
      // const typeSearchTerm = getTypeTerm();
      console.log(searchTerm);
      // console.log(typeSearchTerm);
      clearAllMarkers();
      if (searchTerm.match(/\d{4}/g)) {
        getSchoolsByPostcode(searchTerm.match(/\d{4}/g));
      } else {
        getSchoolsByName(searchTerm, {
          schoolType: getTypeTerm(),
          state: getStateTerm()
        });
      }
      // if we call this here it will add every school in the database of that type to the map as well
      // getSchoolByType(typeSearchTerm);
    });

    $schoolContainer.on("click", "li", function () {
      const index = parseInt($(this).data("index"));
      map.setCenter(markerArray[index].position);
    });

    // get the school type from the form and put it into sequelize format
    function getTypeTerm() {
      switch ($("#school-type").val()) {
        case null:
          return ["Primary", "Secondary", "Combined", "Special"];
        default:
          return [$("#school-type").val()];
      }
    }

    // get the state fromthe form and put it into sequelize format
    function getStateTerm() {
      switch ($("#state")) {
        default:
          return ["SA"];
      }
    }

    function getSchoolsByPostcode(postcode) {
      $.post("/api/schools/", {
        postcode: postcode,
        schoolType: getTypeTerm(),
        state: getStateTerm()
      }).then(addMarkers);
    }

    // schoolName here should be a string
    // conditions is an object of the search conditions
    function getSchoolsByName(schoolName, conditions) {
      $.post("/api/schools/name/" + schoolName, conditions).then(addMarkers);
    }

    function addMarkers(schoolData) {
      schoolData.forEach(school => {
        markerArray.push(createSchoolMarker(school));
      });
      if (markerArray.length) {
        map.setCenter(markerArray[0].position);
      } else {
        // make an error message display
      }
      schools = schoolData;
      initRows();
    }

    function initRows() {
      $schoolContainer.empty();
      const rowsToAdd = [];
      for (let i = 0; i < schools.length; i++) {
        rowsToAdd.push(createSchoolRows(schools[i], i));
      }
      $schoolContainer.prepend(rowsToAdd);
    }

    function createSchoolRows(schools, index) {
      const $newInputRow = $(
        [
          "<li data-index='",
          index,
          "'>",
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
  $(document).on("click", ".schoolButton", function () {
    console.log("in btn");
    const id = $(this).attr("data-id");
    console.log(id);
    // jQuery.each(["put", "delete"], (i, method) => {
    //   jQuery[method] = function(url, data, callback, type) {
    //     if (jQuery.isFunction(data)) {
    //       type = type || callback;
    //       callback = data;
    //       data = undefined;
    //     }

    //     return jQuery.ajax({
    //       url: url,
    //       type: method,
    //       dataType: type,
    //       data: data,
    //       success: callback
    //     });
    //   };
    // });

    $.put("/api/user", { schoolgleList: id }, result => {
      console.log(result);
    });
  });
});
