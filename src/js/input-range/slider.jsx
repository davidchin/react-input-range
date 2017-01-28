import React from 'react';
import Label from './label';
import { autobind } from '../utils';

/**
 * @ignore
 * Slider React component
 */
export default class Slider extends React.Component {
  /**
   * Accepted propTypes of Slider
   * @override
   * @return {Object}
   * @property {Function} ariaLabelledby
   * @property {Function} ariaControls
   * @property {Function} className
   * @property {Function} formatLabel
   * @property {Function} maxValue
   * @property {Function} minValue
   * @property {Function} onSliderKeyDown
   * @property {Function} onSliderMouseMove
   * @property {Function} percentage
   * @property {Function} type
   * @property {Function} value
   */
  static get propTypes() {
    return {
      ariaLabelledby: React.PropTypes.string,
      ariaControls: React.PropTypes.string,
      classNames: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
      formatLabel: React.PropTypes.func,
      maxValue: React.PropTypes.number,
      minValue: React.PropTypes.number,
      onSliderKeyDown: React.PropTypes.func.isRequired,
      onSliderMouseMove: React.PropTypes.func.isRequired,
      percentage: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      value: React.PropTypes.number.isRequired,
    };
  }

  /**
   * Slider constructor
   * @param {Object} props - React component props
   */
  constructor(props) {
    super(props);

    /**
     * @private
     * @type {?Component}
     */
    this.node = null;

    autobind([
      'handleMouseDown',
      'handleMouseUp',
      'handleMouseMove',
      'handleTouchStart',
      'handleTouchEnd',
      'handleTouchMove',
      'handleKeyDown',
    ], this);
  }

  /**
   * Callback to fire when the component is about to unmount
   * @ignore
   * @override
   * @return {void}
   */
  componentWillUnmount() {
    this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    this.node.ownerDocument.removeEventListener('touchmove', this.handleTouchMove);
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchUp);
  }

  /**
   * Get the style of slider based on its props
   * @private
   * @return {Object} CSS styles
   */
  getStyle() {
    const perc = (this.props.percentage || 0) * 100;
    const style = {
      position: 'absolute',
      left: `${perc}%`,
    };

    return style;
  }

  /**
   * Handle any mousedown event received by the component
   * @private
   * @return {void}
   */
  handleMouseDown() {
    // Event
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mouseup event received by the component
   * @private
   * @return {void}
   */
  handleMouseUp() {
    // Event
    this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mousemove event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   * @return {void}
   */
  handleMouseMove(event) {
    this.props.onSliderMouseMove(event, this.props.type);
  }

  /**
   * Handle any touchstart event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   * @return {void}
   */
  handleTouchStart(event) {
    event.preventDefault();

    this.node.ownerDocument.addEventListener('touchmove', this.handleTouchMove);
    this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any touchmove event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   * @return {void}
   */
  handleTouchMove(event) {
    this.props.onSliderMouseMove(event, this.props.type);
  }

  /**
   * Handle any touchend event received by the component
   * @private
   * @return {void}
   */
  handleTouchEnd(event) {
    event.preventDefault();

    this.node.ownerDocument.removeEventListener('touchmove', this.handleTouchMove);
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any keydown event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   * @return {void}
   */
  handleKeyDown(event) {
    this.props.onSliderKeyDown(event, this.props.type);
  }

  /**
   * Render method of the component
   * @override
   * @return {string} Component JSX
   */
  render() {
    const style = this.getStyle();

    return (
      <span
        className={this.props.classNames.sliderContainer}
        ref={(node) => { this.node = node; }}
        style={style}>
        <Label
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="value">
          {this.props.value}
        </Label>

        <div
          aria-labelledby={this.props.ariaLabelledby}
          aria-controls={this.props.ariaControls}
          aria-valuemax={this.props.maxValue}
          aria-valuemin={this.props.minValue}
          aria-valuenow={this.props.value}
          className={this.props.classNames.slider}
          draggable="false"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          role="slider"
          tabIndex="0" />
      </span>
    );
  }
}
