/**
 * @module InputRange/Slider
 */

import React from 'react';
import { default as DefaultLabel } from './Label';
import { autobind } from './util';

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

    this.state = {
      active: false,
    };
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
    // Event
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    this.setState({ active: true });
  }

  /**
   * Handle any mouseup event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseUp() {
    // Event
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.setState({ active: false });
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
    event.preventDefault();

    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
    this.setState({ active: true });
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
  handleTouchEnd(event) {
    event.preventDefault();

    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    this.setState({ active: false });
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
    const { classNames, Label, children } = this.props;
    const { active } = this.state;
    const style = getStyle(this);

    const anchorClassName = [
      classNames.slider,
      active ? classNames.sliderActive : null,
    ].join(' ');

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
          aria-valuenow={ this.props.formatLabel ? this.props.formatLabel( this.props.value ) : this.props.value }
          className={ anchorClassName }
          draggable="false"
          href="#"
          onClick={ this.handleClick }
          onKeyDown={ this.handleKeyDown }
          onMouseDown={ this.handleMouseDown }
          onTouchStart={ this.handleTouchStart }
          role="slider">
        </a>

        { children }
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
 * @property {Function} Label
 * @property {Function} children
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
  Label: React.PropTypes.func,
  children: React.PropTypes.any,
};

/**
 * @property {Function} Label
 */
Slider.defaultProps = {
  Label: DefaultLabel,
};
