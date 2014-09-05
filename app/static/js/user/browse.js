/* jshint unused:false, camelcase:false */
/* global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    var pos = getPositions();
    initMap(36, -82, 4);
    //forEach method to loop over an array in this case each user//
    pos.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
  });

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP});
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
      var name = $(tr).attr('data-name'),
          lat  = $(tr).attr('data-lat'),
          lng  = $(tr).attr('data-lng'),
          pos  = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
      return pos;
    });
    return positions;
  }

  function initMap(lat, lng, zoom){
    var styles     = [{'featureType':'landscape','stylers':[{'hue':'#00dd00'}]},{'featureType':'road','stylers':[{'hue':'#dd0000'}]},{'featureType':'water','stylers':[{'hue':'#000040'}]},{'featureType':'poi.park','stylers':[{'visibility':'off'}]},{'featureType':'road.arterial','stylers':[{'hue':'#ffff00'}]},{'featureType':'road.local','stylers':[{'visibility':'off'}]}],
    mapOptions     = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles};
    map            = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();
