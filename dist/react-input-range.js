(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.InputRange = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _ValueTransformer = require('./ValueTransformer');

var _ValueTransformer2 = _interopRequireDefault(_ValueTransformer);

var _util = require('./util');

var _propTypes = require('./propTypes');

var _defaultClassNames = require('./defaultClassNames');

var _defaultClassNames2 = _interopRequireDefault(_defaultClassNames);

function isNewStep(component, value, oldValue) {
  return Math.abs(value - oldValue) >= component.props.step;
}

function getKeyBySlider(component, slider) {
  if (slider === component.refs.sliderMin) {
    return 'min';
  }

  return 'max';
}

function getKeyByPosition(component, position) {
  if (component.isMultiValue) {
    var distanceToMin = (0, _util.distanceTo)(position, component.state.positions.min);
    var distanceToMax = (0, _util.distanceTo)(position, component.state.positions.max);

    if (distanceToMin < distanceToMax) {
      return 'min';
    }
  }

  return 'max';
}

function getKeys(component) {
  if (component.isMultiValue) {
    return ['max', 'min'];
  }

  return ['max'];
}

var KeyCode = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

var InputRange = (function (_React$Component) {
  _inherits(InputRange, _React$Component);

  function InputRange(props) {
    _classCallCheck(this, InputRange);

    _get(Object.getPrototypeOf(InputRange.prototype), 'constructor', this).call(this, props);

    var state = {
      didChange: false,
      percentages: {
        min: 0,
        max: 0
      },
      positions: {
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 }
      },
      values: {
        min: 0,
        max: 0
      }
    };

    this.state = state;
    this.valueTransformer = new _ValueTransformer2['default'](this);
    this.isMultiValue = this.props.hasOwnProperty('defaultValues') || this.props.hasOwnProperty('values');

    (0, _util.autobind)(['handleSliderMouseMove', 'handleSliderKeyDown', 'handleTrackMouseDown'], this);
  }

  _createClass(InputRange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setPositionsByProps(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = (0, _util.omit)(nextProps, ['defaultValue', 'defaultValues']);

      this.setPositionsByProps(props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var currentProps = this.props;
      var currentState = this.state;
      var shouldUpdate = currentState.values.min !== nextState.values.min || currentState.values.max !== nextState.values.max || currentState.value !== nextState.value || currentProps.minValue !== nextProps.minValue || currentProps.maxValue !== nextProps.maxValue;

      return shouldUpdate;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.onChange && this.state.didChange) {
        var results = this.state.values.max;

        if (this.isMultiValue) {
          results = this.state.values;
        }

        this.props.onChange(this, results);
      }

      this.setState({
        didChange: true
      });
    }
  }, {
    key: 'setPositions',
    value: function setPositions(positions) {
      var values = {
        min: this.valueTransformer.valueFromPosition(positions.min),
        max: this.valueTransformer.valueFromPosition(positions.max)
      };

      var transformedValues = {
        min: this.valueTransformer.stepValueFromValue(values.min),
        max: this.valueTransformer.stepValueFromValue(values.max)
      };

      var transformedPositions = {
        min: this.valueTransformer.positionFromValue(transformedValues.min),
        max: this.valueTransformer.positionFromValue(transformedValues.max)
      };

      var transformedPercentages = {
        min: this.valueTransformer.percentageFromPosition(transformedPositions.min),
        max: this.valueTransformer.percentageFromPosition(transformedPositions.max)
      };

      var isStep = isNewStep(this, transformedValues.min, this.state.values.min) || isNewStep(this, transformedValues.max, this.state.values.max);
      var isValid = !this.isMultiValue || transformedValues.min < transformedValues.max;
      var shouldUpdate = isStep && isValid;

      if (shouldUpdate) {
        var state = {
          percentages: transformedPercentages,
          positions: transformedPositions,
          values: transformedValues
        };

        this.setState(state);
      }
    }
  }, {
    key: 'setPosition',
    value: function setPosition(slider, position) {
      var key = slider && slider.props.type || getKeyByPosition(this, position);
      var positions = (0, _util.extend)({}, this.state.positions, _defineProperty({}, key, position));

      this.setPositions(positions);
    }
  }, {
    key: 'setPositionByValue',
    value: function setPositionByValue(slider, value) {
      if (!(0, _util.isNumber)(value)) {
        return;
      }

      var validValue = (0, _util.clamp)(value, this.props.minValue, this.props.maxValue);
      var position = this.valueTransformer.positionFromValue(validValue);

      this.setPosition(slider, position);
    }
  }, {
    key: 'setPositionsByValues',
    value: function setPositionsByValues(values) {
      if (!values || !(0, _util.isNumber)(values.min) || !(0, _util.isNumber)(values.max)) {
        return;
      }

      var validValues = {
        min: (0, _util.clamp)(values.min, this.props.minValue, this.props.maxValue),
        max: (0, _util.clamp)(values.max, this.props.minValue, this.props.maxValue)
      };

      var positions = {
        min: this.valueTransformer.positionFromValue(validValues.min),
        max: this.valueTransformer.positionFromValue(validValues.max)
      };

      this.setPositions(positions);
    }
  }, {
    key: 'setPositionsByProps',
    value: function setPositionsByProps(props) {
      if (this.isMultiValue) {
        var values = !(0, _util.isEmpty)(props.values) ? props.values : props.defaultValues;

        this.setPositionsByValues(values);
      } else {
        var value = (0, _util.isNumber)(props.value) ? props.value : props.defaultValue;

        this.setPositionByValue(this.refs.sliderMax, value);
      }
    }
  }, {
    key: 'incrementValue',
    value: function incrementValue(slider) {
      var key = getKeyBySlider(this, slider);
      var value = this.state.values[key] + this.props.step;

      this.setPositionByValue(slider, value);
    }
  }, {
    key: 'decrementValue',
    value: function decrementValue(slider) {
      var key = getKeyBySlider(this, slider);
      var value = this.state.values[key] - this.props.step;

      this.setPositionByValue(slider, value);
    }
  }, {
    key: 'handleSliderMouseMove',
    value: function handleSliderMouseMove(slider, event) {
      if (this.props.disabled) {
        return;
      }

      var position = this.valueTransformer.positionFromEvent(event);

      this.setPosition(slider, position);
    }
  }, {
    key: 'handleSliderKeyDown',
    value: function handleSliderKeyDown(slider, event) {
      if (this.props.disabled) {
        return;
      }

      switch (event.keyCode) {
        case KeyCode.LEFT_ARROW:
          this.decrementValue(slider);
          break;

        case KeyCode.RIGHT_ARROW:
          this.incrementValue(slider);
          break;

        default:
          break;
      }
    }
  }, {
    key: 'handleTrackMouseDown',
    value: function handleTrackMouseDown(track, position) {
      if (this.props.disabled) {
        return;
      }

      this.setPosition(null, position);
    }
  }, {
    key: 'renderSliders',
    value: function renderSliders() {
      var classNames = this.props.classNames;
      var sliders = [];
      var keys = getKeys(this);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var value = this.state.values[key];
          var percentage = this.state.percentages[key];
          var ref = 'slider' + (0, _util.captialize)(key);

          var _props = this.props;
          var maxValue = _props.maxValue;
          var minValue = _props.minValue;

          if (key === 'min') {
            maxValue = this.state.values.max;
          } else {
            minValue = this.state.values.min;
          }

          var slider = _react2['default'].createElement(_Slider2['default'], {
            classNames: classNames,
            key: key,
            maxValue: maxValue,
            minValue: minValue,
            onSliderKeyDown: this.handleSliderKeyDown,
            onSliderMouseMove: this.handleSliderMouseMove,
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
  }, {
    key: 'renderHiddenInputs',
    value: function renderHiddenInputs() {
      var inputs = [];
      var keys = getKeys(this);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          var _name = this.isMultiValue ? '' + this.props.name + (0, _util.captialize)(key) : this.props.name;

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
  }, {
    key: 'render',
    value: function render() {
      var classNames = this.props.classNames;
      var componentClassName = classNames.component;

      if (this.props.disabled) {
        componentClassName = componentClassName + ' is-disabled';
      }

      return _react2['default'].createElement(
        'div',
        {
          'aria-disabled': this.props.disabled,
          ref: 'inputRange',
          className: componentClassName },
        _react2['default'].createElement(
          'span',
          { className: classNames.labelMin },
          _react2['default'].createElement(
            'span',
            { className: classNames.labelContainer },
            this.props.minValue
          )
        ),
        _react2['default'].createElement(
          _Track2['default'],
          {
            classNames: classNames,
            ref: 'track',
            percentages: this.state.percentages,
            onTrackMouseDown: this.handleTrackMouseDown },
          this.renderSliders()
        ),
        _react2['default'].createElement(
          'span',
          { className: classNames.labelMax },
          _react2['default'].createElement(
            'span',
            { className: classNames.labelContainer },
            this.props.maxValue
          )
        ),
        this.renderHiddenInputs()
      );
    }
  }, {
    key: 'trackClientRect',
    get: function get() {
      var track = this.refs.track;

      return track && track.clientRect;
    }
  }]);

  return InputRange;
})(_react2['default'].Component);

InputRange.propTypes = {
  ariaLabelledby: _react2['default'].PropTypes.string,
  classNames: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.string),
  defaultValue: _propTypes.maxMinValuePropType,
  defaultValues: _propTypes.maxMinValuePropType,
  disabled: _react2['default'].PropTypes.bool,
  maxValue: _propTypes.maxMinValuePropType,
  minValue: _propTypes.maxMinValuePropType,
  name: _react2['default'].PropTypes.string,
  onChange: _react2['default'].PropTypes.func,
  step: _react2['default'].PropTypes.number,
  value: _propTypes.maxMinValuePropType,
  values: _propTypes.maxMinValuePropType
};

InputRange.defaultProps = {
  classNames: _defaultClassNames2['default'],
  disabled: false,
  minValue: 0,
  maxValue: 10,
  step: 1
};

exports['default'] = InputRange;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Slider":2,"./Track":3,"./ValueTransformer":4,"./defaultClassNames":5,"./propTypes":6,"./util":7}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

var Slider = (function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this, props);

    this.state = {};

    _react2['default'].initializeTouchEvents(true);

    (0, _util.autobind)(['handleClick', 'handleMouseDown', 'handleMouseUp', 'handleMouseMove', 'handleTouchStart', 'handleTouchEnd', 'handleTouchMove', 'handleKeyDown'], this);
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setPosition(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setPosition(nextProps);
    }
  }, {
    key: 'setPosition',
    value: function setPosition(props) {
      var perc = (props.percentage || 0) * 100;
      var newStyle = {
        position: 'absolute',
        left: perc + '%'
      };

      var style = (0, _util.extend)({}, this.state.style, newStyle);

      this.setState({ style: style });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      var document = this.document;

      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      var document = this.document;

      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      this.props.onSliderMouseMove(this, event);
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      var document = this.document;

      event.preventDefault();

      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      this.props.onSliderMouseMove(this, event);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      var document = this.document;

      event.preventDefault();

      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.props.onSliderKeyDown(this, event);
    }
  }, {
    key: 'render',
    value: function render() {
      var classNames = this.props.classNames;
      var style = this.state.style || {};

      return _react2['default'].createElement(
        'span',
        { className: classNames.sliderContainer, style: style },
        _react2['default'].createElement(
          'span',
          { className: classNames.labelValue },
          _react2['default'].createElement(
            'span',
            { className: classNames.labelContainer },
            this.props.value
          )
        ),
        _react2['default'].createElement('a', {
          'aria-labelledby': this.props.ariaLabelledby,
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
  }, {
    key: 'document',
    get: function get() {
      var element = _react2['default'].findDOMNode(this);
      var document = element.ownerDocument;

      return document;
    }
  }]);

  return Slider;
})(_react2['default'].Component);

