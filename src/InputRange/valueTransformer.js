import { clamp, isEmpty, isNumber, objectOf } from './util';

// Functions
function percentageFromPosition(inputRange, position) {
  const length = inputRange.trackClientRect.width;
  const sizePerc = position.x / length;

  return sizePerc || 0;
}

function valueFromPosition(inputRange, position) {
  const sizePerc = percentageFromPosition(inputRange, position);
  const valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  const value = inputRange.props.minValue + valueDiff * sizePerc;

  return value;
}

function valuesFromProps(inputRange, { props } = inputRange) {
  if (inputRange.isMultiValue) {
    let values = props.values;

    if (isEmpty(values) || !objectOf(values, isNumber)) {
      values = props.defaultValues;
    }

    return Object.create(values);
  }

  const value = isNumber(props.value) ? props.value : props.defaultValue;

  return {
    min: props.minValue,
    max: value,
  };
}

function percentageFromValue(inputRange, value) {
  const validValue = clamp(value, inputRange.props.minValue, inputRange.props.maxValue);
  const valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  const valuePerc = (validValue - inputRange.props.minValue) / valueDiff;

  return valuePerc || 0;
}

function percentagesFromValues(inputRange, values) {
  const percentages = {
    min: percentageFromValue(inputRange, values.min),
    max: percentageFromValue(inputRange, values.max),
  };

  return percentages;
}

function positionFromValue(inputRange, value) {
  const length = inputRange.trackClientRect.width;
  const valuePerc = percentageFromValue(inputRange, value);
  const positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0,
  };
}

function positionsFromValues(inputRange, values) {
  const positions = {
    min: positionFromValue(inputRange, values.min),
    max: positionFromValue(inputRange, values.max),
  };

  return positions;
}

function positionFromEvent(inputRange, event) {
  const trackClientRect = inputRange.trackClientRect;
  const length = trackClientRect.width;
  const { clientX } = event.touches ? event.touches[0] : event;
  const position = {
    x: clamp(clientX - trackClientRect.left, 0, length),
    y: 0,
  };

  return position;
}

function stepValueFromValue(inputRange, value) {
  return Math.round(value / inputRange.props.step) * inputRange.props.step;
}

// Module
const valueTransformer = {
  percentageFromPosition,
  percentageFromValue,
  percentagesFromValues,
  positionFromEvent,
  positionFromValue,
  positionsFromValues,
  stepValueFromValue,
  valueFromPosition,
  valuesFromProps,
};

export default valueTransformer;
