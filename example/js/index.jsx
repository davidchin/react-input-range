import React from 'react';
import { render } from 'react-dom';
import ExampleApp from './example-app';
import '../../src/scss/index.scss';
import '../scss/index.scss';

render(
  <ExampleApp />,
  document.getElementById('app'),
);
