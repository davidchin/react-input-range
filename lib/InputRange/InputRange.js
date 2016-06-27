/**
 * @module InputRange
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

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _defaultClassNames = require('./defaultClassNames');

var _defaultClassNames2 = _interopRequireDefault(_defaultClassNames);

var _valueTransformer = require('./valueTransformer');

var _valueTransformer2 = _interopRequireDefault(_valueTransformer);

var _util = require('./util');

var _propTypes = require('./propTypes');

/**
 * A map for storing internal members
 * @const {WeakMap}
 */
var internals = new WeakMap();

/**
 * An object storing keyboard key codes
 * @const {Object.<string, number>}
 */
var KeyCode = {
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  UP_ARROW: 38
};

/**
 * Check if values are within the max and min range of inputRange
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Range} values - Min/max value of sliders
 * @return {boolean} True if within range
 */
function isWithinRange(inputRange, values) {
  var props = inputRange.props;

  if (inputRange.isMultiValue) {
    return values.min >= props.minValue && values.max <= props.maxValue && values.min < values.max;
  }

  return values.max >= props.minValue && values.max <= props.maxValue;
}

/**
 * Check if the difference between values and the current values of inputRange
 * is greater or equal to its step amount
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Range} values - Min/max value of sliders
 * @return {boolean} True if difference is greater or equal to step amount
 */
function hasStepDifference(inputRange, values) {
  var props = inputRange.props;

  var currentValues = _valueTransformer2['default'].valuesFromProps(inputRange);

  return (0, _util.length)(values.min, currentValues.min) >= props.step || (0, _util.length)(values.max, currentValues.max) >= props.step;
}

/**
 * Check if inputRange should update with new values
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Range} values - Min/max value of sliders
 * @return {boolean} True if inputRange should update
 */
function shouldUpdate(inputRange, values) {
  return isWithinRange(inputRange, values) && hasStepDifference(inputRange, values);
}

/**
 * Get the owner document of inputRange
 * @private
 * @param {InputRange} inputRange - React component
 * @return {Document} Document
 */
function getDocument(inputRange) {
  var ownerDocument = inputRange.refs.inputRange.ownerDocument;

  return ownerDocument;
}

/**
 * Get the class name(s) of inputRange based on its props
 * @private
 * @param {InputRange} inputRange - React component
 * @return {string} A list of class names delimited with spaces
 */
function getComponentClassName(inputRange) {
  var props = inputRange.props;

  if (!props.disabled) {
    return props.classNames.component;
  }

  return props.classNames.component + ' is-disabled';
}

/**
 * Get the key name of a slider
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Slider} slider - React component
 * @return {string} Key name
 */
function getKeyFromSlider(inputRange, slider) {
  if (slider === inputRange.refs.sliderMin) {
    return 'min';
  }

  return 'max';
}

/**
 * Get all slider keys of inputRange
 * @private
 * @param {InputRange} inputRange - React component
 * @return {Array.<string>} Key names
 */
function getKeys(inputRange) {
  if (inputRange.isMultiValue) {
    return ['min', 'max'];
  }

  return ['max'];
}

/**
 * Get the key name of a slider that's the closest to a point
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Point} position - x/y
 * @return {string} Key name
 */
function getKeyByPosition(inputRange, position) {
  var values = _valueTransformer2['default'].valuesFromProps(inputRange);
  var positions = _valueTransformer2['default'].positionsFromValues(inputRange, values);

  if (inputRange.isMultiValue) {
    var distanceToMin = (0, _util.distanceTo)(position, positions.min);
    var distanceToMax = (0, _util.distanceTo)(position, positions.max);

    if (distanceToMin < distanceToMax) {
      return 'min';
    }
  }

  return 'max';
}

/**
 * Get an array of slider HTML for rendering
 * @private
 * @param {InputRange} inputRange - React component
 * @return {Array.<string>} Array of HTML
 */
