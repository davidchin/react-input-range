/**
 * @module InputRange/Label
 */

import PropTypes from 'prop-types';

import React from 'react';

/**
 * Label React component
 * @class
 * @extends React.Component
 * @param {Object} props - React component props
 */
export default class Label extends React.Component {
  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render() {
    const { className, containerClassName } = this.props;
    const labelValue = this.props.formatLabel ?
                       this.props.formatLabel(this.props.children) :
                       this.props.children;

    return (
      <span className={ className }>
        <span className={ containerClassName }>
          { labelValue }
        </span>
      </span>
    );
  }
}

/**
 * Accepted propTypes of Label
 * @static {Object}
 * @property {Function} children
 * @property {Function} className
 * @property {Function} containerClassName
 * @property {Function} formatLabel
 */
Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  formatLabel: PropTypes.func,
};
