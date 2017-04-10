(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["InputRange"] = factory(require("react"));
	else
		root["InputRange"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _captialize = __webpack_require__(14);

Object.defineProperty(exports, 'captialize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_captialize).default;
  }
});

var _clamp = __webpack_require__(15);

Object.defineProperty(exports, 'clamp', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_clamp).default;
  }
});

var _distanceTo = __webpack_require__(16);

Object.defineProperty(exports, 'distanceTo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_distanceTo).default;
  }
});

var _isDefined = __webpack_require__(17);

Object.defineProperty(exports, 'isDefined', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isDefined).default;
  }
});

var _isNumber = __webpack_require__(18);

Object.defineProperty(exports, 'isNumber', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isNumber).default;
  }
});

var _isObject = __webpack_require__(19);

Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isObject).default;
  }
});

var _length = __webpack_require__(20);

Object.defineProperty(exports, 'length', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_length).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 *
 * The decorator may be used on classes or methods
 * ```
 * @autobind
 * class FullBound {}
 *
 * class PartBound {
 *   @autobind
 *   method () {}
 * }
 * ```
 */


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = autobind;

function autobind() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 1) {
    return boundClass.apply(undefined, args);
  } else {
    return boundMethod.apply(undefined, args);
  }
}

/**
 * Use boundMethod to bind all methods on the target.prototype
 */
function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys = undefined;
  // Use Reflect if exists
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype);
    // use symbols if support is provided
    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error('@autobind decorator can only be applied to methods not: ' + typeof fn);
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.
  var definingProperty = false;

  return {
    configurable: true,
    get: function get() {
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      definingProperty = false;
      return boundFn;
    }
  };
}
module.exports = exports['default'];


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Label;

var _react = __webpack_require__(1);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inputRange = __webpack_require__(7);

Object.defineProperty(exports, 'InputRange', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_inputRange).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inputRange = __webpack_require__(4);

/**
 * @ignore
 * @typedef {Object} ClientRect
 * @property {number} height
 * @property {number} left
 * @property {number} top
 * @property {number} width
 */

/**
 * @typedef {Object} InputRangeClassNames
 * @property {string} activeTrack
 * @property {string} disabledInputRange
 * @property {string} inputRange
 * @property {string} labelContainer
 * @property {string} maxLabel
 * @property {string} minLabel
 * @property {string} slider
 * @property {string} sliderContainer
 * @property {string} track
 * @property {string} valueLabel
 */

/**
 * @typedef {Function} LabelFormatter
 * @param {number} value
 * @param {string} type
 * @return {string}
 */

/**
 * @ignore
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Range
 * @property {number} min - Min value
 * @property {number} max - Max value
 */

exports.default = _inputRange.InputRange;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Default CSS class names
* @ignore
* @type {InputRangeClassNames}
*/
var DEFAULT_CLASS_NAMES = {
  activeTrack: 'input-range__track input-range__track--active',
  disabledInputRange: 'input-range input-range--disabled',
  inputRange: 'input-range',
  labelContainer: 'input-range__label-container',
  maxLabel: 'input-range__label input-range__label--max',
  minLabel: 'input-range__label input-range__label--min',
  slider: 'input-range__slider',
  sliderContainer: 'input-range__slider-container',
  track: 'input-range__track input-range__track--background',
  valueLabel: 'input-range__label input-range__label--value'
};

exports.default = DEFAULT_CLASS_NAMES;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = __webpack_require__(2);

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _valueTransformer = __webpack_require__(13);

var valueTransformer = _interopRequireWildcard(_valueTransformer);

var _defaultClassNames = __webpack_require__(6);

var _defaultClassNames2 = _interopRequireDefault(_defaultClassNames);

var _label = __webpack_require__(3);

var _label2 = _interopRequireDefault(_label);

var _rangePropType = __webpack_require__(9);

var _rangePropType2 = _interopRequireDefault(_rangePropType);

var _valuePropType = __webpack_require__(12);

var _valuePropType2 = _interopRequireDefault(_valuePropType);

var _slider = __webpack_require__(10);

var _slider2 = _interopRequireDefault(_slider);

var _track = __webpack_require__(11);

var _track2 = _interopRequireDefault(_track);

var _utils = __webpack_require__(0);

var _keyCodes = __webpack_require__(8);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
 * A React component that allows users to input numeric values within a range
 * by dragging its sliders.
 */
