import { clamp, isEmpty, isNumber, objectOf } from '../utils';

/**
 * Convert position into percentage value
 * @ignore
 * @param {Point} position
 * @param {ClientRect} trackClientRect
 * @return {number} Percentage value
 */
export function percentageFromPosition(position, trackClientRect) {
  const length = trackClientRect.width;
  const sizePerc = position.x / length;

  return sizePerc || 0;
}

/**
 * Convert position into model value
 * @ignore
 * @param {Point} position
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} trackClientRect
 * @return {number} Model value
 */
export function valueFromPosition(position, minValue, maxValue, trackClientRect) {
  const sizePerc = percentageFromPosition(position, trackClientRect);
  const valueDiff = maxValue - minValue;

  return minValue + (valueDiff * sizePerc);
}

/**
 * Extract values from props
 * @ignore
 * @param {Object} props
 * @param {boolean} isMultiValue
 * @return {Range} Range values
 */
export function valuesFromProps(props, isMultiValue) {
  if (isMultiValue) {
    let values = props.value;

    if (isEmpty(values) || !objectOf(values, isNumber)) {
      values = props.defaultValue;
    }

    return Object.create(values);
  }

  const value = isNumber(props.value) ? props.value : props.defaultValue;

  return {
    min: props.minValue,
    max: value,
  };
}

/**
 * Convert value into percentage value
 * @ignore
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @return {number} Percentage value
 */
export function percentageFromValue(value, minValue, maxValue) {
  const validValue = clamp(value, minValue, maxValue);
  const valueDiff = maxValue - minValue;
  const valuePerc = (validValue - minValue) / valueDiff;

  return valuePerc || 0;
}

/**
 * Convert values into percentage values
 * @ignore
 * @param {Range} values
 * @param {number} minValue
 * @param {number} maxValue
 * @return {Range} Percentage values
 */
export function percentagesFromValues(values, minValue, maxValue) {
  return {
    min: percentageFromValue(values.min, minValue, maxValue),
    max: percentageFromValue(values.max, minValue, maxValue),
  };
}

/**
 * Convert value into position
 * @ignore
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} trackClientRect
 * @return {Point} Position
 */
export function positionFromValue(value, minValue, maxValue, trackClientRect) {
  const length = trackClientRect.width;
  const valuePerc = percentageFromValue(value, minValue, maxValue);
  const positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0,
  };
}

/**
 * Convert a range of values into positions
 * @ignore
 * @param {Range} values
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} trackClientRect
 * @return {Object<string, Point>}
 */
export function positionsFromValues(values, minValue, maxValue, trackClientRect) {
  return {
    min: positionFromValue(values.min, minValue, maxValue, trackClientRect),
    max: positionFromValue(values.max, minValue, maxValue, trackClientRect),
  };
}

/**
 * Extract a position from an event
 * @ignore
 * @param {Event} event
 * @param {ClientRect} trackClientRect
 * @return {Point}
 */
export function positionFromEvent(event, trackClientRect) {
  const length = trackClientRect.width;
  const { clientX } = event.touches ? event.touches[0] : event;

  return {
    x: clamp(clientX - trackClientRect.left, 0, length),
    y: 0,
  };
}

/**
 * Convert a value into a step value
 * @ignore
 * @param {number} value
 * @param {number} valuePerStep
 * @return {number} Step value
 */
export function stepValueFromValue(value, valuePerStep) {
  return Math.round(value / valuePerStep) * valuePerStep;
}
