import React from 'react';

/**
 * @ignore
 * Label React component
 */
export default function Label(props) {
  const labelValue = props.formatLabel ? props.formatLabel(props.children) : props.children;

  return (
    <span className={props.classNames[`${props.type}Label`]}>
      <span className={props.classNames.labelContainer}>
        {labelValue}
      </span>
    </span>
  );
}

/**
 * Accepted propTypes of Label
 * @type {Object}
 * @property {Function} children
 * @property {Function} classNames
 * @property {Function} formatLabel
 * @property {Function} type
 */
Label.propTypes = {
  children: React.PropTypes.node.isRequired,
  classNames: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  formatLabel: React.PropTypes.func,
  type: React.PropTypes.string.isRequired,
};
