'use strict';

/**
 * @ngdoc function
 * @name uiLabApp.controller:DesignerCtrl
 * @description
 * # DesignerCtrl
 * Controller of the uiLabApp
 */
angular.module('uilabApp')
  .controller('CodementorCtrl', function ($scope, $http) {
    var vm = this;

    // function assignment
    vm.onSubmit = onSubmit;

    vm.model = {
      awesome: true
    };
    vm.options = {
      formState: {
        awesomeIsForced: false
      }
    };

    $http.get('json/core-form-fields.json', {}).success(function (json) {


     });


    var fields = [
      {
        key: 'text',
        type: 'input',
        templateOptions: {
          label: 'Text',
          placeholder: 'Formly is terrific!'
        }
      },
      {
        key: 'nested.story',
        type: 'textarea',
        templateOptions: {
          label: 'Some sweet story',
          placeholder: 'It allows you to build and maintain your forms with the ease of JavaScript :-)',
          description: ''
        },
        expressionProperties: {
          'templateOptions.focus': 'formState.awesomeIsForced',
          'templateOptions.description': function(viewValue, modelValue, scope) {
            if (scope.formState.awesomeIsForced) {
              return 'And look! This field magically got focus!';
            }
          }
        }
      },
      {
        key: 'awesome',
        type: 'checkbox',
        templateOptions: { label: '' },
        expressionProperties: {
          'templateOptions.disabled': function(viewValue, modelValue, scope) {
            if (scope.formState.awesomeIsForced) {
              return true;
            } else {
              return false;
            }
          },
          'templateOptions.label': function(viewValue, modelValue, scope) {
            if (scope.formState.awesomeIsForced) {
              return 'Too bad, formly is really awesome...';
            } else {
              return 'Is formly totally awesome? (uncheck this and see what happens)';
            }
          }
        }
      },
      {
        key: 'whyNot',
        type: 'textarea',
        expressionProperties: {
          'templateOptions.placeholder': function(viewValue, modelValue, scope) {
            if (scope.formState.awesomeIsForced) {
              return 'Too bad... It really is awesome! Wasn\'t that cool?';
            } else {
              return 'Type in here... I dare you';
            }
          },
          'templateOptions.disabled': 'formState.awesomeIsForced'
        },
        hideExpression: 'model.awesome',
        templateOptions: {
          label: 'Why Not?',
          placeholder: 'Type in here... I dare you'
        },
        watcher: {
          listener: function(field, newValue, oldValue, formScope, stopWatching) {
            if (newValue) {
              stopWatching();
              formScope.model.awesome = true;
              formScope.model.whyNot = undefined;
              field.hideExpression = null;
              formScope.options.formState.awesomeIsForced = true;
            }
          }
        }
      }
    ];

    var guru = JSON.stringify(fields, function (key, value) {
        if (typeof value === 'function') {
          return value.toString();
        }
        return value;
    });

    console.log("Stringyfied", guru);


    var finaltest = JSON.parse(guru, function (key, value) {
       if (value && typeof value === "string" && value.substr(0,8) == "function")
       {
         var startBody = value.indexOf('{') + 1;
         var endBody = value.lastIndexOf('}');
         var startArgs = value.indexOf('(') + 1;
         var endArgs = value.indexOf(')');

         return new Function(value.substring(startArgs, endArgs) , value.substring(startBody, endBody));
       }
       return value;
   });

    console.log("Parsed Back", finaltest);

    vm.fields = finaltest;


    /*RegExp.prototype.toJSON = RegExp.prototype.toString;

    var regexp = /^[0-9]+$/;
    var foo = { rgx: regexp.source, date: new Date };
    var stringified = JSON.stringify(foo);
    new RegExp(JSON.parse(stringified).rgx)*/

    // function definition
    function onSubmit() {
      alert(JSON.stringify(vm.model), null, 2);
    }
  });

