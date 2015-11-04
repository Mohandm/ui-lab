'use strict';

angular.module('uilabApp')
  .service('MetaDataMergeService', function ($http, $q, $log,$rootScope,$interval) {

    this.createJSONFromChangeSet = function(initialMetadata, finalMetadata){
      //console.log("Final:", finalMetadata);
      var finalChangeSet = {};
      DeepDiff.observableDiff(initialMetadata, finalMetadata, function(diffNode){
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
      console.log("coreMetadata:", coreMetadata);
      console.log("clientMetadata:", clientMetadata);

      var finalMergedMetaData = {};

      angular.forEach(clientMetadata, function(clientValueArray, clientFormKey) {
        var coreValueArray = coreMetadata[clientFormKey];
        if(coreValueArray !== undefined)
        {
            finalMergedMetaData[clientFormKey] = {};

            var layoutOfComponents = [];
            angular.forEach(clientValueArray, function(componentValueObject, componentKey) {
                layoutOfComponents.push(componentValueObject);
            });

            angular.forEach(coreValueArray, function(coreComponentValueObject, coreComponentKey) {
                var flagExistsClient = false;
                angular.forEach(clientValueArray, function(componentValueObject, componentKey) {
                    if(componentValueObject.id === coreComponentValueObject.id)
                    {
                      flagExistsClient = true;
                    }
                });
                if(!flagExistsClient)
                {
                  var indexOfComponent = coreComponentValueObject.index;
                  layoutOfComponents.insert(indexOfComponent, coreComponentValueObject);
                }
            });

          angular.forEach(layoutOfComponents, function(component, index) {
              component.index = index;
          });
          finalMergedMetaData[clientFormKey] = layoutOfComponents;
        }
        else
        {
          finalMergedMetaData[clientFormKey] = clientValueArray;
        }
      });

      console.log('finalMergedMetaData', finalMergedMetaData);
      return finalMergedMetaData;
    };
});
