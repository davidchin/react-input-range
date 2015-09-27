# react-input-range

`InputRange` is a React component allowing users to input a numeric value within a predefined range. It can accept a single value, or a range of values (start/end). By default, basic styles are applied, but can be overridden depending on your design requirements.

## Installation

1. Install `react-input-range` using npm. `npm install react-input-range`
2. Import `react-input-range.css` to apply the default styling.
3. Import `react-input-range.js` to use `InputRange` component.

## Usage
If accepting a range of values:

```{js}
import React from 'react';
import InputRange from 'react-input-range';

const values = {
  min: 2,
  max: 10
};

function onChange(component, values) {
  console.log(values);
}

React.render(
  <InputRange maxValue={20} minValue={0} values={values} onChange={onChange} />,
  document.getElementById('input-range')
);
```

If accepting a single value:

```{js}
const value = 10;

React.render(
  <InputRange maxValue={20} minValue={0} value={value} onChange={onChange} />,
  document.getElementById('input-range')
);
```

### Options
Property                | Type            | Description
:-----------------------|:----------------|:----------------------------------
ariaLabelledby          |string           |`aria-labelledby` attribute
maxValue                |number           |Maximum value it can accept
minValue                |number           |Minimum value it can accept
name                    |string           |Name of `form` input
onChange                |Function         |`onChange` callback
step                    |number           |Increment/decrement value
value                   |number           |Default value
values                  |Array.\<number\> |Default range of values

## Development

Run with `npm start`
