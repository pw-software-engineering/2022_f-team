import React__default, { createElement } from 'react';

var styles = {"test":"_styles-module__test__3ybTi"};

class FormInputComponent extends React__default.Component {
  constructor(props) {
    super(props);

    this.handleValueChange = insertedValue => {
      const {
        validationFunc,
        onValueChange
      } = this.props;
      this.setIsValid(validationFunc(insertedValue));
      onValueChange(insertedValue);
    };

    this.state = {
      isValid: true
    };
  }

  setIsValid(isValid) {
    this.setState({
      isValid: isValid
    });
  }

  render() {
    const {
      label,
      optional,
      validationText,
      type
    } = this.props;
    const {
      isValid
    } = this.state;
    return React__default.createElement("div", {
      className: 'formInputWrapper'
    }, React__default.createElement("label", null, label, ":", ' ', optional === undefined && React__default.createElement("p", {
      className: 'requiredInput'
    }, "*")), React__default.createElement("input", {
      type: type,
      onChange: e => this.handleValueChange(e.target.value)
    }), !isValid && React__default.createElement("p", {
      className: 'validationMessage'
    }, validationText));
  }

}

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
