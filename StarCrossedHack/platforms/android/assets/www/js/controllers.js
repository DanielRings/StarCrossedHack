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
});


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