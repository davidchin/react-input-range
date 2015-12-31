/**
 * @module InputRange/maxMinValuePropType
 */

import { isNumber, objectOf } from './util';

/**
 * A prop type accepting a range of numeric values or a single numeric value
 * @param {Object} props - React component props
 * @return {?Error} Return Error if validation fails
 */
export function maxMinValuePropType(props) {
  const maxValue = props.maxValue;
  const minValue = props.minValue;
  const value = props.value;
  const defaultValue = props.defaultValue;
  const isValueNumber = isNumber(value);
  const isDefaultValueNumber = isNumber(defaultValue);
  const isValueNumberObject = objectOf(value, isNumber);
  const isDefaultValueNumberObject = objectOf(defaultValue, isNumber);

  if (value === undefined) {
    return new Error('`value` must be defined');
  }

  if (!isValueNumber && !isDefaultValueNumber &&
      !isValueNumberObject && !isDefaultValueNumberObject) {
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