Slider.propTypes = {
  ariaLabelledby: _react2['default'].PropTypes.string,
  classNames: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.string),
  maxValue: _react2['default'].PropTypes.number,
  minValue: _react2['default'].PropTypes.number,
  onSliderKeyDown: _react2['default'].PropTypes.func.isRequired,
  onSliderMouseMove: _react2['default'].PropTypes.func.isRequired,
  percentage: _react2['default'].PropTypes.number.isRequired,
  type: _react2['default'].PropTypes.string.isRequired,
  value: _react2['default'].PropTypes.number.isRequired
};

exports['default'] = Slider;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util":7}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

var Track = (function (_React$Component) {
  _inherits(Track, _React$Component);

  function Track(props) {
    _classCallCheck(this, Track);

    _get(Object.getPrototypeOf(Track.prototype), 'constructor', this).call(this, props);

    this.state = {};

    _react2['default'].initializeTouchEvents(true);

    (0, _util.autobind)(['handleMouseDown', 'handleTouchStart'], this);
  }

  _createClass(Track, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setActiveTrackWidth(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setActiveTrackWidth(nextProps);
    }
  }, {
    key: 'setActiveTrackWidth',
    value: function setActiveTrackWidth(props) {
      var width = (props.percentages.max - props.percentages.min) * 100 + '%';
      var left = props.percentages.min * 100 + '%';

      var newActiveTrackStyle = {
        left: left,
        width: width
      };

      var activeTrackStyle = (0, _util.extend)({}, this.state.activeTrackStyle, newActiveTrackStyle);

      this.setState({ activeTrackStyle: activeTrackStyle });
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var trackClientRect = this.clientRect;

      var _ref = event.touches ? event.touches[0] : event;

      var clientX = _ref.clientX;

      var position = {
        x: clientX - trackClientRect.left,
        y: 0
      };

      this.props.onTrackMouseDown(this, position);
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
      var activeTrackStyle = this.state.activeTrackStyle || {};
      var classNames = this.props.classNames;

      return _react2['default'].createElement(
        'div',
        {
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          className: classNames.trackContainer },
        _react2['default'].createElement('div', {
          style: activeTrackStyle,
          className: classNames.trackActive }),
        this.props.children
      );
    }
  }, {
    key: 'clientRect',
    get: function get() {
      var track = _react2['default'].findDOMNode(this);
      var clientRect = track.getClientRects()[0];

      return clientRect;
    }
  }]);

  return Track;
})(_react2['default'].Component);

