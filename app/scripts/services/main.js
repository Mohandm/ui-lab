'use strict';

angular.module('uilabApp')
  .service('MainService', function ($http, $q, $log,$rootScope,$interval,$firebaseArray) {
    var url = "https://ui-lab.firebaseio.com";
    var ref = new Firebase(url);
    var pageList = $firebaseArray(ref.child('pageId'));
    this.getPagesList = function(){
      return pageList ;
    };

    this.addPage  = function(json ,pageName){
      var deferred = $q.defer();
      pageList.$add(pageName).then(function (response) {
        ref.child('uiLabPages').child(pageName).set(JSON.stringify(json),onComplete);
      });
      var onComplete = function(error) {
        if (error) {
          deferred.reject();
        } else {
          deferred.resolve(url+'/'+pageName);
        }
      };

      return deferred.promise;
    };

    this.savePage  = function(json ,pageName){
      var deferred = $q.defer();
      var onComplete = function(error) {
        if (error) {
          deferred.reject();
        } else {
          deferred.resolve(url+'/'+pageName);
        }
      };
      ref.child('uiLabPages').child(pageName).set(JSON.stringify(json), onComplete);


      return deferred.promise;
    };

    this.getFormMetaData   = function(pageId){
      var deferred = $q.defer();
      var actionUrl = url + '/uiLabPages/' + pageId + '.json';
      $http.get(actionUrl,{})
        .success(function (json) {
          deferred.resolve(json);
        }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
        });
      return deferred.promise;
    };
  })
  .factory('commonService', function () {
    function CDataWrap(value) {
      return "<![CDATA[" + value + "]]>";
    }

    function replaceAll(find, replace, str) {
      return str.replace(new RegExp(find, 'g'), replace);
    }

    return {
      CDataWrap: CDataWrap,
      replaceAll: replaceAll
    };


  });
