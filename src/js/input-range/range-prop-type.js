import { isNumber, objectOf } from '../utils';

/**
 * A prop type accepting a range of numeric values or a single numeric value
 * @ignore
 * @param {Object} props - React component props
 * @return {?Error} Return Error if validation fails
 */
export default function rangePropType(props) {
  const { defaultValue, maxValue, minValue, value } = props;

  if (value === undefined) {
    return new Error('`value` must be defined');
  }

  if (!isNumber(value) && !isNumber(defaultValue) &&
      !objectOf(value, isNumber) && !objectOf(defaultValue, isNumber)) {
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

  return undefined;
}
