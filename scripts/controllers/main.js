'use strict';
var regulatorUrl = "https://api.eu.yaas.io/smart/home/v1/regulator"
var sensorsUrl = "https://api.eu.yaas.io/smart/home/v1/sensors"
var metricsUrl = "https://api.eu.yaas.io/smart/home/v1/metrics"

//var regulatorUrl = "http://localhost:3001/regulator"
//var sensorsUrl = "http://localhost:3001/sensors"

angular.module('homestatApp')
    .controller('MainCtrl', function ($rootScope, $scope, $http, $interval, $location, $window, $timeout) {
        $scope.alerts = []

        $scope.addAlert = function(msg) {
            $scope.alerts.push({msg: msg || 'OK'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.onEnable = function () {
            $scope.addAlert("Heater ENABLED");
            $scope.regulator.state="on";
            $http.post(regulatorUrl, {}, {headers: {"Authorization": "Bearer " + $scope.access_token},params: {state: "on"}});
        }
        $scope.onDisable = function () {
            $scope.addAlert("Heater DISABLED");
            $scope.regulator.state="off";
            $http.post(regulatorUrl, {}, {headers: {"Authorization": "Bearer " + $scope.access_token},params: {state: "off"}});

        }
        $scope.onDay = function () {
            $scope.addAlert("Desired temerature set to 21.4");
            $scope.regulator.state="auto";
            $http.post(regulatorUrl, {}, {
                headers: {"Authorization": "Bearer " + $scope.access_token},
                params: {
                    state: "auto",
                    temperature: 21.4,
                }
            });
        }
        $scope.login = function (){
            $location.path('/login');
        }
        $scope.onOut = function () {
            $scope.addAlert("Desired temerature set to 19.4");
            $scope.regulator.state="auto";
            $http.post(regulatorUrl, {}, {
                headers: {"Authorization": "Bearer " + $scope.access_token},
                params: {
                    state: "auto",
                    temperature: 19.4,
                }
            });
        }
        $scope.onNight = function () {
            $scope.addAlert("Desired temerature set to 21.0");
            $scope.regulator.state="auto";
            $http.post(regulatorUrl, {}, {
                headers: {"Authorization": "Bearer " + $scope.access_token},
                params: {
                    state: "auto",
                    temperature: 21.0,
                }
            });
        }
        $scope.onLogin = function () {
//            $scope.authorize();
            $location.path('login');
        }
        $scope.onLogout = function () {
            $window.localStorage.removeItem('smart-user');
            $window.localStorage.removeItem('smart-password');
            $rootScope.access_token = null;
        }
        $scope.authorize = function () {
            var endpoint = "https://api.yaas.io/hybris/oauth2/v1/authorize";
            var response_type = "token";
            var client_id = "YhmcSjC1RYcIMmq5Sv0eASQPPxQcoXE0";
            var nonce = "NONCE";
            var redirect_uri = $location.protocol() + "://" + $location.host() + ($location.port() ? ":" + $location.port() + "/" : "/");

            $window.location.href = endpoint + "?" + "response_type=" + response_type + "&client_id=" + client_id
                + "&nonce=" + nonce + "&redirect_uri=" + redirect_uri;
        }
        $scope.updateTemperature = function () {
            if ($scope.metrics && $scope.regulator) {
                $scope.metrics.forEach(function (sensor) {
                    if (sensor.chipId == $scope.regulator.sensor) {
                        $scope.temperature = sensor.t;
                    }
                });
            }
        }
        $scope.reload = function() {
            if (!$scope.access_token) {
                return $location.path('login');
            }
            $http.get(metricsUrl, {headers: {"Authorization": "Bearer " + $scope.access_token}})
                .success(function (response) {
                    $scope.metrics = response;
                    $scope.updateTemperature();
                    $scope.sensorUpdate = new Date().getTime();
                    $scope.sensorDelay = 0;
                }).error($scope.onLogin);
            $http.get(regulatorUrl, {headers: {"Authorization": "Bearer " + $scope.access_token}})
                .success(function (response) {
                    $scope.regulator = response;
                    $scope.updateTemperature();
                    $scope.regulatorUpdate = new Date().getTime();
                    $scope.regulatorDelay = 0;
                }).error($scope.onLogin);
        }

        $scope.ticker = function() {
            $scope.sensorDelay = Math.round((new Date().getTime() - $scope.sensorUpdate)/1000);
            $scope.regulatorDelay = Math.round((new Date().getTime() - $scope.regulatorUpdate)/1000);
        }

        $interval($scope.reload, 5000);
        $interval($scope.ticker, 1000);
        $scope.reload();

        $scope.regulator = {};

    });


