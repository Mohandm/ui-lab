'use strict';

/**
 * @ngdoc function
 * @name uiLabApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the uiLabApp
 */
angular.module('uilabApp')
  .controller('LoginCtrl', function ($scope,$location , User) {

    $scope.loginInfo = {};

    $scope.tenants = [{"description":"Misys Developer","value" : "core"},{"description":"Client Developer","value" : "client"}];

    $scope.users = [{"name":"User 1","value" : "uer1"},{"name":"User 2","value" : "user2"}];

    $scope.login = function(){
      User.setUser($scope.loginInfo);
      $location.path('/designer/'+$scope.loginInfo.selectedTenant.value);
    };
  });

