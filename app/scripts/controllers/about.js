'use strict';

/**
 * @ngdoc function
 * @name uilabApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the uilabApp
 */
angular.module('uilabApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
