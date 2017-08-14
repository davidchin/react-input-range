import PropTypes from 'prop-types';

/**
 * Custom prop type for minimum range size
 *
 * @param {Object} props - React component props
 * @param {string} propName
 * @param {string} componentName
 * @return {?Error} Return Error if validation fails
 */
export default function minimumRangePropType(props, propName, componentName, ...rest) {
  if (props[propName]) {
    if (props[propName] < 0) {
      return new Error('Minimum range size must be greater than or equal to 0');
    }
    if (props[propName] % props.step !== 0) {
      return new Error('Minimum range size must be a multiple of the step size');
    }
  }
  return PropTypes.number(props, propName, componentName, ...rest);
}
