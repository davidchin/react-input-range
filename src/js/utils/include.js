/**
 * Check if a value is included in an array
 * @ignore
 * @param {Array} array
 * @param {number} value
 * @return {boolean}
 */
export default function include(array, value) {
  return array.indexOf(value) > -1;
}
