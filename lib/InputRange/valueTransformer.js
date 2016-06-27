/**
 * @module InputRange/valueTransformer
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _util = require('./util');

/**
 * Convert position into percentage value
 * @static
 * @param {InputRange} inputRange
 * @param {Point} position
 * @return {number} Percentage value
 */
function percentageFromPosition(inputRange, position) {
  var length = inputRange.trackClientRect.width;
  var sizePerc = position.x / length;

  return sizePerc || 0;
}

/**
 * Convert position into model value
 * @static
 * @param {InputRange} inputRange
 * @param {Point} position
 * @return {number} Model value
 */
function valueFromPosition(inputRange, position) {
  var sizePerc = percentageFromPosition(inputRange, position);
  var valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  var value = inputRange.props.minValue + valueDiff * sizePerc;

  return value;
}

/**
 * Extract values from props
 * @static
 * @param {InputRange} inputRange
 * @param {Point} [props=inputRange.props]
 * @return {Range} Range values
 */
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

/**
 * Convert value into percentage value
 * @static
 * @param {InputRange} inputRange
 * @param {number} value
 * @return {number} Percentage value
 */
function percentageFromValue(inputRange, value) {
  var validValue = (0, _util.clamp)(value, inputRange.props.minValue, inputRange.props.maxValue);
  var valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  var valuePerc = (validValue - inputRange.props.minValue) / valueDiff;

  return valuePerc || 0;
}

/**
 * Convert values into percentage values
 * @static
 * @param {InputRange} inputRange
 * @param {Range} values
 * @return {Range} Percentage values
 */
function percentagesFromValues(inputRange, values) {
  var percentages = {
    min: percentageFromValue(inputRange, values.min),
    max: percentageFromValue(inputRange, values.max)
  };

  return percentages;
}

/**
 * Convert value into position
 * @static
 * @param {InputRange} inputRange
 * @param {number} value
 * @return {Point} Position
 */
function positionFromValue(inputRange, value) {
  var length = inputRange.trackClientRect.width;
  var valuePerc = percentageFromValue(inputRange, value);
  var positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0
  };
}

/**
 * Convert a range of values into positions
 * @static
 * @param {InputRange} inputRange
 * @param {Range} values
 * @return {Object.<string, Point>}
 */
function positionsFromValues(inputRange, values) {
  var positions = {
    min: positionFromValue(inputRange, values.min),
    max: positionFromValue(inputRange, values.max)
  };

  return positions;
}

/**
 * Extract a position from an event
 * @static
 * @param {InputRange} inputRange
 * @param {Event} event
 * @return {Point}
 */
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

/**
 * Convert a value into a step value
 * @static
 * @param {InputRange} inputRange
 * @param {number} value
 * @return {number} Step value
 */
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