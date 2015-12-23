import React from 'react';
import Label from './Label';
import { autobind } from './util';

// Functions
function getDocument(slider) {
  const { slider: { ownerDocument } } = slider.refs;

  return ownerDocument;
}

function getStyle(slider) {
  const perc = (slider.props.percentage || 0) * 100;
  const style = {
    position: 'absolute',
    left: `${perc}%`,
  };

  return style;
}

// Class
class Slider extends React.Component {
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

  // Handlers
  handleClick(event) {
    event.preventDefault();
  }

  handleMouseDown() {
    const document = getDocument(this);

    // Event
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp() {
    const document = getDocument(this);

    // Event
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(event) {
    this.props.onSliderMouseMove(event, this);
  }

  handleTouchStart(event) {
    const document = getDocument(this);

    event.preventDefault();

    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  handleTouchMove(event) {
    this.props.onSliderMouseMove(event, this);
  }

  handleTouchEnd() {
    const document = getDocument(this);

    event.preventDefault();

    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  handleKeyDown(event) {
    this.props.onSliderKeyDown(event, this);
  }

  // Render
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
          containerClassName={ classNames.labelContainer }>
          { this.props.value }
        </Label>

        <a
          aria-labelledby={ this.props.ariaLabelledby }
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

Slider.propTypes = {
  ariaLabelledby: React.PropTypes.string,
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
  maxValue: React.PropTypes.number,
  minValue: React.PropTypes.number,
  onSliderKeyDown: React.PropTypes.func.isRequired,
  onSliderMouseMove: React.PropTypes.func.isRequired,
  percentage: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};

export default Slider;