function renderSliders(inputRange) {
  var classNames = inputRange.props.classNames;

  var sliders = [];
  var keys = getKeys(inputRange);
  var values = _valueTransformer2['default'].valuesFromProps(inputRange);
  var percentages = _valueTransformer2['default'].percentagesFromValues(inputRange, values);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var value = values[key];
      var percentage = percentages[key];
      var ref = 'slider' + (0, _util.captialize)(key);

      var _inputRange$props = inputRange.props;
      var maxValue = _inputRange$props.maxValue;
      var minValue = _inputRange$props.minValue;

      if (key === 'min') {
        maxValue = values.max;
      } else {
        minValue = values.min;
      }

      var slider = _react2['default'].createElement(_Slider2['default'], {
        ariaLabelledby: inputRange.props.ariaLabelledby,
        ariaControls: inputRange.props.ariaControls,
        classNames: classNames,
        formatLabel: inputRange.formatLabel,
        key: key,
        maxValue: maxValue,
        minValue: minValue,
        onSliderKeyDown: inputRange.handleSliderKeyDown,
        onSliderMouseMove: inputRange.handleSliderMouseMove,
        percentage: percentage,
        ref: ref,
        type: key,
        value: value,
        showLabelInSlider: inputRange.props.showLabelInSlider });

      sliders.push(slider);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return sliders;
}

/**
 * Get an array of hidden input HTML for rendering
 * @private
 * @param {InputRange} inputRange - React component
 * @return {Array.<string>} Array of HTML
 */
function renderHiddenInputs(inputRange) {
  var inputs = [];
  var keys = getKeys(inputRange);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      var _name = inputRange.isMultiValue ? '' + inputRange.props.name + (0, _util.captialize)(key) : inputRange.props.name;

      var input = _react2['default'].createElement('input', { type: 'hidden', name: _name });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return inputs;
}

/**
 * InputRange React component
 * @class
 * @extends React.Component
 * @param {Object} props - React component props
 */