Track.propTypes = {
  children: _react2['default'].PropTypes.node,
  classNames: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.string),
  onTrackMouseDown: _react2['default'].PropTypes.func.isRequired,
  percentages: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.number).isRequired
};

exports['default'] = Track;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('./util');

var ValueTransformer = (function () {
  function ValueTransformer(component) {
    _classCallCheck(this, ValueTransformer);

    this.component = component;
  }

  _createClass(ValueTransformer, [{
    key: 'valueFromPosition',
    value: function valueFromPosition(position) {
      var sizePerc = this.percentageFromPosition(position);
      var valueDiff = this.component.props.maxValue - this.component.props.minValue;
      var value = this.component.props.minValue + valueDiff * sizePerc;

      return value;
    }
  }, {
    key: 'positionFromValue',
    value: function positionFromValue(value) {
      var length = this.component.trackClientRect.width;
      var valuePerc = this.percentageFromValue(value);
      var positionValue = valuePerc * length;

      return {
        x: positionValue,
        y: 0
      };
    }
  }, {
    key: 'positionFromEvent',
    value: function positionFromEvent(event) {
      var trackClientRect = this.component.trackClientRect;
      var length = trackClientRect.width;

      var _ref = event.touches ? event.touches[0] : event;

      var clientX = _ref.clientX;

      var position = {
        x: (0, _util.clamp)(clientX - trackClientRect.left, 0, length),
        y: 0
      };

      return position;
    }
  }, {
    key: 'percentageFromPosition',
    value: function percentageFromPosition(position) {
      var length = this.component.trackClientRect.width;
      var sizePerc = position.x / length;

      return sizePerc || 0;
    }
  }, {
    key: 'percentageFromValue',
    value: function percentageFromValue(value) {
      var validValue = (0, _util.clamp)(value, this.component.props.minValue, this.component.props.maxValue);
      var valueDiff = this.component.props.maxValue - this.component.props.minValue;
      var valuePerc = (validValue - this.component.props.minValue) / valueDiff;

      return valuePerc || 0;
    }
  }, {
    key: 'stepValueFromValue',
    value: function stepValueFromValue(value) {
      return Math.round(value / this.component.props.step) * this.component.props.step;
    }
  }]);

  return ValueTransformer;
})();

