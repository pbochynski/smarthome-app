'use strict';


angular.module('homestatApp')
    .controller('LoginCtrl', function ($rootScope, $scope, $http, $interval, $location, $window, $timeout) {

        $scope.rememberMe = function() {
            $window.localStorage.setItem('smart-user', $scope.user);
            $window.localStorage.setItem('smart-password', $scope.password);
        }
        $scope.project='pihome';
        $scope.onLogin = function () {
            var body = 'grant_type=password&scope=hybris.tenant='+$scope.project+'&client_id=uHhtzpjsr4radW5wJ1K892JDQcya6PLV&username=' +
                $scope.user + '&password=' + $scope.password
            $http.post('https://api.eu.yaas.io/hybris/oauth2/v1/token',
                body,
                {headers: {'content-type': 'application/x-www-form-urlencoded'}}
            ).success(function (response) {
                    $rootScope.access_token = response.access_token;
                    $scope.rememberMe();
                    $location.path('/');

                }).error(function(err){alert(JSON.stringify(err))});
        }
        if ($window.localStorage && $window.localStorage.getItem('smart-user') && $window.localStorage.getItem('smart-password')) {
            $scope.user = $window.localStorage.getItem('smart-user');
            $scope.password = $window.localStorage.getItem('smart-password');
            $scope.onLogin();

        }
    })
;


