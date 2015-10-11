import React from 'react';
import InputRange from 'react-input-range';

const values = {
  min: 2,
  max: 10,
};

function onChange(component, values) {
  console.log(values);
}

React.render(
  <InputRange maxValue={20} minValue={0} values={values} onChange={onChange} />,
  document.getElementById('input-range')
);
