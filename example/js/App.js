import React from 'react';
import InputRange from 'InputRange';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5,
      value2: null,
      value3: 10,
      values: {
        min: 5,
        max: 10,
      },
      values2: {
        min: null,
        max: null,
      }
    };
  }

  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
  }

  handleValues2Change(component, values) {
    this.setState({
      values2: values,
    });
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

  render() {
    const defaultValue = 2;
    const defaultValues = {
      min: 2,
      max: 8,
    };

    return (
      <form className="form">
        <InputRange
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={this.handleValueChange.bind(this)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          values={this.state.values}
          onChange={this.handleValuesChange.bind(this)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          value={this.state.value2}
          defaultValue={defaultValue}
          onChange={this.handleValue2Change.bind(this)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          values={this.state.values2}
          defaultValues={defaultValues}
          onChange={this.handleValues2Change.bind(this)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          disabled={true}
          value={this.state.value3}
          onChange={this.handleValue3Change.bind(this)}
        />
      </form>
    );
  }
}

export default App;