exports['default'] = ValueTransformer;
module.exports = exports['default'];

},{"./util":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var defaultClassNames = {
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

exports['default'] = defaultClassNames;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.maxMinValuePropType = maxMinValuePropType;

var _util = require('./util');

function numberPredicate(value) {
  return typeof value === 'number';
}

function maxMinValuePropType(props) {
  var maxValue = props.maxValue;
  var minValue = props.minValue;
  var value = props.value;
  var values = props.values;
  var defaultValue = props.defaultValue;
  var defaultValues = props.defaultValues;

  if (!values && !defaultValues && !numberPredicate(value) && !numberPredicate(defaultValue)) {
    return new Error('`value` or `defaultValue` must be a number');
  }

  if (!value && !defaultValue && !(0, _util.objectOf)(values, numberPredicate) && !(0, _util.objectOf)(defaultValues, numberPredicate)) {
    return new Error('`values` or `defaultValues` must be an object of numbers');
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

function isNumber(number) {
  return typeof number === 'number';
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
  if (typeof object !== 'object') {
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

var util = {
  arrayOf: arrayOf,
  autobind: autobind,
  captialize: captialize,
  clamp: clamp,
  distanceTo: distanceTo,
  extend: extend,
  isEmpty: isEmpty,
  isNumber: isNumber,
  objectOf: objectOf,
  omit: omit
};

exports['default'] = util;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _InputRange = require('./InputRange');

var _InputRange2 = _interopRequireDefault(_InputRange);

exports['default'] = _InputRange2['default'];
module.exports = exports['default'];

},{"./InputRange":1}]},{},[8])(8)
});