import React from 'react';
import { autobind } from './util';

/**
 * @module InputRange/Track
 */

/**
 * Get the CSS styles for an active track
 * @private
 * @param {Track} track React component
 * @return {Object} CSS styles
 */
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

/**
 * Track React component
 * @class
 * @extends React.Component
 * @param {Object} props - React component props
 */
export default class Track extends React.Component {
  constructor(props) {
    super(props);

    // Auto-bind
    autobind([
      'handleMouseDown',
      'handleTouchStart',
    ], this);
  }

  /**
   * Return the clientRect of the component
   * @member {ClientRect}
   */
  get clientRect() {
    const { track } = this.refs;
    const clientRect = track.getBoundingClientRect();

    return clientRect;
  }

  /**
   * Handle any mousedown event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseDown(event) {
    const trackClientRect = this.clientRect;
    const { clientX } = event.touches ? event.touches[0] : event;
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    this.props.onTrackMouseDown(event, this, position);
  }

  /**
   * Handle any touchstart event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
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

/**
 * Accepted propTypes of Track
 * @static {Object}
 * @property {Function} children
 * @property {Function} classNames
 * @property {Function} onTrackMouseDown
 * @property {Function} percentages
 */
Track.propTypes = {
  children: React.PropTypes.node,
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
  onTrackMouseDown: React.PropTypes.func.isRequired,
  percentages: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
};
