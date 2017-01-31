# react-input-range

`InputRange` is a React component allowing users to input numeric values within a specific range. It can accept a single value, or a range of values (min/max). By default, basic styles are applied, but can be overridden depending on your design requirements.

[![Build Status](https://travis-ci.org/davidchin/react-input-range.svg?branch=master)](https://travis-ci.org/davidchin/react-input-range)

## Demo
A CodePen demo is available [here](http://codepen.io/davidchin/full/GpNvqw/).

## Installation

1. Install `react-input-range` using npm. `npm install react-input-range`
2. Import `react-input-range` to use `InputRange` component.
3. Optionally, import `react-input-range/lib/css/index.css` if you want to apply the default styling.

## Usage

To accept min/max value:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: { min: 2, max: 10 },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(values) {
    this.setState({ values });
  }

  render() {
    return (
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.values}
        onChange={this.handleChange} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

To accept a single value:
```jsx
<InputRange
  maxValue={20}
  minValue={0}
  value={this.state.value}
  onChange={this.handleChange} />
```

To format labels:
```jsx
<InputRange
  formatLabel={(value) => `${value}cm`}
  value={this.state.value}
  onChange={this.handleChange} />
```

To specify the amount of increment/decrement
```jsx
<InputRange
  step={2}
  value={this.state.value}
  onChange={this.handleChange} />
```

## API

### InputRange#props

#### ariaLabelledby: string

Set `aria-labelledby` attribute to your component.

#### ariaControls: string

Set `aria-controls` attribute to your component.

#### classNames: InputRangeClassNames

Override the default CSS classes applied to your component and its sub-components.

#### disabled: boolean

If this property is set to true, your component is disabled. This means you'll not able to interact with it.

#### formatLabel: (value: number, type: string): string

By default, value labels are displayed as plain numbers. If you want to change the display, you can do so by passing in a function. The function can return something different, i.e.: append a unit, reduce the precision of a number.

#### maxValue: number

Set a maximum value for your component. You cannot drag your slider beyond this value.

#### minValue: number

Set a minimum value for your component. You cannot drag your slider under this value.

#### name: string

Set a name for your form component.

#### onChange: (value: number | Range): void

Whenever your user interacts with your component (i.e.: dragging a slider), this function gets called. Inside the function, you should assign the new value to your component.

#### onChangeComplete: (value: number | Range): void

Every mouse / touch event can trigger multiple updates, therefore causing `onChange` callback to fire multiple times. On the other hand, `onChangeComplete` callback only gets called when the user stops dragging.

#### step: number

The default increment/decrement of your component is 1. You can change that by setting a different number to this property.

#### value: number | Range

Set the current value for your component. If only a single number is provided, only a single slider will get rendered. If a range object (min/max) is provided, two sliders will get rendered

### Types

#### InputRangeClassNames
* activeTrack: string
* disabledInputRange: string
* inputRange: string
* labelContainer: string
* maxLabel: string
* minLabel: string
* slider: string
* sliderContainer: string
* track: string
* valueLabel: string

#### Range
* max: number
* min: number

## Development

If you want to work on this project locally, you need to grab all of its dependencies.
```
npm install
```

After that, you should be able run to preview
```
npm run dev
```

To test
```
npm test
```

Contributions are welcome. :)
