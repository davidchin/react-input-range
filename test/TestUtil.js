import ReactDOM from 'react-dom';

function renderComponent(jsx) {
  let container = document.getElementById('container');

  if (container) {
    ReactDOM.unmountComponentAtNode(container);
  } else {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  }

  return ReactDOM.render(jsx, container);
}

function rerenderComponent(jsx) {
  const container = document.getElementById('container');

  if (container) {
    return ReactDOM.render(jsx, container);
  }

  return renderComponent(jsx);
}

const TestUtil = {
  renderComponent,
  rerenderComponent,
};

export default TestUtil;
