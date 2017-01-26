/**
 * Check if all items in an array match a predicate
 * @ignore
 * @param {Array} array
 * @param {predicateFn} predicate
 * @return {Boolean}
 */
export default function arrayOf(array, predicate) {
  if (!Array.isArray(array)) {
    return false;
  }

  for (let i = 0, len = array.length; i < len; i++) {
    if (!predicate(array[i])) {
      return false;
    }
  }

  return true;
}
