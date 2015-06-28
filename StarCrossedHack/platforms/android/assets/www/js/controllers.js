// controllers.js

angular.module('starter.controllers', [])

.controller('SignUpCtrl', function ($scope) {
    $scope.signUp = function(email, password) {
        console.log("SignUp Clicked");
        console.log("Email: " + email + "\nPassword: " + password);
        var url = "https://api.idolondemand.com/1/api/sync/adduser/v1?";
        var apikey = "4a0d6484-82ce-4f42-a5fc-d1f03c516edf";
        var post = $.post(url,
            {
                "store": "users",
                "apikey": apikey,
                "email": email,
                "password" : password
            });
        post.done(function (data) {
            console.log(data);
            window.plugins.toast.showLongBottom('Sign Up Successful!');
        });
    }
})

.controller('LogInCtrl', function ($scope, $state) {
    $scope.login = function (email, password) {
        console.log("LogIn Clicked");
        console.log("Email: " + email + "\nPassword: " + password);
        var url = "https://api.idolondemand.com/1/api/sync/authenticate/v1?";
        var apikey = "4a0d6484-82ce-4f42-a5fc-d1f03c516edf";
        var post = $.post(url,
            {
                "mechanism": "simple",
                "store": "users",
                "apikey": apikey,
                "user": email,
                "password": password
            });
        post.done(function (data) {
            console.log(data);
            //window.plugins.toast.showLongBottom('Log In Successful!');
            $state.go('world');
        });
    }
})



