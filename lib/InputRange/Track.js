/**
 * @module InputRange/Track
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

/**
 * Get the CSS styles for an active track
 * @private
 * @param {Track} track React component
 * @return {Object} CSS styles
 */
function getActiveTrackStyle(track) {
  var props = track.props;

  var width = (props.percentages.max - props.percentages.min) * 100 + '%';
  var left = props.percentages.min * 100 + '%';

  var activeTrackStyle = {
    left: left,
    width: width
  };

  return activeTrackStyle;
}

/**
 * Track React component
 * @class
 * @extends React.Component
 * @param {Object} props - React component props
 */

var Track = (function (_React$Component) {
  _inherits(Track, _React$Component);

  function Track(props) {
    _classCallCheck(this, Track);

    _get(Object.getPrototypeOf(Track.prototype), 'constructor', this).call(this, props);

    // Auto-bind
    (0, _util.autobind)(['handleMouseDown', 'handleTouchStart'], this);
  }

  /**
   * Accepted propTypes of Track
   * @static {Object}
   * @property {Function} children
   * @property {Function} classNames
   * @property {Function} onTrackMouseDown
   * @property {Function} percentages
   */

  /**
   * Return the clientRect of the component
   * @member {ClientRect}
   */

  _createClass(Track, [{
    key: 'handleMouseDown',

    /**
     * Handle any mousedown event received by the component
     * @param {SyntheticEvent} event - User event
     */
    value: function handleMouseDown(event) {
      var trackClientRect = this.clientRect;

      var _ref = event.touches ? event.touches[0] : event;

      var clientX = _ref.clientX;

      var position = {
        x: clientX - trackClientRect.left,
        y: 0
      };

      this.props.onTrackMouseDown(event, this, position);
    }

    /**
     * Handle any touchstart event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      event.preventDefault();

      this.handleMouseDown(event);
    }

    /**
     * Render method of the component
     * @return {string} Component JSX
     */
  }, {
    key: 'render',
    value: function render() {
      var activeTrackStyle = getActiveTrackStyle(this);
      var classNames = this.props.classNames;

      return _react2['default'].createElement(
        'div',
        {
          className: classNames.trackContainer,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          ref: 'track' },
        _react2['default'].createElement('div', {
          style: activeTrackStyle,
          className: classNames.trackActive }),
        this.props.children
      );
    }
  }, {
    key: 'clientRect',
    get: function get() {
      var track = this.refs.track;

      var clientRect = track.getBoundingClientRect();

      return clientRect;
    }
  }]);

  return Track;
})(_react2['default'].Component);

exports['default'] = Track;
Track.propTypes = {
  children: _react2['default'].PropTypes.node,
  classNames: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.string),
  onTrackMouseDown: _react2['default'].PropTypes.func.isRequired,
  percentages: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.number).isRequired
};
module.exports = exports['default'];