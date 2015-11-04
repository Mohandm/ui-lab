'use strict';

/**
 * @ngdoc function
 * @name uiLabApp.controller:DesignerCtrl
 * @description
 * # DesignerCtrl
 * Controller of the uiLabApp
 */
angular.module('uilabApp')
  .controller('DesignerCtrl', function ($scope, $aside, string, MainService, toastr, $routeParams, formlyVersion,
                                        getOIMConfig,  $builder, $validator, $timeout, $location, constantData,
                                        MetaDataMergeService) {
    var vm = $scope;
    vm.userType = $routeParams.userType;
    vm.mode = 'edit';
    vm.pageId = $routeParams.pageId;
    vm.showDesigner = false;
    if($routeParams.pageId)
    {
      vm.showDesigner = true;
    }

    vm.pageName = string(vm.pageId).humanize().s;

    console.warn(vm.userType, " ", vm.mode, " ", vm.pageId);
    vm.asideState = {
      open: false
    };

    vm.openAside = function(position, backdrop) {

      function postClose() {
        vm.asideState.open = false;
      }

      if(!vm.asideState.open)
      {
          vm.asideState = {
            open: true,
            position: position
          };

          $aside.open({
            templateUrl: 'views/listpages.html',
            placement: position,
            size: 'sm',
            backdrop: backdrop,
            controller: 'ListpagesController',
            controllerAs: 'listpagesCtrl'
          }).result.then(postClose, postClose);
        }
      };

    vm.addPage = function(){
      if(vm.pageName)
      {

        var pagesListPromise = MainService.addPage(vm.pageName);
        pagesListPromise.then(function(data){
          toastr.success("Page Added Successfully : ",vm.pageName);
          vm.pageName = '';
          vm.openAside('left', true);
        }, function(reason) {
          toastr.error(vm.pageName, 'Failed to Add Page : ');
          vm.pageName = '';
          vm.openAside('left', true);
        });
      }
    };

    vm.changeMode = function(mode){
      if(mode === 'preview')
      {
        vm.mode = 'preview';
      }
      else{
        vm.mode = 'edit';
      }
    };

    vm.logout = function(){
      $location.path('/');
    };

    var listName = constantData.appFormDesignListName;

    vm.exampleTitle = 'Preview'; // add this

    vm.RawFieldCode = function () {
      vm.isFormlyShowScope = true;
      vm.rawFieldCode=getOIMConfig.getOIMConfig(vm.forms["default"], $builder.forms);
    }

    vm.StartScratch = function () {
      clearForms(vm.forms);

    };

    var flagLoad = false;
    var initialFields = [];
    vm.CopyForm = function () {

      vm.fields = getOIMConfig.getOIMConfig(vm.forms["default"], $builder.forms);
      vm.model = getModel(vm.forms["default"]);
      if(!flagLoad)
      {
        initialFields = getOIMConfig.getOIMConfig(vm.forms["default"], $builder.forms);
        flagLoad = true;
      }
    };

    var saveForm = function (FormsValuePairs,successFunc)
    {

    };

    vm.PublishForm = function () {


    };

    vm.SaveForm = function () {

    };

    function getModel(form) {
      var obj_model = {};
      var modelName;

      angular.forEach(form, function (field) {
        //check if it is not field
        if (field.noFormControl)
        {
          if (field.key)
            modelName = field.key;
          else
            modelName = field.id;
          if (field.hasOwnProperty("isContainer") && field["isContainer"])
          //this is an container field
          {
            if (field.hasOwnProperty("component") && field["component"] === "multiField")
            //this is layout container
            {
              var containerId = field.id;
              // obj_model[modelName]=getModel(vm.forms[containerId]);
            }
            else
            {
              var containerId = field.id;
              obj_model[modelName] = [];
              obj_model[modelName].push(getModel(vm.forms[containerId]));
            }
          }
          else if (field.component === "checkbox") {
            obj_model[modelName] = [];
          }
          else {
            obj_model[modelName] = '';
          }
        }
      });
      return obj_model;

    }

    var getDesignForm = function()
    {


    }

    function clearForms(forms) {
      angular.forEach(forms, function (form, formName, obj) {
        //clear out existing form components
        clearForm(formName);
      });
    }
    var loadFormData = function (itemData) {
      var forms;

      //no design found, load default form design
      forms = itemData || [];
      angular.forEach(forms, function (form, formName, obj) {
        //clear out existing form components
        clearForm(formName);
        angular.forEach(form, function (component) {
          $builder.insertFormObject(formName, component.index, component);
        });
      });
    };

    var clearForm = function (formName) {
      if ($builder.forms[formName])
        $builder.forms[formName].length=0;
      // existForm.length = 0;
      //angular.forEach(existForm, function (component) {
      //    $builder.removeFormObject(formName, 0);
      //});

    };

    var inProcess = false;
    var init = function () {
      //clear all forms first for back navigation button
      //$builder.forms = {};
      vm.forms = $builder.forms;
      var itemData;
      if(vm.userType === 'client')
      {
        itemData = MetaDataMergeService.mergeMetaData($scope.coreFormMetaData, $scope.clientFormMetaData);
      }
      else
      {
        itemData = $scope.coreFormMetaData;
      }

      //var itemData = constantData.defaultFormDesign;
      loadFormData(itemData);
      vm.$watch('forms', function (newValue, oldValue) {

        if (!inProcess) {
          inProcess = true;
          $timeout(function () {
            try {
              vm.CopyForm();
            }
            catch (e) {
              console.log(e);
            }
            inProcess = false;
          }, 1000);
        }

      }, true);
    };



    var metaDataPromise = MainService.getFormMetaData($routeParams.pageId);
    metaDataPromise.then(function(data){
      if(data !== {})
      {
        $scope.formMetaData = data;
        $scope.coreFormMetaData = data.core;
        $scope.initialCoreFormMetaData = angular.copy($scope.coreFormMetaData);
        $scope.clientFormMetaData = data.client;
        $scope.initialClientFormMetaData = angular.copy($scope.clientFormMetaData);
        $scope.formDisplayMetaData = data.display;
      }
      init();
    }, function(reason) {
      toastr.error('Failed to Load MetaData');
    });

    var finalJSON = {
      core : {},
      client : {},
      display : []
    };
    vm.saveFormDesign = function(){
      if(vm.userType === 'client')
      {
          console.log('Client');
          finalJSON.core = $scope.initialCoreFormMetaData;
          finalJSON.client = MetaDataMergeService.createJSONFromChangeSet($scope.coreFormMetaData, $builder.forms);
          finalJSON.display = getOIMConfig.getOIMConfig(vm.forms["default"], $builder.forms);
          console.log(JSON.stringify(finalJSON));
          toastr.success('Form Design has been successfully saved');
      }
      else
      {
        console.log('Core');
        finalJSON.core = $builder.forms;
        finalJSON.client = $scope.initialClientFormMetaData;
        finalJSON.display = getOIMConfig.getOIMConfig(vm.forms["default"], $builder.forms);
        console.log(JSON.stringify(finalJSON));
        toastr.success('Form Design has been successfully saved');
      }
    };
  });
