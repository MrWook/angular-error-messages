# mw-error-messages

mw-error-messages is an AngularJS module that wrap the ngMessage into a easy to use directive for error validation. It has several features like an icon in the input field or to show that a field is valid and invalid.

##Requirements (tested in)
- Angular (v1.5.8)
- NgMessages (v1.5.8)
- Bootstrap (v3.3.7)
- FontAwsome (4.3.0) or another font if you want to use icons


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
    

The directive add everything necessary into the div.

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

icon, succes and addtional_help_block can also be used in the html with:
```html
<div mw-error-message="CTRLSYSTEM_" mw-error-message-icon="true" mw-error-message-success="true" mw-error-message-add-help="<span>hi</span>">
    <input title="" type="text" name="test" ng-model="model.test" class="form-control" required/>
</div>
```

If you want to use other Font icons just override:
```css
.has-success .wm_error_message_icon:after{
	content: "\f00c";
}
.has-error .wm_error_message_icon:after{
	content: "\f00d";
}
```

If you want to use more message or change the content of the default message:
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
- [ ] nodejs, bower, gulp, support
- [ ] fix spelling, grammar mistakes
