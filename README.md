# react-input-range

`InputRange` is a React component allowing users to input numeric values within a specific range. It can accept a single value, or a range of values (start/end). By default, basic styles are applied, but can be overridden depending on your design requirements.

[![Build Status](https://travis-ci.org/davidchin/react-input-range.svg?branch=master)](https://travis-ci.org/davidchin/react-input-range)

## Demo
A CodePen demo is available [here](http://codepen.io/davidchin/full/GpNvqw/).

## Installation

1. Install `react-input-range` using npm. `npm install react-input-range`
2. Import `react-input-range` to use `InputRange` component.
3. Optionally, import `react-input-range.css` if you want to apply the default styling.

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
      values: {
        min: 2,
        max: 10,
      },
    };

    this.handleValuesChange = this.handleValuesChange.bind(this);
  }

  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
  }

  render() {
    return (
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.values}
        onChange={this.handleValuesChange} />
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
  onChange={this.handleValueChange} />
```

To format labels:
```jsx
<InputRange
  formatLabel={(value) => `${value}cm`}
  value={this.state.value}
  onChange={this.handleValueChange} />
```

To specify the amount of increment/decrement
```jsx
<InputRange
  step={2}
  value={this.state.value}
  onChange={this.handleValueChange} />
```

### Options
Property                | Type                               | Description
:-----------------------|:-----------------------------------|:----------------------------------
ariaLabelledby          |string                              |`aria-labelledby` attribute
ariaControls            |string                              |`aria-controls` attribute
classNames              |Object.&lt;string&gt;               |CSS class names
disabled                |boolean                             |Disabled or not
formatLabel             |Function                            |Label formatter
maxValue                |number                              |Maximum value it can accept
minValue                |number                              |Minimum value it can accept
name                    |string                              |Name of `form` input
onChange                |Function                            |`onChange` callback (required)
onChangeComplete        |Function                            |`onChangeComplete` callback
step                    |number                              |Increment/decrement value
value                   |number &vert; Object.&lt;number&gt; |Current value(s) (required)

## Development

If you want to work on this project locally, you need to grab all of its dependencies.
```
npm install
```

After that, you should be able run
```
npm run dev
```

Contributions are welcome. :)
