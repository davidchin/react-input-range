import React from 'react';
import * as valueTransformer from './value-transformer';
import DEFAULT_CLASS_NAMES from './default-class-names';
import Label from './label';
import rangePropType from './range-prop-type';
import valuePropType from './value-prop-type';
import Slider from './slider';
import Track from './track';
import { autobind, captialize, distanceTo, isDefined, isObject, length } from '../utils';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from './key-codes';

/**
 * InputRange React component
 */
export default class InputRange extends React.Component {
  /**
   * Accepted propTypes of InputRange
   * @ignore
   * @override
   * @return {Object}
   */
  static get propTypes() {
    return {
      ariaLabelledby: React.PropTypes.string,
      ariaControls: React.PropTypes.string,
      classNames: React.PropTypes.objectOf(React.PropTypes.string),
      disabled: React.PropTypes.bool,
      formatLabel: React.PropTypes.func,
      maxValue: rangePropType,
      minValue: rangePropType,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func.isRequired,
      onChangeComplete: React.PropTypes.func,
      step: React.PropTypes.number,
      value: valuePropType,
    };
  }

  /**
   * Default props of InputRange
   * @ignore
   * @override
   * @return {Object}
   */
  static get defaultProps() {
    return {
      classNames: DEFAULT_CLASS_NAMES,
      disabled: false,
      maxValue: 10,
      minValue: 0,
      step: 1,
      value: null,
    };
  }

