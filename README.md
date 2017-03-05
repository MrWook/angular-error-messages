# mw-error-messages

mw-error-messages is an AngularJS module that wrap the ngMessage into a easy to use directive for error validation. It has several features like an icon in the input field or to show that a field is valid and invalid.

##Requirements (tested in)
- Angular (v1.5.8)
- NgMessages (v1.5.8)
- Bootstrap (v3.3.7) used as default grid system
- (Optional) FontAwsome (4.3.0) or another font if you want to use icons
- (Optional) ui-bootstrap (1.3.3) or another library with a tooltip directive

## Install

You can install this package either with `npm` or with `bower`.

### npm

```shell
npm install mw-error-messages --save
```

### bower

```shell
bower install mw-error-messages
```

##Usage

Once the script is included in your html file, simply include the module in your app:
```javascript
angular.module('myApp', ['ngMessages', 'mw-error-message']);
```
    

And use the included 'mwErrorMessage' directive thusly:
```html
<div mw-error-message="CTRLSYSTEM_">
    <input title="" type="text" name="test" ng-model="model.test" class="form-control" required/>
</div>
```
    

The content of mw-error-message is used as the label or if you use a translation directive its used as a prefix combined with the name of the input field.
In this example the marker would be 'CTRLSYSTEM_TEST'.

If you use the required attribute, a '*' will be placed behind the label to mark this field as required. This also works with ng-required.


##Config

Name                    | Type      | Description
----------------------- | --------- | ------------
icon                    | boolean   | Use icons or not
icon_template           | string    | Define the icon template
success                 | boolean   | Show success or not
label_classes           | array     | Set label classes
div_inner_classes       | array     | Set inner div classes
div_outer_classes       | array     | Set additional outer div classes
help_block_classes      | array     | Set help block classes
additional_help_block   | string    | Template for addtional help block
messages                | array     | Associative array. Key field are the "when directive" value is the message.
translate               | boolean   | Should the translate filter be used

icon, success and addtional_help_block can be changed in the html like:
```html
<div mw-error-message="CTRLSYSTEM_" mw-error-message-options="mwOptions">
    <input title="" type="text" name="test" ng-model="model.test" required/>
</div>
```
```js
$scope.mwOptions = {
    icon: true,
    tooltip: true,
    success: true,
    addHelp: '<span>Additional Help block</span>'
};
```
If you want to use other Font icons just override this:
```css
.has-success .wm_error_message_icon:after{
	content: "\f00c";
}
.has-error .wm_error_message_icon:after{
	content: "\f00d";
}
```

If you want to use more messages or change the content of the default message:
```js
// override default message
mwConfig.messages['required'] = 'This field is required';
//add a new message
mwConfig.messages['birthday'] = 'You need to be 18 years old.';
```

##Demo

<a href='https://plnkr.co/edit/ZF3fAjkD5MRiWMViNnId?p=preview' target='_blank'>View demo on Plunker</a>


##Tasklist 
- [ ] add more examples
- [ ] add documentation
- [X] nodejs, bower support
- [ ] fix spelling, grammar mistakes
