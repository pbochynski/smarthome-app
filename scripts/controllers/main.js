'use strict';


angular.module('homestatApp')
  .controller('MainCtrl', function ($scope, $http, $interval, $location, $window) {
    console.log('hash:' + $location.hash());
    console.log('path:' + $location.path());
    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };
    $scope.onRegulator = function () {
      $http.put("https://api.yaas.io/smart/home/v1/regulator", $scope.regulator, {headers:{"Authorization":"Bearer "+ $scope.access_token}});
    };
    $scope.onHeater = function () {
      $http.put("https://api.yaas.io/smart/home/v1/heater", $scope.heater, {headers:{"Authorization":"Bearer "+ $scope.access_token}});
    };
    $scope.reload = function () {
      $http.get("https://api.yaas.io/smart/home/v1/heater", {headers:{"Authorization":"Bearer "+ $scope.access_token}}).success(function (response) {
          $scope.heater = response;
        }
      );
      $http.get("https://api.yaas.io/smart/home/v1/regulator", {headers:{"Authorization":"Bearer "+ $scope.access_token}}).success(function (response) {
          $scope.regulator = response;
        }
      );
    };

    $scope.authorize = function () {
      var endpoint = "https://api.yaas.io/hybris/oauth2/b1/authorize";
      var response_type = "token";
      var client_id = "YhmcSjC1RYcIMmq5Sv0eASQPPxQcoXE0";
      var nonce = "NONCE";
      var redirect_uri = $location.protocol()+"://"+$location.host()+ ($location.port() ? ":"+$location.port()+"/" : "/");

      $window.location.href = endpoint + "?" + "response_type=" + response_type + "&client_id=" + client_id
        + "&nonce=" + nonce + "&redirect_uri=" + redirect_uri;
    }

    $scope.reload();

    $interval(function () {
      $http.get("https://api.yaas.io/smart/home/v1/sensors",{headers:{"Authorization":"Bearer "+ $scope.access_token}})
        .success(function (response) {
          $scope.sensors = response.sensors;
        });
    }, 5000);

  });


