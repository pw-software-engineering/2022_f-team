function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var styles = {"test":"_styles-module__test__3ybTi"};

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var FormInputComponent = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(FormInputComponent, _React$Component);

  function FormInputComponent(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleValueChange = function (insertedValue) {
      var _this$props = _this.props,
          validationFunc = _this$props.validationFunc,
          onValueChange = _this$props.onValueChange;

      _this.setIsValid(validationFunc(insertedValue));

      onValueChange(insertedValue);
    };

    _this.state = {
      isValid: true
    };
    return _this;
  }

  var _proto = FormInputComponent.prototype;

  _proto.setIsValid = function setIsValid(isValid) {
    this.setState({
      isValid: isValid
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        label = _this$props2.label,
        optional = _this$props2.optional,
        validationText = _this$props2.validationText,
        type = _this$props2.type;
    var isValid = this.state.isValid;
    return React__default.createElement("div", {
      className: 'formInputWrapper'
    }, React__default.createElement("label", null, label, ":", ' ', optional === undefined && React__default.createElement("p", {
      className: 'requiredInput'
    }, "*")), React__default.createElement("input", {
      type: type,
      onChange: function onChange(e) {
        return _this2.handleValueChange(e.target.value);
      }
    }), !isValid && React__default.createElement("p", {
      className: 'validationMessage'
    }, validationText));
  };

  return FormInputComponent;
}(React__default.Component);

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
