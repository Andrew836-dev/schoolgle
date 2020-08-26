/* eslint-disable prettier/prettier */
$(document).ready(() => {
  $("select").formSelect();

  // $.put("/api/schoolgle", {
  //   schoolgleList: JSON.stringify(schoolgleList)
  // });
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
   * object for storing search conditions
   */
  // let conditions = {};
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
    <button class='schoolButton' data-id='${school.acaraSMLID}'>Add</button>`;
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
      // console.log("submitted");
      const searchTerm = $("#searchInput")
        .val()
        .trim();
      const typeSearchTerm = $("#school-type")
        .val()
        .trim();
      console.log(searchTerm);
      console.log(typeSearchTerm);
      if (searchTerm.match(/\d{4}/g)) {
        getSchoolsByPostcode(searchTerm.match(/\d{4}/g));
      } else {
        getSchoolsByName(searchTerm);
      }
      getSchoolByType(typeSearchTerm);
    });

    $schoolContainer.on("click", "li", function () {
      const index = parseInt($(this).data("index"));
      map.setCenter(markerArray[index].position);
    });

    function getSchoolsByPostcode(postcode) {
      $.post("/api/schools/", {
        postcode: postcode
      }).then(addMarkers);
    }

    function getSchoolsByName(schoolName) {
      $.post("/api/schools/name/" + schoolName).then(addMarkers);
    }

    function getSchoolByType(schoolType) {
      $.post("/api/schools/type/" + schoolType).then(addMarkers);
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
    function addMarkers(schoolData) {
      clearAllMarkers();
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
  let schoolgleList = [];
  console.log("new page");
  $.get("/api/user_data").then(data => {
    schoolgleList = [JSON.parse(data.schoolgleList)];
    console.log(schoolgleList);
  });
  $(document).on("click", ".schoolButton", function () {
    console.log("in btn");
    const id = parseInt($(this).attr("data-id"));
    console.log(id);
    schoolgleList.push(id);
    console.log(schoolgleList);
    console.log(JSON.stringify(schoolgleList));
    // $.put("/api/user", {
    //   schoolgleList: JSON.stringify(schoolgleList)
    // });
    jQuery.each(["put", "delete"], (i, method) => {
      jQuery[method] = function(url, data, callback, type) {
        if (jQuery.isFunction(data)) {
          type = type || callback;
          callback = data;
          data = undefined;
        }

        return jQuery.ajax({
          url: url,
          type: method,
          dataType: type,
          data: data,
          success: callback
        });
      };
    });

    $.put(
      "/api/user",
      { schoolgleList: JSON.stringify(schoolgleList) },
      result => {
        console.log(result);
      }
    );
    // $.ajax({
    //   url: "/api/user",
    //   type: "PUT",
    //   contentType: "application/json",
    //   data: { schoolgleList: JSON.stringify(schoolgleList) }
    // });
  });
});
