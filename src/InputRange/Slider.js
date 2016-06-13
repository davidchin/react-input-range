/**
 * @module InputRange/Slider
 */

import React from 'react';
import Label from './Label';
import { autobind } from './util';

/**
 * Get the owner document of slider
 * @private
 * @param {Slider} slider - React component
 * @return {Document} Document
 */
function getDocument(slider) {
  const { slider: { ownerDocument } } = slider.refs;

  return ownerDocument;
}

/**
 * Get the style of slider based on its props
 * @private
 * @param {Slider} slider - React component
 * @return {Object} CSS styles
 */
function getStyle(slider) {
  const perc = (slider.props.percentage || 0) * 100;
  const style = {
    position: 'absolute',
    left: `${perc}%`,
  };

  return style;
}

/**
 * Slider React component
 * @class
 * @extends React.Component
 * @param {Object} props - React component props
 */
export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    // Auto-bind
    autobind([
      'handleClick',
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
   * Handle any click event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleClick(event) {
    event.preventDefault();
  }

  /**
   * Handle any mousedown event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseDown() {
    const document = getDocument(this);

    // Event
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mouseup event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseUp() {
    const document = getDocument(this);

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
    const document = getDocument(this);

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
   * @param {SyntheticEvent} event - User event
   */
  handleTouchEnd() {
    const document = getDocument(this);

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
    const classNames = this.props.classNames;
    const style = getStyle(this);

    return (
      <span
        className={ classNames.sliderContainer }
        ref="slider"
        style={ style }>
        <Label
          className={ classNames.labelValue }
          containerClassName={ classNames.labelContainer }
          formatLabel={ this.props.formatLabel }>
          { this.props.value }
        </Label>

        <a
          aria-labelledby={ this.props.ariaLabelledby }
          aria-controls={ this.props.ariaControls }
          aria-valuemax={ this.props.maxValue }
          aria-valuemin={ this.props.minValue }
          aria-valuenow={ this.props.value }
          className={ classNames.slider }
          draggable="false"
          href="#"
          onClick={ this.handleClick }
          onKeyDown={ this.handleKeyDown }
          onMouseDown={ this.handleMouseDown }
          onTouchStart={ this.handleTouchStart }
          role="slider">
        </a>
      </span>
    );
  }
}

/**
 * Accepted propTypes of Slider
 * @static {Object}
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
Slider.propTypes = {
  ariaLabelledby: React.PropTypes.string,
  ariaControls: React.PropTypes.string,
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
  formatLabel: React.PropTypes.func,
  maxValue: React.PropTypes.number,
  minValue: React.PropTypes.number,
  onSliderKeyDown: React.PropTypes.func.isRequired,
  onSliderMouseMove: React.PropTypes.func.isRequired,
  percentage: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};
