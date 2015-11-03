'use strict';

angular.module('uilabApp')
  .service('MetaDataMergeService', function ($http, $q, $log,$rootScope,$interval) {

    this.createFinalFormDesignerJSONToStore = function(initialMetadata, finalMetadata){

    };

    this.mergeMetaData = function(coreMetadata, clientMetadata){
      //var formData = angular.fromJson(response.data);
      return angular.merge(coreMetadata, clientMetadata);
    };


    var lhs = {
      name: 'my object',
      description: 'it\'s an object!',
      details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'elements']
      }
    };

    var rhs = {
      name: 'updated object',
      description: 'it\'s an object!',
      details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'more', 'elements', { than: 'before' }]
      }
    };

    var differences = DeepDiff(lhs, rhs);
    console.log(differences);

});