.controller('WorldCtrl', function ($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/text-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });

    // MAIN
    console.log("inside controller ThreeJSCtrl");
    // standard global variables
    var SCREEN_WIDTH, SCREEN_HEIGHT;
    var container, scene, groundCamera, spaceCamera, activeCamera, renderer, cameraDirection, xRot, yRot, zRot;
    var latitude, longitude;
    var watchGyroscopeID;

    // Wait for device API libraries to load
    document.addEventListener("deviceready", onDeviceReady, false);

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

    function onDeviceReady() {
        watchGyroscopeID = null;
        cameraDirection = new THREE.Vector3(0, 0, 0);
        xRot = 0;
        yRot = 0;
        zRot = 0;
        latitude = 47;
        longitude = -122;
        startGyroscopeWatch();
        init();
        placeLogo();
        placeText(latLonToVector3(40, -20, 100), new THREE.Vector3(1.2, -0.3, 0.2), "States are nicer", 222, 116, 78, true);
        placeText(latLonToVector3(40, -170, 100), new THREE.Vector3(1.2, -0.3, 0.2), "thinking of you", 44, 238, 56, true);
        container.addEventListener("touchstart", handleTouchStart, false);
        render();
    }

    function placeLogo() {

        var material2 = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/hplogo.jpg'), side: THREE.DoubleSide });

        var mesh2 = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 3),
            material2
          );
        scene.add(mesh2);
        mesh2.position.setX(0);
        mesh2.position.setY(20);
        mesh2.position.setZ(0);
        mesh2.rotateX(1);
        mesh2.rotateZ(0.5);
    }


    // FUNCTIONS
    function latLonToVector3(lat, lon, radius) {
        var phi = (lat) * Math.PI / 180;
        var theta = (lon - 180) * Math.PI / 180;

        var x = -radius * Math.cos(phi) * Math.cos(theta);
        var y = radius * Math.sin(phi);
        var z = radius * Math.cos(phi) * Math.sin(theta);

        return new THREE.Vector3(x, y, z);
    }

    /*function latLonToVector3(x, y, z) {
        var phi = (lat) * Math.PI / 180;
        var theta = (lon - 180) * Math.PI / 180;

        var x = -radius * Math.cos(phi) * Math.cos(theta);
        var y = radius * Math.sin(phi);
        var z = radius * Math.cos(phi) * Math.sin(theta);

        return new THREE.Vector3(x, y, z);
    }*/


    function handleTouchStart() {
        $scope.openModal();
    }

    $scope.postText = function (data) {
        cameraDirection = new THREE.Vector3(0, 0, -1);
        cameraDirection.applyQuaternion(groundCamera.quaternion); //math
        cameraDirection.normalize();
        cameraDirection.multiplyScalar(100);
        console.log(groundCamera.rotation);
        placeText(cameraDirection, groundCamera.rotation, data.text, 44, 238, 56, false);
        //post to cloud
        var url = "http://salty-mesa-7777.herokuapp.com";
        var post = $.post(url,
            {
                "sender": "me@gmail.com",
                "receiver": "bro@gmail.com",
                "message": data.text,
                "lat": 44,
                "lon": -100
            });
        post.done(function (data) {
            console.log(data);
            window.plugins.toast.showLongBottom('Message Sent');
        });

        $scope.modal.hide();
        data.text = "";
    };

    // places text onto the sphere
    function placeText(pos, rot, text, r, g, b, flag) {
        // create a canvas element
        var canvas1 = document.createElement('canvas');
        var context1 = canvas1.getContext('2d');
        context1.font = "Bold 40px Arial";
        textAlign = "center";
        textBaseline = "middle";
        context1.fillStyle = "rgba("+r+","+g+","+b+",0.95)";
        context1.fillText(text, 20, 80);

        // canvas contents will be used for a texture
        var texture1 = new THREE.Texture(canvas1)
        texture1.needsUpdate = true;

        var material1 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
        material1.transparent = true;

        var mesh1 = new THREE.Mesh(
            new THREE.PlaneGeometry(canvas1.width / 8, canvas1.height / 8),
            material1
          );
        //var textPos = latLonToVector3(44.0, -85.0, 300);
        scene.add(mesh1);
        //mesh1.position.setX(textPos.x);
        //mesh1.position.setY(textPos.y);
        //mesh1.position.setZ(textPos.z);
        mesh1.position.setX(pos.x);
        mesh1.position.setY(pos.y);
        mesh1.position.setZ(pos.z);
        if (flag) {
            mesh1.lookAt(groundCamera.position);
        }
        else {
            mesh1.rotateX(rot.x);
            mesh1.rotateY(rot.y);
            mesh1.rotateZ(rot.z);
        }
        //mesh1.lookAt(new THREE.Vector3(0, 0, 0));
    }

    function init() {
        // SCENE
        scene = new THREE.Scene();
        // SPACE CAMERA
        SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.0001, FAR = 1000;
        spaceCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        scene.add(spaceCamera);
        spaceCamera.position.set(0, 10, 200);
        spaceCamera.lookAt(scene.position);
        // RENDERER
        renderer = new THREE.CanvasRenderer({ antialias: true });
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        container = document.getElementById('ThreeJS');
        container.appendChild(renderer.domElement);
        // EARTH
        var earthGeometry = new THREE.SphereGeometry(1, 12, 12);
        var earthMaterial = new THREE.MeshBasicMaterial({ color: 0x009933 });
        earthMaterial.map = THREE.ImageUtils.loadTexture('img/earthplain.jpg')
        var earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);
        // GROUND CAMERA
        groundCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        var cameraHelper = new THREE.CameraHelper(groundCamera);
        earth.add(groundCamera);
        earth.add(cameraHelper);
        var camPos = latLonToVector3(latitude, longitude, 1.3);
        groundCamera.position.setX(camPos.x);
        groundCamera.position.setY(camPos.y);
        groundCamera.position.setZ(camPos.z);
        groundCamera.lookAt(new THREE.Vector3(0, 0, 0));
        // ACTIVE CAMERA SWITCH
        activeCamera = groundCamera;
    }
    // pulls messages from the database

    /*$.getJSON("http://salty-mesa-7777.herokuapp.com", function (data) {
        console.log(data);
        $.each( data, function( key, val ) {
            // if the message exists, put on the map
            if (key === "receiver") {
                //            var posMessage = new THREE.Vector3(0, 0, -1); //need to change to utilize lat and lon from database message
                //            placeText(posMessage, 0, jsonMessages[i]["message"])  
            }
        });
        
    });*/
    //}

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, activeCamera);
    }
});

