import React from 'react';
import Label from './label';
import { autobind } from '../utils';

/**
 * Slider React component
 */
export default class Slider extends React.Component {
  /**
   * Accepted propTypes of Slider
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
      value: React.PropTypes.number.isRequired,
    };
  }

  /**
   * Slider constructor
   * @param {Object} props - React component props
   */
  constructor(props) {
    super(props);

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
   * Get the owner document of slider
   * @return {Document} Document
   */
  getDocument() {
    return this.node.ownerDocument;
  }

  /**
   * Get the style of slider based on its props
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
   */
  handleMouseDown() {
    const document = this.getDocument();

    // Event
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mouseup event received by the component
   */
  handleMouseUp() {
    const document = this.getDocument();

    // Event
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mousemove event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseMove(event) {
    this.props.onSliderMouseMove(event, this);
  }

  /**
   * Handle any touchstart event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchStart(event) {
    const document = this.getDocument();

    event.preventDefault();

    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any touchmove event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchMove(event) {
    this.props.onSliderMouseMove(event, this);
  }

  /**
   * Handle any touchend event received by the component
   */
  handleTouchEnd(event) {
    const document = this.getDocument();

    event.preventDefault();

    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any keydown event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleKeyDown(event) {
    this.props.onSliderKeyDown(event, this);
  }

  /**
   * Render method of the component
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
          className={this.props.classNames.labelValue}
          containerClassName={this.props.classNames.labelContainer}
          formatLabel={this.props.formatLabel}>
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
