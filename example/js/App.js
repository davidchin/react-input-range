import React from 'react';
import InputRange from 'InputRange';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5,
      values: {
        min: 2,
        max: 10,
      },
    };
  }

  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
  }

  handleValueChange(component, value) {
    this.setState({
      value: value,
    });
  }

  render() {
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
          value={this.state.value}
          onChange={this.handleValueChange.bind(this)}
        />
      </form>
    );
  }
}

export default App;
