import React from 'react';
import InputRange from '../../src/js';
import { mount, shallow } from 'enzyme';

let container;
let requestAnimationFrame;

beforeEach(() => {
  requestAnimationFrame = window.requestAnimationFrame;
  window.requestAnimationFrame = callback => callback();

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  window.requestAnimationFrame = requestAnimationFrame;

  document.body.removeChild(container);
});

describe('InputRange', () => {
  it('updates the current value when the user tries to drag the slider', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const minSlider = component.find(`Slider [onMouseDown]`).at(0);
    const maxSlider = component.find(`Slider [onMouseDown]`).at(1);

    minSlider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 100, clientY: 50 }));
    expect(component.props().value).toEqual({ min: 5, max: 10 });

    maxSlider.simulate('mouseDown', { clientX: 210, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 260, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 260, clientY: 50 }));
    expect(component.props().value).toEqual({ min: 5, max: 13 });

    component.detach();
  });

  it('updates the current value when the user clicks on the track', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const track = component.find(`Track [onMouseDown]`).first();

    track.simulate('mouseDown', { clientX: 150, clientY: 50 });
    expect(component.props().value).toEqual({ min: 2, max: 7 });

    track.simulate('mouseDown', { clientX: 20, clientY: 50 });
    expect(component.props().value).toEqual({ min: 1, max: 7 });

    component.detach();
  });

  it('updates the current value when the user touches on the track', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const track = component.find(`Track [onTouchStart]`).first();

    track.simulate('touchStart', { touches: [{ clientX: 150, clientY: 50 }] });
    expect(component.props().value).toEqual({ min: 2, max: 7 });

    component.detach();
  });

  it('updates the current value by a predefined increment', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
        step={2}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const slider = component.find(`Slider [onMouseDown]`).first();

    slider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 60, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 60, clientY: 50 }));
    expect(component.props().value).toEqual({ min: 2, max: 10 });

    slider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 70, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 70, clientY: 50 }));
    expect(component.props().value).toEqual({ min: 4, max: 10 });

    component.detach();
  });

  it('updates the current value when the user hits one of the arrow keys', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx);
    const slider = component.find(`Slider [onKeyDown]`).first();

    slider.simulate('keyDown', { keyCode: 37 });
    slider.simulate('keyUp', { keyCode: 37 });
    expect(component.props().value).toEqual({ min: 1, max: 10 });

    slider.simulate('keyDown', { keyCode: 39 });
    slider.simulate('keyUp', { keyCode: 39 });
    expect(component.props().value).toEqual({ min: 2, max: 10 });
  });

  it('does not respond to keyboard events other than arrow keys', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx);
    const slider = component.find(`Slider [onKeyDown]`).first();

    slider.simulate('keyDown', { keyCode: 65 });
    slider.simulate('keyUp', { keyCode: 65 });
    expect(component.props().value).toEqual({ min: 2, max: 10 });
  });

  it('does not respond to mouse event when it is disabled', () => {
    const jsx = (
      <InputRange
        disabled={true}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const slider = component.find(`Slider [onMouseDown]`).at(0);

    slider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 100, clientY: 50 }));
    expect(component.props().value).toEqual({ min: 2, max: 10 });

    component.detach();
  });

  it('does not respond to keyboard event when it is disabled', () => {
    const jsx = (
      <InputRange
        disabled={true}
        value={2}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx);
    const slider = component.find(`Slider [onKeyDown]`).first();

    slider.simulate('keyDown', { keyCode: 37 });
    slider.simulate('keyUp', { keyCode: 37 });
    expect(component.props().value).toEqual(2);
  });

  it('prevents the min/max value from exceeding the min/max range', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const minSlider = component.find(`Slider [onMouseDown]`).at(0);
    const maxSlider = component.find(`Slider [onMouseDown]`).at(1);

    minSlider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: -20, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: -20, clientY: 50 }));
    expect(component.props().value).toEqual({ min: 0, max: 10 });

    maxSlider.simulate('mouseDown', { clientX: 210, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 600, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 600, clientY: 50 }));
    expect(component.props().value).toEqual({ min: 0, max: 20 });

    component.detach();
  });

  it('prevents the current value from exceeding the min/max range', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={2}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const slider = component.find(`Slider [onMouseDown]`).first();

    slider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: -20, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: -20, clientY: 50 }));
    expect(component.props().value).toEqual(0);

    slider.simulate('mouseDown', { clientX: 0, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 600, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 600, clientY: 50 }));
    expect(component.props().value).toEqual(20);

    component.detach();
  });

  it('prevents the minimum value from exceeding the maximum value', () => {
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const slider = component.find(`Slider [onMouseDown]`).first();

    slider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 190, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 190, clientY: 50 }));
    expect(component.props().value).toEqual({ min: 9, max: 10 });

    component.detach();
  });

  it('notifies the parent component when dragging starts', () => {
    const onChange = jasmine.createSpy('onChange').and.callFake(value => component.setProps({ value }));
    const onChangeStart = jasmine.createSpy('onChangeStart');
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
        onChangeStart={onChangeStart}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const slider = component.find(`Slider [onMouseDown]`).first();

    slider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 150, clientY: 50 }));
    expect(onChangeStart.calls.count()).toEqual(1);

    component.detach();
  });

  it('notifies the parent component when dragging stops', () => {
    const onChange = jasmine.createSpy('onChange').and.callFake(value => component.setProps({ value }));
    const onChangeComplete = jasmine.createSpy('onChangeComplete');
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const slider = component.find(`Slider [onMouseDown]`).first();

    slider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 150, clientY: 50 }));
    expect(onChange.calls.count()).toEqual(2);
    expect(onChangeComplete.calls.count()).toEqual(1);

    component.detach();
  });

  it('does not notify the parent component if there is no change', () => {
    const onChange = jasmine.createSpy('onChange').and.callFake(value => component.setProps({ value }));
    const onChangeComplete = jasmine.createSpy('onChangeComplete');
    const jsx = (
      <InputRange
        maxValue={20}
        minValue={0}
        value={{ min: 2, max: 10 }}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />
    );
    const component = mount(jsx, { attachTo: container });
    const slider = component.find(`Slider [onMouseDown]`).first();

    slider.simulate('mouseDown', { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 51, clientY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 51, clientY: 50 }));
    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeComplete).not.toHaveBeenCalled();

    component.detach();
  });

  it('displays the current value as a label', () => {
    const jsx = (
      <InputRange
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx);
    const label = component.find('Slider Label').first();

    expect(label.text()).toEqual('2');
  });

  it('displays the current value as a formatted label', () => {
    const jsx = (
      <InputRange
        value={{ min: 2, max: 10 }}
        formatLabel={(value) => `${value}cm`}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx);
    const label = component.find('Slider Label').first();

    expect(label.text()).toEqual('2cm');
  });

  it('displays the current value for screen readers', () => {
    const jsx = (
      <InputRange
        value={{ min: 2, max: 10 }}
        onChange={value => component.setProps({ value })}
      />
    );
    const component = mount(jsx);
    const sliderHandle = component.find('Slider [role="slider"]').first();

    expect(sliderHandle.getDOMNode().getAttribute('aria-valuenow')).toEqual('2');
  });

  it('renders a pair of sliders if the input value is a range', () => {
    const jsx = (
      <InputRange
        value={{ min: 2, max: 10 }}
        onChange={() => {}}
      />
    );
    const component = mount(jsx);

    expect(component.find('Slider').length).toEqual(2);
  });

  it('renders a single slider if the input value is a number', () => {
    const jsx = (
      <InputRange
        value={2}
        onChange={() => {}}
      />
    );
    const component = mount(jsx);

    expect(component.find('Slider').length).toEqual(1);
  });

  it('renders a pair of hidden inputs containing the current min/max value', () => {
    const jsx = (
      <InputRange
        name="price"
        value={{ min: 2, max: 10 }}
        onChange={() => {}}
      />
    );
    const component = mount(jsx);
    const minInput = component.find('[name="priceMin"][type="hidden"]');
    const maxInput = component.find('[name="priceMax"][type="hidden"]');

    expect(minInput.getDOMNode().getAttribute('value')).toEqual('2');
    expect(maxInput.getDOMNode().getAttribute('value')).toEqual('10');
  });

  it('renders a hidden input containing the current value', () => {
    const jsx = (
      <InputRange
        name="price"
        value={5}
        onChange={() => {}}
      />
    );
    const component = mount(jsx);
    const hiddenInput = component.find('[name="price"][type="hidden"]');

    expect(hiddenInput.getDOMNode().getAttribute('value')).toEqual('5');
  });

  it('returns an error if the max/min range is invalid', () => {
    const sampleProps = [
      { minValue: '2', maxValue: '10' },
      { minValue: 10, maxValue: 2 },
    ];

    sampleProps.forEach(props => {
      expect(InputRange.propTypes.minValue(props)).toEqual(jasmine.any(Error));
      expect(InputRange.propTypes.maxValue(props)).toEqual(jasmine.any(Error));
    });
  });

  it('returns an error if the current value is not in the expected format', () => {
    const sampleProps = [
      { value: { a: 3, b: 6 }, minValue: 2, maxValue: 10 },
      { value: { min: 1, max: 6 }, minValue: 2, maxValue: 10 },
      { value: { min: 2, max: 11 }, minValue: 2, maxValue: 10 },
      { value: 11, minValue: 2, maxValue: 10 },
      { value: null, minValue: 2, maxValue: 10 },
    ];

    sampleProps.forEach(props => {
      expect(InputRange.propTypes.value(props, 'value')).toEqual(jasmine.any(Error));
    });
  });
});
