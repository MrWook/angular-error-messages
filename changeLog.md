## version 1.2.5

* fixed interpolation when translate is deactivated inside mw-error-message, to use it now you need to do it like this 'mw-error-message="{{name}}"' for a dynamic label

## version 1.2.4

* fixed interpolation inside the name, use 'name="{{value}}""' for a dynamic name

## version 1.2.3

* add support for interpolation inside the name of a input field if the value of 'name="value"' can be parsed it will used the parsed value as a name

## version 1.2.0

* get form name dynamically
* fixed tooltip translate bug
* add has-error and has-success for dropdown's

## version 1.1.0

* combine add-help, icon and other attriube options in one single attribute mw-error-message-options
* add tooltip support (use ui-bootstrap-tooltip, can be changed to any other tooltip plugin)
* added own input css
* grid system can be now exchanged with another one than bootstrap
