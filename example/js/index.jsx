import React from 'react';
import ReactDOM from 'react-dom';
import ExampleApp from './example-app';
import '../../src/scss/index.scss';
import '../scss/index.scss';

ReactDOM.render(
  <ExampleApp />,
  document.getElementById('app'),
);
