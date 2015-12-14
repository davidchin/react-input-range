import React from 'react';
import { autobind } from './util';

// Functions
function getActiveTrackStyle(track) {
  const { props } = track;
  const width = `${(props.percentages.max - props.percentages.min) * 100}%`;
  const left = `${props.percentages.min * 100}%`;

  const activeTrackStyle = {
    left,
    width,
  };

  return activeTrackStyle;
}

// Class
class Track extends React.Component {
  constructor(props) {
    super(props);

    // Auto-bind
    autobind([
      'handleMouseDown',
      'handleTouchStart',
    ], this);
  }

  // Getters / Setters
  get clientRect() {
    const { track } = this.refs;
    const clientRect = track.getClientRects()[0];

    return clientRect;
  }

  // Handlers
  handleMouseDown(event) {
    const trackClientRect = this.clientRect;
    const { clientX } = event.touches ? event.touches[0] : event;
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    this.props.onTrackMouseDown(event, this, position);
  }

  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  // Render
  render() {
    const activeTrackStyle = getActiveTrackStyle(this);
    const classNames = this.props.classNames;

    return (
      <div
        className={ classNames.trackContainer }
        onMouseDown={ this.handleMouseDown }
        onTouchStart={ this.handleTouchStart }
        ref="track">
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
