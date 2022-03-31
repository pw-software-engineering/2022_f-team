import React__default, { useState, createElement } from 'react';

var styles = {"test":"_styles-module__test__3ybTi"};

const FormInputComponent = props => {
  const [isValid, setIsValid] = useState(true);

  const handleValueChange = insertedValue => {
    const {
      onValueChange,
      validationFunc
    } = props;
    setIsValid(validationFunc(insertedValue));
    onValueChange(insertedValue);
  };

  const createAriaLabel = () => {
    const {
      label
    } = props;
    if (label.includes(' ')) return label.substring(0, label.indexOf(' '));
    return label;
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
    onChange: e => handleValueChange(e.target.value)
  }), !isValid && React__default.createElement("p", {
    className: 'validationMessage'
  }, props.validationText));
};

const EmailValidator = value => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return value.length > 0 && regex.test(value);
};
const PhoneValidator = value => {
  const regex = /^\+?[0-9]{9,12}$/i;
  return value.replace(' ', '').length > 6 && regex.test(value.replace(' ', ''));
};
const PostalCodeValidator = value => {
  const regex = /^[0-9]{2}-[0-9]{3}$/i;
  return regex.test(value);
};

const SubmitButton = props => {
  return React__default.createElement("button", {
    disabled: !props.validateForm(),
    onClick: e => props.action(e)
  }, props.text);
};

const ExampleComponent = ({
  text
}) => {
  return createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { EmailValidator, ExampleComponent, FormInputComponent, PhoneValidator, PostalCodeValidator, SubmitButton };
//# sourceMappingURL=index.modern.js.map
