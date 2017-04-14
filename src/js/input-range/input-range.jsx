import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import * as valueTransformer from './value-transformer';
import DEFAULT_CLASS_NAMES from './default-class-names';
import Label from './label';
import rangePropType from './range-prop-type';
import valuePropType from './value-prop-type';
import Slider from './slider';
import Track from './track';
import { captialize, distanceTo, isDefined, isObject, length, clamp } from '../utils';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from './key-codes';

/**
 * A React component that allows users to input numeric values within a range
 * by dragging its sliders.
 */
export default class InputRange extends React.Component {
  /**
   * @ignore
   * @override
   * @return {Object}
   */
  static get propTypes() {
    return {
      ariaLabelledby: PropTypes.string,
      ariaControls: PropTypes.string,
      classNames: PropTypes.objectOf(PropTypes.string),
      disabled: PropTypes.bool,
      draggableTrack: PropTypes.bool,
      formatLabel: PropTypes.func,
      maxValue: rangePropType,
      minValue: rangePropType,
      name: PropTypes.string,
      onChangeStart: PropTypes.func,
      onChange: PropTypes.func.isRequired,
      onChangeComplete: PropTypes.func,
      step: PropTypes.number,
      value: valuePropType,
    };
  }

  /**
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
    };
  }

  /**
   * @param {Object} props
   * @param {string} [props.ariaLabelledby]
   * @param {string} [props.ariaControls]
   * @param {InputRangeClassNames} [props.classNames]
   * @param {boolean} [props.disabled = false]
   * @param {Function} [props.formatLabel]
   * @param {number|Range} [props.maxValue = 10]
   * @param {number|Range} [props.minValue = 0]
   * @param {string} [props.name]
   * @param {string} props.onChange
   * @param {Function} [props.onChangeComplete]
   * @param {Function} [props.onChangeStart]
   * @param {number} [props.step = 1]
   * @param {number|Range} props.value
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

    /**
     * @private
     * @type {bool}
     */
    this.isSliderDragging = false;
    this.onNewProps(props);
  }

  componentWillReceiveProps(newProps) {
    this.onNewProps(newProps);
  }

  /**
   * @ignore
   * @override
   * @return {void}
   */
  componentWillUnmount() {
    this.removeDocumentMouseUpListener();
    this.removeDocumentTouchEndListener();
  }

  onNewProps(props) {
    /**
     * Value up to which the slider may go, rounded to the upper step. (eg. step = 6, min = 5, max = 20 - slider can go up to 23).
     * This overflow allows for simpler math and removes corner cases in the rest of the code.
     * The value will be clamped back to props.maxValue before passing it to the client.
     */
    this.steppedMaxValue = valueTransformer.ceilToStep(props.maxValue, props.minValue, props.step);

    // v props.minValue (=0)
    //     v props.step (=3)
    // |===o===o===o=|==|
    //               ^ props.maxValue (=10)
    //                  ^ this.steppedMaxValue (=12)

    const currentValues = valueTransformer.getValueFromProps(props);

    // ceil to upper so distance between two step is always >= props.step
    // (eg. with step = 6, min = 5, max = 20. Moving slider from step 20 to 17:
    // Without ceil: 20 - 17 = 3 => no propagation.
    // With ceil   : 23 - 17 = 6 =>    propagation.
    currentValues.min = valueTransformer.ceilToStep(currentValues.min, this.props.minValue, props.step);
    currentValues.max = valueTransformer.ceilToStep(currentValues.max, this.props.minValue, props.step);

    this.currentValues = currentValues;

    /** currentValues, but clamped. For rendering */
    this.clampedCurrentValues = {
      min: clamp(currentValues.min, props.minValue, props.maxValue),
      max: clamp(currentValues.max, props.minValue, props.maxValue),
    };

    Object.freeze(this.clampedCurrentValues);
    Object.freeze(this.currentValues);
  }

  /**
   * Return the CSS class name of the component
   * @private
   * @return {string}
   */
  getComponentClassName() {
    if (!this.props.disabled) {
      return this.props.classNames.inputRange;
    }

    return this.props.classNames.disabledInputRange;
  }

  /**
   * Return the bounding rect of the track
   * @private
   * @return {ClientRect}
   */
  getTrackClientRect() {
    return this.trackNode.getClientRect();
  }

  /**
   * Return the slider key closest to a point
   * @private
   * @param {Point} position
   * @return {string}
   */
  getKeyByPosition(position) {
    const values = this.currentValues;
    const positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.steppedMaxValue, this.getTrackClientRect());

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
   * Return all the slider keys
   * @private
   * @return {string[]}
   */
  getKeys() {
    if (this.isMultiValue()) {
      return ['min', 'max'];
    }

    return ['max'];
  }

  /**
   * Return true if the difference between the new and the current value is
   * greater or equal to the step amount of the component
   * @private
   * @param {Range} newValues
   * @return {boolean}
   */
  hasStepDifference(newValues) {
    const currentValues = this.currentValues;

    return length(newValues.min, currentValues.min) >= this.props.step ||
      length(newValues.max, currentValues.max) >= this.props.step;
  }

  /**
   * Return true if the component accepts a min and max value
   * @private
   * @return {boolean}
   */
  isMultiValue() {
    return isObject(this.props.value);
  }

  /**
   * Return true if the range is within the max and min value of the component
   * @private
   * @param {Range} values
   * @return {boolean}
   */
  isWithinRange(values) {
    if (this.isMultiValue()) {
      return values.min >= this.props.minValue &&
        values.max <= this.steppedMaxValue &&
        values.min < values.max;
    }

    return values.max >= this.props.minValue && values.max <= this.steppedMaxValue;
  }

  /**
   * Return true if the new value should trigger a render
   * @private
   * @param {Range} values
   * @return {boolean}
   */
  shouldUpdate(values) {
    return this.isWithinRange(values) && this.hasStepDifference(values);
  }

  /**
   * Update the position of a slider
   * @private
   * @param {string} key
   * @param {Point} position
   * @return {void}
   */
  updatePosition(key, position) {
    const values = this.currentValues;
    const positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.steppedMaxValue, this.getTrackClientRect());

    positions[key] = position;

    this.updatePositions(positions);
  }

  /**
   * Update the positions of multiple sliders
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
      min: valueTransformer.roundToStep(values.min, this.props.minValue, this.props.maxValue, this.props.step),
      max: valueTransformer.roundToStep(values.max, this.props.minValue, this.props.maxValue, this.props.step),
    };

    if (transformedValues.max === this.props.maxValue) {
      transformedValues.max = this.steppedMaxValue;
    }

    if (transformedValues.min === this.props.maxValue) {
      transformedValues.min = this.steppedMaxValue;
    }

    this.updateValues(transformedValues);
  }

  /**
   * Update the value of a slider
   * @private
   * @param {string} key
   * @param {number} value
   * @return {void}
   */
  updateValue(key, value) {
    const values = {
      min: this.currentValues.min,
      max: this.currentValues.max,
    };

    values[key] = value;

    this.updateValues(values);
  }

  /**
   * Update the values of multiple sliders
   * @private
   * @param {Range|number} values
   * @return {void}
   */
  updateValues(values) {
    if (!this.shouldUpdate(values)) {
      return;
    }

    const max = clamp(values.max, this.props.minValue, this.props.maxValue);

    if (!this.isMultiValue()) {
      this.props.onChange(max);
      return;
    }

    this.props.onChange({
      min: clamp(values.min, this.props.minValue, this.props.maxValue),
      max,
    });
  }

  /**
   * Increment the value of a slider by key name
   * @private
   * @param {string} key
   * @return {void}
   */
  incrementValue(key) {
    const values = this.currentValues;
    const value = Math.min(values[key] + this.props.step, this.steppedMaxValue);

    this.updateValue(key, value);
  }

  /**
   * Decrement the value of a slider by key name
   * @private
   * @param {string} key
   * @return {void}
   */
  decrementValue(key) {
    const values = this.currentValues;
    const value = Math.max(values[key] - this.props.step, this.props.minValue);

    this.updateValue(key, value);
  }

  /**
   * Listen to mouseup event
   * @private
   * @return {void}
   */
  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Listen to touchend event
   * @private
   * @return {void}
   */
  addDocumentTouchEndListener() {
    this.removeDocumentTouchEndListener();
    this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Stop listening to mouseup event
   * @private
   * @return {void}
   */
  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Stop listening to touchend event
   * @private
   * @return {void}
   */
  removeDocumentTouchEndListener() {
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any "mousemove" event received by the slider
   * @private
   * @param {SyntheticEvent} event
   * @param {string} key
   * @return {void}
   */
  @autobind
  handleSliderDrag(event, key) {
    if (this.props.disabled) {
      return;
    }

    const position = valueTransformer.getPositionFromEvent(event, this.getTrackClientRect());
    this.isSliderDragging = true;
    requestAnimationFrame(() => this.updatePosition(key, position));
  }

  /**
   * Handle any "mousemove" event received by the track
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleTrackDrag(event, prevEvent) {
    if (this.props.disabled || !this.props.draggableTrack || this.isSliderDragging) {
      return;
    }

    const position = valueTransformer.getPositionFromEvent(event, this.getTrackClientRect());
    const value = valueTransformer.getValueFromPosition(position, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

    let stepValue = valueTransformer.roundToStep(value, this.props.minValue, this.props.maxValue, this.props.step);
    if (stepValue === this.props.maxValue) {
      stepValue = this.steppedMaxValue;
    }

    const prevPosition = valueTransformer.getPositionFromEvent(prevEvent, this.getTrackClientRect());
    const prevValue = valueTransformer.getValueFromPosition(prevPosition, this.props.minValue, this.props.maxValue, this.getTrackClientRect());
    let prevStepValue = valueTransformer.roundToStep(prevValue, this.props.minValue, this.props.maxValue, this.props.step);
    if (prevStepValue === this.props.maxValue) {
      prevStepValue = this.steppedMaxValue;
    }

    const offset = prevStepValue - stepValue;

    const transformedValues = {
      min: this.currentValues.min - offset,
      max: this.currentValues.max - offset,
    };

    this.updateValues(transformedValues);
  }

  /**
   * Handle any "keydown" event received by the slider
   * @private
   * @param {SyntheticEvent} event
   * @param {string} key
   * @return {void}
   */
  @autobind
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
   * Handle any "mousedown" event received by the track
   * @private
   * @param {SyntheticEvent} event
   * @param {Point} position
   * @return {void}
   */
  @autobind
  handleTrackMouseDown(event, position) {
    if (this.props.disabled) {
      return;
    }

    const {
      value: { max, min },
    } = this.props;

    event.preventDefault();

    const value = valueTransformer.getValueFromPosition(position, this.props.minValue, this.props.maxValue, this.getTrackClientRect());
    let stepValue = valueTransformer.roundToStep(value, this.props.minValue, this.props.maxValue, this.props.step);

    if (stepValue === this.props.maxValue) {
      stepValue = this.steppedMaxValue;
    }

    if (!this.props.draggableTrack || stepValue > max || stepValue < min) {
      this.updatePosition(this.getKeyByPosition(position), position);
    }
  }

  /**
   * Handle the start of any mouse/touch event
   * @private
   * @return {void}
   */
  @autobind
  handleInteractionStart() {
    if (this.props.onChangeStart) {
      this.props.onChangeStart(this.props.value);
    }

    if (this.props.onChangeComplete && !isDefined(this.startValue)) {
      this.startValue = this.props.value;
    }
  }

  /**
   * Handle the end of any mouse/touch event
   * @private
   * @return {void}
   */
  @autobind
  handleInteractionEnd() {
    if (this.isSliderDragging) {
      this.isSliderDragging = false;
    }

    if (!this.props.onChangeComplete || !isDefined(this.startValue)) {
      return;
    }

    if (this.startValue !== this.props.value) {
      this.props.onChangeComplete(this.props.value);
    }

    this.startValue = null;
  }

  /**
   * Handle any "keydown" event received by the component
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleKeyDown(event) {
    this.handleInteractionStart(event);
  }

  /**
   * Handle any "keyup" event received by the component
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleKeyUp(event) {
    this.handleInteractionEnd(event);
  }

  /**
   * Handle any "mousedown" event received by the component
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleMouseDown(event) {
    this.handleInteractionStart(event);
    this.addDocumentMouseUpListener();
  }

  /**
   * Handle any "mouseup" event received by the component
   * @private
   * @param {SyntheticEvent} event
   */
  @autobind
  handleMouseUp(event) {
    this.handleInteractionEnd(event);
    this.removeDocumentMouseUpListener();
  }

  /**
   * Handle any "touchstart" event received by the component
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleTouchStart(event) {
    this.handleInteractionStart(event);
    this.addDocumentTouchEndListener();
  }

  /**
   * Handle any "touchend" event received by the component
   * @private
   * @param {SyntheticEvent} event
   */
  @autobind
  handleTouchEnd(event) {
    this.handleInteractionEnd(event);
    this.removeDocumentTouchEndListener();
  }

  /**
   * Return JSX of sliders
   * @private
   * @return {JSX.Element}
   */
  renderSliders() {
    const values = this.clampedCurrentValues;
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
          onSliderDrag={this.handleSliderDrag}
          onSliderKeyDown={this.handleSliderKeyDown}
          percentage={percentage}
          type={key}
          value={value} />
      );

      return slider;
    });
  }

  /**
   * Return JSX of hidden inputs
   * @private
   * @return {JSX.Element}
   */
  renderHiddenInputs() {
    if (!this.props.name) {
      return [];
    }

    const isMultiValue = this.isMultiValue();
    const values = this.clampedCurrentValues;

    return this.getKeys().map((key) => {
      const value = values[key];
      const name = isMultiValue ? `${this.props.name}${captialize(key)}` : this.props.name;

      return (
        <input key={key} type="hidden" name={name} value={value} />
      );
    });
  }

  /**
   * @ignore
   * @override
   * @return {JSX.Element}
   */
  render() {
    const componentClassName = this.getComponentClassName();
    const values = this.clampedCurrentValues;
    const percentages = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);

    return (
      <div
        aria-disabled={this.props.disabled}
        ref={(node) => {
          this.node = node;
        }}
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
          draggableTrack={this.props.draggableTrack}
          ref={(trackNode) => { this.trackNode = trackNode; }}
          percentages={percentages}
          onTrackDrag={this.handleTrackDrag}
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
