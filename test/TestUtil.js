import ReactDOM from 'react-dom';

export function renderComponent(jsx) {
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

export function rerenderComponent(jsx) {
  const container = document.getElementById('container');

  if (container) {
    return ReactDOM.render(jsx, container);
  }

  return renderComponent(jsx);
}
