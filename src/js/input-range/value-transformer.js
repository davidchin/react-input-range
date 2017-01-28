import { clamp } from '../utils';

/**
 * Convert a point into a percentage value
 * @ignore
 * @param {Point} position
 * @param {ClientRect} clientRect
 * @return {number} Percentage value
 */
export function getPercentageFromPosition(position, clientRect) {
  const length = clientRect.width;
  const sizePerc = position.x / length;

  return sizePerc || 0;
}

/**
 * Convert a point into a model value
 * @ignore
 * @param {Point} position
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {number}
 */
export function getValueFromPosition(position, minValue, maxValue, clientRect) {
  const sizePerc = getPercentageFromPosition(position, clientRect);
  const valueDiff = maxValue - minValue;

  return minValue + (valueDiff * sizePerc);
}

/**
 * Convert props into a range value
 * @ignore
 * @param {Object} props
 * @param {boolean} isMultiValue
 * @return {Range}
 */
export function getValueFromProps(props, isMultiValue) {
  if (isMultiValue) {
    return { ...props.value };
  }

  return {
    min: props.minValue,
    max: props.value,
  };
}

/**
 * Convert a model value into a percentage value
 * @ignore
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @return {number}
 */
export function getPercentageFromValue(value, minValue, maxValue) {
  const validValue = clamp(value, minValue, maxValue);
  const valueDiff = maxValue - minValue;
  const valuePerc = (validValue - minValue) / valueDiff;

  return valuePerc || 0;
}

/**
 * Convert model values into percentage values
 * @ignore
 * @param {Range} values
 * @param {number} minValue
 * @param {number} maxValue
 * @return {Range}
 */
export function getPercentagesFromValues(values, minValue, maxValue) {
  return {
    min: getPercentageFromValue(values.min, minValue, maxValue),
    max: getPercentageFromValue(values.max, minValue, maxValue),
  };
}

/**
 * Convert a value into a point
 * @ignore
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {Point} Position
 */
export function getPositionFromValue(value, minValue, maxValue, clientRect) {
  const length = clientRect.width;
  const valuePerc = getPercentageFromValue(value, minValue, maxValue);
  const positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0,
  };
}

/**
 * Convert a range of values into points
 * @ignore
 * @param {Range} values
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {Range}
 */
export function getPositionsFromValues(values, minValue, maxValue, clientRect) {
  return {
    min: getPositionFromValue(values.min, minValue, maxValue, clientRect),
    max: getPositionFromValue(values.max, minValue, maxValue, clientRect),
  };
}

/**
 * Convert an event into a point
 * @ignore
 * @param {Event} event
 * @param {ClientRect} clientRect
 * @return {Point}
 */
export function getPositionFromEvent(event, clientRect) {
  const length = clientRect.width;
  const { clientX } = event.touches ? event.touches[0] : event;

  return {
    x: clamp(clientX - clientRect.left, 0, length),
    y: 0,
  };
}

/**
 * Convert a value into a step value
 * @ignore
 * @param {number} value
 * @param {number} valuePerStep
 * @return {number}
 */
export function getStepValueFromValue(value, valuePerStep) {
  return Math.round(value / valuePerStep) * valuePerStep;
}
