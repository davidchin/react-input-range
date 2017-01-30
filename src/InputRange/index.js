/**
 * @module InputRange
 */

import InputRange from './InputRange';
import Track from './Track';
import Slider from './Slider';
import Label from './Label';

/**
 * An object describing the position of a point
 * @typedef {Object} Point
 * @property {number} x - x value
 * @property {number} y - y value
 */

/**
 * An object describing a range of values
 * @typedef {Object} Range
 * @property {number} min - Min value
 * @property {number} max - Max value
 */

export default InputRange;
export {Track, Slider, Label};
