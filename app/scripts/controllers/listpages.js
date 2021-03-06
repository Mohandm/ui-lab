'use strict';

angular.module('uilabApp')
  .controller('ListpagesController', function ($scope, $modalInstance, MainService, $location, $routeParams) {
      $scope.userType = $routeParams.userType;

      var pagesListPromise = MainService.getPagesList();
      pagesListPromise.then(function(data){
        $scope.pagesList = data.pagesList;
      });

      $scope.openPageDesigner = function(pageId){
        $location.path('/designer/' + $scope.userType +'/'+ pageId);
        $modalInstance.close();
      };

      /*$scope.ok = function(e) {
        $modalInstance.close();
        e.stopPropagation();
      };
      $scope.cancel = function(e) {
        $modalInstance.dismiss();
        e.stopPropagation();
      };*/

  });
