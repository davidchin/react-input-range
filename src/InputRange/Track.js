import React from 'react';
import { autobind, extend } from './util';

class Track extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {};

    // Enable touch
    React.initializeTouchEvents(true);

    // Auto-bind
    autobind([
      'handleMouseDown',
      'handleTouchStart',
    ], this);
  }

  // Life cycle
  componentDidMount() {
    this.setActiveTrackWidth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setActiveTrackWidth(nextProps);
  }

  // Getters / Setters
  get clientRect() {
    const track = React.findDOMNode(this);
    const clientRect = track.getClientRects()[0];

    return clientRect;
  }

  // Methods
  setActiveTrackWidth(props) {
    const width = `${(props.percentages.max - props.percentages.min) * 100}%`;
    const left = `${props.percentages.min * 100}%`;

    const newActiveTrackStyle = {
      left,
      width,
    };

    const activeTrackStyle = extend({}, this.state.activeTrackStyle, newActiveTrackStyle);

    this.setState({ activeTrackStyle });
  }

  // Handlers
  handleMouseDown(event) {
    const trackClientRect = this.clientRect;
    const { clientX } = event.touches ? event.touches[0] : event;
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    this.props.onTrackMouseDown(this, position);
  }

  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  // Render
  render() {
    const activeTrackStyle = this.state.activeTrackStyle || {};
    const classNames = this.props.classNames;

    return (
      <div
        onMouseDown={ this.handleMouseDown }
        onTouchStart={ this.handleTouchStart }
        className={ classNames.trackContainer }>
        <div
          style={ activeTrackStyle }
          className={ classNames.trackActive }>
        </div>
        { this.props.children }
      </div>
    );
  }
}

Track.propTypes = {
  children: React.PropTypes.node,
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
  onTrackMouseDown: React.PropTypes.func.isRequired,
  percentages: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
};

export default Track;
