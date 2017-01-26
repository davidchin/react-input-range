import { isNumber } from '../utils';

/**
 * @ignore
 * @param {Object} props - React component props
 * @return {?Error} Return Error if validation fails
 */
export default function rangePropType(props) {
  const { maxValue, minValue } = props;

  if (!isNumber(minValue) || !isNumber(maxValue)) {
    return new Error('"minValue" and "maxValue" must be a number');
  }

  if (minValue >= maxValue) {
    return new Error('"minValue" must be smaller than "maxValue"');
  }
}
