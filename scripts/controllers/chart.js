'use strict';

/**
 * @ngdoc function
 * @name homestatApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the homestatApp
 */
angular.module('homestatApp')
  .controller('ChartCtrl', function ($scope) {

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'spline'
        },
        plotOptions: {
          series: {
            stacking: ''
          }
        }
      },
      series: [{"data": [20, 15, 15, 1, 4, 5, 20, 7, 4, 19], "id": "series-4"}],
      title: {
        text: 'Hello'
      },
      credits: {
        enabled: true
      },
      loading: false,
      size: {}
    }


  });
