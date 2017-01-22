import include from './include';

/**
 * Return a new object without the specified keys
 * @param {Object} obj
 * @param {string[]} omitKeys
 * @return {Object}
 */
export default function omit(obj, omitKeys) {
  const keys = Object.keys(obj);
  const outputObj = {};

  keys.forEach((key) => {
    if (!include(omitKeys, key)) {
      outputObj[key] = obj[key];
    }
  });

  return outputObj;
}
