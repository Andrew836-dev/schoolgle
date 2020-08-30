/* eslint-disable indent */
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
      const html = htmlGenerator[window.location.pathname](school);
      google.maps.event.addListener(marker, "click", function() {
        infoWindow.setContent(html);
        infoWindow.open(map, this);
        map.setCenter(this.position);
      });
      return marker;
    }

    // this is the square including South Australia.
    // SW corner first, NE corner second
    const mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-38.3954896, 127.0565161),
      new google.maps.LatLng(-24.9885453, 142.3494848)
    );

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

    $("#submitBtn").on("click", () => {
      event.preventDefault();
      console.log("submitted");
      let searchTerm = $("#searchInput")
        .val()
        .trim();
      // const typeSearchTerm = getTypeTerm();
      console.log(searchTerm);
      // console.log(typeSearchTerm);
      clearAllMarkers();
      if (searchTerm.match(/\d{4}/g)) {
        searchTerm = searchTerm.match(/\d{4}/g);
        getSchoolsByPostcode(searchTerm).then(dbResponse => {
          if (dbResponse.length > 0) {
            addMarkers(dbResponse);
          } else {
            getLatLngFromPostcode(searchTerm);
            $schoolContainer.prepend(`
              <li>
                <a class='collection-item black-text' href='#!'>
                  <p class='seachList'>No results for that postcode</p>
                  <p class='seachList'>Checking google</p>
                </a>
              </li>
              <div class='divider'></div>`);
          }
        });
      } else {
        getSchoolsByName(searchTerm).then(addMarkers);
      }
      // if we call this here it will add every school in the database of that type to the map as well
      // getSchoolByType(typeSearchTerm);
    });

    $schoolContainer.on("click", "li", function() {
      const index = parseInt($(this).data("index"));
      map.setCenter(markerArray[index].position);
    });

    function getSchoolsByDistance(lat, lng, radius = 0.02) {
      const body = {
        radius: radius,
        latitude: lat,
        longitude: lng,
        conditions: {
          schoolType: getTypeTerm(),
          state: getStateTerm()
        }
      };
      $.post("/api/schools/nearby", body).then(response => {
        if (response.length === 0) {
          console.log("No results, try a bigger radius");
        } else {
          addMarkers(response);
        }
      });
    }

    function getLatLngFromPostcode(postcode) {
      const myGeocoder = new google.maps.Geocoder();
      myGeocoder.geocode(
        {
          address: postcode.toString(),
          // region: "AU"
          bounds: mapBounds
        },
        (data, status) => {
          if (status === "OK") {
            const lat = data[0].geometry.location.lat();
            const lng = data[0].geometry.location.lng();
            getSchoolsByDistance(lat, lng);
          }
        }
      );
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
      // schools = schoolData;
      initRows(schoolData);
    }

    function initRows(schoolData) {
      $schoolContainer.empty();
      const rowsToAdd = [];
      for (let i = 0; i < schoolData.length; i++) {
        rowsToAdd.push(createSchoolRows(schoolData[i], i));
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
          "<p class='seachList'>Type: <span class='school-type'>",
          schools.schoolType,
          "</span></p>",
          "<p class='seachList'>State: <span class='school-type'>",
          schools.state,
          "</span></p>",
          "</a>",
          "</li>",
          "<div class='divider'></div>"
        ].join("")
      );

      $newInputRow.data("schools", schools);

      return $newInputRow;
    }

    const initMap = {
      "/account": function() {
        const schoolgleMarkers = accountInit();
        // console.log(schoolgleMarkers);
        if (schoolgleMarkers.length > 0) {
          addMarkers(schoolgleMarkers);
        }
      },
      "/search": function() {
        const searchTerm = $("#schoolSearch").data("postcode");
        // console.log(searchTerm);
        if (searchTerm) {
          getSchoolsByPostcode(searchTerm).then(addMarkers);
          $("#searchInput").val(searchTerm);
        }
      }
    };
    initMap[window.location.pathname]();
  });
  $(document).on("click", ".schoolButton", function() {
    // console.log("in btn");
    const id = $(this).attr("data-id");
    // console.log(id);
    $.put("/api/user", { school: id }, result => {
      console.log(result);
      //Update the badge number by calling database and entering data
      $.get("/api/user_data").then(data => {
        $(".badge").text(data.schoolgleList);
      });
    });
  });
});
