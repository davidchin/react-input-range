/* eslint-disable class-methods-use-this, no-console */

import React from 'react';
import InputRange from '../../src/js';

export default class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5,
      value2: null,
      value3: 10,
      value4: {
        min: 5,
        max: 10,
      },
      value5: {
        min: null,
        max: null,
      },
      value6: {
        min: 5,
        max: 10,
      },
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleValue2Change = this.handleValue2Change.bind(this);
    this.handleValue3Change = this.handleValue3Change.bind(this);
    this.handleValue4Change = this.handleValue4Change.bind(this);
    this.handleValue5Change = this.handleValue5Change.bind(this);
  }

  handleValueChange(component, value) {
    this.setState({
      value: value || 0,
    });
  }

  handleValue2Change(component, value) {
    this.setState({
      value2: value || 0,
    });
  }

  handleValue3Change(component, value) {
    this.setState({
      value3: value || 0,
    });
  }

  handleValue4Change(component, values) {
    this.setState({
      value4: values,
    });
  }

  handleValue5Change(component, values) {
    this.setState({
      value5: values,
    });
  }

  handleValue6Change(component, values) {
    this.setState({
      value6: values,
    });
  }

  handleChangeComplete(component, value) {
    console.log(value);
  }

  formatLabel(labelValue) {
    return labelValue.toFixed(2);
  }

  render() {
    const defaultValue = 2;
    const defaultValue2 = {
      min: 2,
      max: 8,
    };

    return (
      <form className="form">
        <InputRange
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={this.handleValueChange}
          onChangeComplete={this.handleChangeComplete}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          labelSuffix="kg"
          value={this.state.value4}
          onChange={this.handleValue4Change}
          onChangeComplete={this.handleChangeComplete}
        />

        <InputRange
          maxValue={10}
          minValue={-10}
          formatLabel={this.formatLabel}
          value={this.state.value2}
          defaultValue={defaultValue}
          onChange={this.handleValue2Change}
        />

        <InputRange
          maxValue={10}
          minValue={-10}
          value={this.state.value5}
          defaultValue={defaultValue2}
          onChange={this.handleValue5Change}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          disabled
          value={this.state.value3}
          onChange={this.handleValue3Change}
        />
      </form>
    );
  }
}