var InputRange = (function (_React$Component) {
  _inherits(InputRange, _React$Component);

  function InputRange(props) {
    _classCallCheck(this, InputRange);

    _get(Object.getPrototypeOf(InputRange.prototype), 'constructor', this).call(this, props);

    // Private
    internals.set(this, {});

    // Auto-bind
    (0, _util.autobind)(['formatLabel', 'handleInteractionEnd', 'handleInteractionStart', 'handleKeyDown', 'handleKeyUp', 'handleMouseDown', 'handleMouseUp', 'handleSliderKeyDown', 'handleSliderMouseMove', 'handleTouchStart', 'handleTouchEnd', 'handleTrackMouseDown'], this);
  }

  /**
   * Accepted propTypes of InputRange
   * @static {Object}
   * @property {Function} ariaLabelledby
   * @property {Function} ariaControls
   * @property {Function} classNames
   * @property {Function} defaultValue
   * @property {Function} disabled
   * @property {Function} formatLabel
   * @property {Function} labelPrefix
   * @property {Function} labelSuffix
   * @property {Function} maxValue
   * @property {Function} minValue
   * @property {Function} name
   * @property {Function} onChange
   * @property {Function} onChangeComplete
   * @property {Function} step
   * @property {Function} value
   */

  /**
   * Return the clientRect of the component's track
   * @member {ClientRect}
   */

  _createClass(InputRange, [{
    key: 'updatePosition',

    /**
     * Update the position of a slider by key
     * @param {string} key - min/max
     * @param {Point} position x/y
     */
    value: function updatePosition(key, position) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var positions = _valueTransformer2['default'].positionsFromValues(this, values);

      positions[key] = position;

      this.updatePositions(positions);
    }

    /**
     * Update the position of sliders
     * @param {Object} positions
     * @param {Point} positions.min
     * @param {Point} positions.max
     */
  }, {
    key: 'updatePositions',
    value: function updatePositions(positions) {
      var values = {
        min: _valueTransformer2['default'].valueFromPosition(this, positions.min),
        max: _valueTransformer2['default'].valueFromPosition(this, positions.max)
      };

      var transformedValues = {
        min: _valueTransformer2['default'].stepValueFromValue(this, values.min),
        max: _valueTransformer2['default'].stepValueFromValue(this, values.max)
      };

      this.updateValues(transformedValues);
    }

    /**
     * Update the value of a slider by key
     * @param {string} key - max/min
     * @param {number} value - New value
     */
  }, {
    key: 'updateValue',
    value: function updateValue(key, value) {
      var values = _valueTransformer2['default'].valuesFromProps(this);

      values[key] = value;

      this.updateValues(values);
    }

    /**
     * Update the values of all sliders
     * @param {Object|number} values - Object if multi-value, number if single-value
     */
  }, {
    key: 'updateValues',
    value: function updateValues(values) {
      if (!shouldUpdate(this, values)) {
        return;
      }

      if (this.isMultiValue) {
        this.props.onChange(this, values);
      } else {
        this.props.onChange(this, values.max);
      }
    }

    /**
     * Increment the value of a slider by key name
     * @param {string} key - max/min
     */
  }, {
    key: 'incrementValue',
    value: function incrementValue(key) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var value = values[key] + this.props.step;

      this.updateValue(key, value);
    }

    /**
     * Decrement the value of a slider by key name
     * @param {string} key - max/min
     */
  }, {
    key: 'decrementValue',
    value: function decrementValue(key) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var value = values[key] - this.props.step;

      this.updateValue(key, value);
    }

    /**
     * Format label
     * @param {number} labelValue - Label value
     * @return {string} Formatted label value
     */
  }, {
    key: 'formatLabel',
    value: function formatLabel(labelValue) {
      var _props = this.props;
      var formatLabel = _props.formatLabel;
      var labelPrefix = _props.labelPrefix;
      var labelSuffix = _props.labelSuffix;

      if (formatLabel) {
        return formatLabel(labelValue, { labelPrefix: labelPrefix, labelSuffix: labelSuffix });
      }

      return '' + labelPrefix + labelValue + labelSuffix;
    }

    /**
     * Handle any mousemove event received by the slider
     * @param {SyntheticEvent} event - User event
     * @param {Slider} slider - React component
     */
  }, {
    key: 'handleSliderMouseMove',
    value: function handleSliderMouseMove(event, slider) {
      if (this.props.disabled) {
        return;
      }

      var key = getKeyFromSlider(this, slider);
      var position = _valueTransformer2['default'].positionFromEvent(this, event);

      this.updatePosition(key, position);
    }

    /**
     * Handle any keydown event received by the slider
     * @param {SyntheticEvent} event - User event
     * @param {Slider} slider - React component
     */
  }, {
    key: 'handleSliderKeyDown',
    value: function handleSliderKeyDown(event, slider) {
      if (this.props.disabled) {
        return;
      }

      var key = getKeyFromSlider(this, slider);

      switch (event.keyCode) {
        case KeyCode.LEFT_ARROW:
        case KeyCode.DOWN_ARROW:
          event.preventDefault();
          this.decrementValue(key);
          break;

        case KeyCode.RIGHT_ARROW:
        case KeyCode.UP_ARROW:
          event.preventDefault();
          this.incrementValue(key);
          break;

        default:
          break;
      }
    }

    /**
     * Handle any mousedown event received by the track
     * @param {SyntheticEvent} event - User event
     * @param {Slider} slider - React component
     * @param {Point} position - Mousedown position
     */
  }, {
    key: 'handleTrackMouseDown',
    value: function handleTrackMouseDown(event, track, position) {
      if (this.props.disabled) {
        return;
      }

      event.preventDefault();

      var key = getKeyByPosition(this, position);

      this.updatePosition(key, position);
    }

    /**
     * Handle the start of any user-triggered event
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleInteractionStart',
    value: function handleInteractionStart() {
      var _this = internals.get(this);

      if (!this.props.onChangeComplete || (0, _util.isDefined)(_this.startValue)) {
        return;
      }

      _this.startValue = this.props.value;
    }

    /**
     * Handle the end of any user-triggered event
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleInteractionEnd',
    value: function handleInteractionEnd() {
      var _this = internals.get(this);

      if (!this.props.onChangeComplete || !(0, _util.isDefined)(_this.startValue)) {
        return;
      }

      if (_this.startValue !== this.props.value) {
        this.props.onChangeComplete(this, this.props.value);
      }

      _this.startValue = null;
    }

    /**
     * Handle any keydown event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.handleInteractionStart(event);
    }

    /**
     * Handle any keyup event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(event) {
      this.handleInteractionEnd(event);
    }

    /**
     * Handle any mousedown event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var document = getDocument(this);

      this.handleInteractionStart(event);

      document.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Handle any mouseup event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      var document = getDocument(this);

      this.handleInteractionEnd(event);

      document.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Handle any touchstart event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      var document = getDocument(this);

      this.handleInteractionStart(event);

      document.addEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Handle any touchend event received by the component
     * @param {SyntheticEvent} event - User event
     */
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      var document = getDocument(this);

      this.handleInteractionEnd(event);

      document.removeEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Render method of the component
     * @return {string} Component JSX
     */
  }, {
    key: 'render',
    value: function render() {
      var classNames = this.props.classNames;

      var componentClassName = getComponentClassName(this);
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var percentages = _valueTransformer2['default'].percentagesFromValues(this, values);

      return _react2['default'].createElement(
        'div',
        {
          'aria-disabled': this.props.disabled,
          ref: 'inputRange',
          className: componentClassName,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart },
        _react2['default'].createElement(
          _Label2['default'],
          {
            className: classNames.labelMin,
            containerClassName: classNames.labelContainer,
            formatLabel: this.formatLabel },
          this.props.minValue
        ),
        _react2['default'].createElement(
          _Track2['default'],
          {
            classNames: classNames,
            ref: 'track',
            percentages: percentages,
            onTrackMouseDown: this.handleTrackMouseDown },
          renderSliders(this)
        ),
        _react2['default'].createElement(
          _Label2['default'],
          {
            className: classNames.labelMax,
            containerClassName: classNames.labelContainer,
            formatLabel: this.formatLabel },
          this.props.maxValue
        ),
        renderHiddenInputs(this)
      );
    }
  }, {
    key: 'trackClientRect',
    get: function get() {
      var track = this.refs.track;

      if (track) {
        return track.clientRect;
      }

      return {
        height: 0,
        left: 0,
        top: 0,
        width: 0
      };
    }

    /**
     * Return true if the component accepts a range of values
     * @member {boolean}
     */
  }, {
    key: 'isMultiValue',
    get: function get() {
      return (0, _util.isObject)(this.props.value) || (0, _util.isObject)(this.props.defaultValue);
    }
  }]);

  return InputRange;
})(_react2['default'].Component);

