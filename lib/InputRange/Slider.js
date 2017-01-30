/**
 * @module InputRange/Slider
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

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _util = require('./util');

/**
 * Get the owner document of slider
 * @private
 * @param {Slider} slider - React component
 * @return {Document} Document
 */
function getDocument(slider) {
  var ownerDocument = slider.refs.slider.ownerDocument;

  return ownerDocument;
}

/**
 * Get the style of slider based on its props
 * @private
 * @param {Slider} slider - React component
 * @return {Object} CSS styles
 */
function getStyle(slider) {
  var perc = (slider.props.percentage || 0) * 100;
  var style = {
    position: 'absolute',
    left: perc + '%'
  };

  return style;
}

/**
 * Slider React component
 * @class
 * @extends React.Component
 * @param {Object} props - React component props
 */

var Slider = (function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this, props);

    // Auto-bind
    (0, _util.autobind)(['handleClick', 'handleMouseDown', 'handleMouseUp', 'handleMouseMove', 'handleTouchStart', 'handleTouchEnd', 'handleTouchMove', 'handleKeyDown'], this);
  }

  /**
   * Accepted propTypes of Slider
   * @static {Object}
   * @property {Function} ariaLabelledby
   * @property {Function} ariaControls
   * @property {Function} className
   * @property {Function} formatLabel
   * @property {Function} maxValue
   * @property {Function} minValue
   * @property {Function} onSliderKeyDown
   * @property {Function} onSliderMouseMove
   * @property {Function} percentage
   * @property {Function} type
   * @property {Function} value
   */

  /**
   * Handle any click event received by the component
   * @param {SyntheticEvent} event - User event
   */

  _createClass(Slider, [{
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
    }

    /**
     * Handle any mousedown event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      var document = getDocument(this);

      // Event
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Handle any mouseup event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      var document = getDocument(this);

      // Event
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Handle any mousemove event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      this.props.onSliderMouseMove(event, this);
    }

    /**
     * Handle any touchstart event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      var document = getDocument(this);

      event.preventDefault();

      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Handle any touchmove event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      this.props.onSliderMouseMove(event, this);
    }

    /**
     * Handle any touchend event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      var document = getDocument(this);

      event.preventDefault();

      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Handle any keydown event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.props.onSliderKeyDown(event, this);
    }

    /**
     * @param classNames
     * @returns {XML} Component JSX
     */
  }, {
    key: 'getLabel',
    value: function getLabel(classNames) {
      return _react2['default'].createElement(
        _Label2['default'],
        {
          className: classNames.labelValue,
          containerClassName: classNames.labelContainer,
          formatLabel: this.props.formatLabel },
        this.props.value
      );
    }

    /**
     * Render method of the component
     * @return {string} Component JSX
     */
  }, {
    key: 'render',
    value: function render() {
      var classNames = this.props.classNames;
      var style = getStyle(this);

      return _react2['default'].createElement(
        'span',
        {
          className: classNames.sliderContainer,
          ref: 'slider',
          style: style },
        !this.props.showLabelInSlider ? this.getLabel(classNames) : null,
        _react2['default'].createElement(
          'a',
          {
            'aria-labelledby': this.props.ariaLabelledby,
            'aria-controls': this.props.ariaControls,
            'aria-valuemax': this.props.maxValue,
            'aria-valuemin': this.props.minValue,
            'aria-valuenow': this.props.value,
            className: classNames.slider,
            draggable: 'false',
            href: '',
            onClick: this.handleClick,
            onKeyDown: this.handleKeyDown,
            onMouseDown: this.handleMouseDown,
            onTouchStart: this.handleTouchStart,
            role: 'slider' },
          this.props.showLabelInSlider ? this.getLabel(classNames) : null
        )
      );
    }
  }]);

  return Slider;
})(_react2['default'].Component);

exports['default'] = Slider;
Slider.propTypes = {
  ariaLabelledby: _react2['default'].PropTypes.string,
  ariaControls: _react2['default'].PropTypes.string,
  classNames: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.string),
  formatLabel: _react2['default'].PropTypes.func,
  maxValue: _react2['default'].PropTypes.number,
  minValue: _react2['default'].PropTypes.number,
  onSliderKeyDown: _react2['default'].PropTypes.func.isRequired,
  onSliderMouseMove: _react2['default'].PropTypes.func.isRequired,
  percentage: _react2['default'].PropTypes.number.isRequired,
  type: _react2['default'].PropTypes.string.isRequired,
  value: _react2['default'].PropTypes.number.isRequired,
  showLabelInSlider: _react2['default'].PropTypes.bool
};
module.exports = exports['default'];