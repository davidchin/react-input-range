import React from 'react';

function removeComponent(component) {
  const domNode = React.findDOMNode(component);

  if (!domNode) {
    return;
  }

  React.unmountComponentAtNode(domNode);
}

function renderComponent(jsx) {
  const domNode = document.createElement('div');

  document.body.appendChild(domNode);

  return React.render(jsx, domNode);
}

const TestUtil = {
  removeComponent,
  renderComponent,
};

export default TestUtil;
