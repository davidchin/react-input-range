# react-input-range

`InputRange` is a React component allowing users to input a numeric value within a predefined range. It can accept a single value, or a range of values (start/end). By default, basic styles are applied, but can be overridden depending on your design requirements.

## Demo
A CodePen demo is available [here](http://codepen.io/davidchin/full/GpNvqw/).

## Installation

1. Install `react-input-range` using npm. `npm install react-input-range`
2. Import `react-input-range` to use `InputRange` component.
3. Optionally, import `react-input-range.css` if you want to apply the default styling.
4. Depending on your browser support requirement, `babel-core/polyfill` or `core-js/es6` polyfill might be needed.

## Usage
If accepting a range of values:

```{js}
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
        onChange={this.handleValuesChange.bind(this)}
      />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

If accepting a single value, pass a number to `value` prop, i.e.:

```{js}
<InputRange
  maxValue={20}
  minValue={0}
  value={this.state.value}
  onChange={this.handleValueChange.bind(this)}
/>
```

### Options
Property                | Type                               | Description
:-----------------------|:-----------------------------------|:----------------------------------
ariaLabelledby          |string                              |`aria-labelledby` attribute
ariaControls            |string                              |`aria-controls` attribute
classNames              |Object.&lt;string&gt;               |CSS class names
defaultValue            |number &vert; Object.&lt;number&gt; |Default value(s)
disabled                |boolean                             |Disabled or not
formatLabel             |Function                            |Label formatter
labelPrefix             |string                              |Label prefix
labelSuffix             |string                              |Label suffix
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
npm install && bundle install
```

After that, you should be able run
```
npm start
```

Contributions are welcome. :)
