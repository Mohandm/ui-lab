'use strict';

angular.module('uilabApp')
  .service('MainService', function ($http, $q, $log,$rootScope,$interval) {

    this.getPagesList = function(){
      var deferred = $q.defer(),
        actionUrl = 'json/listpages.json';
      $http.get(actionUrl,{})
        .success(function (json) {
          deferred.resolve(json);
        }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
        });
      return deferred.promise;
    };

    this.addPage  = function(pageName){
      var deferred = $q.defer(),
        actionUrl = 'json/listpages.json';
      $http.post(actionUrl,{pageName: pageName})
        .success(function (json) {
          deferred.resolve(json);
        }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
        });
      return deferred.promise;
    };

  });
