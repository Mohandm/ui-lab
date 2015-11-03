'use strict';

/**
 * @ngdoc function
 * @name uiLabApp.controller:DesignerCtrl
 * @description
 * # DesignerCtrl
 * Controller of the uiLabApp
 */
angular.module('uilabApp')
  .controller('DesignerCtrl', function ($scope, $aside, MainService, toastr, $routeParams, formlyVersion, getOIMConfig,  $builder, $validator, $timeout, $location, constantData) {
    $scope.userType = $routeParams.userType;
    $scope.mode = 'edit';
    $scope.pageId = $routeParams.pageId;

    console.warn($scope.userType, " ", $scope.mode, " ", $scope.pageId);
    $scope.asideState = {
      open: false
    };

    $scope.openAside = function(position, backdrop) {

      function postClose() {
        $scope.asideState.open = false;
      }

      if(!$scope.asideState.open)
      {
          $scope.asideState = {
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

    $scope.addPage = function(){
      if($scope.pageName)
      {

        var pagesListPromise = MainService.addPage($scope.pageName);
        pagesListPromise.then(function(data){
          toastr.success("Page Added Successfully : ",$scope.pageName);
          $scope.pageName = '';
          $scope.openAside('left', true);
        }, function(reason) {
          toastr.error($scope.pageName, 'Failed to Add Page : ');
          $scope.pageName = '';
          $scope.openAside('left', true);
        });
      }
    };

    $scope.changeMode = function(mode){
      if(mode === 'preview')
      {
        $scope.mode = 'preview';
      }
      else{
        $scope.mode = 'edit';
      }
    };

    var listName = constantData.appFormDesignListName;


    var vm = $scope;


    vm.exampleTitle = 'Formly Form Live!'; // add this

    vm.RawFieldCode = function () {
      $scope.isFormlyShowScope = true;
      $scope.rawFieldCode=getOIMConfig.getOIMConfig($scope.forms["default"], $builder.forms);
    }
    vm.StartScratch = function () {
      clearForms($scope.forms);

    }
    vm.CopyForm = function () {

      vm.fields = getOIMConfig.getOIMConfig($scope.forms["default"], $builder.forms);
      vm.model = getModel($scope.forms["default"]);

    };
    var saveForm = function (FormsValuePairs,successFunc)
    {

    }
    vm.PublishForm = function () {


    }
    vm.SaveForm = function () {

    }
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
              // obj_model[modelName]=getModel($scope.forms[containerId]);
            }
            else
            {
              var containerId = field.id;
              obj_model[modelName] = [];
              obj_model[modelName].push(getModel($scope.forms[containerId]));
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
      forms = constantData.defaultFormDesign;

      angular.forEach(forms, function (form, formName, obj) {
        //clear out existing form components
        clearForm(formName);
        angular.forEach(form, function (component) {
          $builder.insertFormObject(formName, component.index, component);
        });
      });




    }
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
      $scope.forms = $builder.forms;

      var itemData = new Array();
      loadFormData(itemData);
      $scope.$watch('forms', function (newValue, oldValue) {

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



    }




    init();






  });
