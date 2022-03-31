function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var styles = {"test":"_styles-module__test__3ybTi"};

var FormInputComponent = function FormInputComponent(props) {
  var _useState = React.useState(true),
      isValid = _useState[0],
      setIsValid = _useState[1];

  var handleValueChange = function handleValueChange(insertedValue) {
    setIsValid(props.validationFunc(insertedValue));
    props.onValueChange(insertedValue);
  };

  var createAriaLabel = function createAriaLabel() {
    if (props.label.includes(' ')) return props.label.substring(0, props.label.indexOf(' '));
    return props.label;
  };

  return React__default.createElement("div", {
    className: 'formInputWrapper'
  }, React__default.createElement("label", {
    id: createAriaLabel()
  }, props.label, ":", ' ', props.optional === undefined && React__default.createElement("p", {
    className: 'requiredInput'
  }, "*")), React__default.createElement("input", {
    "aria-labelledby": createAriaLabel(),
    type: props.type,
    onChange: function onChange(e) {
      return handleValueChange(e.target.value);
    }
  }), !isValid && React__default.createElement("p", {
    className: 'validationMessage'
  }, props.validationText));
};

var EmailValidator = function EmailValidator(value) {
  var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return value.length > 0 && regex.test(value);
};
var PhoneValidator = function PhoneValidator(value) {
  var regex = /^\+?[0-9]{9,12}$/i;
  return value.replace(' ', '').length > 6 && regex.test(value.replace(' ', ''));
};
var PostalCodeValidator = function PostalCodeValidator(value) {
  var regex = /^[0-9]{2}-[0-9]{3}$/i;
  return regex.test(value);
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
exports.PostalCodeValidator = PostalCodeValidator;
//# sourceMappingURL=index.js.map
