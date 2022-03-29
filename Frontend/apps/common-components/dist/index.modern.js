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

const ExampleComponent = ({
  text
}) => {
  return createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { ExampleComponent, FormInputComponent };
//# sourceMappingURL=index.modern.js.map
