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
        });
    }
})

.controller('LogInCtrl', function ($scope) {
    $scope.login = function (email, password) {
        console.log("LogIn Clicked");
        console.log("Email: " + email + "\nPassword: " + password);
        var url = "https://api.idolondemand.com/1/api/sync/adduser/v1?";
        var apikey = "4a0d6484-82ce-4f42-a5fc-d1f03c516edf";
        var post = $.post(url,
            {
                "store": "users",
                "apikey": apikey,
                "email": email,
                "password": password
            });
        post.done(function (data) {
            console.log(data);
        });
    }
})


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