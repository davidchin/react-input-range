import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from '../../src/js/InputRange/InputRange';
import * as valueTransformer from '../../src/js/InputRange/valueTransformer';
import { renderComponent, rerenderComponent } from '../TestUtil';

let inputRange;
let onChange;

describe('InputRange', () => {
  let value;
  let values;

  beforeEach(() => {
    value = 5;
    values = {
      min: 2,
      max: 10,
    };

    onChange = jasmine.createSpy('onChange');
    inputRange = renderComponent(
      <InputRange maxValue={20} minValue={0} value={values} onChange={onChange} />
    );
  });

  describe('initialize', () => {
    it('should set default class names for its sub-components and itself', () => {
      expect(inputRange.props.classNames).toEqual({
        component: 'InputRange',
        labelContainer: 'InputRange-labelContainer',
        labelMax: 'InputRange-label InputRange-label--max',
        labelMin: 'InputRange-label InputRange-label--min',
        labelValue: 'InputRange-label InputRange-label--value',
        slider: 'InputRange-slider',
        sliderContainer: 'InputRange-sliderContainer',
        trackActive: 'InputRange-track InputRange-track--active',
        trackContainer: 'InputRange-track InputRange-track--container',
        disabled: 'is-disabled',
      });
    });
  });

  describe('updateValue', () => {
    let newValue;

    beforeEach(() => {
      spyOn(inputRange, 'updateValues');
      spyOn(valueTransformer, 'valuesFromProps').and.returnValue({ max: 10 });

      newValue = 10;
    });

    it('should get values from props', () => {
      inputRange.updateValue('max', newValue);

      expect(valueTransformer.valuesFromProps).toHaveBeenCalledWith(inputRange);
    });

    it('should update value for key', () => {
      inputRange.updateValue('max', newValue);

      expect(inputRange.updateValues).toHaveBeenCalledWith({ max: 10 });
    });
  });

  describe('updateValues', () => {
    let newValues;

    beforeEach(() => {
      newValues = {
        min: 2,
        max: 11,
      };
    });

    describe('if it is a multi-value slider', () => {
      it('should call `onChange` callback', () => {
        inputRange.updateValues(newValues);

        expect(onChange).toHaveBeenCalledWith(inputRange, newValues);
      });
    });

    describe('if it is not a multi-value slider', () => {
      beforeEach(() => {
        inputRange = renderComponent(
          <InputRange maxValue={20} minValue={0} value={value} onChange={onChange} />
        );
      });

      it('should call `onChange` callback', () => {
        inputRange.updateValues(newValues);

        expect(onChange).toHaveBeenCalledWith(inputRange, newValues.max);
      });
    });
  });

  describe('updatePositions', () => {
    let positions;

    beforeEach(() => {
      spyOn(inputRange, 'updateValues');
      spyOn(valueTransformer, 'valueFromPosition').and.callThrough();
      spyOn(valueTransformer, 'stepValueFromValue').and.callThrough();

      positions = {
        min: {
          x: 0,
          y: 0,
        },
        max: {
          x: 100,
          y: 0,
        },
      };
    });

    it('should update values', () => {
      inputRange.updatePositions(positions);

      expect(inputRange.updateValues).toHaveBeenCalledWith({ min: 0, max: 5 });
    });

    it('should convert positions into values', () => {
      inputRange.updatePositions(positions);

      expect(valueTransformer.valueFromPosition).toHaveBeenCalled();
    });

    it('should convert values into step values', () => {
      inputRange.updatePositions(positions);

      expect(valueTransformer.stepValueFromValue).toHaveBeenCalled();
    });
  });

  describe('updatePosition', () => {
    beforeEach(() => {
      spyOn(inputRange, 'updatePositions');
    });

    it('should set the position of the slider according to its type', () => {
      const position = {
        x: 100,
        y: 0,
      };

      inputRange.updatePosition('min', position);

      expect(inputRange.updatePositions).toHaveBeenCalledWith({
        min: position,
        max: { x: jasmine.any(Number), y: jasmine.any(Number) },
      });
    });
  });

  describe('incrementValue', () => {
    beforeEach(() => {
      spyOn(inputRange, 'updateValue');
    });

    it('should increment slider value by the step amount', () => {
      inputRange.incrementValue('min');

      expect(inputRange.updateValue).toHaveBeenCalledWith('min', values.min + 1);
    });
  });

  describe('decrementValue', () => {
    beforeEach(() => {
      spyOn(inputRange, 'updateValue');
    });

    it('should decrement slider value by the step amount', () => {
      inputRange.decrementValue('min');

      expect(inputRange.updateValue).toHaveBeenCalledWith('min', values.min - 1);
    });
  });

  describe('formatLabel', () => {
    it('should format label by prepending prefix label if it is provided', () => {
      inputRange = renderComponent(
        <InputRange labelPrefix="$" value={value} onChange={onChange} />
      );

      const output = inputRange.formatLabel(5);

      expect(output).toEqual('$5');
    });

    it('should format label by appending suffix label if it is provided', () => {
      inputRange = renderComponent(
        <InputRange labelSuffix="kg" value={value} onChange={onChange} />
      );

      const output = inputRange.formatLabel(5);

      expect(output).toEqual('5kg');
    });

    it('should format label by calling custom formatter if it provided', () => {
      function formatLabel(labelValue) {
        return `${labelValue} burgers`;
      }

      inputRange = renderComponent(
        <InputRange formatLabel={formatLabel} value={value} onChange={onChange} />
      );

      const output = inputRange.formatLabel(5);

      expect(output).toEqual('5 burgers');
    });
  });

  describe('handleSliderMouseMove', () => {
    let slider;
    let event;

    beforeEach(() => {
      spyOn(inputRange, 'updatePosition');

      slider = inputRange.refs.sliderMax;
      event = {
        clientX: 100,
        clientY: 200,
      };
    });

    it('should set the position of a slider according to mouse event', () => {
      inputRange.handleSliderMouseMove(event, slider);

      expect(inputRange.updatePosition).toHaveBeenCalledWith('max', { x: 92, y: 0 });
    });

    it('should not set the position of a slider if disabled', () => {
      inputRange = renderComponent(<InputRange disabled={true} defaultValue={0} onChange={onChange}/>);
      spyOn(inputRange, 'updatePosition');
      inputRange.handleSliderMouseMove(event, slider);

      expect(inputRange.updatePosition).not.toHaveBeenCalled();
    });
  });

  describe('handleSliderKeyDown', () => {
    let slider;
    let event;

    describe('when pressing left arrow key', () => {
      beforeEach(() => {
        spyOn(inputRange, 'decrementValue');

        slider = inputRange.refs.sliderMax;
        event = {
          keyCode: 37,
          preventDefault: jasmine.createSpy('preventDefault'),
        };
      });

      it('should decrement value', () => {
        inputRange.handleSliderKeyDown(event, slider);

        expect(inputRange.decrementValue).toHaveBeenCalledWith('max');
      });

      it('should call event.preventDefault()', () => {
        inputRange.handleSliderKeyDown(event, slider);

        expect(event.preventDefault).toHaveBeenCalledWith();
      });

      it('should not decrement value if disabled', () => {
        inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
        spyOn(inputRange, 'decrementValue');
        inputRange.handleSliderKeyDown(event, slider);

        expect(inputRange.decrementValue).not.toHaveBeenCalled();
      });
    });

    describe('when pressing down arrow key', () => {
      beforeEach(() => {
        spyOn(inputRange, 'decrementValue');

        slider = inputRange.refs.sliderMax;
        event = {
          keyCode: 40,
          preventDefault: jasmine.createSpy('preventDefault'),
        };
      });

      it('should decrement value', () => {
        inputRange.handleSliderKeyDown(event, slider);

        expect(inputRange.decrementValue).toHaveBeenCalledWith('max');
      });

      it('should call event.preventDefault()', () => {
        inputRange.handleSliderKeyDown(event, slider);

        expect(event.preventDefault).toHaveBeenCalledWith();
      });

      it('should not decrement value if disabled', () => {
        inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
        spyOn(inputRange, 'decrementValue');
        inputRange.handleSliderKeyDown(event, slider);

        expect(inputRange.decrementValue).not.toHaveBeenCalled();
      });
    });

    describe('when pressing right arrow key', () => {
      beforeEach(() => {
        spyOn(inputRange, 'incrementValue');

        slider = inputRange.refs.sliderMax;
        event = {
          keyCode: 39,
          preventDefault: jasmine.createSpy('preventDefault'),
        };
      });

      it('should increment value', () => {
        inputRange.handleSliderKeyDown(event, slider);

        expect(inputRange.incrementValue).toHaveBeenCalledWith('max');
      });

      it('should call event.preventDefault()', () => {
        inputRange.handleSliderKeyDown(event, slider);

        expect(event.preventDefault).toHaveBeenCalledWith();
      });

      it('should not increment value if disabled', () => {
        inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
        spyOn(inputRange, 'incrementValue');
        inputRange.handleSliderKeyDown(event, slider);

        expect(inputRange.incrementValue).not.toHaveBeenCalled();
      });
    });

    describe('when pressing up arrow key', () => {
      beforeEach(() => {
        spyOn(inputRange, 'incrementValue');

        slider = inputRange.refs.sliderMax;
        event = {
          keyCode: 38,
          preventDefault: jasmine.createSpy('preventDefault'),
        };
      });

      it('should increment value', () => {
        inputRange.handleSliderKeyDown(event, slider);

        expect(inputRange.incrementValue).toHaveBeenCalledWith('max');
      });

      it('should call event.preventDefault()', () => {
        inputRange.handleSliderKeyDown(event, slider);

        expect(event.preventDefault).toHaveBeenCalledWith();
      });

      it('should not increment value if disabled', () => {
        inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
        spyOn(inputRange, 'incrementValue');
        inputRange.handleSliderKeyDown(event, slider);

        expect(inputRange.incrementValue).not.toHaveBeenCalled();
      });
    });
  });

  describe('handleTrackMouseDown', () => {
    let track;
    let position;
    let event;

    beforeEach(() => {
      spyOn(inputRange, 'updatePosition');

      track = {};
      position = {
        x: 100,
        y: 0,
      };
      event = {
        clientX: 100,
        clientY: 200,
        preventDefault: jasmine.createSpy('preventDefault'),
      };
    });

    it('should call event.preventDefault if not disabled', () => {
      inputRange.handleTrackMouseDown(event, track, position);

      expect(event.preventDefault).toHaveBeenCalledWith();
    });

    it('should not call event.preventDefault if disabled', () => {
      inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
      inputRange.handleTrackMouseDown(event, track, position);

      expect(event.preventDefault).not.toHaveBeenCalledWith();
    });

    it('should not set a new position if disabled', () => {
      inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
      spyOn(inputRange, 'updatePosition');
      inputRange.handleTrackMouseDown(event, track, position);

      expect(inputRange.updatePosition).not.toHaveBeenCalled();
    });

    describe('if it is a multi-value slider', () => {
      describe('if the new position is closer to `min` slider', () => {
        it('should set the position of the `min` slider', () => {
          position.x = 100;
          inputRange.handleTrackMouseDown(event, track, position);

          expect(inputRange.updatePosition).toHaveBeenCalledWith('min', position);
        });
      });

      describe('if the new position is closer to `max` slider', () => {
        it('should set the position of the `max` slider', () => {
          position.x = 400;
          inputRange.handleTrackMouseDown(event, track, position);

          expect(inputRange.updatePosition).toHaveBeenCalledWith('max', position);
        });
      });
    });

    describe('if it is not a multi-value slider', () => {
      beforeEach(() => {
        inputRange = renderComponent(
          <InputRange maxValue={20} minValue={0} value={value} onChange={onChange} />
        );
        spyOn(inputRange, 'updatePosition');
      });

      it('should set the position of the `max` slider', () => {
        position.x = 100;
        inputRange.handleTrackMouseDown(event, track, position);

        expect(inputRange.updatePosition).toHaveBeenCalledWith('max', position);
      });
    });
  });

  describe('handleInteractionEnd', () => {
    let onChangeComplete;
    let mouseDownEvent;
    let mouseUpEvent;
    let slider;

    beforeEach(() => {
      onChangeComplete = jasmine.createSpy('onChangeComplete');
      mouseDownEvent = document.createEvent('MouseEvent');
      mouseUpEvent = document.createEvent('MouseEvent');

      mouseDownEvent.initMouseEvent('mousedown', true);
      mouseUpEvent.initMouseEvent('mouseup', true);

      inputRange = renderComponent(
        <InputRange maxValue={20} minValue={0} value={value} onChange={onChange} onChangeComplete={onChangeComplete}/>
      );
      slider = ReactDOM.findDOMNode(inputRange.refs.sliderMax);
    });

    it('should call onChangeComplete if value has changed since the start of interaction', () => {
      slider.dispatchEvent(mouseDownEvent);
      value += 2;
      inputRange = rerenderComponent(
        <InputRange maxValue={20} minValue={0} value={value} onChange={onChange} onChangeComplete={onChangeComplete}/>
      );
      slider.dispatchEvent(mouseUpEvent);

      expect(onChangeComplete).toHaveBeenCalledWith(inputRange, value);
    });

    it('should call onChangeComplete if value has changed since the start of interaction when only defaultValue was provided', () => {
      const defaultValue = value;
      inputRange = renderComponent(
        <InputRange maxValue={20} minValue={0} defaultValue={defaultValue} onChange={onChange} onChangeComplete={onChangeComplete}/>
      );
      slider = ReactDOM.findDOMNode(inputRange.refs.sliderMax);

      slider.dispatchEvent(mouseDownEvent);
      value += 2;
      inputRange = rerenderComponent(
        <InputRange maxValue={20} minValue={0} defaultValue={defaultValue} value={value} onChange={onChange} onChangeComplete={onChangeComplete}/>
      );
      slider.dispatchEvent(mouseUpEvent);

      expect(onChangeComplete).toHaveBeenCalledWith(inputRange, value);
    });

    it('should not call onChangeComplete if value has not changed since the start of interaction', () => {
      slider.dispatchEvent(mouseDownEvent);
      inputRange = rerenderComponent(
        <InputRange maxValue={20} minValue={0} value={value} onChange={onChange} onChangeComplete={onChangeComplete}/>
      );
      slider.dispatchEvent(mouseUpEvent);

      expect(onChangeComplete).not.toHaveBeenCalled();
    });
  });

  describe('ariaLabelledby', () => {
    it('should call onChangeComplete if value has changed since the start of interaction', () => {
      inputRange = renderComponent(
        <InputRange ariaLabelledby="foobar" maxValue={20} minValue={0} value={values} onChange={onChange} />
      );

      const slider = ReactDOM.findDOMNode(inputRange.refs.sliderMax);
      const handle = slider.querySelector('a');
      const ariaLabelledby = handle.getAttribute('aria-labelledby');

      expect(ariaLabelledby).toEqual('foobar');
    });
  });

  describe('ariaControls', () => {
    it('should call onChangeComplete if value has changed since the start of interaction', () => {
      inputRange = renderComponent(
        <InputRange ariaControls="foobar" maxValue={20} minValue={0} value={values} onChange={onChange} />
      );

      const slider = ReactDOM.findDOMNode(inputRange.refs.sliderMax);
      const handle = slider.querySelector('a');
      const ariaControls = handle.getAttribute('aria-controls');

      expect(ariaControls).toEqual('foobar');
    });
  });
});
