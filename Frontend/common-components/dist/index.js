function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var Button = function Button(_ref) {
  var onClick = _ref.onClick,
      children = _ref.children;
  return React.createElement("button", {
    onClick: onClick,
    style: {
      backgroundColor: '#333'
    }
  }, children);
};

exports.Button = Button;
//# sourceMappingURL=index.js.map