var InputRange = (_class = function (_React$Component) {
  _inherits(InputRange, _React$Component);

  _createClass(InputRange, null, [{
    key: 'propTypes',

    /**
     * @ignore
     * @override
     * @return {Object}
     */
    get: function get() {
      return {
        ariaLabelledby: _react2.default.PropTypes.string,
        ariaControls: _react2.default.PropTypes.string,
        classNames: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.string),
        disabled: _react2.default.PropTypes.bool,
        formatLabel: _react2.default.PropTypes.func,
        isExternal: _react2.default.PropTypes.bool,
        maxValue: _rangePropType2.default,
        minValue: _rangePropType2.default,
        name: _react2.default.PropTypes.string,
        onChangeStart: _react2.default.PropTypes.func,
        onChange: _react2.default.PropTypes.func.isRequired,
        onChangeComplete: _react2.default.PropTypes.func,
        step: _react2.default.PropTypes.number,
        value: _valuePropType2.default
      };
    }

    /**
     * @ignore
     * @override
     * @return {Object}
     */

  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        classNames: _defaultClassNames2.default,
        disabled: false,
        maxValue: 10,
        minValue: 0,
        step: 1,
        isExternal: false
      };
    }

    /**
     * @param {Object} props
     * @param {string} [props.ariaLabelledby]
     * @param {string} [props.ariaControls]
     * @param {InputRangeClassNames} [props.classNames]
     * @param {boolean} [props.disabled = false]
     * @param {Function} [props.formatLabel]
     * @param {number|Range} [props.maxValue = 10]
     * @param {number|Range} [props.minValue = 0]
     * @param {string} [props.name]
     * @param {string} props.onChange
     * @param {Function} [props.onChangeComplete]
     * @param {Function} [props.onChangeStart]
     * @param {number} [props.step = 1]
     * @param {number|Range} props.value
     */

  }]);

  function InputRange(props) {
    _classCallCheck(this, InputRange);

    /**
     * @private
     * @type {?number}
     */
    var _this = _possibleConstructorReturn(this, (InputRange.__proto__ || Object.getPrototypeOf(InputRange)).call(this, props));

    _this.startValue = null;

    /**
     * @private
     * @type {?Component}
     */
    _this.node = null;

    /**
     * @private
     * @type {?Component}
     */
    _this.trackNode = null;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @return {void}
   */


  _createClass(InputRange, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeDocumentMouseUpListener();
      this.removeDocumentTouchEndListener();
    }

    /**
     * Return the CSS class name of the component
     * @private
     * @return {string}
     */

  }, {
    key: 'getComponentClassName',
    value: function getComponentClassName() {
      if (!this.props.disabled) {
        return this.props.classNames.inputRange;
      }

      return this.props.classNames.disabledInputRange;
    }

    /**
     * Return the bounding rect of the track
     * @private
     * @return {ClientRect}
     */

  }, {
    key: 'getTrackClientRect',
    value: function getTrackClientRect() {
      return this.trackNode.getClientRect();
    }

    /**
     * Return the slider key closest to a point
     * @private
     * @param {Point} position
     * @return {string}
     */

  }, {
    key: 'getKeyByPosition',
    value: function getKeyByPosition(position) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

      if (this.isMultiValue()) {
        var distanceToMin = (0, _utils.distanceTo)(position, positions.min);
        var distanceToMax = (0, _utils.distanceTo)(position, positions.max);

        if (distanceToMin < distanceToMax) {
          return 'min';
        }
      }

      return 'max';
    }

    /**
     * Return all the slider keys
     * @private
     * @return {string[]}
     */

  }, {
    key: 'getKeys',
    value: function getKeys() {
      if (this.isMultiValue()) {
        return ['min', 'max'];
      }

      return ['max'];
    }

    /**
     * Return true if the difference between the new and the current value is
     * greater or equal to the step amount of the component
     * @private
     * @param {Range} values
     * @return {boolean}
     */

  }, {
    key: 'hasStepDifference',
    value: function hasStepDifference(values) {
      var currentValues = valueTransformer.getValueFromProps(this.props, this.isMultiValue());

      return (0, _utils.length)(values.min, currentValues.min) >= this.props.step || (0, _utils.length)(values.max, currentValues.max) >= this.props.step;
    }

    /**
     * Return true if the component accepts a min and max value
     * @private
     * @return {boolean}
     */

  }, {
    key: 'isMultiValue',
    value: function isMultiValue() {
      return (0, _utils.isObject)(this.props.value);
    }

    /**
     * Return true if the range is within the max and min value of the component
     * @private
     * @param {Range} values
     * @return {boolean}
     */

  }, {
    key: 'isWithinRange',
    value: function isWithinRange(values) {
      if (this.isMultiValue()) {
        return values.min >= this.props.minValue && values.max <= this.props.maxValue && values.min < values.max;
      }

      return values.max >= this.props.minValue && values.max <= this.props.maxValue;
    }

    /**
     * Return true if the new value should trigger a render
     * @private
     * @param {Range} values
     * @return {boolean}
     */

  }, {
    key: 'shouldUpdate',
    value: function shouldUpdate(values) {
      return this.isWithinRange(values) && this.hasStepDifference(values);
    }

    /**
     * Update the position of a slider
     * @private
     * @param {string} key
     * @param {Point} position
     * @return {void}
     */

  }, {
    key: 'updatePosition',
    value: function updatePosition(key, position) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

      positions[key] = position;

      this.updatePositions(positions);
    }

    /**
     * Update the positions of multiple sliders
     * @private
     * @param {Object} positions
     * @param {Point} positions.min
     * @param {Point} positions.max
     * @return {void}
     */

  }, {
    key: 'updatePositions',
    value: function updatePositions(positions) {
      var values = {
        min: valueTransformer.getValueFromPosition(positions.min, this.props.minValue, this.props.maxValue, this.getTrackClientRect()),
        max: valueTransformer.getValueFromPosition(positions.max, this.props.minValue, this.props.maxValue, this.getTrackClientRect())
      };

      var transformedValues = {
        min: valueTransformer.getStepValueFromValue(values.min, this.props.step),
        max: valueTransformer.getStepValueFromValue(values.max, this.props.step)
      };

      this.updateValues(transformedValues);
    }

    /**
     * Update the value of a slider
     * @private
     * @param {string} key
     * @param {number} value
     * @return {void}
     */

  }, {
    key: 'updateValue',
    value: function updateValue(key, value) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());

      values[key] = value;

      this.updateValues(values);
    }

    /**
     * Update the values of multiple sliders
     * @private
     * @param {Range|number} values
     * @return {void}
     */

  }, {
    key: 'updateValues',
    value: function updateValues(values) {
      if (!this.shouldUpdate(values)) {
        return;
      }

      this.props.onChange(this.isMultiValue() ? values : values.max);
    }

    /**
     * Increment the value of a slider by key name
     * @private
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'incrementValue',
    value: function incrementValue(key) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var value = values[key] + this.props.step;

      this.updateValue(key, value);
    }

    /**
     * Decrement the value of a slider by key name
     * @private
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'decrementValue',
    value: function decrementValue(key) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var value = values[key] - this.props.step;

      this.updateValue(key, value);
    }

    /**
     * Listen to mouseup event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentMouseUpListener',
    value: function addDocumentMouseUpListener() {
      this.removeDocumentMouseUpListener();
      this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Listen to touchend event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentTouchEndListener',
    value: function addDocumentTouchEndListener() {
      this.removeDocumentTouchEndListener();
      this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Stop listening to mouseup event
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentMouseUpListener',
    value: function removeDocumentMouseUpListener() {
      this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Stop listening to touchend event
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentTouchEndListener',
    value: function removeDocumentTouchEndListener() {
      this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Handle any "mousemove" event received by the slider
     * @private
     * @param {SyntheticEvent} event
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'handleSliderDrag',
    value: function handleSliderDrag(event, key) {
      var _this2 = this;

      if (this.props.disabled) {
        return;
      }

      var position = valueTransformer.getPositionFromEvent(event, this.getTrackClientRect());

      requestAnimationFrame(function () {
        return _this2.updatePosition(key, position);
      });
    }

    /**
     * Handle any "keydown" event received by the slider
     * @private
     * @param {SyntheticEvent} event
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'handleSliderKeyDown',
    value: function handleSliderKeyDown(event, key) {
      if (this.props.disabled) {
        return;
      }

      switch (event.keyCode) {
        case _keyCodes.LEFT_ARROW:
        case _keyCodes.DOWN_ARROW:
          event.preventDefault();
          this.decrementValue(key);
          break;

        case _keyCodes.RIGHT_ARROW:
        case _keyCodes.UP_ARROW:
          event.preventDefault();
          this.incrementValue(key);
          break;

        default:
          break;
      }
    }

    /**
     * Handle any "mousedown" event received by the track
     * @private
     * @param {SyntheticEvent} event
     * @param {Point} position
     * @return {void}
     */

  }, {
    key: 'handleTrackMouseDown',
    value: function handleTrackMouseDown(event, position) {
      if (this.props.disabled) {
        return;
      }

      event.preventDefault();

      this.updatePosition(this.getKeyByPosition(position), position);
    }

    /**
     * Handle the start of any mouse/touch event
     * @private
     * @return {void}
     */

  }, {
    key: 'handleInteractionStart',
    value: function handleInteractionStart() {
      if (this.props.onChangeStart) {
        this.props.onChangeStart(this.props.value);
      }

      if (this.props.onChangeComplete && !(0, _utils.isDefined)(this.startValue)) {
        this.startValue = this.props.value;
      }
    }

    /**
     * Handle the end of any mouse/touch event
     * @private
     * @return {void}
     */

  }, {
    key: 'handleInteractionEnd',
    value: function handleInteractionEnd() {
      if (!this.props.onChangeComplete || !(0, _utils.isDefined)(this.startValue)) {
        return;
      }

      if (this.startValue !== this.props.value) {
        this.props.onChangeComplete(this.props.value);
      }

      this.startValue = null;
    }

    /**
     * Handle any "keydown" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.handleInteractionStart(event);
    }

    /**
     * Handle any "keyup" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(event) {
      this.handleInteractionEnd(event);
    }

    /**
     * Handle any "mousedown" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      this.handleInteractionStart(event);
      this.addDocumentMouseUpListener();
    }

    /**
     * Handle any "mouseup" event received by the component
     * @private
     * @param {SyntheticEvent} event
     */

  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      this.handleInteractionEnd(event);
      this.removeDocumentMouseUpListener();
    }

    /**
     * Handle any "touchstart" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      this.handleInteractionStart(event);
      this.addDocumentTouchEndListener();
    }

    /**
     * Handle any "touchend" event received by the component
     * @private
     * @param {SyntheticEvent} event
     */

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      this.handleInteractionEnd(event);
      this.removeDocumentTouchEndListener();
    }

    /**
     * Return JSX of sliders
     * @private
     * @return {JSX.Element}
     */

  }, {
    key: 'renderSliders',
    value: function renderSliders() {
      var _this3 = this;

      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var percentages = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);

      return this.getKeys().map(function (key) {
        var value = values[key];
        var percentage = percentages[key];

        var _props = _this3.props,
            maxValue = _props.maxValue,
            minValue = _props.minValue;


        if (key === 'min') {
          maxValue = values.max;
        } else {
          minValue = values.min;
        }

        var slider = _react2.default.createElement(_slider2.default, {
          ariaLabelledby: _this3.props.ariaLabelledby,
          ariaControls: _this3.props.ariaControls,
          classNames: _this3.props.classNames,
          formatLabel: _this3.props.formatLabel,
          key: key,
          maxValue: maxValue,
          minValue: minValue,
          onSliderDrag: _this3.handleSliderDrag,
          onSliderKeyDown: _this3.handleSliderKeyDown,
          percentage: percentage,
          type: key,
          value: value });

        return slider;
      });
    }

    /**
     * Return JSX of hidden inputs
     * @private
     * @return {JSX.Element}
     */

  }, {
    key: 'renderHiddenInputs',
    value: function renderHiddenInputs() {
      var _this4 = this;

      if (!this.props.name) {
        return [];
      }

      var isMultiValue = this.isMultiValue();
      var values = valueTransformer.getValueFromProps(this.props, isMultiValue);

      return this.getKeys().map(function (key) {
        var value = values[key];
        var name = isMultiValue ? '' + _this4.props.name + (0, _utils.captialize)(key) : _this4.props.name;

        return _react2.default.createElement('input', { key: key, type: 'hidden', name: name, value: value });
      });
    }

    /**
     * @ignore
     * @override
     * @return {JSX.Element}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var componentClassName = this.getComponentClassName();
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var percentages = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);

      return _react2.default.createElement(
        'div',
        {
          'aria-disabled': this.props.disabled,
          ref: function ref(node) {
            _this5.node = node;
          },
          className: componentClassName,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart },
        _react2.default.createElement(
          _label2.default,
          {
            classNames: this.props.classNames,
            formatLabel: this.props.formatLabel,
            type: 'min' },
          this.props.minValue
        ),
        _react2.default.createElement(
          _track2.default,
          {
            classNames: this.props.classNames,
            ref: function ref(trackNode) {
              _this5.trackNode = trackNode;
            },
            percentages: percentages,
            onTrackMouseDown: this.handleTrackMouseDown,
            isExternal: this.props.isExternal },
          this.renderSliders()
        ),
        _react2.default.createElement(
          _label2.default,
          {
            classNames: this.props.classNames,
            formatLabel: this.props.formatLabel,
            type: 'max' },
          this.props.maxValue
        ),
        this.renderHiddenInputs()
      );
    }
  }]);

  return InputRange;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'handleSliderDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleSliderDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleSliderKeyDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleSliderKeyDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTrackMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTrackMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleInteractionStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleInteractionStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleInteractionEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleInteractionEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleKeyDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleKeyDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleKeyUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleKeyUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchEnd'), _class.prototype)), _class);
exports.default = InputRange;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @ignore */
var DOWN_ARROW = exports.DOWN_ARROW = 40;

/** @ignore */
var LEFT_ARROW = exports.LEFT_ARROW = 37;

/** @ignore */
var RIGHT_ARROW = exports.RIGHT_ARROW = 39;

/** @ignore */
var UP_ARROW = exports.UP_ARROW = 38;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rangePropType;

var _utils = __webpack_require__(0);

/**
 * @ignore
 * @param {Object} props - React component props
 * @return {?Error} Return Error if validation fails
 */
function rangePropType(props) {
  var maxValue = props.maxValue,
      minValue = props.minValue;


  if (!(0, _utils.isNumber)(minValue) || !(0, _utils.isNumber)(maxValue)) {
    return new Error('"minValue" and "maxValue" must be a number');
  }

  if (minValue >= maxValue) {
    return new Error('"minValue" must be smaller than "maxValue"');
  }
}
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = __webpack_require__(2);

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _label = __webpack_require__(3);

var _label2 = _interopRequireDefault(_label);

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
var Slider = (_class = function (_React$Component) {
  _inherits(Slider, _React$Component);

  _createClass(Slider, null, [{
    key: 'propTypes',

    /**
     * Accepted propTypes of Slider
     * @override
     * @return {Object}
     * @property {Function} ariaLabelledby
     * @property {Function} ariaControls
     * @property {Function} className
     * @property {Function} formatLabel
     * @property {Function} maxValue
     * @property {Function} minValue
     * @property {Function} onSliderDrag
     * @property {Function} onSliderKeyDown
     * @property {Function} percentage
     * @property {Function} type
     * @property {Function} value
     */
    get: function get() {
      return {
        ariaLabelledby: _react2.default.PropTypes.string,
        ariaControls: _react2.default.PropTypes.string,
        classNames: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.string).isRequired,
        formatLabel: _react2.default.PropTypes.func,
        maxValue: _react2.default.PropTypes.number,
        minValue: _react2.default.PropTypes.number,
        onSliderDrag: _react2.default.PropTypes.func.isRequired,
        onSliderKeyDown: _react2.default.PropTypes.func.isRequired,
        percentage: _react2.default.PropTypes.number.isRequired,
        type: _react2.default.PropTypes.string.isRequired,
        value: _react2.default.PropTypes.number.isRequired
      };
    }

    /**
     * @param {Object} props
     * @param {string} [props.ariaLabelledby]
     * @param {string} [props.ariaControls]
     * @param {InputRangeClassNames} props.classNames
     * @param {Function} [props.formatLabel]
     * @param {number} [props.maxValue]
     * @param {number} [props.minValue]
     * @param {Function} props.onSliderKeyDown
     * @param {Function} props.onSliderDrag
     * @param {number} props.percentage
     * @param {number} props.type
     * @param {number} props.value
     */

  }]);

  function Slider(props) {
    _classCallCheck(this, Slider);

    /**
     * @private
     * @type {?Component}
     */
    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.node = null;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @return {void}
   */


  _createClass(Slider, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeDocumentMouseMoveListener();
      this.removeDocumentMouseUpListener();
      this.removeDocumentTouchEndListener();
      this.removeDocumentTouchMoveListener();
    }

    /**
     * @private
     * @return {Object}
     */

  }, {
    key: 'getStyle',
    value: function getStyle() {
      var perc = (this.props.percentage || 0) * 100;
      var style = {
        position: 'absolute',
        left: perc + '%'
      };

      return style;
    }

    /**
     * Listen to mousemove event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentMouseMoveListener',
    value: function addDocumentMouseMoveListener() {
      this.removeDocumentMouseMoveListener();
      this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
    }

    /**
     * Listen to mouseup event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentMouseUpListener',
    value: function addDocumentMouseUpListener() {
      this.removeDocumentMouseUpListener();
      this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Listen to touchmove event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentTouchMoveListener',
    value: function addDocumentTouchMoveListener() {
      this.removeDocumentTouchMoveListener();
      this.node.ownerDocument.addEventListener('touchmove', this.handleTouchMove);
    }

    /**
     * Listen to touchend event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentTouchEndListener',
    value: function addDocumentTouchEndListener() {
      this.removeDocumentTouchEndListener();
      this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentMouseMoveListener',
    value: function removeDocumentMouseMoveListener() {
      this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentMouseUpListener',
    value: function removeDocumentMouseUpListener() {
      this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentTouchMoveListener',
    value: function removeDocumentTouchMoveListener() {
      this.node.ownerDocument.removeEventListener('touchmove', this.handleTouchMove);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentTouchEndListener',
    value: function removeDocumentTouchEndListener() {
      this.node.ownerDocument.removeEventListener('touchend', this.handleTouchUp);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      this.addDocumentMouseMoveListener();
      this.addDocumentMouseUpListener();
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.removeDocumentMouseMoveListener();
      this.removeDocumentMouseUpListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      this.props.onSliderDrag(event, this.props.type);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart() {
      this.addDocumentTouchEndListener();
      this.addDocumentTouchMoveListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      this.props.onSliderDrag(event, this.props.type);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      this.removeDocumentTouchMoveListener();
      this.removeDocumentTouchEndListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.props.onSliderKeyDown(event, this.props.type);
    }

    /**
     * @override
     * @return {JSX.Element}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = this.getStyle();

      return _react2.default.createElement(
        'span',
        {
          className: this.props.classNames.sliderContainer,
          ref: function ref(node) {
            _this2.node = node;
          },
          style: style },
        _react2.default.createElement(
          _label2.default,
          {
            classNames: this.props.classNames,
            formatLabel: this.props.formatLabel,
            type: 'value' },
          this.props.value
        ),
        _react2.default.createElement('div', {
          'aria-labelledby': this.props.ariaLabelledby,
          'aria-controls': this.props.ariaControls,
          'aria-valuemax': this.props.maxValue,
          'aria-valuemin': this.props.minValue,
          'aria-valuenow': this.props.value,
          className: this.props.classNames.slider,
          draggable: 'false',
          onKeyDown: this.handleKeyDown,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          role: 'slider',
          tabIndex: '0' })
      );
    }
  }]);

  return Slider;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'handleMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleKeyDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleKeyDown'), _class.prototype)), _class);
exports.default = Slider;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = __webpack_require__(2);

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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = valuePropType;

var _utils = __webpack_require__(0);

/**
 * @ignore
 * @param {Object} props
 * @return {?Error} Return Error if validation fails
 */
function valuePropType(props, propName) {
  var maxValue = props.maxValue,
      minValue = props.minValue;

  var value = props[propName];

  if (!(0, _utils.isNumber)(value) && (!(0, _utils.isObject)(value) || !(0, _utils.isNumber)(value.min) || !(0, _utils.isNumber)(value.max))) {
    return new Error('"' + propName + '" must be a number or a range object');
  }

  if ((0, _utils.isNumber)(value) && (value < minValue || value > maxValue)) {
    return new Error('"' + propName + '" must be in between "minValue" and "maxValue"');
  }

  if ((0, _utils.isObject)(value) && (value.min < minValue || value.min > maxValue || value.max < minValue || value.max > maxValue)) {
    return new Error('"' + propName + '" must be in between "minValue" and "maxValue"');
  }
}
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getPercentageFromPosition = getPercentageFromPosition;
exports.getValueFromPosition = getValueFromPosition;
exports.getValueFromProps = getValueFromProps;
exports.getPercentageFromValue = getPercentageFromValue;
exports.getPercentagesFromValues = getPercentagesFromValues;
exports.getPositionFromValue = getPositionFromValue;
exports.getPositionsFromValues = getPositionsFromValues;
exports.getPositionFromEvent = getPositionFromEvent;
exports.getStepValueFromValue = getStepValueFromValue;

var _utils = __webpack_require__(0);

/**
 * Convert a point into a percentage value
 * @ignore
 * @param {Point} position
 * @param {ClientRect} clientRect
 * @return {number} Percentage value
 */
function getPercentageFromPosition(position, clientRect) {
  var length = clientRect.width;
  var sizePerc = position.x / length;

  return sizePerc || 0;
}

/**
 * Convert a point into a model value
 * @ignore
 * @param {Point} position
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {number}
 */
function getValueFromPosition(position, minValue, maxValue, clientRect) {
  var sizePerc = getPercentageFromPosition(position, clientRect);
  var valueDiff = maxValue - minValue;

  return minValue + valueDiff * sizePerc;
}

/**
 * Convert props into a range value
 * @ignore
 * @param {Object} props
 * @param {boolean} isMultiValue
 * @return {Range}
 */
function getValueFromProps(props, isMultiValue) {
  if (isMultiValue) {
    return _extends({}, props.value);
  }

  return {
    min: props.minValue,
    max: props.value
  };
}

/**
 * Convert a model value into a percentage value
 * @ignore
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @return {number}
 */
function getPercentageFromValue(value, minValue, maxValue) {
  var validValue = (0, _utils.clamp)(value, minValue, maxValue);
  var valueDiff = maxValue - minValue;
  var valuePerc = (validValue - minValue) / valueDiff;

  return valuePerc || 0;
}

/**
 * Convert model values into percentage values
 * @ignore
 * @param {Range} values
 * @param {number} minValue
 * @param {number} maxValue
 * @return {Range}
 */
function getPercentagesFromValues(values, minValue, maxValue) {
  return {
    min: getPercentageFromValue(values.min, minValue, maxValue),
    max: getPercentageFromValue(values.max, minValue, maxValue)
  };
}

/**
 * Convert a value into a point
 * @ignore
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {Point} Position
 */
function getPositionFromValue(value, minValue, maxValue, clientRect) {
  var length = clientRect.width;
  var valuePerc = getPercentageFromValue(value, minValue, maxValue);
  var positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0
  };
}

/**
 * Convert a range of values into points
 * @ignore
 * @param {Range} values
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {Range}
 */
function getPositionsFromValues(values, minValue, maxValue, clientRect) {
  return {
    min: getPositionFromValue(values.min, minValue, maxValue, clientRect),
    max: getPositionFromValue(values.max, minValue, maxValue, clientRect)
  };
}

/**
 * Convert an event into a point
 * @ignore
 * @param {Event} event
 * @param {ClientRect} clientRect
 * @return {Point}
 */
function getPositionFromEvent(event, clientRect) {
  var length = clientRect.width;

  var _ref = event.touches ? event.touches[0] : event,
      clientX = _ref.clientX;

  return {
    x: (0, _utils.clamp)(clientX - clientRect.left, 0, length),
    y: 0
  };
}

/**
 * Convert a value into a step value
 * @ignore
 * @param {number} value
 * @param {number} valuePerStep
 * @return {number}
 */
function getStepValueFromValue(value, valuePerStep) {
  return Math.round(value / valuePerStep) * valuePerStep;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = captialize;
/**
 * Captialize a string
 * @ignore
 * @param {string} string
 * @return {string}
 */
function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = exports["default"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clamp;
/**
 * Clamp a value between a min and max value
 * @ignore
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
module.exports = exports["default"];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = distanceTo;
/**
 * Calculate the distance between pointA and pointB
 * @ignore
 * @param {Point} pointA
 * @param {Point} pointB
 * @return {number} Distance
 */
function distanceTo(pointA, pointB) {
  var xDiff = Math.pow(pointB.x - pointA.x, 2);
  var yDiff = Math.pow(pointB.y - pointA.y, 2);

  return Math.sqrt(xDiff + yDiff);
}
module.exports = exports["default"];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDefined;
/**
 * Check if a value is defined
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
function isDefined(value) {
  return value !== undefined && value !== null;
}
module.exports = exports["default"];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;
/**
 * Check if a value is a number
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
function isNumber(value) {
  return typeof value === 'number';
}
module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isObject;
/**
 * Check if a value is an object
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
function isObject(value) {
  return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = length;
/**
 * Calculate the absolute difference between two numbers
 * @ignore
 * @param {number} numA
 * @param {number} numB
 * @return {number}
 */
function length(numA, numB) {
  return Math.abs(numA - numB);
}
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-input-range.js.map