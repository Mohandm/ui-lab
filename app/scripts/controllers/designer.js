'use strict';

/**
 * @ngdoc function
 * @name uiLabApp.controller:DesignerCtrl
 * @description
 * # DesignerCtrl
 * Controller of the uiLabApp
 */
angular.module('uilabApp')
  .controller('DesignerCtrl', function ($scope, $aside) {
    $scope.asideState = {
      open: false
    };

    $scope.openAside = function(position, backdrop) {

      if(!$scope.asideState.open)
      {
          $scope.asideState = {
            open: true,
            position: position
          };

          function postClose() {
            $scope.asideState.open = false;
          }

          $aside.open({
            templateUrl: 'views/aside.html',
            placement: position,
            size: 'sm',
            backdrop: backdrop,
            controller: function($scope, $modalInstance) {
              $scope.ok = function(e) {
                $modalInstance.close();
                e.stopPropagation();
              };
              $scope.cancel = function(e) {
                $modalInstance.dismiss();
                e.stopPropagation();
              };
            }
          }).result.then(postClose, postClose);
        }
      }
  });
