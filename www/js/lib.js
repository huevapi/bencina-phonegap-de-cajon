
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
    var latlng = new google.maps.LatLng(a.coords.latitude,a.coords.longitude);
    
    map.setCenter(latlng);
	marker = new google.maps.Marker({
        position: new google.maps.LatLng(a.coords.latitude,a.coords.longitude),
        map: map,
        icon: "https://odie.esu10.org/images/GoogleMarkerColor2.png"
      });

    getClosestPlaces(a.coords.latitude,a.coords.longitude);


    // var locations = [
    //     ['<b>Copec</b> <br> 93: $720 <br> 95: $740 ', -33.40712,-70.591063, 4],
    //     ['Coogee Beach', -33.393039,-70.586214, 5],
    //     ['Cronulla Beach', -33.395225,-70.569477, 3],
    //     ['Manly Beach', -33.402462,-70.567245, 2],
    //     ['Maroubra Beach', -33.408445,-70.574412, 1]
    //   ];
    // 
    // 
    //   
    // 
    //   var marker, i;
    // 
    //   for (i = 0; i < locations.length; i++) {
    //       //var newIcon = MapIconMaker.createMarkerIcon({width: 20, height: 34, primaryColor: "#0000FF", cornercolor:"#0000FF"});
    //       //var marker = new google.maps.marker(map.getCenter(), {icon: newIcon});
    //     
    //   }
  
}

function geolocationError() {
    var latlng = new LatLng(-33.398647,-70.581193);
    map.setCenter(latlng);

}

function getClosestPlaces(Lat, Long){
	
var infowindow = new google.maps.InfoWindow();
	$.getJSON('http://kaipi.me/gasoline/closest?api_key=770f1b31a224fad01ef3850a89667b77bbb33f5df169e785da68fdfe7be67824&lat='+Lat+'&lng='+Long,
		function(data){
			//dibujar puntos
			var max = 0;
			var min = 9999;
			$.each(data.stations, function(i, el){
				if(parseInt(el.price_93)>max){
				max =  parseInt(el.price_93);
				}
				if(parseInt(el.price_93)<min){
				min =  parseInt(el.price_93);
				}
				
			});
			
			var verde = (max-min)/3+min;
			var amarillo = (max-min)/3*2+min;
			var rojo = max;
			console.log(verde);
			// console.log(data.stations);
			$.each(data.stations, function(i, el){
				// var point = new google.maps.LatLng(el.lat,	el.lng);
				// 				map.addOverlay(new google.maps.Marker(point));
				// console.log(el.lat);
				if(parseInt(el.price_93)<verde){
					var icon = "https://odie.esu10.org/images/GoogleMarkerColor4.png"
				} else	if(parseInt(el.price_93)<amarillo){
						var icon = "https://odie.esu10.org/images/GoogleMarkerColor3.png"
					} else {
							var icon = "https://odie.esu10.org/images/GoogleMarkerColor1.png"
						}
			
				marker = new google.maps.Marker({
			        position: new google.maps.LatLng(el.lat, el.lng),
			        map: map,
			        icon: icon
			      });

			      google.maps.event.addListener(marker, 'click', (function(marker,i) {
			        return function() {
			          infowindow.setContent('<b>'+el.address+'</b> <br> 93: '+el.price_93+' <br> 95: '+el.price_95);
			          infowindow.open(map, marker);
			        }
			      })(marker,i));
			});
			
	});
}