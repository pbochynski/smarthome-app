'use strict';
var regulatorUrl = "https://api.eu.yaas.io/smart/home/v1/regulator"

//var regulatorUrl = "http://localhost:3001/regulator"


angular.module('homestatApp')
    .controller('SettingsCtrl', function ($scope, $http, $interval, $location, $window, $timeout) {

        $scope.onAuto = function () {
            $scope.regulator.state="auto";
            $http.post(regulatorUrl, {}, {
                headers: {"Authorization": "Bearer " + $scope.access_token},
                params: {
                    state: "auto",
                    temperature: $scope.temperature,
                    deviation: $scope.deviation,
                    sensor: $scope.sensor
                }
            });
            $scope.reload();
        }
        $scope.reload = function() {
            $http.get(regulatorUrl, {headers: {"Authorization": "Bearer " + $scope.access_token}})
                .success(function (response) {
                    $scope.regulator = response;
                });

        }
        $scope.reload();
    });


