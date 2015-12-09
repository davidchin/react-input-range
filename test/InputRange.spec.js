import React from 'react';
import InputRange from 'InputRange';
import valueTransformer from '../src/InputRange/valueTransformer';
import { renderComponent } from './TestUtil';

let inputRange;
let onChange;
let onInteractiveUpdate;

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
    onInteractiveUpdate = jasmine.createSpy('onInteractiveUpdate');
    inputRange = renderComponent(
      <InputRange maxValue={20} minValue={0} value={values} onChange={onChange} onInteractiveUpdate={onInteractiveUpdate} />
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

      expect(inputRange.updateValues).toHaveBeenCalledWith({ max: 10 }, undefined);
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

      it('should call `onInteractiveUpdate` callback when it is an interactive update', () => {
        inputRange.updateValues(newValues, true);

        expect(onInteractiveUpdate).toHaveBeenCalledWith(inputRange, newValues);
      });
    });

    describe('if it is not a multi-value slider', () => {
      beforeEach(() => {
        inputRange = renderComponent(
          <InputRange maxValue={20} minValue={0} value={value} onChange={onChange} onInteractiveUpdate={onInteractiveUpdate} />
        );
      });

      it('should call `onInteractiveUpdate` callback when it is an interactive update', () => {
        inputRange.updateValues(newValues, true);

        expect(onInteractiveUpdate).toHaveBeenCalledWith(inputRange, newValues.max);
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

      expect(inputRange.updateValues).toHaveBeenCalledWith({ min: 0, max: 5 }, undefined);
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
      }, undefined);
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
      inputRange.handleSliderMouseMove(slider, event);

      expect(inputRange.updatePosition).toHaveBeenCalledWith('max', { x: 92, y: 0 }, true);
    });

    it('should not set the position of a slider if disabled', () => {
      inputRange = renderComponent(<InputRange disabled={true} defaultValue={0} onChange={onChange}/>);
      spyOn(inputRange, 'updatePosition');
      inputRange.handleSliderMouseMove(slider, event);

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
        };
      });

      it('should decrement value', () => {
        inputRange.handleSliderKeyDown('max', event);

        expect(inputRange.decrementValue).toHaveBeenCalledWith('max');
      });

      it('should not decrement value if disabled', () => {
        inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
        spyOn(inputRange, 'decrementValue');
        inputRange.handleSliderKeyDown('max', event);

        expect(inputRange.decrementValue).not.toHaveBeenCalled();
      });
    });

    describe('when pressing right arrow key', () => {
      beforeEach(() => {
        spyOn(inputRange, 'incrementValue');

        slider = inputRange.refs.sliderMax;
        event = {
          keyCode: 39,
        };
      });

      it('should increment value', () => {
        inputRange.handleSliderKeyDown(slider, event);

        expect(inputRange.incrementValue).toHaveBeenCalledWith('max');
      });

      it('should not increment value if disabled', () => {
        inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
        spyOn(inputRange, 'incrementValue');
        inputRange.handleSliderKeyDown(slider, event);

        expect(inputRange.incrementValue).not.toHaveBeenCalled();
      });
    });
  });

  describe('handleTrackMouseDown', () => {
    let track;
    let position;

    beforeEach(() => {
      spyOn(inputRange, 'updatePosition');

      track = {};
      position = {
        x: 100,
        y: 0,
      };
    });

    it('should not set a new position if disabled', () => {
      inputRange = renderComponent(<InputRange disabled={true} defaultValue={10} onChange={onChange}/>);
      spyOn(inputRange, 'updatePosition');
      inputRange.handleTrackMouseDown(track, position);

      expect(inputRange.updatePosition).not.toHaveBeenCalled();
    });

    describe('if it is a multi-value slider', () => {
      describe('if the new position is closer to `min` slider', () => {
        it('should set the position of the `min` slider', () => {
          position.x = 100;
          inputRange.handleTrackMouseDown(track, position);

          expect(inputRange.updatePosition).toHaveBeenCalledWith('min', position);
        });
      });

      describe('if the new position is closer to `max` slider', () => {
        it('should set the position of the `max` slider', () => {
          position.x = 400;
          inputRange.handleTrackMouseDown(track, position);

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
        inputRange.handleTrackMouseDown(track, position);

        expect(inputRange.updatePosition).toHaveBeenCalledWith('max', position);
      });
    });
  });
});
