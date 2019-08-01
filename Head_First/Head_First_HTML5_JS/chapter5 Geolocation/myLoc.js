/* myLoc.js */
var watchID = null;
var map = null;
var ourCoords =  {
    latitude: 47.624851,
    longitude: -122.52099
};
var options = {enableHighAccuracy: true, maximumAge: 0};
var prevCords = null;
window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {

        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    }
    else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy).";

    div.innerHTML += "found in " + options.timeout + " milliseconds";
    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";


    if (map == null){
        showMap(position.coords);
        prevCoords = position.coords;
    } else {
        var meters = computeDistance(position.coords, prevCords) * 1000;
        if (meters > 20){
            scrollMapToPostion(position.coords);
            prevCords = null;
        }
    }


}


// --------------------- Ready Bake ------------------
//
// Uses the Spherical Law of Cosines to find the distance
// between two lat/long points
//
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

// ------------------ End Ready Bake -----------------

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,
        coords.longitude);
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    var title = "The Marker";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied",
        2: "Position is not available",
        3: "Request timeout"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
    options.timeout += 100;
    navigator.geolocation.getCurrentPosition (
        displayLocation,
        displayError,
        options);
    div.innerHTML += " ...checking again with timeout=" + options.timeout;
}

function addMarker(map, latlong, title, content){
    var markerOptions = {
        map: map,
        position: latlong,
        title: title,
        clickable: true
    };
    var marker  = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, "click", function(){
        infoWindow.open(map);
    });
}

function watchLocation() {
    watchID = navigator.geolocation.watchPosition(displayLocation, displayError, {enableHighAccuracy: true, maximumAge: 60000});
}

function clearWatch() {
    if (watchID != null){
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}

function scrollMapToPostion(coords){
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = new google.maps.LatLng(latitude, longitude);

    map.panTo(latlong);
    addMarker(map, latlong, "Your new location", "You've moved to: " + latitude + " " + longitude);
}


