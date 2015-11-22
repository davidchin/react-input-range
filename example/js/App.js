import React from 'react';
import InputRange from 'InputRange';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5,
      values: {
        min: 5,
        max: 10,
      },
    };
  }

  handleValuesChange(component, values) {
    console.log(values);

    this.setState({
      values: values,
    });
  }

  handleValueChange(component, value) {
    console.log(value);

    this.setState({
      value: value,
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
          values={this.state.values}
          onChange={this.handleValuesChange.bind(this)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          defaultValues={defaultValues}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={this.handleValueChange.bind(this)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          defaultValue={defaultValue}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          disabled={true}
          defaultValue={defaultValue}
        />
      </form>
    );
  }
}

export default App;
