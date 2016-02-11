(function() {
  angular.module('builder.components', ['builder', 'validator.rules']).config([
    '$builderProvider', function($builderProvider) {
      $builderProvider.registerComponent('textInput', {
        group: 'Default',
        label: 'Text Input',
        description: 'description',
        placeholder: 'placeholder',
        modified: false,
        required: false,
        validationOptions: [
          {
            label: 'none',
            rule: '/.*/'
          }, {
            label: 'number',
            rule: '[number]'
          }, {
            label: 'email',
            rule: '[email]'
          }, {
            label: 'url',
            rule: '[url]'
          }
        ],
        template: "<div>\n  <label for=\"0\" class=\"control-label\">\n    {{label}}\n    {{fb-required ? '*' : ''}}\n  </label>\n  <input class=\"form-control\" ng-model=\"inputText\" placeholder=\"{{placeholder}}\">\n</div>\n",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n        <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>Validation</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n  <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n  </form>"
      });
      $builderProvider.registerComponent('textArea', {
        group: 'Default',
        label: 'Text Area',
        description: 'description',
        placeholder: 'placeholder',
        modified: false,
        required: false,
        template: "<div>\n  <label for=\"0\" class=\"control-label\">\n    {{label}}\n    {{fb-required ? '*' : ''}}\n  </label>\n  <textarea class=\"form-control\" ng-model=\"inputText\" ng-attr-placeholder=\"{{placeholder}}\"></textarea>\n</div>\n",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n        <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n\n    </form>"
      });
      $builderProvider.registerComponent('checkbox', {
        group: 'Default',
        label: 'Checkbox',
        description: 'description',
        placeholder: 'placeholder',
        modified: false,
        required: false,
        options: ['value one', 'value two'],
        arrayToText: true,
        template: "<div>\n  <label for=\"0\" class=\"control-label\">\n    {{label}}\n    {{fb-required ? '*' : ''}}\n  </label>\n<div class=\"checkbox\" ng-repeat=\"item in options track by $index\">\n                <label><input type=\"checkbox\" ng-model=\"$parent.inputArray[$index]\" value='item'/>\n                {{item}}\n            </label>\n </div>\n</div>\n",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n        <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n  <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n\n    </form>"
      });
      $builderProvider.registerComponent('radio', {
        group: 'Default',
        label: 'Radio',
        description: 'description',
        placeholder: 'placeholder',
        modified: false,
        required: false,
        options: ['value one', 'value two'],
        template: "<div>\n  <label for=\"0\" class=\"control-label\">\n    {{label}}\n    {{fb-required ? '*' : ''}}\n  </label>\n<div class=\"radio\" ng-repeat=\"item in options track by $index\">\n                <label><input type=\"radio\" ng-model=\"$parent.inputText\" value='{{item}}'/>\n                {{item}}\n            </label>\n </div>\n</div>\n",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n        <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n\n    </form>"
      });

      $builderProvider.registerComponent('radioFlat', {
        group: 'Default',
        label: 'radio inline',
        required: false,
        options: ['value one', 'value two'],
        modified: false,

        template: "<div>\r\n    <label for=\"{{formName+index}}\" class=\"control-label\">\r\n        {{label}}\r\n        {{fb-required ? \'*\' : \'\'}}\r\n    <\/label>\r\n    <div class=\"radio-group\">\r\n        <label class=\"radio-inline\" ng-repeat=\"item in options track by $index\">\r\n            <input type=\"radio\"\r\n                   id=\"{{id + \'_\'+ $index}}\"\r\n                   value=\"{{item}}\"\r\n                   ng-model=\"$parent.inputText\">\r\n            {{item}}\r\n        <\/label>\r\n\r\n    <\/div>\r\n<\/div>\r\n",

        popoverTemplate: "<form>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Label<\/label>\r\n        <input type=\'text\' ng-model=\"label\"  class=\'form-control\' \/>\r\n    <\/div>\r\n   \r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Options<\/label>\r\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\" \/>\r\n    <\/div>\r\n\r\n   <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n  \r\n <\/form>"
      });

      $builderProvider.registerComponent('multiField', {
        group: 'Layout',
        label: 'horizontal layout',
        modified: false,

        template: "<div class=\"panel panel-default\" >\r\n    <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">{{label}}<\/h3>\r\n    <\/div>\r\n    <div class=\"DropableDesign form-inline\" fb-builder=\"{{id}}\" \/>\r\n\r\n\r\n<\/div>",

        popoverTemplate: "<form>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Label<\/label>\r\n        <input type=\'text\' ng-model=\"label\"  class=\'form-control\' \/>\r\n    <\/div>\r\n   \r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Options<\/label>\r\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\" \/>\r\n    <\/div>\r\n\r\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n\r\n<\/form>",
        isContainer: true

      });

      $builderProvider.registerComponent('repeatSection', {
        group: 'Advance',
        label: 'repeat section',
        modified: false,

        template: "<div class=\"panel panel-default\" >\r\n    <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">{{label}}<\/h3>\r\n    <\/div>\r\n    <div class=\"DropableDesign\" fb-builder=\"{{id}}\" \/>\r\n\r\n  \r\n    <p>\r\n        <button type=\"button\" class=\"btn btn-primary\">{{templateOptions.btnText}}<\/button>\r\n    <\/p>\r\n\r\n<\/div>",

        popoverTemplate: "<form>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Label<\/label>\r\n        <input type=\'text\' ng-model=\"label\" validator=\"[required]\" class=\'form-control\'\/>\r\n    <\/div>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Description<\/label>\r\n        <input type=\'text\' ng-model=\"description\" class=\'form-control\'\/>\r\n    <\/div>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Placeholder<\/label>\r\n        <input type=\'text\' ng-model=\"placeholder\" class=\'form-control\'\/>\r\n    <\/div>\r\n    <div class=\"checkbox\">\r\n        <label>\r\n            <input type=\'checkbox\' ng-model=\"required\" \/>\r\n            Required<\/label>\r\n    <\/div>\r\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\r\n        <label class=\'control-label\'>Validation<\/label>\r\n        <select ng-model=\"$parent.validation\" class=\'form-control\' ng-options=\"option.rule as option.label for option in validationOptions\"><\/select>\r\n    <\/div>\r\n\r\n    <hr\/>\r\n    <div class=\'form-group\'>\r\n        <input type=\'submit\' ng-click=\"popover.save($event)\" class=\'btn btn-primary\' value=\'Save\'\/>\r\n        <input type=\'button\' ng-click=\"popover.cancel($event)\" class=\'btn btn-default\' value=\'Cancel\'\/>\r\n        <input type=\'button\' ng-click=\"popover.remove($event)\" class=\'btn btn-danger\' value=\'Delete\'\/>\r\n    <\/div>\r\n <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n<\/form>",
        isContainer: true,
        templateOptions:{btnText:"Add Another Section"}
      });
      $builderProvider.registerComponent('datePicker', {
        group: 'Advance',
        modified: false,
        template: "<div>\r\n    <label for=\"0\" class=\"control-label\">{{templateOptions.label}} {{fb-required ? \'*\' : \'\'}}<\/label>\r\n\r\n    <input type=\"text\" date-format=\"{{templateOptions.dateFormat}}\" id=\"{{id}}\" ng-model=\"date\" class=\"form-control\" placeholder=\"{{placeholder}}\" \/>\r\n\r\n<\/div>",

        popoverTemplate: "<form>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Label<\/label>\r\n        <input type=\'text\' ng-model=\"templateOptions.label\" class=\'form-control\' \/>\r\n    <\/div>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Date Format<\/label>\r\n        <input type=\'text\' ng-model=\"templateOptions.dateFormat\" class=\'form-control\' \/>\r\n    <\/div>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>Placeholder<\/label>\r\n        <input type=\'text\' ng-model=\"placeholder\" class=\'form-control\' \/>\r\n    <\/div>\r\n    <div class=\"checkbox\">\r\n        <label>\r\n            <input type=\'checkbox\' ng-model=\"required\" \/>\r\n            Required\r\n        <\/label>\r\n    <\/div>\r\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n\r\n<\/form>",
        templateOptions: {
          label: 'Date Picker',
          dateFormat: "yy-mm-dd"

        }
      });
      $builderProvider.registerComponent('htmlContent', {
        group: 'Default',
        modified: false,
        template: '<label for="0" class="control-label">   HTML Content </label><br/><div>{{templateOptions.htmlContent}}</div>',

        popoverTemplate:"<form>\r\n    <div class=\"form-group\">\r\n        <label class=\'control-label\'>HTML Content<\/label>\r\n        <textarea ng-model=\"templateOptions.htmlContent\" class=\'form-control\' \/>\r\n    <\/div>\r\n\r\n   <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n \r\n<\/form>",
        noFormControl:false
      });

      return $builderProvider.registerComponent('select', {
        group: 'Default',
        label: 'Select',
        description: 'description',
        placeholder: 'placeholder',
        modified: false,
        required: false,
        options: ['value one', 'value two'],
        template: "<div>\n  <label for=\"0\" class=\"control-label\">\n    {{label}}\n    {{fb-required ? '*' : ''}}\n  </label>\n<select ng-options=\"value for value in options\" id=\"{{formName+index}}\" class=\"form-control\"\n            ng-model=\"inputText\" ng-init=\"inputText = options[0]\"/>\n</div>\n",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n   <div class=\"checkbox\"><label><input type='checkbox' ng-model=\"required\" />Required</label></div>\n <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"modified\" />\n            Modified</label>\n    </div>\n </form>"
      });
    }
  ]);

}).call(this);
