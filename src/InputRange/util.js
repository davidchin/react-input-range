// Functions
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function extend() {
  return Object.assign.apply(Object, arguments);
}

function includes(array, value) {
  return array.indexOf(value) > -1;
}

function omit(obj, omitKeys) {
  const keys = Object.keys(obj);
  const outputObj = {};

  keys.forEach((key) => {
    if (!includes(omitKeys, key)) {
      outputObj[key] = obj[key];
    }
  });

  return outputObj;
}

function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function distanceTo(pointA, pointB) {
  return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}

function length(numA, numB) {
  return Math.abs(numA - numB);
}

function isNumber(number) {
  return typeof number === 'number';
}

function isObject(object) {
  return object !== null && typeof object === 'object';
}

function isEmpty(obj) {
  if (!obj) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  return Object.keys(obj).length === 0;
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

function autobind(methodNames, instance) {
  methodNames.forEach((methodName) => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

// Module
const util = {
  arrayOf,
  autobind,
  captialize,
  clamp,
  distanceTo,
  extend,
  isEmpty,
  isNumber,
  isObject,
  length,
  objectOf,
  omit,
};

export default util;