/*.controller('ThreeJSCtrl', [function () {
    // MAIN
    console.log("inside controller ThreeJSCtrl");
    // standard global variables
    var SCREEN_WIDTH, SCREEN_HEIGHT;
    var container, scene, groundCamera, spaceCamera, activeCamera, renderer, cameraDirection, xRot, yRot, zRot;
    var latitude, longitude;
    var watchGyroscopeID;

    // Wait for device API libraries to load
    document.addEventListener("deviceready", onDeviceReady, false);

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

    function onDeviceReady() {
        watchGyroscopeID = null;
        cameraDirection = new THREE.Vector3(0, 0, 0);
        xRot = 0;
        yRot = 0;
        zRot = 0;
        latitude = 47;
        longitude = -122;
        startGyroscopeWatch();
        init();
        container.addEventListener("touchstart", handleTouchStart, false);
        render();
    }


    // FUNCTIONS
    function latLonToVector3(lat, lon, radius) {
        var phi = (lat) * Math.PI / 180;
        var theta = (lon - 180) * Math.PI / 180;

        var x = -radius * Math.cos(phi) * Math.cos(theta);
        var y = radius * Math.sin(phi);
        var z = radius * Math.cos(phi) * Math.sin(theta);

        return new THREE.Vector3(x, y, z);
    }

    
    function handleTouchStart() {
        cameraDirection = new THREE.Vector3(0, 0, -1);
        cameraDirection.applyQuaternion(groundCamera.quaternion); //math
        cameraDirection.normalize();
        cameraDirection.multiplyScalar(100);
        placeText(cameraDirection, groundCamera.rotation, "Hello, World!");
        openModal();
    }

    // places text onto the sphere
    function placeText(pos, rot, text) {
        // create a canvas element
        var canvas1 = document.createElement('canvas');
        var context1 = canvas1.getContext('2d');
        context1.font = "Bold 40px Arial";
        textAlign = "center";
        textBaseline = "middle";
        context1.fillStyle = "rgba(255,255,255,0.95)";
        context1.fillText(text, 25, 80);

        // canvas contents will be used for a texture
        var texture1 = new THREE.Texture(canvas1)
        texture1.needsUpdate = true;

        var material1 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
        material1.transparent = true;

        var mesh1 = new THREE.Mesh(
            new THREE.PlaneGeometry(canvas1.width / 8, canvas1.height / 8),
            material1
          );
        //var textPos = latLonToVector3(44.0, -85.0, 300);
        scene.add(mesh1);
        //mesh1.position.setX(textPos.x);
        //mesh1.position.setY(textPos.y);
        //mesh1.position.setZ(textPos.z);
        mesh1.position.setX(pos.x);
        mesh1.position.setY(pos.y);
        mesh1.position.setZ(pos.z);
        mesh1.rotateX(rot.x);
        mesh1.rotateY(rot.y);
        mesh1.rotateZ(rot.z);
        //mesh1.lookAt(new THREE.Vector3(0, 0, 0));
    }

    function init() {
        // SCENE
        scene = new THREE.Scene();
        // SPACE CAMERA
        SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.0001, FAR = 1000;
        spaceCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        scene.add(spaceCamera);
        spaceCamera.position.set(0, 10, 200);
        spaceCamera.lookAt(scene.position);
        // RENDERER
        renderer = new THREE.CanvasRenderer({ antialias: true });
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        container = document.getElementById('ThreeJS');
        container.appendChild(renderer.domElement);
        // EARTH
        var earthGeometry = new THREE.SphereGeometry(1, 12, 12);
        var earthMaterial = new THREE.MeshBasicMaterial({ color: 0x009933 });
        earthMaterial.map = THREE.ImageUtils.loadTexture('img/earthplain.jpg')
        var earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);
        // GROUND CAMERA
        groundCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        var cameraHelper = new THREE.CameraHelper(groundCamera);
        earth.add(groundCamera);
        //earth.add(cameraHelper);
        var camPos = latLonToVector3(latitude, longitude, 2);
        groundCamera.position.setX(camPos.x);
        groundCamera.position.setY(camPos.y);
        groundCamera.position.setZ(camPos.z);
        groundCamera.lookAt(new THREE.Vector3(0, 0, 0));
        // ACTIVE CAMERA SWITCH
        activeCamera = groundCamera;

    }

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, activeCamera);
    }
}])*/

/*
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
*/