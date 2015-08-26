import { clamp } from 'InputRangeUtil';

class InputRangeValueTransformer {
  constructor(component) {
    this.component = component;
  }

  valueFromPosition(position) {
    const sizePerc = this.percentageFromPosition(position);
    const valueDiff = this.component.props.maxValue - this.component.props.minValue;
    const value = this.component.props.minValue + valueDiff * sizePerc;

    return value;
  }

  positionFromValue(value) {
    const length = this.component.trackClientRect.width;
    const valuePerc = this.percentageFromValue(value);
    const positionValue = valuePerc * length;

    return {
      x: positionValue,
      y: 0,
    };
  }

  positionFromEvent(event) {
    const trackClientRect = this.component.trackClientRect;
    const length = trackClientRect.width;
    const position = {
      x: clamp(event.clientX - trackClientRect.left, 0, length),
      y: 0,
    };

    return position;
  }

  percentageFromPosition(position) {
    const length = this.component.trackClientRect.width;
    const sizePerc = position.x / length;

    return sizePerc || 0;
  }

  percentageFromValue(value) {
    const validValue = clamp(value, this.component.props.minValue, this.component.props.maxValue);
    const valueDiff = this.component.props.maxValue - this.component.props.minValue;
    const valuePerc = (validValue - this.component.props.minValue) / valueDiff;

    return valuePerc || 0;
  }

  stepValueFromValue(value) {
    return Math.round(value / this.component.props.step) * this.component.props.step;
  }
}

export default InputRangeValueTransformer;
