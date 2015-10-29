'use strict';

/**
 * @ngdoc function
 * @name uilabApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uilabApp
 */
angular.module('uilabApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
