/* This code borrows from http://jsfiddle.net/salman/4mtyu/ */

/*
 * declare map as a global variable
 */
let map;
/*
 * declare array for storing marker objects
 */
const markerArray = [];
let center = [-25.808678, 134.918921];

/*
 * use google maps api built-in mechanism to attach dom events
 */
google.maps.event.addDomListener(window, "load", () => {
  /*
   * create map
   */
  // This Lat and Long is close to the centre of Australia
  // center = new google.maps.LatLng(-25.808678, 134.918921);
  center = new google.maps.LatLng(-34.9285, 138.6007);
  map = new google.maps.Map(document.getElementById("map_div"), {
    center: center,
    // ,
    // zoom 4 is most of australia, 6 is about 1 state, 10 is a city.
    zoom: 10,
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
    <h1>${school.schoolName}</h1>
    <p>${school.schoolSector}, ${school.schoolType}</p>
    <button class='schoolButton' data-id='${school.acaraSMLID}'>Add</button>`;
    google.maps.event.addListener(marker, "click", function() {
      infoWindow.setContent(html);
      infoWindow.open(map, this);
      map.setCenter(this.position);
    });
    return marker;
  }

  /*
   * add markers to map
   */
  $.get("/api/schools/5000").then(schools => {
    schools.forEach(school => markerArray.push(createSchoolMarker(school)));
  });
});
