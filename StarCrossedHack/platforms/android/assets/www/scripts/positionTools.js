// The watch ids reference the current 'watchAcceleration', 'watchHeading', and 'watchAngularSpeed'
var watchAccelerometerID = null;
var watchHeadingID = null;
var watchGyroscopeID = null;

// GYROSCOPE
function startGyroscopeWatch() {
    var options = { frequency: 50 };
    watchGyroscopeID = navigator.gyroscope.watchAngularSpeed(onGyroscopeSuccess, onGyroscopeError, options);
}

function stopGyroscopeWatch() {
    if (watchGyroscopeID) {
        navigator.gyroscope.clearWatch(watchGyroscopeID);
        watchGyroscopeID = null;
    }
}

function onGyroscopeSuccess(speed) {
    var element = document.getElementById('gyroscope');
    if (Math.abs(speed.x) > 0.1) {
        xRot += speed.x;
        groundCamera.rotateX((speed.x * 3.6) * (Math.PI / 180));
    }
    if (Math.abs(speed.y) > 0.1) {
        yRot += speed.y;
        groundCamera.rotateY((speed.y * 3.6) * (Math.PI / 180));
    }
    if (Math.abs(speed.z) > 0.1) {
        zRot += speed.z;
        groundCamera.rotateZ((speed.z * 3.6) * (Math.PI / 180));
    }
}

function onGyroscopeError() {
    alert('onGyroscopeError!');
}

// ACCELEROMETER
function startAccelerometerWatch() {
    var options = { frequency: 50 };
    watchAccelerometerID = navigator.accelerometer.watchAcceleration(onAccelerometerSuccess, onAccelerometerError, options);
}

function stopAccelerometerWatch() {
    if (watchAccelerometerID) {
        navigator.accelerometer.clearWatch(watchAccelerometerID);
        watchAccelerometerID = null;
    }
}

function onAccelerometerSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: ' + acceleration.timestamp + '<br />';
}

function onAccelerometerError() {
    alert('onError!');
}

// COMPASS HEADING
function startHeadingWatch() {
    var options = { frequency: 50 };
    watchHeadingID = navigator.compass.watchHeading(onHeadingSuccess, onHeadingError, options);
}

function stopHeadingWatch() {
    if (watchHeadingID) {
        navigator.compass.clearWatch(watchHeadingID);
        watchHeadingID = null;
    }
}

function onHeadingSuccess(heading) {
    var element = document.getElementById('heading');
    element.innerHTML = 'Heading: ' + heading.magneticHeading;
}

function onHeadingError(compassError) {
    alert('Compass error: ' + compassError.code);
}



// onSuccess Geolocation
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                        'Longitude: ' + position.coords.longitude + '<br />' +
                        'Altitude: ' + position.coords.altitude + '<br />' +
                        'Accuracy: ' + position.coords.accuracy + '<br />' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                        'Timestamp: ' + position.timestamp + '<br />';
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude);
    console.log("onSuccess function");
}

// onError Callback receives a PositionError object
function onError(error) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Error';
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
    console.log('error');
}
