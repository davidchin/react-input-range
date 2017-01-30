/**
 * @module InputRange/util
 */

/**
 * @callback predicateFn
 * @param {*} value
 * @return {boolean}
 */

/**
 * Clamp a value between a min and max value
 * @static
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.clamp = clamp;
exports.extend = extend;
exports.includes = includes;
exports.omit = omit;
exports.captialize = captialize;
exports.distanceTo = distanceTo;
exports.length = length;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isDefined = isDefined;
exports.isEmpty = isEmpty;
exports.arrayOf = arrayOf;
exports.objectOf = objectOf;
exports.autobind = autobind;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Extend an Object
 * @static
 * @param {Object} object - Destination object
 * @param {...Object} sources - Source objects
 * @return {Object} Destination object, extended with members from sources
 */

function extend() {
  return Object.assign.apply(Object, arguments);
}

/**
 * Check if a value is included in an array
 * @static
 * @param {Array} array
 * @param {number} value
 * @return {boolean}
 */

function includes(array, value) {
  return array.indexOf(value) > -1;
}

/**
 * Return a new object without the specified keys
 * @static
 * @param {Object} obj
 * @param {Array.<string>} omitKeys
 * @return {Object}
 */

function omit(obj, omitKeys) {
  var keys = Object.keys(obj);
  var outputObj = {};

  keys.forEach(function (key) {
    if (!includes(omitKeys, key)) {
      outputObj[key] = obj[key];
    }
  });

  return outputObj;
}

/**
 * Captialize a string
 * @static
 * @param {string} string
 * @return {string}
 */

function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Calculate the distance between pointA and pointB
 * @static
 * @param {Point} pointA
 * @param {Point} pointB
 * @return {number} Distance
 */

function distanceTo(pointA, pointB) {
  return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}

/**
 * Calculate the absolute difference between two numbers
 * @static
 * @param {number} numA
 * @param {number} numB
 * @return {number}
 */

function length(numA, numB) {
  return Math.abs(numA - numB);
}

/**
 * Check if a value is a number
 * @static
 * @param {*} value
 * @return {Boolean}
 */

function isNumber(value) {
  return typeof value === 'number';
}

/**
 * Check if a value is an object
 * @static
 * @param {*} value
 * @return {Boolean}
 */

function isObject(value) {
  return value !== null && typeof value === 'object';
}

/**
 * Check if a value is defined
 * @static
 * @param {*} value
 * @return {Boolean}
 */

function isDefined(value) {
  return value !== undefined && value !== null;
}

/**
 * Check if an object is empty
 * @static
 * @param {Object|Array} obj
 * @return {Boolean}
 */

function isEmpty(obj) {
  if (!obj) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  return Object.keys(obj).length === 0;
}

/**
 * Check if all items in an array match a predicate
 * @static
 * @param {Array} array
 * @param {predicateFn} predicate
 * @return {Boolean}
 */

function arrayOf(array, predicate) {
  if (!Array.isArray(array)) {
    return false;
  }

  for (var i = 0, len = array.length; i < len; i++) {
    if (!predicate(array[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Check if all items in an object match a predicate
 * @static
 * @param {Object} object
 * @param {predicateFn} predicate
 * @param {Array.<string>} keys
 * @return {Boolean}
 */

function objectOf(object, predicate, keys) {
  if (!isObject(object)) {
    return false;
  }

  var props = keys || Object.keys(object);

  for (var i = 0, len = props.length; i < len; i++) {
    var prop = props[i];

    if (!predicate(object[prop])) {
      return false;
    }
  }

  return true;
}

/**
 * Bind all methods of an object to itself
 * @static
 * @param {Array.<Function>} methodNames
 * @param {Object} instance
 */

function autobind(methodNames, instance) {
  methodNames.forEach(function (methodName) {
    instance[methodName] = instance[methodName].bind(instance);
  });
}