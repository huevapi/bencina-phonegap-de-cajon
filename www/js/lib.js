
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
		zoom: 10,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),myOptions);

    navigator.geolocation.getCurrentPosition(geolocationSuccess);

});


function geolocationSuccess() {
    var latlng = new google.maps.LatLng(-33.398647,-70.581193);
    
    map.setCenter(latlng);
    getClosestPlaces(-33.398647,-70.581193);
    
    
}

function geolocationError() {
    var latlng = new LatLng(-33.398647,-70.581193);
    map.setCenter(latlng);
}

function getClosestPlaces(Lat, Long){
	

	$.getJSON('http://kaipi.me/gasoline/closest?api_key=770f1b31a224fad01ef3850a89667b77bbb33f5df169e785da68fdfe7be67824&lat='+Lat+'&lng='+Long,
		function(data){
			//dibujar puntos
			$.each(data.stations, function(el){
				var point = new google.maps.LatLng(el.lat,	el.lng);
				map.addOverlay(new google.maps.Marker(point));
			});
			
	});
}