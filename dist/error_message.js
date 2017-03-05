/**
 * @version 1.1.0
 * @license MIT
 * @Author MrWook
 */
(function (ng, undefined){
	'use strict';

	ng.module('mw-error-message', []);

	ng.module('mw-error-message').constant('mwConfig', {
		icon: false,
		icon_template: '<span class="fa wm_error_message_icon"></span>',
		success:true,
		label_classes: ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12', 'control-label'],
		div_inner_classes: ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12'],
		div_outer_classes: ['form-group', 'error_message_box'],
		help_block_classes: ['help-block'],
		additional_help_block: '',
		messages: {
			required: 'ERROR_MSG_REQUIRED',
			email: 'ERROR_MSG_EMAIL',
			maxlength: 'ERROR_MSG_TOLONG',
			minlength: 'ERROR_MSG_TOSHORT'
		},
		translate: false,
		tooltip: true
	});

	//create ngMessage messages
	ng.module('mw-error-message').run(['$templateCache', '$log', 'mwConfig', function($templateCache, $log, mwConfig) {
		var messages = '';
		var translate = '';
		if(mwConfig.translate == true)
			translate = '|translate';

		angular.forEach(mwConfig.messages, function(value, key) {
			messages += '<ng-message when="'+key+'">{{"'+value+'"'+translate+'}}</ng-message>'
		});
		$templateCache.put('messages/tpl', messages);

		//check for ngMessages
		try{
			angular.module('ngMessages');
		}catch(error){
			$log.error('NgMessages is missing');
		}
	}]);

	ng.module('mw-error-message').directive('mwErrorMessage', ['$compile', '$log', 'mwConfig', function($compile, $log, mwConfig){
		return {
			restrict: 'A',
			priority:1001,
			terminal:true,
			scope:true,
			compile: function compile(tElement, tAttrs){
				return {
					pre: function preLink(scope, el, attrs, ctrl){
						//remove own directive to prevent cycle
						el.removeAttr("mw-error-message");

						//set icons
						var icon = '';
						if((mwConfig.icon == true && attrs.mwErrorMessageIcon == "true") || (mwConfig.icon == true && attrs.mwErrorMessageIcon == undefined) || (mwConfig.icon == false && attrs.mwErrorMessageIcon == "true"))
							icon = mwConfig.icon_template;

						//set child element
						var child_element = angular.copy(el.children(":first"));

						//set required asterisk
						var required = '';
						if(child_element.attr('required') != undefined){
							required = '*';
						}
						if(child_element.attr('ng-required') != undefined){
							required = '<span ng-if="::'+child_element.attr('ng-required')+'">*</span>';
						}

						var additional_help_block = '';
						if(attrs.mwErrorMessageAddHelp != undefined && attrs.mwErrorMessageAddHelp != ''){
							additional_help_block = attrs.mwErrorMessageAddHelp;
						}else{
							additional_help_block = mwConfig.additional_help_block
						}
						//set name from name
						var name = child_element.attr('name');
						//set prefix for label
						var label_name = attrs.mwErrorMessage;
						//set uppercase name for label
						if(mwConfig.translate == true)
							label_name += name.toUpperCase();

						//add css class
						el.addClass(mwConfig.div_outer_classes.join(' '));

						//add tooltip
						if(mwConfig.tooltip == true){
							//check for ui.bootstrap.tooltip
							try{
								angular.module('ui.bootstrap.tooltip');
								//set tooltip
								el[0].setAttribute('uib-tooltip-template', "'test/tpl'");
								el[0].setAttribute('tooltip-placement', "auto left");

								//set content of tooltip
								scope.tooltip_content = {};
								angular.forEach(mwConfig.messages, function(value, key) {
									if(child_element.attr(key) != undefined)
										scope.tooltip_content[key] = value;
								});
								if(child_element.attr('type') == 'email')
									scope.tooltip_content['email'] = mwConfig.messages['email'];
							}catch(error){
								$log.error('ui-bootstrap-tooltip is missing');
							}
						}

						//set error message ng-class
						el.attr('ng-class', "{ 'has-error': form."+name+".$touched && form."+name+".$invalid }");
						if((mwConfig.success == true && attrs.mwErrorMessageSuccess == "true") || (mwConfig.success == true && attrs.mwErrorMessageSuccess == undefined) || (mwConfig.success == false && attrs.mwErrorMessageSuccess == "true"))
							el.attr('ng-class', "{ 'has-error': form."+name+".$touched && form."+name+".$invalid, 'has-success': form."+name+".$touched && !form."+name+".$invalid}");

						//set child element html
						var child_element_html = el.html();

						//set error message html
						var error_message_html = '<label for="'+name+'" class="'+mwConfig.label_classes.join(' ')+'">{{ "'+label_name+'" }}'+required+'</label>' +
							'<div class="'+mwConfig.div_inner_classes.join(' ')+'">'+
							icon+
							child_element_html+
							additional_help_block+
							'<div class="'+mwConfig.help_block_classes.join(' ')+'" ng-messages="form.'+name+'.$error" ng-if="form.'+name+'.$touched">'+
							'<div ng-messages-include="messages/tpl"></div>'+
							'</div>'+
							'</div>';
						//overwrite element html
						el.html(error_message_html);

						//remove unnecessary attributes
						el.removeAttr("mw-error-message-add-help");
						el.removeAttr("mw-error-message-icon");
						el.removeAttr("mw-error-message-success");

						//compile element
						$compile(el)(scope);
					}
				};
			}
		};
	}]);
})(angular);