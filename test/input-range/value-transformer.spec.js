import { getStepValueFromValue } from '../../src/js/input-range/value-transformer';

describe('getStepValueFromValue', () => {
  it('should return the correct value with even step', () => {
    const minValue = 1;
    const step = 2;
    expect(getStepValueFromValue(minValue, 3, step)).toBe(3);
    expect(getStepValueFromValue(minValue, 4, step)).toBe(5);
    expect(getStepValueFromValue(minValue, 5.5, step)).toBe(5);
    expect(getStepValueFromValue(minValue, 6.5, step)).toBe(7);
    expect(getStepValueFromValue(minValue, 7, step)).toBe(7);
    expect(getStepValueFromValue(minValue, 9, step)).toBe(9);
  });

  it('should return the correct value with odd step', () => {
    const minValue = 0;
    const step = 1;
    expect(getStepValueFromValue(minValue, 0, step)).toBe(0);
    expect(getStepValueFromValue(minValue, 1, step)).toBe(1);
    expect(getStepValueFromValue(minValue, 1.3, step)).toBe(1);
    expect(getStepValueFromValue(minValue, 1.5, step)).toBe(2);
    expect(getStepValueFromValue(minValue, 2, step)).toBe(2);
    expect(getStepValueFromValue(minValue, 3, step)).toBe(3);
  });
});
