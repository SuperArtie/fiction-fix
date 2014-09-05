/* jshint unused:false, camelcase:false */
/* global google */

(function(){
  'use strict';
  $(document).ready(function(){
    $('#locName').blur(geocodeLoc);
  });
  function geocodeLoc(){
    var origin = $('#locName').val();
    geocode(origin, function(locName, locLat, locLng){
      $('#locName').val(locName);
      $('#locLat').val(locLat);
      $('#locLng').val(locLng);
    });
  }
  function geocode(address, cb){
    'use strict';
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      var name = results[0].formatted_address,
          lat  = results[0].geometry.location.lat(),
          lng  = results[0].geometry.location.lng();

      cb(name, lat, lng);
    });
  }
})();