exports['default'] = InputRange;
InputRange.propTypes = {
  ariaLabelledby: _react2['default'].PropTypes.string,
  ariaControls: _react2['default'].PropTypes.string,
  classNames: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.string),
  defaultValue: _propTypes.maxMinValuePropType,
  disabled: _react2['default'].PropTypes.bool,
  formatLabel: _react2['default'].PropTypes.func,
  labelPrefix: _react2['default'].PropTypes.string,
  labelSuffix: _react2['default'].PropTypes.string,
  maxValue: _propTypes.maxMinValuePropType,
  minValue: _propTypes.maxMinValuePropType,
  name: _react2['default'].PropTypes.string,
  onChange: _react2['default'].PropTypes.func.isRequired,
  onChangeComplete: _react2['default'].PropTypes.func,
  step: _react2['default'].PropTypes.number,
  value: _propTypes.maxMinValuePropType,
  showLabelInSlider: _react2['default'].PropTypes.bool
};

/**
 * Default props of InputRange
 * @static {Object}
 * @property {Object.<string, string>} defaultClassNames
 * @property {Range|number} defaultValue
 * @property {boolean} disabled
 * @property {string} labelPrefix
 * @property {string} labelSuffix
 * @property {number} maxValue
 * @property {number} minValue
 * @property {number} step
 * @property {Range|number} value
 */
InputRange.defaultProps = {
  classNames: _defaultClassNames2['default'],
  defaultValue: 0,
  disabled: false,
  labelPrefix: '',
  labelSuffix: '',
  maxValue: 10,
  minValue: 0,
  step: 1,
  value: null,
  showLabelInSlider: false
};
module.exports = exports['default'];