import React from 'react';

class Label extends React.Component {
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

Label.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  containerClassName: React.PropTypes.string,
};

export default Label;
