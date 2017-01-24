import React from 'react';
import * as valueTransformer from './value-transformer';
import defaultClassNames from './default-class-names';
import Label from './label';
import rangePropType from './range-prop-type';
import Slider from './slider';
import Track from './track';
import { autobind, captialize, distanceTo, isDefined, isObject, length } from '../utils';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from './key-codes';

/**
 * An object describing the position of a point
 * @typedef {Object} Point
 * @property {number} x - x value
 * @property {number} y - y value
 */

/**
 * An object describing a range of values
 * @typedef {Object} Range
 * @property {number} min - Min value
 * @property {number} max - Max value
 */

/**
 * @typedef {Object} ClientRect
 * @property {number} height - Height value
 * @property {number} left - Left value
 * @property {number} top - Top value
 * @property {number} width - Width value
 */

/**
 * InputRange React component
 */
export default class InputRange extends React.Component {
  /**
   * Accepted propTypes of InputRange
   * @return {Object}
   * @property {Function} ariaLabelledby
   * @property {Function} ariaControls
   * @property {Function} classNames
   * @property {Function} defaultValue
   * @property {Function} disabled
   * @property {Function} formatLabel
   * @property {Function} labelPrefix
   * @property {Function} labelSuffix
   * @property {Function} maxValue
   * @property {Function} minValue
   * @property {Function} name
   * @property {Function} onChange
   * @property {Function} onChangeComplete
   * @property {Function} step
   * @property {Function} value
   */
  static get propTypes() {
    return {
      ariaLabelledby: React.PropTypes.string,
      ariaControls: React.PropTypes.string,
      classNames: React.PropTypes.objectOf(React.PropTypes.string),
      defaultValue: rangePropType,
      disabled: React.PropTypes.bool,
      formatLabel: React.PropTypes.func,
      labelPrefix: React.PropTypes.string,
      labelSuffix: React.PropTypes.string,
      maxValue: rangePropType,
      minValue: rangePropType,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func.isRequired,
      onChangeComplete: React.PropTypes.func,
      step: React.PropTypes.number,
      value: rangePropType,
    };
  }

  /**
   * Default props of InputRange
   * @return {Object}
   * @property {Object<string, string>} defaultClassNames
   * @property {Range|number} defaultValue
   * @property {boolean} disabled
   * @property {string} labelPrefix
   * @property {string} labelSuffix
   * @property {number} maxValue
   * @property {number} minValue
   * @property {number} step
   * @property {Range|number} value
   */
  static get defaultProps() {
    return {
      classNames: defaultClassNames,
      defaultValue: 0,
      disabled: false,
      labelPrefix: '',
      labelSuffix: '',
      maxValue: 10,
      minValue: 0,
      step: 1,
      value: null,
    };
  }

