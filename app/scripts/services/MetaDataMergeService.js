'use strict';

angular.module('uilabApp')
  .service('MetaDataMergeService', function ($http, $q, $log,$rootScope,$interval) {

    this.createJSONFromChangeSet = function(initialMetadata, finalMetadata){
      console.log(JSON.stringify(initialMetadata));
      console.log(JSON.stringify(finalMetadata));
    };

    this.mergeMetaData = function(coreMetadata, clientMetadata){
      //var formData = angular.fromJson(response.data);
      var differences = DeepDiff.diff(coreMetadata, clientMetadata);

      DeepDiff.observableDiff(coreMetadata, clientMetadata, function(diffNode){
        // Apply all changes except those to the 'name' property...
        console.log("Kind of Diff:", diffNode.kind);
        console.log("path of Diff:", diffNode.path);
        if (diffNode.kind !== 'D') {
          DeepDiff.applyChange(coreMetadata, clientMetadata, diffNode);
        }
      });

      return coreMetadata;
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
