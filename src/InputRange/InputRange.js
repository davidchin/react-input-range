import React from 'react';
import Slider from './Slider';
import Track from './Track';
import ValueTransformer from './ValueTransformer';
import { autobind, captialize, clamp, distanceTo, extend, isEmpty, isNumber, omit } from './util';
import { maxMinValuePropType } from './propTypes';
import defaultClassNames from './defaultClassNames';

// Helpers
function isNewStep(component, value, oldValue) {
  return Math.abs(value - oldValue) >= component.props.step;
}

function getKeyBySlider(component, slider) {
  if (slider === component.refs.sliderMin) {
    return 'min';
  }

  return 'max';
}

function getKeyByPosition(component, position) {
  if (component.isMultiValue) {
    const distanceToMin = distanceTo(position, component.state.positions.min);
    const distanceToMax = distanceTo(position, component.state.positions.max);

    if (distanceToMin < distanceToMax) {
      return 'min';
    }
  }

  return 'max';
}

function getKeys(component) {
  if (component.isMultiValue) {
    return ['max', 'min'];
  }

  return ['max'];
}

// Constants
const KeyCode = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
};

// Class
class InputRange extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    const state = {
      didChange: false,
      percentages: {
        min: 0,
        max: 0,
      },
      positions: {
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
      },
      values: {
        min: 0,
        max: 0,
      },
    };

    this.state = state;
    this.valueTransformer = new ValueTransformer(this);
    this.isMultiValue = this.props.hasOwnProperty('defaultValues') ||
                        this.props.hasOwnProperty('values');

    // Auto-bind
    autobind([
      'handleSliderMouseMove',
      'handleSliderKeyDown',
      'handleTrackMouseDown',
    ], this);
  }

  // Life Cycle
  componentDidMount() {
    this.setPositionsByProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const props = omit(nextProps, ['defaultValue', 'defaultValues']);

    this.setPositionsByProps(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props;
    const currentState = this.state;
    const shouldUpdate = (
      currentState.values.min !== nextState.values.min ||
      currentState.values.max !== nextState.values.max ||
      currentState.value !== nextState.value ||
      currentProps.minValue !== nextProps.minValue ||
      currentProps.maxValue !== nextProps.maxValue
    );

    return shouldUpdate;
  }

  componentDidUpdate() {
    if (this.props.onChange && this.state.didChange) {
      let results = this.state.values.max;

      if (this.isMultiValue) {
        results = this.state.values;
      }

      this.props.onChange(this, results);
    }

    this.setState({
      didChange: true,
    });
  }

  // Getters / Setters
  get trackClientRect() {
    const track = this.refs.track;

    return track && track.clientRect;
  }

  // Methods
  setPositions(positions) {
    const values = {
      min: this.valueTransformer.valueFromPosition(positions.min),
      max: this.valueTransformer.valueFromPosition(positions.max),
    };

    const transformedValues = {
      min: this.valueTransformer.stepValueFromValue(values.min),
      max: this.valueTransformer.stepValueFromValue(values.max),
    };

    const transformedPositions = {
      min: this.valueTransformer.positionFromValue(transformedValues.min),
      max: this.valueTransformer.positionFromValue(transformedValues.max),
    };

    const transformedPercentages = {
      min: this.valueTransformer.percentageFromPosition(transformedPositions.min),
      max: this.valueTransformer.percentageFromPosition(transformedPositions.max),
    };

    const isStep = isNewStep(this, transformedValues.min, this.state.values.min) ||
                   isNewStep(this, transformedValues.max, this.state.values.max);
    const isValid = !this.isMultiValue || transformedValues.min < transformedValues.max;
    const shouldUpdate = isStep && isValid;

    if (shouldUpdate) {
      const state = {
        percentages: transformedPercentages,
        positions: transformedPositions,
        values: transformedValues,
      };

      this.setState(state);
    }
  }

  setPosition(slider, position) {
    const key = slider && slider.props.type || getKeyByPosition(this, position);
    const positions = extend({}, this.state.positions, {
      [key]: position,
    });

    this.setPositions(positions);
  }

  setPositionByValue(slider, value) {
    if (!isNumber(value)) {
      return;
    }

    const validValue = clamp(value, this.props.minValue, this.props.maxValue);
    const position = this.valueTransformer.positionFromValue(validValue);

    this.setPosition(slider, position);
  }

  setPositionsByValues(values) {
    if (!values || !isNumber(values.min) || !isNumber(values.max)) {
      return;
    }

    const validValues = {
      min: clamp(values.min, this.props.minValue, this.props.maxValue),
      max: clamp(values.max, this.props.minValue, this.props.maxValue),
    };

    const positions = {
      min: this.valueTransformer.positionFromValue(validValues.min),
      max: this.valueTransformer.positionFromValue(validValues.max),
    };

    this.setPositions(positions);
  }

  setPositionsByProps(props) {
    if (this.isMultiValue) {
      const values = !isEmpty(props.values) ? props.values : props.defaultValues;

      this.setPositionsByValues(values);
    } else {
      const value = isNumber(props.value) ? props.value : props.defaultValue;

      this.setPositionByValue(this.refs.sliderMax, value);
    }
  }

  incrementValue(slider) {
    const key = getKeyBySlider(this, slider);
    const value = this.state.values[key] + this.props.step;

    this.setPositionByValue(slider, value);
  }

  decrementValue(slider) {
    const key = getKeyBySlider(this, slider);
    const value = this.state.values[key] - this.props.step;

    this.setPositionByValue(slider, value);
  }

  // Handlers
  handleSliderMouseMove(slider, event) {
    const position = this.valueTransformer.positionFromEvent(event);

    this.setPosition(slider, position);
  }

  handleSliderKeyDown(slider, event) {
    switch (event.keyCode) {
    case KeyCode.LEFT_ARROW:
      this.decrementValue(slider);
      break;

    case KeyCode.RIGHT_ARROW:
      this.incrementValue(slider);
      break;

    default:
      break;
    }
  }

  handleTrackMouseDown(track, position) {
    this.setPosition(null, position);
  }

  // Render
  renderSliders() {
    const classNames = this.props.classNames;
    const sliders = [];
    const keys = getKeys(this);

    for (const key of keys) {
      const value = this.state.values[key];
      const percentage = this.state.percentages[key];
      const ref = `slider${captialize(key)}`;

      let { maxValue, minValue } = this.props;

      if (key === 'min') {
        maxValue = this.state.values.max;
      } else {
        minValue = this.state.values.min;
      }

      const slider = (
        <Slider
          classNames={ classNames }
          key={ key }
          maxValue={ maxValue }
          minValue={ minValue }
          onSliderKeyDown={ this.handleSliderKeyDown }
          onSliderMouseMove={ this.handleSliderMouseMove }
          percentage={ percentage }
          ref={ ref }
          type={ key }
          value={ value } />
      );

      sliders.push(slider);
    }

    return sliders;
  }

  renderHiddenInputs() {
    const inputs = [];
    const keys = getKeys(this);

    for (const key of keys) {
      const name = this.isMultiValue ? `${this.props.name}${captialize(key)}` : this.props.name;

      const input = (
        <input type="hidden" name={ name }/>
      );
    }

    return inputs;
  }

  render() {
    const classNames = this.props.classNames;

    return (
      <div ref="inputRange" className={ classNames.component }>
        <span className={ classNames.labelMin }>
          <span className={ classNames.labelContainer }>
            { this.props.minValue }
          </span>
        </span>

        <Track
          classNames={ classNames }
          ref="track"
          percentages={ this.state.percentages }
          onTrackMouseDown={ this.handleTrackMouseDown }>

          { this.renderSliders() }
        </Track>

        <span className={ classNames.labelMax }>
          <span className={ classNames.labelContainer }>
            { this.props.maxValue }
          </span>
        </span>

        { this.renderHiddenInputs() }
      </div>
    );
  }
}

InputRange.propTypes = {
  ariaLabelledby: React.PropTypes.string,
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
  defaultValue: maxMinValuePropType,
  defaultValues: maxMinValuePropType,
  maxValue: maxMinValuePropType,
  minValue: maxMinValuePropType,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  step: React.PropTypes.number,
  value: maxMinValuePropType,
  values: maxMinValuePropType,
};

InputRange.defaultProps = {
  classNames: defaultClassNames,
  minValue: 0,
  maxValue: 10,
  step: 1,
};

export default InputRange;
