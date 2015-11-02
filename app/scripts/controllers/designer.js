'use strict';

/**
 * @ngdoc function
 * @name uiLabApp.controller:DesignerCtrl
 * @description
 * # DesignerCtrl
 * Controller of the uiLabApp
 */
angular.module('uilabApp')
  .controller('DesignerCtrl', function ($scope, $aside, MainService, toastr, $routeParams) {
    $scope.userType = $routeParams.userType;
    $scope.mode = $routeParams.mode;
    $scope.pageId = $routeParams.pageId;

    console.warn($scope.userType, " ", $scope.mode, " ", $scope.pageId);
    $scope.asideState = {
      open: false
    };

    $scope.openAside = function(position, backdrop) {

      function postClose() {
        $scope.asideState.open = false;
      }

      if(!$scope.asideState.open)
      {
          $scope.asideState = {
            open: true,
            position: position
          };

          $aside.open({
            templateUrl: 'views/listpages.html',
            placement: position,
            size: 'sm',
            backdrop: backdrop,
            controller: 'ListpagesController',
            controllerAs: 'listpagesCtrl'
          }).result.then(postClose, postClose);
        }
      };

    $scope.addPage = function(){
      if($scope.pageName)
      {

        var pagesListPromise = MainService.addPage($scope.pageName);
        pagesListPromise.then(function(data){
          toastr.success("Page Added Successfully : ",$scope.pageName);
          $scope.pageName = '';
          $scope.openAside('left', true);
        }, function(reason) {
          toastr.error($scope.pageName, 'Failed to Add Page : ');
          $scope.pageName = '';
          $scope.openAside('left', true);
        });
      }
    };
  });
