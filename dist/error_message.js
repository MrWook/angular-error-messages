/**
 * @version 1.2.4
 * @license MIT
 * @Author MrWook
 */
(function (ng, undefined){
	'use strict';

	ng.module('mw-error-message', []);

	ng.module('mw-error-message').constant('mwConfig', {
		success:true,
		label_classes: ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12'],
		div_inner_classes: ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12'],
		div_outer_classes: ['error_message_box'],
		help_block_classes: ['help-block'],
		additional_help_block: '',
		messages: {
			required: 'ERROR_MSG_REQUIRED',
			email: 'ERROR_MSG_EMAIL',
			maxlength: 'ERROR_MSG_TOLONG',
			minlength: 'ERROR_MSG_TOSHORT'
		},
		icon: false,
		icon_template: '<span class="fa wm_error_message_icon"></span>',
		translate: false,
		tooltip: false
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
		$templateCache.put('mwErrorMessageTooltip/tpl', '<ol class="wm_error_tooltip"> <li ng-repeat="(key, value) in tooltip_content">{{value'+translate+'}}</li> </ol>');
		//check for ngMessages
		try{
			angular.module('ngMessages');
		}catch(error){
			$log.error('NgMessages is missing');
		}
	}]);

	ng.module('mw-error-message').directive('mwErrorMessage', ['$compile', '$log', '$parse', 'mwConfig', function($compile, $log, $parse, mwConfig){
		return {
			restrict: 'A',
			priority:1001,
			terminal:true,
			scope: true,
			compile: function compile(tElement, tAttrs){
				return {
					pre: function preLink(scope, el, attrs, ctrl){
						//set options if set
						var mwOptions = {};
						if(attrs.mwErrorMessageOptions !== undefined && scope.$parent[attrs.mwErrorMessageOptions] !== undefined){
							mwOptions = scope.$parent[attrs.mwErrorMessageOptions];
						}

						//set child element
						var child_element = angular.copy(el.children(":first"));

						//set required asterisk
						var required = '';
						if(child_element.attr('required') !== undefined){
							required = '*';
						}
						if(child_element.attr('ng-required') !== undefined){
							required = '<span ng-if="'+child_element.attr('ng-required')+'">*</span>';
						}

						//set child element html
						var child_element_html = el.html();

						//set name from name
						var name = child_element.attr('name');
						var interpolation = false;
						if(name.indexOf('{{') === 0 && name.indexOf('}}') === name.length-2){
							name = name.replace('{{', '').replace('}}', '');
							interpolation = true;
						}else{
							name = "'"+name+"'";
						}

						//set prefix for label
						var label_name = attrs.mwErrorMessage;
						var translate = '';

						//set uppercase name for label
						if(mwConfig.translate == true){
							if(interpolation){
								label_name = '"'+label_name+'"+'+name;
							}else{
								label_name = '"'+label_name+name.toUpperCase()+'"';
							}
							translate = '|translate';
						}else{
							label_name = '"'+label_name+'"';
						}
						//add css class
						el.addClass(mwConfig.div_outer_classes.join(' '));

						var additional_help_block = '';
						if(mwOptions.addHelp !== undefined && mwOptions.addHelp != ''){
							additional_help_block = mwOptions.addHelp;
						}else{
							additional_help_block = mwConfig.additional_help_block
						}
						//set icons
						var icon = '';
						if(mwOptions.icon == true || (mwOptions.icon === undefined && mwConfig.icon == true))
							icon = mwConfig.icon_template;

						//add tooltip
						if(mwOptions.tooltip == true || (mwOptions.tooltip === undefined && mwConfig.tooltip == true)){
							try{
								//check for ui.bootstrap.tooltip
								angular.module('ui.bootstrap.tooltip');
								//set tooltip
								el[0].setAttribute('uib-tooltip-template', "'mwErrorMessageTooltip/tpl'");
								el[0].setAttribute('tooltip-placement', "auto left");

								//set content of tooltip
								scope.tooltip_content = {};
								angular.forEach(mwConfig.messages, function(value, key) {
									if(child_element.attr(key) !== undefined)
										scope.tooltip_content[key] = value;
								});
								if(child_element.attr('type') == 'email')
									scope.tooltip_content['email'] = mwConfig.messages['email'];
							}catch(error){
								$log.error('ui-bootstrap-tooltip is missing');
							}
						}

						//get form name
						var el_form = angular.element(el);
						while(el_form.prop('tagName') !== 'FORM'){
							el_form = el_form.parent();
						}
						var form_name = el_form.attr('name');

						//set error message ng-class
						if(mwOptions.success == true || (mwOptions.success === undefined && mwConfig.success == true))
							el.attr('ng-class', "{ 'has-error': "+form_name+"["+name+"].$touched && "+form_name+"["+name+"].$invalid, 'has-success': "+form_name+"["+name+"].$touched && !"+form_name+"["+name+"].$invalid}");
						else
							el.attr('ng-class', "{ 'has-error': "+form_name+"["+name+"].$touched && "+form_name+"["+name+"].$invalid }");

						//set error message html
						var error_message_html = '<label for="'+name+'" class="'+mwConfig.label_classes.join(' ')+'">{{ '+label_name+translate+' }}'+required+'</label>' +
							'<div class="'+mwConfig.div_inner_classes.join(' ')+'">'+
							icon+
							child_element_html+
							additional_help_block+
							'<div class="'+mwConfig.help_block_classes.join(' ')+'" ng-messages="'+form_name+'['+name+'].$error" ng-if="'+form_name+'['+name+'].$touched">'+
							'<div ng-messages-include="messages/tpl"></div>'+
							'</div>'+
							'</div>';
						//overwrite element html
						el.html(error_message_html);

						//remove own directive to prevent cycle
						el.removeAttr("mw-error-message");
						//compile element
						$compile(el)(scope);
					}
				};
			}
		};
	}]);
})(angular);