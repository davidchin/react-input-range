/**
* An object containing class names
* @ignore
* @type {Object}
* @property {string} activeTrack
* @property {string} disabledInputRange
* @property {string} inputRange
* @property {string} labelContainer
* @property {string} maxLabel
* @property {string} minLabel
* @property {string} slider
* @property {string} sliderContainer
* @property {string} track
* @property {string} valueLabel
*/
const DEFAULT_CLASS_NAMES = {
  activeTrack: 'input-range__track input-range__track--active',
  disabledInputRange: 'input-range input-range--disabled',
  inputRange: 'input-range',
  labelContainer: 'input-range__label-container',
  maxLabel: 'input-range__label input-range__label--max',
  minLabel: 'input-range__label input-range__label--min',
  slider: 'input-range__slider',
  sliderContainer: 'input-range__slider-container',
  track: 'input-range__track input-range__track--background',
  valueLabel: 'input-range__label input-range__label--value',
};

export default DEFAULT_CLASS_NAMES;
