var React = require('react');

var styles = {"test":"_styles-module__test__3ybTi"};

var FormInputComponent = function FormInputComponent(props) {
  var handleValueChange = function handleValueChange(insertedValue) {
    props.onValueChange(insertedValue);
  };

  return React.createElement("div", {
    className: 'formInputWrapper'
  }, React.createElement("label", null, props.label, ":", ' ', props.optional === undefined && React.createElement("p", {
    className: 'requiredInput'
  }, "*")), React.createElement("input", {
    type: props.type,
    onChange: function onChange(e) {
      return handleValueChange(e.target.value);
    }
  }));
};

var EmailValidator = function EmailValidator(value) {
  var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return value.length > 0 && regex.test(value);
};
var PhoneValidator = function PhoneValidator(value) {
  var regex = /^\+?[0-9]{9,12}$/i;
  return value.replaceAll(' ', '').length > 6 && regex.test(value.replaceAll(' ', ''));
};

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return React.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

exports.EmailValidator = EmailValidator;
exports.ExampleComponent = ExampleComponent;
exports.FormInputComponent = FormInputComponent;
exports.PhoneValidator = PhoneValidator;
//# sourceMappingURL=index.js.map
