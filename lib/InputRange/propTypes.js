/**
 * @module InputRange/maxMinValuePropType
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.maxMinValuePropType = maxMinValuePropType;

var _util = require('./util');

/**
 * A prop type accepting a range of numeric values or a single numeric value
 * @param {Object} props - React component props
 * @return {?Error} Return Error if validation fails
 */

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