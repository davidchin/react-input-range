'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Label;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ignore
 * @param {Object} props
 * @param {InputRangeClassNames} props.classNames
 * @param {Function} props.formatLabel
 * @param {string} props.type
 */
function Label(props) {
  var labelValue = props.formatLabel ? props.formatLabel(props.children, props.type) : props.children;

  return _react2.default.createElement(
    'span',
    { className: props.classNames[props.type + 'Label'] },
    _react2.default.createElement(
      'span',
      { className: props.classNames.labelContainer },
      labelValue
    )
  );
}

/**
 * @type {Object}
 * @property {Function} children
 * @property {Function} classNames
 * @property {Function} formatLabel
 * @property {Function} type
 */
Label.propTypes = {
  children: _react2.default.PropTypes.node.isRequired,
  classNames: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.string).isRequired,
  formatLabel: _react2.default.PropTypes.func,
  type: _react2.default.PropTypes.string.isRequired
};
module.exports = exports['default'];
//# sourceMappingURL=label.js.map