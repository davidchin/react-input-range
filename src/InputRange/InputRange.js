/**
 * @module InputRange
 */

import React from 'react';
import Slider from './Slider';
import Track from './Track';
import Label from './Label';
import defaultClassNames from './defaultClassNames';
import valueTransformer from './valueTransformer';
import { autobind, captialize, distanceTo, isDefined, isObject, length } from './util';
import { maxMinValuePropType } from './propTypes';

/**
 * A map for storing internal members
 * @const {WeakMap}
 */
const internals = new WeakMap();

/**
 * An object storing keyboard key codes
 * @const {Object.<string, number>}
 */
const KeyCode = {
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  UP_ARROW: 38,
};

/**
 * Check if values are within the max and min range of inputRange
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Range} values - Min/max value of sliders
 * @return {boolean} True if within range
 */
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

/**
 * Check if the difference between values and the current values of inputRange
 * is greater or equal to its step amount
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Range} values - Min/max value of sliders
 * @return {boolean} True if difference is greater or equal to step amount
 */
function hasStepDifference(inputRange, values) {
  const { props } = inputRange;
  const currentValues = valueTransformer.valuesFromProps(inputRange);

  return length(values.min, currentValues.min) >= props.step ||
         length(values.max, currentValues.max) >= props.step;
}

/**
 * Check if inputRange should update with new values
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Range} values - Min/max value of sliders
 * @return {boolean} True if inputRange should update
 */
function shouldUpdate(inputRange, values) {
  return isWithinRange(inputRange, values) &&
         hasStepDifference(inputRange, values);
}

/**
 * Get the owner document of inputRange
 * @private
 * @param {InputRange} inputRange - React component
 * @return {Document} Document
 */
function getDocument(inputRange) {
  const { inputRange: { ownerDocument } } = inputRange.refs;

  return ownerDocument;
}

/**
 * Get the class name(s) of inputRange based on its props
 * @private
 * @param {InputRange} inputRange - React component
 * @return {string} A list of class names delimited with spaces
 */
function getComponentClassName(inputRange) {
  const { props } = inputRange;

  if (!props.disabled) {
    return props.classNames.component;
  }

  return `${props.classNames.component} is-disabled`;
}

/**
 * Get the key name of a slider
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Slider} slider - React component
 * @return {string} Key name
 */
function getKeyFromSlider(inputRange, slider) {
  if (slider === inputRange.refs.sliderMin) {
    return 'min';
  }

  return 'max';
}

/**
 * Get all slider keys of inputRange
 * @private
 * @param {InputRange} inputRange - React component
 * @return {Array.<string>} Key names
 */
function getKeys(inputRange) {
  if (inputRange.isMultiValue) {
    return ['min', 'max'];
  }

  return ['max'];
}

/**
 * Get the key name of a slider that's the closest to a point
 * @private
 * @param {InputRange} inputRange - React component
 * @param {Point} position - x/y
 * @return {string} Key name
 */
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

/**
 * Get an array of slider HTML for rendering
 * @private
 * @param {InputRange} inputRange - React component
 * @return {Array.<string>} Array of HTML
 */
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

/**
 * Get an array of hidden input HTML for rendering
 * @private
 * @param {InputRange} inputRange - React component
 * @return {Array.<string>} Array of HTML
 */
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

/**
 * InputRange React component
 * @class
 * @extends React.Component
 * @param {Object} props - React component props
 */
export default class InputRange extends React.Component {
  constructor(props) {
    super(props);

    // Private
    internals.set(this, {});

    // Auto-bind
    autobind([
      'handleInteractionEnd',
      'handleInteractionStart',
      'handleKeyDown',
      'handleKeyUp',
      'handleMouseDown',
      'handleMouseUp',
      'handleSliderKeyDown',
      'handleSliderMouseMove',
      'handleTouchStart',
      'handleTouchEnd',
      'handleTrackMouseDown',
    ], this);
  }

  /**
   * Return the clientRect of the component's track
   * @member {ClientRect}
   */
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

  /**
   * Return true if the component accepts a range of values
   * @member {boolean}
   */
  get isMultiValue() {
    return isObject(this.props.value) ||
           isObject(this.props.defaultValue);
  }

  /**
   * Update the position of a slider by key
   * @param {string} key - min/max
   * @param {Point} position x/y
   */
  updatePosition(key, position) {
    const values = valueTransformer.valuesFromProps(this);
    const positions = valueTransformer.positionsFromValues(this, values);

    positions[key] = position;

    this.updatePositions(positions);
  }

  /**
   * Update the position of sliders
   * @param {Object} positions
   * @param {Point} positions.min
   * @param {Point} positions.max
   */
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

  /**
   * Update the value of a slider by key
   * @param {string} key - max/min
   * @param {number} value - New value
   */
  updateValue(key, value) {
    const values = valueTransformer.valuesFromProps(this);

    values[key] = value;

    this.updateValues(values);
  }

  /**
   * Update the values of all sliders
   * @param {Object|number} values - Object if multi-value, number if single-value
   */
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

