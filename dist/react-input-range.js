(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.InputRange = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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

var internals = new WeakMap();

var KeyCode = {
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  UP_ARROW: 38
};

function isWithinRange(inputRange, values) {
  var props = inputRange.props;

  if (inputRange.isMultiValue) {
    return values.min >= props.minValue && values.max <= props.maxValue && values.min < values.max;
  }

  return values.max >= props.minValue && values.max <= props.maxValue;
}

function hasStepDifference(inputRange, values) {
  var props = inputRange.props;

  var currentValues = _valueTransformer2['default'].valuesFromProps(inputRange);

  return (0, _util.length)(values.min, currentValues.min) >= props.step || (0, _util.length)(values.max, currentValues.max) >= props.step;
}

function shouldUpdate(inputRange, values) {
  return isWithinRange(inputRange, values) && hasStepDifference(inputRange, values);
}

function getDocument(inputRange) {
  var ownerDocument = inputRange.refs.inputRange.ownerDocument;

  return ownerDocument;
}

function getComponentClassName(inputRange) {
  var props = inputRange.props;

  if (!props.disabled) {
    return props.classNames.component;
  }

  return props.classNames.component + ' is-disabled';
}

function getKeyFromSlider(inputRange, slider) {
  if (slider === inputRange.refs.sliderMin) {
    return 'min';
  }

  return 'max';
}

function getKeys(inputRange) {
  if (inputRange.isMultiValue) {
    return ['min', 'max'];
  }

  return ['max'];
}

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
        value: value });

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

var InputRange = (function (_React$Component) {
  _inherits(InputRange, _React$Component);

  function InputRange(props) {
    _classCallCheck(this, InputRange);

    _get(Object.getPrototypeOf(InputRange.prototype), 'constructor', this).call(this, props);

    internals.set(this, {});

    (0, _util.autobind)(['formatLabel', 'handleInteractionEnd', 'handleInteractionStart', 'handleKeyDown', 'handleKeyUp', 'handleMouseDown', 'handleMouseUp', 'handleSliderKeyDown', 'handleSliderMouseMove', 'handleTouchStart', 'handleTouchEnd', 'handleTrackMouseDown'], this);
  }

  _createClass(InputRange, [{
    key: 'updatePosition',
    value: function updatePosition(key, position) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var positions = _valueTransformer2['default'].positionsFromValues(this, values);

      positions[key] = position;

      this.updatePositions(positions);
    }
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
  }, {
    key: 'updateValue',
    value: function updateValue(key, value) {
      var values = _valueTransformer2['default'].valuesFromProps(this);

      values[key] = value;

      this.updateValues(values);
    }
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
  }, {
    key: 'incrementValue',
    value: function incrementValue(key) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var value = values[key] + this.props.step;

      this.updateValue(key, value);
    }
  }, {
    key: 'decrementValue',
    value: function decrementValue(key) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var value = values[key] - this.props.step;

      this.updateValue(key, value);
    }
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
  }, {
    key: 'handleInteractionStart',
    value: function handleInteractionStart() {
      var _this = internals.get(this);

      if (!this.props.onChangeComplete || (0, _util.isDefined)(_this.startValue)) {
        return;
      }

      _this.startValue = this.props.value || this.props.defaultValue;
    }
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
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.handleInteractionStart(event);
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(event) {
      this.handleInteractionEnd(event);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var document = getDocument(this);

      this.handleInteractionStart(event);

      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      var document = getDocument(this);

      this.handleInteractionEnd(event);

      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      var document = getDocument(this);

      this.handleInteractionStart(event);

      document.addEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      var document = getDocument(this);

      this.handleInteractionEnd(event);

      document.removeEventListener('touchend', this.handleTouchEnd);
    }
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
  value: _propTypes.maxMinValuePropType
};

InputRange.defaultProps = {
  classNames: _defaultClassNames2['default'],
  defaultValue: 0,
  disabled: false,
  labelPrefix: '',
  labelSuffix: '',
  maxValue: 10,
  minValue: 0,
  step: 1,
  value: null
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Label":2,"./Slider":3,"./Track":4,"./defaultClassNames":5,"./propTypes":6,"./util":7,"./valueTransformer":8}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var Label = (function (_React$Component) {
  _inherits(Label, _React$Component);

  function Label() {
    _classCallCheck(this, Label);

    _get(Object.getPrototypeOf(Label.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Label, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var containerClassName = _props.containerClassName;

      var labelValue = this.props.formatLabel ? this.props.formatLabel(this.props.children) : this.props.children;

      return _react2['default'].createElement(
        'span',
        { className: className },
        _react2['default'].createElement(
          'span',
          { className: containerClassName },
          labelValue
        )
      );
    }
  }]);

  return Label;
})(_react2['default'].Component);

