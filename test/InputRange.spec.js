import React from 'react';
import InputRange from 'InputRange';
import _ from 'lodash';
import { removeComponent, renderComponent } from './TestUtil';

let inputRange;

describe('InputRange', () => {
  let values;

  beforeEach(() => {
    values = {
      min: 2,
      max: 10,
    };

    inputRange = renderComponent(<InputRange maxValue={20} minValue={0} values={values} />);
  });

  afterEach(() => {
    removeComponent(inputRange);
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

  describe('componentDidMount', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPositionsByProps');
    });

    it('should set the initial position for slider', () => {
      const props = {
        classNames: jasmine.any(Object),
        maxValue: 20,
        minValue: 0,
        values: {
          min: 2,
          max: 10,
        },
        step: 1,
      };

      inputRange.componentDidMount();

      expect(inputRange.setPositionsByProps).toHaveBeenCalledWith(props);
    });
  });

  describe('componentWillReceiveProps', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPositionsByProps');
    });

    it('should set the current position for slider', () => {
      const newProps = {
        maxValue: 20,
        minValue: 0,
        values: {
          min: 5,
          max: 8,
        },
        defaultValues: {
          min: 1,
          max: 10,
        },
        value: 0,
        step: 1,
      };

      inputRange.componentWillReceiveProps(newProps);

      expect(inputRange.setPositionsByProps).toHaveBeenCalledWith(_.omit(newProps, 'defaultValues'));
    });
  });

  describe('shouldComponentUpdate', () => {
    let nextProps;
    let nextState;

    beforeEach(() => {
      nextProps = Object.assign({}, inputRange.props);
      nextState = Object.assign({}, inputRange.state);
    });

    it('should return true if current min value has been changed', () => {
      nextState.values = {
        max: inputRange.state.values.max,
        min: inputRange.state.values.min + 1,
      };

      expect(inputRange.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('should return true if current max value has been changed', () => {
      nextState.values = {
        max: inputRange.state.values.max + 1,
        min: inputRange.state.values.min,
      };

      expect(inputRange.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('should return true if current value has been changed', () => {
      nextState.value = inputRange.state.value + 1;

      expect(inputRange.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('should return true if min value has been changed', () => {
      nextProps.minValue = inputRange.props.minValue + 1;

      expect(inputRange.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('should return true if max value has been changed', () => {
      nextProps.maxValue = inputRange.props.maxValue + 1;

      expect(inputRange.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('should return false if a non-essential value has been changed', () => {
      nextState.random = Math.random();

      expect(inputRange.shouldComponentUpdate(nextProps, nextState)).toBeFalsy();
    });
  });

  describe('componentDidUpdate', () => {
    let nextState;
    let onChange;

    beforeEach(() => {
      onChange = jasmine.createSpy('onChange');
    });

    describe('if `onChange` callback is provided', () => {
      describe('if it is an initial change', () => {
        beforeEach(() => {
          removeComponent(inputRange);
          inputRange = renderComponent(<InputRange maxValue={20} minValue={0} values={values} onChange={onChange} />);
          nextState = Object.assign({}, inputRange.state, { didChange: false });
        });

        it('should not execute `onChange` callback', () => {
          inputRange.state = nextState;
          inputRange.componentDidUpdate();

          expect(onChange).not.toHaveBeenCalledWith(inputRange, values);
        });
      });

      describe('if it is not an initial change', () => {
        describe('if multiple values is provided', () => {
          beforeEach(() => {
            removeComponent(inputRange);
            inputRange = renderComponent(<InputRange maxValue={20} minValue={0} values={values} onChange={onChange} />);
            nextState = Object.assign({}, inputRange.state, { didChange: true });
          });

          it('should execute `onChange` callback with the changed values', () => {
            inputRange.state = nextState;
            inputRange.componentDidUpdate();

            expect(onChange).toHaveBeenCalledWith(inputRange, values);
          });
        });

        describe('if single value is provided', () => {
          let value;

          beforeEach(() => {
            value = 1;

            removeComponent(inputRange);
            inputRange = renderComponent(<InputRange maxValue={20} minValue={0} value={value} onChange={onChange} />);
            nextState = Object.assign({}, inputRange.state, { didChange: true });
          });

          it('should execute `onChange` callback with the changed value', () => {
            inputRange.state = nextState;
            inputRange.componentDidUpdate();

            expect(onChange).toHaveBeenCalledWith(inputRange, value);
          });
        });
      });
    });

    describe('if `onChange` callback is not provided', () => {
      it('should not execute `onChange` callback', () => {
        inputRange.state = nextState;
        inputRange.componentDidUpdate();

        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('setPositions', () => {
    let positions;

    beforeEach(() => {
      spyOn(inputRange, 'setState');
      spyOn(inputRange.valueTransformer, 'valueFromPosition').and.callThrough();
      spyOn(inputRange.valueTransformer, 'percentageFromPosition').and.callThrough();

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

    describe('if it is a multi-value input', () => {
      beforeEach(() => {
        inputRange.isMultiValue = true;
      });

      it('should update state if new positions are within range', () => {
        inputRange.setPositions(positions);

        expect(inputRange.setState).toHaveBeenCalled();
      });

      it('should not update state if new positions are out of range', () => {
        positions.min.x = positions.max.x + 1;

        inputRange.setPositions(positions);

        expect(inputRange.setState).not.toHaveBeenCalled();
      });
    });

    it('should update state with new percentages, positions and values', () => {
      inputRange.setPositions(positions);

      expect(inputRange.setState).toHaveBeenCalledWith({
        percentages: jasmine.any(Object),
        positions: jasmine.any(Object),
        values: jasmine.any(Object),
      });
    });

    it('should convert positions into values', () => {
      inputRange.setPositions(positions);

      expect(inputRange.valueTransformer.valueFromPosition).toHaveBeenCalled();
    });

    it('should translate positions into percentages', () => {
      inputRange.setPositions(positions);

      expect(inputRange.valueTransformer.percentageFromPosition).toHaveBeenCalled();
    });
  });

  describe('setPosition', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPositions');

      inputRange.setState({
        positions: {
          min: { x: 0, y: 0 },
          max: { x: 500, y: 0 },
        },
      });
    });

    describe('if slider is provided', () => {
      it('should set the position of the slider according to its type', () => {
        const slider = {
          props: {
            type: 'min',
          },
        };

        const position = {
          x: 100,
          y: 0,
        };

        inputRange.setPosition(slider, position);

        expect(inputRange.setPositions).toHaveBeenCalledWith({
          min: position,
          max: { x: 500, y: 0 },
        });
      });
    });

    describe('if slider is not provided', () => {
      describe('if it is a multi-value slider', () => {
        beforeEach(() => {
          inputRange.isMultiValue = true;
        });

        describe('if the new position is closer to `min` slider', () => {
          it('should set the position of the `min` slider', () => {
            const position = {
              x: 100,
              y: 0,
            };

            inputRange.setPosition(undefined, position);

            expect(inputRange.setPositions).toHaveBeenCalledWith({
              max: { x: 500, y: 0 },
              min: position,
            });
          });
        });

        describe('if the new position is closer to `max` slider', () => {
          it('should set the position of the `max` slider', () => {
            const position = {
              x: 400,
              y: 0,
            };

            inputRange.setPosition(undefined, position);

            expect(inputRange.setPositions).toHaveBeenCalledWith({
              max: position,
              min: { x: 0, y: 0 },
            });
          });
        });
      });

      describe('if it is not a multi-value slider', () => {
        beforeEach(() => {
          inputRange.isMultiValue = false;
        });

        it('should set the position of the `max` slider', () => {
          const position = {
            x: 100,
            y: 0,
          };

          inputRange.setPosition(undefined, position);

          expect(inputRange.setPositions).toHaveBeenCalledWith({
            max: position,
            min: { x: 0, y: 0 },
          });
        });
      });
    });
  });

  describe('setPositionByValue', () => {
    let slider;
    let position;

    beforeEach(() => {
      slider = {};

      spyOn(inputRange, 'setPosition');
      spyOn(inputRange.valueTransformer, 'positionFromValue');

      position = {
        min: {
          x: 0,
          y: 0,
        },
        max: {
          x: 0,
          y: 0,
        },
      };

      inputRange.valueTransformer.positionFromValue.and.returnValue(position);
    });

    it('should set the position of slider according to the provided value', () => {
      inputRange.setPositionByValue(slider, 10);

      expect(inputRange.setPosition).toHaveBeenCalledWith(slider, position);
    });

    describe('if value is larger than max value', () => {
      it('should cap the value', () => {
        inputRange.setPositionByValue(slider, 30);

        expect(inputRange.valueTransformer.positionFromValue).toHaveBeenCalledWith(20);
      });
    });

    describe('if value is smaller than min value', () => {
      it('should cap the value', () => {
        inputRange.setPositionByValue(slider, -10);

        expect(inputRange.valueTransformer.positionFromValue).toHaveBeenCalledWith(0);
      });
    });
  });

  describe('setPositionsByValues', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPositions');
      spyOn(inputRange.valueTransformer, 'positionFromValue');
    });

    it('should calculate the position of each slider based on its value', () => {
      inputRange.setPositionsByValues(values);

      expect(inputRange.valueTransformer.positionFromValue).toHaveBeenCalledWith(values.min);
      expect(inputRange.valueTransformer.positionFromValue).toHaveBeenCalledWith(values.max);
    });

    it('should set the position of min slider', () => {
      inputRange.valueTransformer.positionFromValue.and.returnValue(123);

      inputRange.setPositionsByValues({
        min: 3,
        max: values.max,
      });

      expect(inputRange.setPositions).toHaveBeenCalledWith({
        min: 123,
        max: 123,
      });
    });

    it('should set the position of max slider', () => {
      inputRange.valueTransformer.positionFromValue.and.returnValue(123);

      inputRange.setPositionsByValues({
        min: values.min,
        max: 15,
      });

      expect(inputRange.setPositions).toHaveBeenCalledWith({
        min: 123,
        max: 123,
      });
    });
  });

  describe('setPositionsByProps', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPositionsByValues');
      spyOn(inputRange, 'setPositionByValue');
    });

    describe('if it only accepts single value', () => {
      beforeEach(() => {
        inputRange.isMultiValue = false;
      });

      it('should set the position of max slider', () => {
        const props = {
          value: 1,
        };

        inputRange.setPositionsByProps(props);

        expect(inputRange.setPositionByValue).toHaveBeenCalledWith(inputRange.refs.sliderMax, props.value);
      });

      it('should set the position of max slider using default value if current value is undefined', () => {
        const props = {
          defaultValue: 6,
        };

        inputRange.setPositionsByProps(props);

        expect(inputRange.setPositionByValue).toHaveBeenCalledWith(inputRange.refs.sliderMax, props.defaultValue);
      });
    });

    describe('if it only accepts multiple values', () => {
      beforeEach(() => {
        inputRange.isMultiValue = true;
      });

      it('should set the position of all sliders', () => {
        const props = {
          values: {
            min: 2,
            max: 12,
          },
        };

        inputRange.setPositionsByProps(props);

        expect(inputRange.setPositionsByValues).toHaveBeenCalledWith(props.values);
      });

      it('should set the position of all sliders using default values if current values are undefined', () => {
        const props = {
          defaultValues: {
            min: 6,
            max: 10,
          },
        };

        inputRange.setPositionsByProps(props);

        expect(inputRange.setPositionsByValues).toHaveBeenCalledWith(props.defaultValues);
      });
    });
  });

  describe('incrementValue', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPositionByValue');
    });

    it('should increment slider value by the step amount', () => {
      const slider = inputRange.refs.sliderMin;

      inputRange.incrementValue(slider);

      expect(inputRange.setPositionByValue).toHaveBeenCalledWith(slider, values.min + 1);
    });
  });

  describe('decrementValue', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPositionByValue');
    });

    it('should decrement slider value by the step amount', () => {
      const slider = inputRange.refs.sliderMin;

      inputRange.decrementValue(slider);

      expect(inputRange.setPositionByValue).toHaveBeenCalledWith(slider, values.min - 1);
    });
  });

  describe('handleSliderMouseMove', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPosition');
    });

    it('should set the position of a slider according to mouse event', () => {
      const slider = inputRange.refs.sliderMax;
      const event = {
        clientX: 100,
        clientY: 200,
      };

      inputRange.handleSliderMouseMove(slider, event);

      expect(inputRange.setPosition).toHaveBeenCalledWith(slider, { x: 92, y: 0 });
    });
  });

  describe('handleSliderKeyDown', () => {
    describe('when pressing left arrow key', () => {
      beforeEach(() => {
        spyOn(inputRange, 'decrementValue');
      });

      it('should decrement value', () => {
        const slider = inputRange.refs.sliderMax;
        const event = {
          keyCode: 37,
        };

        inputRange.handleSliderKeyDown(slider, event);

        expect(inputRange.decrementValue).toHaveBeenCalledWith(slider);
      });
    });

    describe('when pressing right arrow key', () => {
      beforeEach(() => {
        spyOn(inputRange, 'incrementValue');
      });

      it('should increment value', () => {
        const slider = inputRange.refs.sliderMax;
        const event = {
          keyCode: 39,
        };

        inputRange.handleSliderKeyDown(slider, event);

        expect(inputRange.incrementValue).toHaveBeenCalledWith(slider);
      });
    });
  });

  describe('handleTrackMouseDown', () => {
    beforeEach(() => {
      spyOn(inputRange, 'setPosition');
    });

    it('should set a new position based on the position of mouse click', () => {
      const track = {};
      const position = {
        x: 100,
        y: 0,
      };

      inputRange.handleTrackMouseDown(track, position);

      expect(inputRange.setPosition).toHaveBeenCalledWith(null, position);
    });
  });
});
