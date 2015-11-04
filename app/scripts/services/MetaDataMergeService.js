'use strict';

angular.module('uilabApp')
  .service('MetaDataMergeService', function ($http, $q, $log,$rootScope,$interval) {

    this.createJSONFromChangeSet = function(initialMetadata, finalMetadata){
      //console.log("Final:", finalMetadata);
      var finalChangeSet = {};
      DeepDiff.observableDiff(initialMetadata, finalMetadata, function(diffNode){
        // Apply all changes except those to the 'name' property...
        /*console.log("Kind of Diff:", diffNode.kind);
        console.log("path of Diff:", diffNode.path);
        console.log("Diff : ", diffNode);
        console.log(diffNode.path.indexOf('$$hashKey'));*/
        if(diffNode.kind === 'N' && diffNode.path.indexOf('$$hashKey') !== -1)
        {
          //Do Nothing
          //console.log('entered Do Nothing');
        }
        else if (diffNode.kind === 'A' && diffNode.path.length === 1) {

          finalChangeSet[finalMetadata[diffNode.path[0]]];
          //console.log('entered Addition');
        }
        else if(diffNode.kind === 'N' || diffNode.kind === 'E')
        {
          finalChangeSet[diffNode.path[0]] = finalMetadata[diffNode.path[0]];
          //console.log('entered New and Edition');
        }
      });
      //console.log('Final change Set :', finalChangeSet);
      return finalChangeSet;
    };

    this.mergeMetaData = function(coreMetadata, clientMetadata){
      //var formData = angular.fromJson(response.data);
      DeepDiff.observableDiff(coreMetadata, clientMetadata, function(diffNode){
        // Apply all changes except those to the 'name' property...
        console.log("Kind of Diff:", diffNode.kind);
        console.log("path of Diff:", diffNode.path);
        console.log("Diff : ", diffNode);
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
