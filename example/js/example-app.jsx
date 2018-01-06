/* eslint-disable class-methods-use-this, no-console */

import React from 'react';
import InputRange from '../../src/js';

export default class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5,
      value2: 10,
      value3: 10,
      value4: {
        min: 5,
        max: 10,
      },
      value5: {
        min: 3,
        max: 7,
      },
      value6: {
        min: 3,
        max: 7,
      },
    };
  }

  render() {
    return (
      <form className="form">
        <InputRange
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onChangeComplete={value => console.log(value)} />

        <InputRange
          maxValue={20}
          minValue={0}
          disabled
          value={this.state.value2}
          onChange={value => this.setState({ value })}
          onChangeComplete={value => console.log(value)} />

        <InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => value.toFixed(2)}
          value={this.state.value3}
          onChange={value => this.setState({ value3: value })}
          onChangeStart={value => console.log('onChangeStart with value =', value)}
          onChangeComplete={value => console.log(value)} />

        <InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => `${value}kg`}
          value={this.state.value4}
          onChange={value => this.setState({ value4: value })}
          onChangeComplete={value => console.log(value)} />

        <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ value5: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.value5} />

        <InputRange
          allowSameValues
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ value6: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.value6} />
      </form>
    );
  }
}
