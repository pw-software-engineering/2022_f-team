import { createElement } from 'react';

var styles = {"test":"_styles-module__test__3ybTi"};

const FormInputComponent = props => {
  const handleValueChange = insertedValue => {
    props.onValueChange(insertedValue);
  };

  return createElement("div", {
    className: 'formInputWrapper'
  }, createElement("label", null, props.label, ":", ' ', props.optional === undefined && createElement("p", {
    className: 'requiredInput'
  }, "*")), createElement("input", {
    type: props.type,
    onChange: e => handleValueChange(e.target.value)
  }));
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
