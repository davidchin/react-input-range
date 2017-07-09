import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

/**
 * @ignore
 */
export default class Track extends React.Component {
  /**
   * @override
   * @return {Object}
   * @property {Function} children
   * @property {Function} classNames
   * @property {Boolean} draggableTrack
   * @property {Function} onTrackDrag
   * @property {Function} onTrackMouseDown
   * @property {Function} percentages
   */
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired,
      classNames: PropTypes.objectOf(PropTypes.string).isRequired,
      draggableTrack: PropTypes.bool,
      onTrackDrag: PropTypes.func,
      onTrackMouseDown: PropTypes.func.isRequired,
      percentages: PropTypes.objectOf(PropTypes.number).isRequired,
    };
  }

  /**
   * @param {Object} props
   * @param {InputRangeClassNames} props.classNames
   * @param {Boolean} props.draggableTrack
   * @param {Function} props.onTrackDrag
   * @param {Function} props.onTrackMouseDown
   * @param {number} props.percentages
   */
  constructor(props) {
    super(props);

    /**
     * @private
     * @type {?Component}
     */
    this.node = null;
    this.trackDragEvent = null;
  }

  /**
   * @private
   * @return {ClientRect}
   */
  getClientRect() {
    return this.node.getBoundingClientRect();
  }

  /**
   * @private
   * @return {Object} CSS styles
   */
  getActiveTrackStyle() {
    const width = `${(this.props.percentages.max - this.props.percentages.min) * 100}%`;
    const left = `${this.props.percentages.min * 100}%`;

    return { left, width };
  }

  /**
   * Listen to mousemove event
   * @private
   * @return {void}
   */
  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
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
   * @private
   * @return {void}
   */
  removeDocumentMouseMoveListener() {
    this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleMouseMove(event) {
    if (!this.props.draggableTrack) {
      return;
    }

    if (this.trackDragEvent !== null) {
      this.props.onTrackDrag(event, this.trackDragEvent);
    }

    this.trackDragEvent = event;
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleMouseUp() {
    if (!this.props.draggableTrack) {
      return;
    }

    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.trackDragEvent = null;
  }

  /**
   * @private
   * @param {SyntheticEvent} event - User event
   */
  @autobind
  handleMouseDown(event) {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const trackClientRect = this.getClientRect();
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    this.props.onTrackMouseDown(event, position);

    if (this.props.draggableTrack) {
      this.addDocumentMouseMoveListener();
      this.addDocumentMouseUpListener();
    }
  }

  /**
   * @private
   * @param {SyntheticEvent} event - User event
   */
  @autobind
  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  /**
   * @override
   * @return {JSX.Element}
   */
  render() {
    const activeTrackStyle = this.getActiveTrackStyle();

    return (
      <div
        className={this.props.classNames.track}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        ref={(node) => { this.node = node; }}>
        <div
          style={activeTrackStyle}
          className={this.props.classNames.activeTrack} />
        {this.props.children}
      </div>
    );
  }
}
