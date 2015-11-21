import { objectOf } from './util';

function numberPredicate(value) {
  return typeof value === 'number';
}

export function maxMinValuePropType(props) {
  const maxValue = props.maxValue;
  const minValue = props.minValue;
  const value = props.value;
  const values = props.values;
  const defaultValue = props.defaultValue;
  const defaultValues = props.defaultValues;

  if (!values &&
      !defaultValues &&
      !numberPredicate(value) &&
      !numberPredicate(defaultValue)) {
    return new Error('`value` or `defaultValue` must be a number');
  }

  if (!value &&
      !defaultValue &&
      !objectOf(values, numberPredicate) &&
      !objectOf(defaultValues, numberPredicate)) {
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
