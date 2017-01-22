/**
 * Check if an object is empty
 * @param {Object|Array} obj
 * @return {Boolean}
 */
export default function isEmpty(obj) {
  if (!obj) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  return Object.keys(obj).length === 0;
}
