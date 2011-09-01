
//thx @elroyjetson for the code example

var map;

// When map page opens get location and display map
$('.page-map').live("pagecreate", function() {

	//boston :)
	var lat = 42.35843,
		lng = -71.059773;

	//try to get GPS coords
	if( navigator.geolocation ) {

		//redirect function for successful location
		function gpsSuccess(pos){
			if( pos.coords ){
				lat = pos.coords.latitude;
				lng = pos.coords.longitude;
			}
			else{
				lat = pos.latitude;
				lng = pos.longitude;
			}
		}

		function gpsFail(){
			//Geo-location is supported, but we failed to get your coordinates. Workaround here perhaps?
		}

		navigator.geolocation.getCurrentPosition(gpsSuccess, gpsFail, {enableHighAccuracy:true, maximumAge: 300000});
	}

	/*
	if not supported, you might attempt to use google loader for lat,long
	$.getScript('http://www.google.com/jsapi?key=YOURAPIKEY',function(){
		lat = google.loader.ClientLocation.latitude;
		lng = google.loader.ClientLocation.longitude;
	});
	*/

	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 14,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),myOptions);

    navigator.geolocation.getCurrentPosition(geolocationSuccess);

});


function geolocationSuccess(a, b) {
    var latlng = new google.maps.LatLng(-33.398647,-70.581193);
    map.setCenter(latlng);

    var locations = [
      ['<b>Copec</b> <br> 93: $720 <br> 95: $740 ', -33.40712,-70.591063, 4],
      ['Coogee Beach', -33.393039,-70.586214, 5],
      ['Cronulla Beach', -33.395225,-70.569477, 3],
      ['Manly Beach', -33.402462,-70.567245, 2],
      ['Maroubra Beach', -33.408445,-70.574412, 1]
    ];


    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        //var newIcon = MapIconMaker.createMarkerIcon({width: 20, height: 34, primaryColor: "#0000FF", cornercolor:"#0000FF"});
        //var marker = new google.maps.marker(map.getCenter(), {icon: newIcon});
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: "https://odie.esu10.org/images/GoogleMarkerColor4.png"
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}

function geolocationError() {
    var latlng = new LatLng(-33.398647,-70.581193);
    map.setCenter(latlng);
}