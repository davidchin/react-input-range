import React, { PropTypes } from 'react';

/**
 * @ignore
 * @param {InputRangeClassNames} classNames
 * @param {Function=} formatLabel
 * @param {Node} children
 * @param {string} type
 */
const Label = ({ formatLabel, children, type, classNames }) => (
  <span className={classNames[`${type}Label`]}>
    <span className={classNames.labelContainer}>
      {formatLabel ? formatLabel(children, type) : children}
    </span>
  </span>
);

/**
 * @type {Object}
 * @property {Function} children
 * @property {Function} classNames
 * @property {Function} formatLabel
 * @property {Function} type
 */
Label.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.objectOf(PropTypes.string).isRequired,
  formatLabel: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default Label;
