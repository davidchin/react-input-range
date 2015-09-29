function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function extend() {
  return Object.assign.apply(Object, arguments);
}

function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function distanceTo(pointA, pointB) {
  return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}

function isNumber(number) {
  return typeof number === 'number';
}

function arrayOf(array, predicate) {
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

function objectOf(object, predicate, keys) {
  if (typeof object !== 'object') {
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

function autobind(methodNames, instance) {
  methodNames.forEach((methodName) => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

const InputRangeUtil = {
  arrayOf,
  autobind,
  captialize,
  clamp,
  distanceTo,
  extend,
  isNumber,
  objectOf,
};

export default InputRangeUtil;
