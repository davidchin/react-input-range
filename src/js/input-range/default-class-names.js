/**
* An object containing class names
* @ignore
* @type {Object}
* @property {string} component
* @property {string} componentDisabled
* @property {string} labelContainer
* @property {string} labelMax
* @property {string} labelMin
* @property {string} labelValue
* @property {string} slider
* @property {string} sliderContainer
* @property {string} trackActive
* @property {string} trackContainer
*/
const DEFAULT_CLASS_NAMES = {
  component: 'input-range',
  componentDisabled: 'input-range input-range--disabled',
  labelContainer: 'input-range__label-container',
  labelMax: 'input-range__label input-range__label--max',
  labelMin: 'input-range__label input-range__label--min',
  labelValue: 'input-range__label input-range__label--value',
  slider: 'input-range__slider',
  sliderContainer: 'input-range__slider-container',
  trackActive: 'input-range__track input-range__track--active',
  trackContainer: 'input-range__track input-range__track--container',
};

export default DEFAULT_CLASS_NAMES;
