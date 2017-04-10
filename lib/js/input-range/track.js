'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * @ignore
 */
var Track = (_class = function (_React$Component) {
  _inherits(Track, _React$Component);

  _createClass(Track, null, [{
    key: 'propTypes',

    /**
     * @override
     * @return {Object}
     * @property {Function} children
     * @property {Function} classNames
     * @property {Function} onTrackMouseDown
     * @property {Function} percentages
     */
    get: function get() {
      return {
        children: _react2.default.PropTypes.node.isRequired,
        classNames: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.string).isRequired,
        onTrackMouseDown: _react2.default.PropTypes.func.isRequired,
        percentages: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.number).isRequired,
        isExternal: _react2.default.PropTypes.bool.isRequired
      };
    }

    /**
     * @param {Object} props
     * @param {InputRangeClassNames} props.classNames
     * @param {Function} props.onTrackMouseDown
     * @param {number} props.percentages
     */

  }]);

  function Track(props) {
    _classCallCheck(this, Track);

    /**
     * @private
     * @type {?Component}
     */
    var _this = _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).call(this, props));

    _this.node = null;
    return _this;
  }

  /**
   * @private
   * @return {ClientRect}
   */


  _createClass(Track, [{
    key: 'getClientRect',
    value: function getClientRect() {
      return this.node.getBoundingClientRect();
    }

    /**
     * @private
     * @return {Object} CSS styles
     */

  }, {
    key: 'getActiveTrackStyle',
    value: function getActiveTrackStyle() {
      var width = (this.props.percentages.max - this.props.percentages.min) * 100 + '%';
      var left = this.props.percentages.min * 100 + '%';

      return { left: left, width: width };
    }

    /**
     * @private
     * @return {Object} CSS styles
     */

  }, {
    key: 'getActiveTrackStylePre',
    value: function getActiveTrackStylePre() {
      var width = this.props.percentages.min * 100 + '%';
      var left = '0';
      var float = 'left';
      return { left: left, width: width, float: float };
    }

    /**
     * @private
     * @return {Object} CSS styles
     */

  }, {
    key: 'getActiveTrackStylePost',
    value: function getActiveTrackStylePost() {
      var width = (1 - this.props.percentages.max) * 100 + '%';
      var left = this.props.percentages.max * 100 + '%';

      return { left: left, width: width };
    }

    /**
     * @private
     * @param {SyntheticEvent} event - User event
     */

  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var clientX = event.touches ? event.touches[0].clientX : event.clientX;
      var trackClientRect = this.getClientRect();
      var position = {
        x: clientX - trackClientRect.left,
        y: 0
      };

      this.props.onTrackMouseDown(event, position);
    }

    /**
     * @private
     * @param {SyntheticEvent} event - User event
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      event.preventDefault();

      this.handleMouseDown(event);
    }

    /**
     * @override
     * @return {JSX.Element}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var activeTrackStyle = this.getActiveTrackStyle();
      var activeTrackStyleExternalPre = this.getActiveTrackStylePre();
      var activeTrackStyleExternalPost = this.getActiveTrackStylePost();

      return _react2.default.createElement(
        'div',
        {
          className: this.props.classNames.track,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          ref: function ref(node) {
            _this2.node = node;
          } },
        !this.props.isExternal ? _react2.default.createElement('div', {
          style: activeTrackStyle,
          className: this.props.classNames.activeTrack }) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', {
            style: activeTrackStyleExternalPre,
            className: this.props.classNames.activeTrack }),
          _react2.default.createElement('div', {
            style: activeTrackStyleExternalPost,
            className: this.props.classNames.activeTrack })
        ),
        this.props.children
      );
    }
  }]);

  return Track;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'getActiveTrackStylePre', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'getActiveTrackStylePre'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getActiveTrackStylePost', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'getActiveTrackStylePost'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchStart'), _class.prototype)), _class);
exports.default = Track;
module.exports = exports['default'];
//# sourceMappingURL=track.js.map