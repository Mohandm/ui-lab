'use strict';

/**
 * @ngdoc function
 * @name uiLabApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the uiLabApp
 */
angular.module('uilabApp')
    .factory('User', function () {
    var user = {};
    var service = {

        setUser: setUser,
        getUser: getUser
    };

    return service;
    
    function getUser(){
        
    }
   
    function setUser(param){
        user = param;
    }
});