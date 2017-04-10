import React from 'react';
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
   * @property {Function} onTrackMouseDown
   * @property {Function} percentages
   */
  static get propTypes() {
    return {
      children: React.PropTypes.node.isRequired,
      classNames: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
      onTrackMouseDown: React.PropTypes.func.isRequired,
      percentages: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
      isExternal: React.PropTypes.bool.isRequired,
    };
  }

  /**
   * @param {Object} props
   * @param {InputRangeClassNames} props.classNames
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
   * @private
   * @return {Object} CSS styles
   */
  @autobind
  getActiveTrackStylePre() {
    const width = `${(this.props.percentages.max) * 100}%`;
    const left = '0';
    const float = 'left';
    return { left, width, float };
  }


  /**
   * @private
   * @return {Object} CSS styles
   */
  @autobind
  getActiveTrackStylePost() {
    const width = `${(1 - this.props.percentages.min) * 100}%`;
    const left = `${this.props.percentages.min * 100}%`;

    return { left, width };
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
    const activeTrackStyleExternalPre = this.getActiveTrackStylePre();
    const activeTrackStyleExternalPost = this.getActiveTrackStylePost();

    return (
      <div
        className={this.props.classNames.track}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        ref={(node) => { this.node = node; }}>
        {
          !this.props.isExternal ? (
            <div
              style={activeTrackStyle}
              className={this.props.classNames.activeTrack} />
          ) : (
            <div>
              <div
                style={activeTrackStyleExternalPre}
                className={this.props.classNames.activeTrack} />
              <div
                style={activeTrackStyleExternalPost}
                className={this.props.classNames.activeTrack} />
            </div>
          )
        }
        {this.props.children}
      </div>
    );
  }
}