  /**
   * InputRange constructor
   * @param {Object} props - React component props
   * @param {string} [props.ariaLabelledby]
   * @param {string} [props.ariaControls]
   * @param {Object<string, string>} [props.classNames = DEFAULT_CLASS_NAMES]
   * @param {boolean} [props.disabled = false]
   * @param {Function} [props.formatLabel]
   * @param {number|Range} [props.maxValue = 10]
   * @param {number|Range} [props.minValue = 0]
   * @param {string} [props.name]
   * @param {string} props.onChange
   * @param {Function} [props.onChangeComplete]
   * @param {number} [props.step = 1]
   * @param {number|Range} [props.value = null]
   */
  constructor(props) {
    super(props);

    /**
     * @private
     * @type {?number}
     */
    this.startValue = null;

    /**
     * @private
     * @type {?Component}
     */
    this.node = null;

    /**
     * @private
     * @type {?Component}
     */
    this.trackNode = null;

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
   * Callback to fire when the component is about to unmount
   * @ignore
   * @override
   * @return {void}
   */
  componentWillUnmount() {
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Get the class name(s) of inputRange based on its props
   * @private
   * @return {string} A list of class names delimited with spaces
   */
  getComponentClassName() {
    if (!this.props.disabled) {
      return this.props.classNames.inputRange;
    }

    return this.props.classNames.disabledInputRange;
  }

  /**
   * Return the clientRect of the component's track
   * @private
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
   * Get the key name of a slider that's the closest to a point
   * @private
   * @param {Point} position - x/y
   * @return {string} Key name
   */
  getKeyByPosition(position) {
    const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
    const positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

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
   * Get all slider keys of inputRange
   * @private
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
   * @private
   * @param {Range} values - Min/max value of sliders
   * @return {boolean} True if difference is greater or equal to step amount
   */
  hasStepDifference(values) {
    const currentValues = valueTransformer.getValueFromProps(this.props, this.isMultiValue());

    return length(values.min, currentValues.min) >= this.props.step ||
           length(values.max, currentValues.max) >= this.props.step;
  }

  /**
   * Return true if the component accepts a range of values
   * @private
   * @return {boolean}
   */
  isMultiValue() {
    return isObject(this.props.value);
  }

  /**
   * Check if values are within the max and min range of inputRange
   * @private
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
   * @private
   * @param {Range} values - Min/max value of sliders
   * @return {boolean} True if inputRange should update
   */
  shouldUpdate(values) {
    return this.isWithinRange(values) && this.hasStepDifference(values);
  }

  /**
   * Update the position of a slider by key
   * @private
   * @param {string} key - min/max
   * @param {Point} position x/y
   * @return {void}
   */
  updatePosition(key, position) {
    const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
    const positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

    positions[key] = position;

    this.updatePositions(positions);
  }

  /**
   * Update the position of sliders
   * @private
   * @param {Object} positions
   * @param {Point} positions.min
   * @param {Point} positions.max
   * @return {void}
   */
  updatePositions(positions) {
    const values = {
      min: valueTransformer.getValueFromPosition(positions.min, this.props.minValue, this.props.maxValue, this.getTrackClientRect()),
      max: valueTransformer.getValueFromPosition(positions.max, this.props.minValue, this.props.maxValue, this.getTrackClientRect()),
    };

    const transformedValues = {
      min: valueTransformer.getStepValueFromValue(values.min, this.props.step),
      max: valueTransformer.getStepValueFromValue(values.max, this.props.step),
    };

    this.updateValues(transformedValues);
  }

  /**
   * Update the value of a slider by key
   * @private
   * @param {string} key - max/min
   * @param {number} value - New value
   * @return {void}
   */
  updateValue(key, value) {
    const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());

    values[key] = value;

    this.updateValues(values);
  }

  /**
   * Update the values of all sliders
   * @private
   * @param {Object|number} values - Object if multi-value, number if single-value
   * @return {void}
   */
  updateValues(values) {
    if (!this.shouldUpdate(values)) {
      return;
    }

    this.props.onChange(this.isMultiValue() ? values : values.max);
  }

  /**
   * Increment the value of a slider by key name
   * @private
   * @param {string} key - max/min
   * @return {void}
   */
  incrementValue(key) {
    const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
    const value = values[key] + this.props.step;

    this.updateValue(key, value);
  }

  /**
   * Decrement the value of a slider by key name
   * @private
   * @param {string} key - max/min
   * @return {void}
   */
  decrementValue(key) {
    const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
    const value = values[key] - this.props.step;

    this.updateValue(key, value);
  }

  /**
   * Handle any mousemove event received by the slider
   * @private
   * @param {SyntheticEvent} event - User event
   * @param {string} key - Slider type
   * @return {void}
   */
  handleSliderMouseMove(event, key) {
    if (this.props.disabled) {
      return;
    }

    const position = valueTransformer.getPositionFromEvent(event, this.getTrackClientRect());

    requestAnimationFrame(() => this.updatePosition(key, position));
  }

  /**
   * Handle any keydown event received by the slider
   * @private
   * @param {SyntheticEvent} event - User event
   * @param {string} key - Slider type
   * @return {void}
   */
  handleSliderKeyDown(event, key) {
    if (this.props.disabled) {
      return;
    }

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
   * @private
   * @param {SyntheticEvent} event - User event
   * @param {Point} position - Mousedown position
   * @return {void}
   */
  handleTrackMouseDown(event, position) {
    if (this.props.disabled) {
      return;
    }

    event.preventDefault();

    this.updatePosition(this.getKeyByPosition(position), position);
  }

  /**
   * Handle the start of any user-triggered event
   * @private
   * @return {void}
   */
  handleInteractionStart() {
    if (!this.props.onChangeComplete || isDefined(this.startValue)) {
      return;
    }

    this.startValue = this.props.value;
  }

  /**
   * Handle the end of any user-triggered event
   * @private
   * @return {void}
   */
  handleInteractionEnd() {
    if (!this.props.onChangeComplete || !isDefined(this.startValue)) {
      return;
    }

    if (this.startValue !== this.props.value) {
      this.props.onChangeComplete(this.props.value);
    }

    this.startValue = null;
  }

  /**
   * Handle any keydown event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   * @return {void}
   */
  handleKeyDown(event) {
    this.handleInteractionStart(event);
  }

  /**
   * Handle any keyup event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   * @return {void}
   */
  handleKeyUp(event) {
    this.handleInteractionEnd(event);
  }

  /**
   * Handle any mousedown event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   * @return {void}
   */
  handleMouseDown(event) {
    this.handleInteractionStart(event);

    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mouseup event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   */
  handleMouseUp(event) {
    this.handleInteractionEnd(event);

    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any touchstart event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   * @return {void}
   */
  handleTouchStart(event) {
    this.handleInteractionStart(event);

    this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any touchend event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   */
  handleTouchEnd(event) {
    this.handleInteractionEnd(event);

    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Get an array of slider HTML for rendering
   * @private
   * @return {string[]} Array of HTML
   */
  renderSliders() {
    const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
    const percentages = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);

    return this.getKeys().map((key) => {
      const value = values[key];
      const percentage = percentages[key];

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
          formatLabel={this.props.formatLabel}
          key={key}
          maxValue={maxValue}
          minValue={minValue}
          onSliderKeyDown={this.handleSliderKeyDown}
          onSliderMouseMove={this.handleSliderMouseMove}
          percentage={percentage}
          type={key}
          value={value} />
      );

      return slider;
    });
  }

  /**
   * Get an array of hidden input HTML for rendering
   * @private
   * @return {string[]} Array of HTML
   */
  renderHiddenInputs() {
    if (!this.props.name) {
      return [];
    }

    const isMultiValue = this.isMultiValue();
    const values = valueTransformer.getValueFromProps(this.props, isMultiValue);

    return this.getKeys().map((key) => {
      const value = values[key];
      const name = isMultiValue ? `${this.props.name}${captialize(key)}` : this.props.name;

      return (
        <input key={key} type="hidden" name={name} value={value} />
      );
    });
  }

  /**
   * Render method of the component
   * @ignore
   * @override
   * @return {string} Component JSX
   */
  render() {
    const componentClassName = this.getComponentClassName();
    const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
    const percentages = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);

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
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="min">
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
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="max">
          {this.props.maxValue}
        </Label>

        {this.renderHiddenInputs()}
      </div>
    );
  }
}
