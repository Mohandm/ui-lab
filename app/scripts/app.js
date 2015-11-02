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
    'toastr'
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
      .when('/designer/:userType?/:mode?/:pageId?', {
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
  });
