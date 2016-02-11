'use strict';

/**
 * @ngdoc overview
 * @name uilabApp
 * @description
 * # uilabApp
 *
 * Main module of the application.
 */
angular
  .module('uilabApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngAside',
    'formly',
    'formlyBootstrap',
    'ui-listView',
    'toastr',
    'ngFileUpload',
    'builder',
    'builder.components',
    'validator',
    'validator.rules',
    'string',
    'firebase'
  ])
  .config(function ($routeProvider, toastrConfig) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'LoginCtrl'
      })
      .when('/intro-example', {
        templateUrl: 'examples/views/intro-example.html',
        controller: 'IntroExampleCtrl',
        controllerAs: 'IntroExampleCtrl'
      })
      .when('/codementor', {
        templateUrl: 'examples/views/codementor.html',
        controller: 'CodementorCtrl',
        controllerAs: 'CodementorCtrl'
      })
      .when('/designer/:userType?/:pageId?', {
        templateUrl: 'views/designer.html',
        controller: 'DesignerCtrl',
        controllerAs: 'DesignerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });


    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-right'
    });
  })
  .run([
  '$builder', function ($builder) {
      $builder.config.popoverPlacement = 'left';
    }
  ])
  .filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }])
  .filter('getByKey', function () {
    return function (input, key) {
      var i = 0, len = input.length;
      for (; i < len; i++) {
        if (input[i].key == key) {
          var returnObj = input[i];
          var j = i + 1;
          return { obj: returnObj, index: j };
        }
      }
      return null;
    }
  })
  .filter('getByProperty', function () {
    return function (input, propertyName, propertyValue) {
      var i = 0, len = input.length;
      for (; i < len; i++) {
        if (input[i].hasOwnProperty(propertyName) && input[i][propertyName] == propertyValue) {
          var returnObj = input[i];

          return { obj: returnObj, index: i };
        }
      }
      return null;
    }
  })
  .filter('getByHasProperty', function () {
    return function (input, propertyName) {
      var foundObjs = new Array();
      var i = 0, len = input.length;
      for (; i < len; i++) {
        if (input[i].hasOwnProperty(propertyName)) {
          foundObjs.push(input[i]);
        }
      }
      return foundObjs;
    }
  });
