import React from 'react';

/**
 * @ignore
 * Label React component
 */
export default function Label(props) {
  const { children, className, containerClassName, formatLabel } = props;
  const labelValue = formatLabel ? formatLabel(children) : children;

  return (
    <span className={className}>
      <span className={containerClassName}>
        {labelValue}
      </span>
    </span>
  );
}

/**
 * Accepted propTypes of Label
 * @type {Object}
 * @property {Function} children
 * @property {Function} className
 * @property {Function} containerClassName
 * @property {Function} formatLabel
 */
Label.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string.isRequired,
  containerClassName: React.PropTypes.string.isRequired,
  formatLabel: React.PropTypes.func,
};