exports['default'] = Label;

Label.propTypes = {
  children: _react2['default'].PropTypes.node,
  className: _react2['default'].PropTypes.string,
  containerClassName: _react2['default'].PropTypes.string,
  formatLabel: _react2['default'].PropTypes.func
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _util = require('./util');

function getDocument(slider) {
  var ownerDocument = slider.refs.slider.ownerDocument;

  return ownerDocument;
}

function getStyle(slider) {
  var perc = (slider.props.percentage || 0) * 100;
  var style = {
    position: 'absolute',
    left: perc + '%'
  };

  return style;
}

var Slider = (function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this, props);

    (0, _util.autobind)(['handleClick', 'handleMouseDown', 'handleMouseUp', 'handleMouseMove', 'handleTouchStart', 'handleTouchEnd', 'handleTouchMove', 'handleKeyDown'], this);
  }

  _createClass(Slider, [{
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      var document = getDocument(this);

      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      var document = getDocument(this);

      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      this.props.onSliderMouseMove(event, this);
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      var document = getDocument(this);

      event.preventDefault();

      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      this.props.onSliderMouseMove(event, this);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      var document = getDocument(this);

      event.preventDefault();

      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.props.onSliderKeyDown(event, this);
    }
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
        _react2['default'].createElement(
          _Label2['default'],
          {
            className: classNames.labelValue,
            containerClassName: classNames.labelContainer,
            formatLabel: this.props.formatLabel },
          this.props.value
        ),
        _react2['default'].createElement('a', {
          'aria-labelledby': this.props.ariaLabelledby,
          'aria-controls': this.props.ariaControls,
          'aria-valuemax': this.props.maxValue,
          'aria-valuemin': this.props.minValue,
          'aria-valuenow': this.props.value,
          className: classNames.slider,
          draggable: 'false',
          href: '#',
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          role: 'slider' })
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
  value: _react2['default'].PropTypes.number.isRequired
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Label":2,"./util":7}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

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

var Track = (function (_React$Component) {
  _inherits(Track, _React$Component);

  function Track(props) {
    _classCallCheck(this, Track);

    _get(Object.getPrototypeOf(Track.prototype), 'constructor', this).call(this, props);

    (0, _util.autobind)(['handleMouseDown', 'handleTouchStart'], this);
  }

  _createClass(Track, [{
    key: 'handleMouseDown',
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
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      event.preventDefault();

      this.handleMouseDown(event);
    }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  component: 'InputRange',
  labelContainer: 'InputRange-labelContainer',
  labelMax: 'InputRange-label InputRange-label--max',
  labelMin: 'InputRange-label InputRange-label--min',
  labelValue: 'InputRange-label InputRange-label--value',
  slider: 'InputRange-slider',
  sliderContainer: 'InputRange-sliderContainer',
  trackActive: 'InputRange-track InputRange-track--active',
  trackContainer: 'InputRange-track InputRange-track--container'
};
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.maxMinValuePropType = maxMinValuePropType;

var _util = require('./util');

function maxMinValuePropType(props) {
  var maxValue = props.maxValue;
  var minValue = props.minValue;
  var value = props.value;
  var defaultValue = props.defaultValue;
  var isValueNumber = (0, _util.isNumber)(value);
  var isDefaultValueNumber = (0, _util.isNumber)(defaultValue);
  var isValueNumberObject = (0, _util.objectOf)(value, _util.isNumber);
  var isDefaultValueNumberObject = (0, _util.objectOf)(defaultValue, _util.isNumber);

  if (value === undefined) {
    return new Error('`value` must be defined');
  }

  if (!isValueNumber && !isDefaultValueNumber && !isValueNumberObject && !isDefaultValueNumberObject) {
    return new Error('`value` or `defaultValue` must be a number or an array');
  }

  if (minValue >= maxValue) {
    return new Error('`minValue` must be smaller than `maxValue`');
  }

  if (maxValue <= minValue) {
    return new Error('`maxValue` must be larger than `minValue`');
  }

  if (value < minValue || value > maxValue) {
    return new Error('`value` must be within `minValue` and `maxValue`');
  }
}

},{"./util":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.clamp = clamp;
exports.extend = extend;
exports.includes = includes;
exports.omit = omit;
exports.captialize = captialize;
exports.distanceTo = distanceTo;
exports.length = length;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isDefined = isDefined;
exports.isEmpty = isEmpty;
exports.arrayOf = arrayOf;
exports.objectOf = objectOf;
exports.autobind = autobind;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function extend() {
  return Object.assign.apply(Object, arguments);
}

function includes(array, value) {
  return array.indexOf(value) > -1;
}

function omit(obj, omitKeys) {
  var keys = Object.keys(obj);
  var outputObj = {};

  keys.forEach(function (key) {
    if (!includes(omitKeys, key)) {
      outputObj[key] = obj[key];
    }
  });

  return outputObj;
}

function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function distanceTo(pointA, pointB) {
  return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}

function length(numA, numB) {
  return Math.abs(numA - numB);
}

function isNumber(value) {
  return typeof value === 'number';
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isEmpty(obj) {
  if (!obj) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  return Object.keys(obj).length === 0;
}

function arrayOf(array, predicate) {
  if (!Array.isArray(array)) {
    return false;
  }

  for (var i = 0, len = array.length; i < len; i++) {
    if (!predicate(array[i])) {
      return false;
    }
  }

  return true;
}

function objectOf(object, predicate, keys) {
  if (!isObject(object)) {
    return false;
  }

  var props = keys || Object.keys(object);

  for (var i = 0, len = props.length; i < len; i++) {
    var prop = props[i];

    if (!predicate(object[prop])) {
      return false;
    }
  }

  return true;
}

function autobind(methodNames, instance) {
  methodNames.forEach(function (methodName) {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _util = require('./util');

function percentageFromPosition(inputRange, position) {
  var length = inputRange.trackClientRect.width;
  var sizePerc = position.x / length;

  return sizePerc || 0;
}

function valueFromPosition(inputRange, position) {
  var sizePerc = percentageFromPosition(inputRange, position);
  var valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  var value = inputRange.props.minValue + valueDiff * sizePerc;

  return value;
}

function valuesFromProps(inputRange) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? inputRange : arguments[1];

  var props = _ref.props;
  return (function () {
    if (inputRange.isMultiValue) {
      var values = props.value;

      if ((0, _util.isEmpty)(values) || !(0, _util.objectOf)(values, _util.isNumber)) {
        values = props.defaultValue;
      }

      return Object.create(values);
    }

    var value = (0, _util.isNumber)(props.value) ? props.value : props.defaultValue;

    return {
      min: props.minValue,
      max: value
    };
  })();
}

function percentageFromValue(inputRange, value) {
  var validValue = (0, _util.clamp)(value, inputRange.props.minValue, inputRange.props.maxValue);
  var valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  var valuePerc = (validValue - inputRange.props.minValue) / valueDiff;

  return valuePerc || 0;
}

function percentagesFromValues(inputRange, values) {
  var percentages = {
    min: percentageFromValue(inputRange, values.min),
    max: percentageFromValue(inputRange, values.max)
  };

  return percentages;
}

function positionFromValue(inputRange, value) {
  var length = inputRange.trackClientRect.width;
  var valuePerc = percentageFromValue(inputRange, value);
  var positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0
  };
}

function positionsFromValues(inputRange, values) {
  var positions = {
    min: positionFromValue(inputRange, values.min),
    max: positionFromValue(inputRange, values.max)
  };

  return positions;
}

function positionFromEvent(inputRange, event) {
  var trackClientRect = inputRange.trackClientRect;
  var length = trackClientRect.width;

  var _ref2 = event.touches ? event.touches[0] : event;

  var clientX = _ref2.clientX;

  var position = {
    x: (0, _util.clamp)(clientX - trackClientRect.left, 0, length),
    y: 0
  };

  return position;
}

function stepValueFromValue(inputRange, value) {
  return Math.round(value / inputRange.props.step) * inputRange.props.step;
}

exports['default'] = {
  percentageFromPosition: percentageFromPosition,
  percentageFromValue: percentageFromValue,
  percentagesFromValues: percentagesFromValues,
  positionFromEvent: positionFromEvent,
  positionFromValue: positionFromValue,
  positionsFromValues: positionsFromValues,
  stepValueFromValue: stepValueFromValue,
  valueFromPosition: valueFromPosition,
  valuesFromProps: valuesFromProps
};
module.exports = exports['default'];

},{"./util":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _InputRange = require('./InputRange');

var _InputRange2 = _interopRequireDefault(_InputRange);

exports['default'] = _InputRange2['default'];
module.exports = exports['default'];

},{"./InputRange":1}]},{},[9])(9)
});