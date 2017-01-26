import isObject from './is-object';

/**
 * Check if all items in an object match a predicate
 * @ignore
 * @param {Object} object
 * @param {predicateFn} predicate
 * @param {string[]} keys
 * @return {Boolean}
 */
export default function objectOf(object, predicate, keys) {
  if (!isObject(object)) {
    return false;
  }

  const props = keys || Object.keys(object);

  for (let i = 0, len = props.length; i < len; i++) {
    const prop = props[i];

    if (!predicate(object[prop])) {
      return false;
    }
  }

  return true;
}
