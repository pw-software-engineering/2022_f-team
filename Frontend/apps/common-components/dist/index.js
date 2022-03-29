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

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return React.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

exports.ExampleComponent = ExampleComponent;
exports.FormInputComponent = FormInputComponent;
//# sourceMappingURL=index.js.map
