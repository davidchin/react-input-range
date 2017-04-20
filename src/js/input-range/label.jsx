import React from 'react';

/**
 * @ignore
 * @param {Object} props
 * @param {InputRangeClassNames} props.classNames
 * @param {Function} props.formatLabel
 * @param {string} props.type
 */
export default function Label(props) {
  const labelValue = props.formatLabel ? props.formatLabel(props.children, props.type) : props.children;
  const labelClassName = props.markerType === 'track' ? `${props.classNames.labelContainer} marker-${props.markerValue}` : props.classNames.labelContainer;
  return (
    <span className={props.classNames[`${props.type}Label`]}>
      <span className={labelClassName}>
        {labelValue}
      </span>
    </span>
  );
}

/**
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
  markerType: React.PropTypes.string,
  markerValue: React.PropTypes.string,

};
