import React from 'react';
import Slider from './Slider';
import Track from './Track';
import Label from './Label';
import defaultClassNames from './defaultClassNames';
import valueTransformer from './valueTransformer';
import { autobind, captialize, distanceTo, isObject, length } from './util';
import { maxMinValuePropType } from './propTypes';

// Constants
const KeyCode = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
};

// Functions
function isWithinRange(inputRange, values) {
  const { props } = inputRange;

  if (inputRange.isMultiValue) {
    return values.min >= props.minValue &&
           values.max <= props.maxValue &&
           values.min < values.max;
  }

  return values.max >= props.minValue &&
         values.max <= props.maxValue;
}

function hasStepDifference(inputRange, values) {
  const { props } = inputRange;
  const currentValues = valueTransformer.valuesFromProps(inputRange);

  return length(values.min, currentValues.min) >= props.step ||
         length(values.max, currentValues.max) >= props.step;
}

function shouldUpdate(inputRange, values) {
  return isWithinRange(inputRange, values) &&
         hasStepDifference(inputRange, values);
}

function getComponentClassName(inputRange) {
  const { props } = inputRange;

  if (!props.disabled) {
    return props.classNames.component;
  }

  return `${props.classNames.component} is-disabled`;
}

function getKeyFromSlider(inputRange, slider) {
  if (slider === inputRange.refs.sliderMin) {
    return 'min';
  }

  return 'max';
}

function getKeys(inputRange) {
  if (inputRange.isMultiValue) {
    return ['max', 'min'];
  }

  return ['max'];
}

function getKeyByPosition(inputRange, position) {
  const values = valueTransformer.valuesFromProps(inputRange);
  const positions = valueTransformer.positionsFromValues(inputRange, values);

  if (inputRange.isMultiValue) {
    const distanceToMin = distanceTo(position, positions.min);
    const distanceToMax = distanceTo(position, positions.max);

    if (distanceToMin < distanceToMax) {
      return 'min';
    }
  }

  return 'max';
}

function renderSliders(inputRange) {
  const { classNames } = inputRange.props;
  const sliders = [];
  const keys = getKeys(inputRange);
  const values = valueTransformer.valuesFromProps(inputRange);
  const percentages = valueTransformer.percentagesFromValues(inputRange, values);

  for (const key of keys) {
    const value = values[key];
    const percentage = percentages[key];
    const ref = `slider${captialize(key)}`;

    let { maxValue, minValue } = inputRange.props;

    if (key === 'min') {
      maxValue = values.max;
    } else {
      minValue = values.min;
    }

    const slider = (
      <Slider
        classNames={ classNames }
        key={ key }
        maxValue={ maxValue }
        minValue={ minValue }
        onSliderKeyDown={ inputRange.handleSliderKeyDown }
        onSliderMouseMove={ inputRange.handleSliderMouseMove }
        percentage={ percentage }
        ref={ ref }
        type={ key }
        value={ value } />
    );

    sliders.push(slider);
  }

  return sliders;
}

function renderHiddenInputs(inputRange) {
  const inputs = [];
  const keys = getKeys(inputRange);

  for (const key of keys) {
    const name = inputRange.isMultiValue ? `${inputRange.props.name}${captialize(key)}` : inputRange.props.name;

    const input = (
      <input type="hidden" name={ name }/>
    );
  }

  return inputs;
}

// Class
class InputRange extends React.Component {
  constructor(props) {
    super(props);

    // Auto-bind
    autobind([
      'handleSliderMouseMove',
      'handleSliderKeyDown',
      'handleTrackMouseDown',
    ], this);
  }

  // Getters / Setters
  get trackClientRect() {
    const { track } = this.refs;

    if (track) {
      return track.clientRect;
    }

    return {
      height: 0,
      left: 0,
      top: 0,
      width: 0,
    };
  }

  get isMultiValue() {
    return isObject(this.props.value) ||
           isObject(this.props.defaultValue);
  }

  // Methods
  updatePosition(key, position) {
    const values = valueTransformer.valuesFromProps(this);
    const positions = valueTransformer.positionsFromValues(this, values);

    positions[key] = position;

    this.updatePositions(positions);
  }

  updatePositions(positions) {
    const values = {
      min: valueTransformer.valueFromPosition(this, positions.min),
      max: valueTransformer.valueFromPosition(this, positions.max),
    };

    const transformedValues = {
      min: valueTransformer.stepValueFromValue(this, values.min),
      max: valueTransformer.stepValueFromValue(this, values.max),
    };

    this.updateValues(transformedValues);
  }

  updateValue(key, value) {
    const values = valueTransformer.valuesFromProps(this);

    values[key] = value;

    this.updateValues(values);
  }

  updateValues(values) {
    if (!shouldUpdate(this, values)) {
      return;
    }

    if (this.isMultiValue) {
      this.props.onChange(this, values);
    } else {
      this.props.onChange(this, values.max);
    }
  }

  incrementValue(key) {
    const values = valueTransformer.valuesFromProps(this);
    const value = values[key] + this.props.step;

    this.updateValue(key, value);
  }

  decrementValue(key) {
    const values = valueTransformer.valuesFromProps(this);
    const value = values[key] - this.props.step;

    this.updateValue(key, value);
  }

  // Handlers
  handleSliderMouseMove(slider, event) {
    if (this.props.disabled) {
      return;
    }

    const key = getKeyFromSlider(this, slider);
    const position = valueTransformer.positionFromEvent(this, event);

    this.updatePosition(key, position);
  }

  handleSliderKeyDown(slider, event) {
    if (this.props.disabled) {
      return;
    }

    const key = getKeyFromSlider(this, slider);

    switch (event.keyCode) {
    case KeyCode.LEFT_ARROW:
      this.decrementValue(key);
      break;

    case KeyCode.RIGHT_ARROW:
      this.incrementValue(key);
      break;

    default:
      break;
    }
  }

  handleTrackMouseDown(track, position) {
    if (this.props.disabled) {
      return;
    }

    const key = getKeyByPosition(this, position);

    this.updatePosition(key, position);
  }

  // Render
  render() {
    const { classNames } = this.props;
    const componentClassName = getComponentClassName(this);
    const values = valueTransformer.valuesFromProps(this);
    const percentages = valueTransformer.percentagesFromValues(this, values);

    return (
      <div
        aria-disabled={ this.props.disabled }
        ref="inputRange"
        className={ componentClassName }>
        <Label
          className={ classNames.labelMin }
          containerClassName={ classNames.labelContainer }>
          { this.props.minValue }
        </Label>

        <Track
          classNames={ classNames }
          ref="track"
          percentages={ percentages }
          onTrackMouseDown={ this.handleTrackMouseDown }>

          { renderSliders(this) }
        </Track>

        <Label
          className={ classNames.labelMax }
          containerClassName={ classNames.labelContainer }>
          { this.props.maxValue }
        </Label>

        { renderHiddenInputs(this) }
      </div>
    );
  }
}

InputRange.propTypes = {
  ariaLabelledby: React.PropTypes.string,
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
  defaultValue: maxMinValuePropType,
  disabled: React.PropTypes.bool,
  maxValue: maxMinValuePropType,
  minValue: maxMinValuePropType,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  step: React.PropTypes.number,
  value: maxMinValuePropType,
};

InputRange.defaultProps = {
  classNames: defaultClassNames,
  defaultValue: 0,
  disabled: false,
  maxValue: 10,
  minValue: 0,
  step: 1,
  value: null,
};

export default InputRange;
