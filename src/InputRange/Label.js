import React from 'react';

/**
 * @module InputRange/Label
 */

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

    return (
      <span className={ className }>
        <span className={ containerClassName }>
          { this.props.children }
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
 */
Label.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  containerClassName: React.PropTypes.string,
};
