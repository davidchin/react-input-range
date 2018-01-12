/**
 * Calculate the absolute difference between two numbers
 * @ignore
 * @param {number} numA
 * @param {number} numB
 * @param {number} precision
 * @return {number}
 */
export default function length(numA, numB, precision) {
  return Math.abs(numA - numB).toFixed(precision);
}
