import React from 'react';
import autobind from 'autobind-decorator';
import Label from './label';

/**
 * @ignore
 */
export default class Slider extends React.Component {
  /**
   * Accepted propTypes of Slider
   * @override
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
   * @property {Function} type
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
      type: React.PropTypes.string.isRequired,
      value: React.PropTypes.number.isRequired,
    };
  }

  /**
   * @param {Object} props
   * @param {string} [props.ariaLabelledby]
   * @param {string} [props.ariaControls]
   * @param {InputRangeClassNames} props.classNames
   * @param {Function} [props.formatLabel]
   * @param {number} [props.maxValue]
   * @param {number} [props.minValue]
   * @param {Function} props.onSliderKeyDown
   * @param {Function} props.onSliderMouseMove
   * @param {number} props.percentage
   * @param {number} props.type
   * @param {number} props.value
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
   * @ignore
   * @override
   * @return {void}
   */
  componentWillUnmount() {
    this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    this.node.ownerDocument.removeEventListener('touchmove', this.handleTouchMove);
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchUp);
  }

  /**
   * @private
   * @return {Object}
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
   * @private
   * @return {void}
   */
  @autobind
  handleMouseDown() {
    this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleMouseUp() {
    this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleMouseMove(event) {
    this.props.onSliderMouseMove(event, this.props.type);
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleTouchStart() {
    this.node.ownerDocument.removeEventListener('touchmove', this.handleTouchMove);
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
    this.node.ownerDocument.addEventListener('touchmove', this.handleTouchMove);
    this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleTouchMove(event) {
    this.props.onSliderMouseMove(event, this.props.type);
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleTouchEnd() {
    this.node.ownerDocument.removeEventListener('touchmove', this.handleTouchMove);
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleKeyDown(event) {
    this.props.onSliderKeyDown(event, this.props.type);
  }

  /**
   * @override
   * @return {JSX.Element}
   */
  render() {
    const style = this.getStyle();

    return (
      <span
        className={this.props.classNames.sliderContainer}
        ref={(node) => { this.node = node; }}
        style={style}>
        <Label
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="value">
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