  /**
   * InputRange constructor
   * @param {Object} props - React component props
   */
  constructor(props) {
    super(props);

    autobind([
      'formatLabel',
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
   * Get the class name(s) of inputRange based on its props
   * @return {string} A list of class names delimited with spaces
   */
  getComponentClassName() {
    if (!this.props.disabled) {
      return this.props.classNames.component;
    }

    return `${this.props.classNames.component} ${this.props.classNames.disabled}`;
  }

  /**
   * Return the clientRect of the component's track
   * @return {ClientRect}
   */
  getTrackClientRect() {
    if (this.trackNode) {
      return this.trackNode.getClientRect();
    }

    return {
      height: 0,
      left: 0,
      top: 0,
      width: 0,
    };
  }

  /**
   * Get the owner document of inputRange
   * @return {Document} Document
   */
  getDocument() {
    return this.node.ownerDocument;
  }

  /**
   * Get the key name of a slider that's the closest to a point
   * @param {Point} position - x/y
   * @return {string} Key name
   */
  getKeyByPosition(position) {
    const values = valueTransformer.valuesFromProps(this);
    const positions = valueTransformer.positionsFromValues(this, values);

    if (this.isMultiValue()) {
      const distanceToMin = distanceTo(position, positions.min);
      const distanceToMax = distanceTo(position, positions.max);

      if (distanceToMin < distanceToMax) {
        return 'min';
      }
    }

    return 'max';
  }

  /**
   * Get the key name of a slider
   * @param {Slider} slider - React component
   * @return {string} Key name
   */
  getKeyFromSlider(slider) {
    if (slider === this.sliderMinNode) {
      return 'min';
    }

    return 'max';
  }

  /**
   * Get all slider keys of inputRange
   * @return {string[]} Key names
   */
  getKeys() {
    if (this.isMultiValue()) {
      return ['min', 'max'];
    }

    return ['max'];
  }

  /**
   * Check if the difference between values and the current values of inputRange
   * is greater or equal to its step amount
   * @param {Range} values - Min/max value of sliders
   * @return {boolean} True if difference is greater or equal to step amount
   */
  hasStepDifference(values) {
    const currentValues = valueTransformer.valuesFromProps(this);

    return length(values.min, currentValues.min) >= this.props.step ||
           length(values.max, currentValues.max) >= this.props.step;
  }

  /**
   * Return true if the component accepts a range of values
   * @return {boolean}
   */
  isMultiValue() {
    return isObject(this.props.value) || isObject(this.props.defaultValue);
  }

  /**
   * Check if values are within the max and min range of inputRange
   * @param {Range} values - Min/max value of sliders
   * @return {boolean} True if within range
   */
  isWithinRange(values) {
    if (this.isMultiValue()) {
      return values.min >= this.props.minValue &&
             values.max <= this.props.maxValue &&
             values.min < values.max;
    }

    return values.max >= this.props.minValue && values.max <= this.props.maxValue;
  }

  /**
   * Check if inputRange should update with new values
   * @param {Range} values - Min/max value of sliders
   * @return {boolean} True if inputRange should update
   */
  shouldUpdate(values) {
    return this.isWithinRange(values) && this.hasStepDifference(values);
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
    if (!this.shouldUpdate(values)) {
      return;
    }

    if (this.isMultiValue()) {
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
   * Format label
   * @param {number} labelValue - Label value
   * @return {string} Formatted label value
   */
  formatLabel(labelValue) {
    const { formatLabel, labelPrefix, labelSuffix } = this.props;

    if (formatLabel) {
      return formatLabel(labelValue, { labelPrefix, labelSuffix });
    }

    return `${labelPrefix}${labelValue}${labelSuffix}`;
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

    const key = this.getKeyFromSlider(slider);
    const position = valueTransformer.positionFromEvent(this, event);

    requestAnimationFrame(() => this.updatePosition(key, position));
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

    const key = this.getKeyFromSlider(slider);

    switch (event.keyCode) {
    case LEFT_ARROW:
    case DOWN_ARROW:
      event.preventDefault();
      this.decrementValue(key);
      break;

    case RIGHT_ARROW:
    case UP_ARROW:
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
   * @param {Track} track - React component
   * @param {Point} position - Mousedown position
   */
  handleTrackMouseDown(event, track, position) {
    if (this.props.disabled) {
      return;
    }

    event.preventDefault();

    this.updatePosition(this.getKeyByPosition(position), position);
  }

  /**
   * Handle the start of any user-triggered event
   */
  handleInteractionStart() {
    if (!this.props.onChangeComplete || isDefined(this.startValue)) {
      return;
    }

    this.startValue = this.props.value || this.props.defaultValue;
  }

  /**
   * Handle the end of any user-triggered event
   */
  handleInteractionEnd() {
    if (!this.props.onChangeComplete || !isDefined(this.startValue)) {
      return;
    }

    if (this.startValue !== this.props.value) {
      this.props.onChangeComplete(this, this.props.value);
    }

    this.startValue = null;
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
    const document = this.getDocument();

    this.handleInteractionStart(event);

    document.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mouseup event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseUp(event) {
    const document = this.getDocument();

    this.handleInteractionEnd(event);

    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any touchstart event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchStart(event) {
    const document = this.getDocument();

    this.handleInteractionStart(event);

    document.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any touchend event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchEnd(event) {
    const document = this.getDocument();

    this.handleInteractionEnd(event);

    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Get an array of slider HTML for rendering
   * @return {string[]} Array of HTML
   */
  renderSliders() {
    const keys = this.getKeys();
    const values = valueTransformer.valuesFromProps(this);
    const percentages = valueTransformer.percentagesFromValues(this, values);

    return keys.map((key) => {
      const value = values[key];
      const percentage = percentages[key];
      const ref = `slider${captialize(key)}Node`;

      let { maxValue, minValue } = this.props;

      if (key === 'min') {
        maxValue = values.max;
      } else {
        minValue = values.min;
      }

      const slider = (
        <Slider
          ariaLabelledby={this.props.ariaLabelledby}
          ariaControls={this.props.ariaControls}
          classNames={this.props.classNames}
          formatLabel={this.formatLabel}
          key={key}
          maxValue={maxValue}
          minValue={minValue}
          onSliderKeyDown={this.handleSliderKeyDown}
          onSliderMouseMove={this.handleSliderMouseMove}
          percentage={percentage}
          ref={(node) => { this[ref] = node; }}
          type={key}
          value={value} />
      );

      return slider;
    });
  }

  /**
   * Get an array of hidden input HTML for rendering
   * @return {string[]} Array of HTML
   */
  renderHiddenInputs() {
    const keys = this.getKeys();

    return keys.map((key) => {
      const name = this.isMultiValue() ? `${this.props.name}${captialize(key)}` : this.props.name;

      return (
        <input key={key} type="hidden" name={name} />
      );
    });
  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render() {
    const componentClassName = this.getComponentClassName();
    const values = valueTransformer.valuesFromProps(this);
    const percentages = valueTransformer.percentagesFromValues(this, values);

    return (
      <div
        aria-disabled={this.props.disabled}
        ref={(node) => { this.node = node; }}
        className={componentClassName}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}>
        <Label
          className={this.props.classNames.labelMin}
          containerClassName={this.props.classNames.labelContainer}
          formatLabel={this.formatLabel}>
          {this.props.minValue}
        </Label>

        <Track
          classNames={this.props.classNames}
          ref={(trackNode) => { this.trackNode = trackNode; }}
          percentages={percentages}
          onTrackMouseDown={this.handleTrackMouseDown}>

          {this.renderSliders()}
        </Track>

        <Label
          className={this.props.classNames.labelMax}
          containerClassName={this.props.classNames.labelContainer}
          formatLabel={this.formatLabel}>
          {this.props.maxValue}
        </Label>

        {this.renderHiddenInputs()}
      </div>
    );
  }
}
