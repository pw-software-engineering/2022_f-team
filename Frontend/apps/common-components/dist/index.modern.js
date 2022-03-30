import React__default, { useState, createElement } from 'react';

var styles = {"test":"_styles-module__test__3ybTi"};

const FormInputComponent = props => {
  const [isValid, setIsValid] = useState(true);

  const handleValueChange = insertedValue => {
    setIsValid(false);
    props.onValueChange(insertedValue);
  };

  return React__default.createElement("div", {
    className: 'formInputWrapper'
  }, React__default.createElement("label", null, props.label, ":", ' ', props.optional === undefined && React__default.createElement("p", {
    className: 'requiredInput'
  }, "*")), React__default.createElement("input", {
    type: props.type,
    onChange: e => handleValueChange(e.target.value)
  }), React__default.createElement("p", null, isValid));
};

const EmailValidator = value => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return value.length > 0 && regex.test(value);
};
const PhoneValidator = value => {
  const regex = /^\+?[0-9]{9,12}$/i;
  return value.replaceAll(' ', '').length > 6 && regex.test(value.replaceAll(' ', ''));
};

const ExampleComponent = ({
  text
}) => {
  return createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { EmailValidator, ExampleComponent, FormInputComponent, PhoneValidator };
//# sourceMappingURL=index.modern.js.map
