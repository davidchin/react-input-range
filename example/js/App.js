import React from 'react';
import InputRange from 'InputRange';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5,
      value2: null,
      value3: 10,
      value4: {
        max: new Date().getTime(),
        min: new Date(2012, 3, 2).getTime(),
      },
      value5: {
        min: null,
        max: null,
      }
    };
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

  handleChangeComplete(component, value) {
    console.log(value);
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
          onChange={this.handleValueChange.bind(this)}
          onChangeComplete={this.handleChangeComplete.bind(this)}
        />

        <InputRange
          maxValue={new Date().getTime()}
          minValue={new Date(2009, 3, 2).getTime()}
          value={this.state.value4}
          onChange={this.handleValue4Change.bind(this)}
          onChangeComplete={this.handleChangeComplete.bind(this)}
          formatLabel={(value) => new Date(value).getMonth() + ' ' + new Date(value).getFullYear()}
        />

        <InputRange
          maxValue={10}
          minValue={-10}
          value={this.state.value2}
          defaultValue={defaultValue}
          onChange={this.handleValue2Change.bind(this)}
        />

        <InputRange
          maxValue={10}
          minValue={-10}
          value={this.state.value5}
          defaultValue={defaultValue2}
          onChange={this.handleValue5Change.bind(this)}
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