  /**
   * Increment the value of a slider by key name
   * @param {string} key - max/min
   */
  incrementValue(key) {
    const values = valueTransformer.valuesFromProps(this);
    const value = values[key] + this.props.step;

    this.updateValue(key, value);
  }

  /**
   * Decrement the value of a slider by key name
   * @param {string} key - max/min
   */
  decrementValue(key) {
    const values = valueTransformer.valuesFromProps(this);
    const value = values[key] - this.props.step;

    this.updateValue(key, value);
  }

  /**
   * Handle any mousemove event received by the slider
   * @param {SyntheticEvent} event - User event
   * @param {Slider} slider - React component
   */
  handleSliderMouseMove(event, slider) {
    if (this.props.disabled) {
      return;
    }

    const key = getKeyFromSlider(this, slider);
    const position = valueTransformer.positionFromEvent(this, event);

    this.updatePosition(key, position);
  }

  /**
   * Handle any keydown event received by the slider
   * @param {SyntheticEvent} event - User event
   * @param {Slider} slider - React component
   */
  handleSliderKeyDown(event, slider) {
    if (this.props.disabled) {
      return;
    }

    const key = getKeyFromSlider(this, slider);

    switch (event.keyCode) {
    case KeyCode.LEFT_ARROW:
    case KeyCode.DOWN_ARROW:
      event.preventDefault();
      this.decrementValue(key);
      break;

    case KeyCode.RIGHT_ARROW:
    case KeyCode.UP_ARROW:
      event.preventDefault();
      this.incrementValue(key);
      break;

    default:
      break;
    }
  }

  /**
   * Handle any mousedown event received by the track
   * @param {SyntheticEvent} event - User event
   * @param {Slider} slider - React component
   * @param {Point} position - Mousedown position
   */
  handleTrackMouseDown(event, track, position) {
    if (this.props.disabled) {
      return;
    }

    event.preventDefault();

    const key = getKeyByPosition(this, position);

    this.updatePosition(key, position);
  }

  /**
   * Handle the start of any user-triggered event
   * @param {SyntheticEvent} event - User event
   */
  handleInteractionStart() {
    const _this = internals.get(this);

    if (!this.props.onChangeComplete || isDefined(_this.startValue)) {
      return;
    }

    _this.startValue = this.props.value;
  }

  /**
   * Handle the end of any user-triggered event
   * @param {SyntheticEvent} event - User event
   */
  handleInteractionEnd() {
    const _this = internals.get(this);

    if (!this.props.onChangeComplete || !isDefined(_this.startValue)) {
      return;
    }

    if (_this.startValue !== this.props.value) {
      this.props.onChangeComplete(this, this.props.value);
    }

    _this.startValue = null;
  }

  /**
   * Handle any keydown event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleKeyDown(event) {
    this.handleInteractionStart(event);
  }

  /**
   * Handle any keyup event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleKeyUp(event) {
    this.handleInteractionEnd(event);
  }

  /**
   * Handle any mousedown event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseDown(event) {
    const document = getDocument(this);

    this.handleInteractionStart(event);

    document.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mouseup event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseUp(event) {
    const document = getDocument(this);

    this.handleInteractionEnd(event);

    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any touchstart event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchStart(event) {
    const document = getDocument(this);

    this.handleInteractionStart(event);

    document.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any touchend event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchEnd(event) {
    const document = getDocument(this);

    this.handleInteractionEnd(event);

    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render() {
    const { classNames } = this.props;
    const componentClassName = getComponentClassName(this);
    const values = valueTransformer.valuesFromProps(this);
    const percentages = valueTransformer.percentagesFromValues(this, values);

    return (
      <div
        aria-disabled={ this.props.disabled }
        ref="inputRange"
        className={ componentClassName }
        onKeyDown={ this.handleKeyDown }
        onKeyUp={ this.handleKeyUp }
        onMouseDown={ this.handleMouseDown }
        onTouchStart={ this.handleTouchStart }>
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

/**
 * Accepted propTypes of InputRange
 * @static {Object}
 * @property {Function} ariaLabelledby
 * @property {Function} classNames
 * @property {Function} defaultValue
 * @property {Function} disabled
 * @property {Function} maxValue
 * @property {Function} minValue
 * @property {Function} name
 * @property {Function} onChange
 * @property {Function} onChangeComplete
 * @property {Function} step
 * @property {Function} value
 */
InputRange.propTypes = {
  ariaLabelledby: React.PropTypes.string,
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
  defaultValue: maxMinValuePropType,
  disabled: React.PropTypes.bool,
  maxValue: maxMinValuePropType,
  minValue: maxMinValuePropType,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  onChangeComplete: React.PropTypes.func,
  step: React.PropTypes.number,
  value: maxMinValuePropType,
};

/**
 * Default props of InputRange
 * @static {Object}
 * @property {Object.<string, string>} defaultClassNames
 * @property {Range|number} defaultValue
 * @property {boolean} disabled
 * @property {number} maxValue
 * @property {number} minValue
 * @property {number} step
 * @property {Range|number} value
 */
InputRange.defaultProps = {
  classNames: defaultClassNames,
  defaultValue: 0,
  disabled: false,
  maxValue: 10,
  minValue: 0,
  step: 1,
  value: null,
};
