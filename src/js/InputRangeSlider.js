import React from 'react';
import { autobind, extend } from 'InputRangeUtil';

class InputRangeSlider extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {};

    // Enable touch
    React.initializeTouchEvents(true);

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

  // Life Cycle
  componentDidMount() {
    this.setPosition(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setPosition(nextProps);
  }

  // Getters / Setters
  get document() {
    const element = React.findDOMNode(this);
    const document = element.ownerDocument;

    return document;
  }

  // Methods
  setPosition(props) {
    const perc = (props.percentage || 0) * 100;
    const newStyle = {
      position: 'absolute',
      left: `${perc}%`,
    };

    const style = extend({}, this.state.style, newStyle);

    this.setState({ style });
  }

  // Handlers
  handleClick(event) {
    event.preventDefault();
  }

  handleMouseDown() {
    const document = this.document;

    // Event
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp() {
    const document = this.document;

    // Event
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(event) {
    this.props.onSliderMouseMove(this, event);
  }

  handleTouchStart(event) {
    const document = this.document;

    event.preventDefault();

    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  handleTouchMove(event) {
    this.props.onSliderMouseMove(this, event);
  }

  handleTouchEnd() {
    const document = this.document;

    event.preventDefault();

    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  handleKeyDown(event) {
    this.props.onSliderKeyDown(this, event);
  }

  // Render
  render() {
    const style = this.state.style || {};

    return (
      <span className="InputRange-sliderContainer" style={ style }>
        <span className="InputRange-label InputRange-label--value">
          <span className="InputRange-labelContainer">
            { this.props.value }
          </span>
        </span>

        <a
          aria-labelledby={ this.props.ariaLabelledby }
          aria-valuemax={ this.props.maxValue }
          aria-valuemin={ this.props.minValue }
          aria-valuenow={ this.props.value }
          className="InputRange-slider"
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

InputRangeSlider.propTypes = {
  ariaLabelledby: React.PropTypes.string,
  maxValue: React.PropTypes.number,
  minValue: React.PropTypes.number,
  onSliderKeyDown: React.PropTypes.func.isRequired,
  onSliderMouseMove: React.PropTypes.func.isRequired,
  percentage: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};

export default InputRangeSlider;
