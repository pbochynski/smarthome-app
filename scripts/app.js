'use strict';

/**
 * @ngdoc overview
 * @name homestatApp
 * @description
 * # homestatApp
 *
 * Main module of the application.
 */
angular
  .module('homestatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'frapontillo.bootstrap-switch',
    'highcharts-ng'
  ])
  .config(function ($routeProvider, $locationProvider) {
    function accessTokenControler($location,$rootScope) {
      var accessTokenRegExp = /access_token=([^'"&]+)/;
      var match = accessTokenRegExp.exec($location.path());
      var access_token = match[1];
      $rootScope.access_token=access_token;
      $location.path("/");
    };
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl',
        controllerAs: 'chart'
      })
      .when('/access_token=:accessToken', {
        template: '',
        controller: accessTokenControler
      })
      .when('/token_type=:accessToken', {
        template: '',
        controller: accessTokenControler
      })
      .otherwise({
        redirectTo: '/'
      });

  });
