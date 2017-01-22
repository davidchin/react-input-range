/**
 * Clamp a value between a min and max value
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export default function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
