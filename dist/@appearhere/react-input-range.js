(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.InputRange = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))
},{"./lib/ReactPropTypesSecret":7,"_process":2,"fbjs/lib/invariant":9,"fbjs/lib/warning":10}],4:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":7,"fbjs/lib/emptyFunction":8,"fbjs/lib/invariant":9}],5:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');
var assign = require('object-assign');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))
},{"./checkPropTypes":3,"./lib/ReactPropTypesSecret":7,"_process":2,"fbjs/lib/emptyFunction":8,"fbjs/lib/invariant":9,"fbjs/lib/warning":10,"object-assign":1}],6:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))
},{"./factoryWithThrowingShims":4,"./factoryWithTypeCheckers":5,"_process":2}],7:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],8:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],9:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":2}],10:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
}).call(this,require('_process'))
},{"./emptyFunction":8,"_process":2}],11:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _defaultClassNames = require('./defaultClassNames');

var _defaultClassNames2 = _interopRequireDefault(_defaultClassNames);

var _valueTransformer = require('./valueTransformer');

var _valueTransformer2 = _interopRequireDefault(_valueTransformer);

var _util = require('./util');

var _propTypes3 = require('./propTypes');

var internals = new WeakMap();

var KeyCode = {
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  UP_ARROW: 38
};

function isWithinRange(inputRange, values) {
  var props = inputRange.props;

  if (inputRange.isMultiValue) {
    return values.min >= props.minValue && values.max <= props.maxValue && values.min < values.max;
  }

  return values.max >= props.minValue && values.max <= props.maxValue;
}

function hasStepDifference(inputRange, values) {
  var props = inputRange.props;

  var currentValues = _valueTransformer2['default'].valuesFromProps(inputRange);

  return (0, _util.length)(values.min, currentValues.min) >= props.step || (0, _util.length)(values.max, currentValues.max) >= props.step;
}

function shouldUpdate(inputRange, values) {
  return isWithinRange(inputRange, values) && hasStepDifference(inputRange, values);
}

function getComponentClassName(inputRange) {
  var props = inputRange.props;

  if (!props.disabled) {
    return props.classNames.component;
  }

  return props.classNames.component + ' ' + props.classNames.disabled;
}

function getKeyFromSlider(inputRange, slider) {
  if (slider === inputRange.refs.sliderMin) {
    return 'min';
  }

  return 'max';
}

function getKeys(inputRange) {
  if (inputRange.isMultiValue) {
    return ['min', 'max'];
  }

  return ['max'];
}

function getKeyByPosition(inputRange, position) {
  var values = _valueTransformer2['default'].valuesFromProps(inputRange);
  var positions = _valueTransformer2['default'].positionsFromValues(inputRange, values);

  if (inputRange.isMultiValue) {
    var distanceToMin = (0, _util.distanceTo)(position, positions.min);
    var distanceToMax = (0, _util.distanceTo)(position, positions.max);

    if (distanceToMin < distanceToMax) {
      return 'min';
    }
  }

  return 'max';
}

function renderSliders(inputRange) {
  var _inputRange$props = inputRange.props;
  var classNames = _inputRange$props.classNames;
  var Slider = _inputRange$props.Slider;
  var Label = _inputRange$props.Label;

  var sliders = [];
  var keys = getKeys(inputRange);
  var values = _valueTransformer2['default'].valuesFromProps(inputRange);
  var percentages = _valueTransformer2['default'].percentagesFromValues(inputRange, values);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var value = values[key];
      var percentage = percentages[key];
      var ref = 'slider' + (0, _util.captialize)(key);

      var _inputRange$props2 = inputRange.props;
      var maxValue = _inputRange$props2.maxValue;
      var minValue = _inputRange$props2.minValue;

      if (key === 'min') {
        maxValue = values.max;
      } else {
        minValue = values.min;
      }

      var slider = _react2['default'].createElement(Slider, {
        ariaLabelledby: inputRange.props.ariaLabelledby,
        ariaControls: inputRange.props.ariaControls,
        classNames: classNames,
        formatLabel: inputRange.formatLabel,
        key: key,
        maxValue: maxValue,
        minValue: minValue,
        onSliderKeyDown: inputRange.handleSliderKeyDown,
        onSliderMouseMove: inputRange.handleSliderMouseMove,
        percentage: percentage,
        ref: ref,
        type: key,
        value: value,
        Label: Label });

      sliders.push(slider);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return sliders;
}

var InputRange = (function (_React$Component) {
  _inherits(InputRange, _React$Component);

  function InputRange(props) {
    _classCallCheck(this, InputRange);

    _get(Object.getPrototypeOf(InputRange.prototype), 'constructor', this).call(this, props);

    internals.set(this, {});

    (0, _util.autobind)(['formatLabel', 'handleInteractionEnd', 'handleInteractionStart', 'handleKeyDown', 'handleKeyUp', 'handleMouseDown', 'handleMouseUp', 'handleSliderKeyDown', 'handleSliderMouseMove', 'handleTouchStart', 'handleTouchEnd', 'handleTrackMouseDown'], this);
  }

  _createClass(InputRange, [{
    key: 'updatePosition',
    value: function updatePosition(key, position) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var positions = _valueTransformer2['default'].positionsFromValues(this, values);

      positions[key] = position;

      this.updatePositions(positions);
    }
  }, {
    key: 'updatePositions',
    value: function updatePositions(positions) {
      var values = {
        min: _valueTransformer2['default'].valueFromPosition(this, positions.min),
        max: _valueTransformer2['default'].valueFromPosition(this, positions.max)
      };

      var transformedValues = {
        min: _valueTransformer2['default'].stepValueFromValue(this, values.min),
        max: _valueTransformer2['default'].stepValueFromValue(this, values.max)
      };

      this.updateValues(transformedValues);
    }
  }, {
    key: 'updateValue',
    value: function updateValue(key, value) {
      var values = _valueTransformer2['default'].valuesFromProps(this);

      values[key] = value;

      this.updateValues(values);
    }
  }, {
    key: 'updateValues',
    value: function updateValues(values) {
      if (!shouldUpdate(this, values)) {
        return;
      }

      if (this.isMultiValue) {
        this.props.onChange(values);
      } else {
        this.props.onChange(values.max);
      }
    }
  }, {
    key: 'incrementValue',
    value: function incrementValue(key) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var value = values[key] + this.props.step;

      this.updateValue(key, value);
    }
  }, {
    key: 'decrementValue',
    value: function decrementValue(key) {
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var value = values[key] - this.props.step;

      this.updateValue(key, value);
    }
  }, {
    key: 'formatLabel',
    value: function formatLabel(labelValue) {
      var _props = this.props;
      var formatLabel = _props.formatLabel;
      var labelPrefix = _props.labelPrefix;
      var labelSuffix = _props.labelSuffix;

      if (formatLabel) {
        return formatLabel(labelValue, { labelPrefix: labelPrefix, labelSuffix: labelSuffix });
      }

      return '' + labelPrefix + labelValue + labelSuffix;
    }
  }, {
    key: 'handleSliderMouseMove',
    value: function handleSliderMouseMove(event, slider) {
      if (this.props.disabled) {
        return;
      }

      var key = getKeyFromSlider(this, slider);
      var position = _valueTransformer2['default'].positionFromEvent(this, event);

      this.updatePosition(key, position);
    }
  }, {
    key: 'handleSliderKeyDown',
    value: function handleSliderKeyDown(event, slider) {
      if (this.props.disabled) {
        return;
      }

      var key = getKeyFromSlider(this, slider);

      switch (event.keyCode) {
        case KeyCode.LEFT_ARROW:
        case KeyCode.DOWN_ARROW:
          event.preventDefault();
          this.decrementValue(key);
          break;

        case KeyCode.RIGHT_ARROW:
        case KeyCode.UP_ARROW:
          event.preventDefault();
          this.incrementValue(key);
          break;

        default:
          break;
      }
    }
  }, {
    key: 'handleTrackMouseDown',
    value: function handleTrackMouseDown(event, track, position) {
      if (this.props.disabled) {
        return;
      }

      event.preventDefault();

      var key = getKeyByPosition(this, position);

      this.updatePosition(key, position);
    }
  }, {
    key: 'handleInteractionStart',
    value: function handleInteractionStart() {
      var _this = internals.get(this);

      if (!this.props.onChangeComplete || (0, _util.isDefined)(_this.startValue)) {
        return;
      }

      _this.startValue = this.props.value || this.props.defaultValue;
    }
  }, {
    key: 'handleInteractionEnd',
    value: function handleInteractionEnd() {
      var _this = internals.get(this);

      if (!this.props.onChangeComplete || !(0, _util.isDefined)(_this.startValue)) {
        return;
      }

      if (_this.startValue !== this.props.value) {
        this.props.onChangeComplete(this.props.value);
      }

      _this.startValue = null;
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.handleInteractionStart(event);
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(event) {
      this.handleInteractionEnd(event);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      this.handleInteractionStart(event);

      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      this.handleInteractionEnd(event);

      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      this.handleInteractionStart(event);

      document.addEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      this.handleInteractionEnd(event);

      document.removeEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var classNames = _props2.classNames;
      var Label = _props2.Label;
      var Track = _props2.Track;
      var children = _props2.children;
      var showLabel = _props2.showLabel;
      var renderHiddenInputs = _props2.renderHiddenInputs;

      var componentClassName = getComponentClassName(this);
      var values = _valueTransformer2['default'].valuesFromProps(this);
      var percentages = _valueTransformer2['default'].percentagesFromValues(this, values);

      return _react2['default'].createElement(
        'div',
        {
          'aria-disabled': this.props.disabled,
          ref: 'inputRange',
          className: componentClassName,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart },
        showLabel && _react2['default'].createElement(
          Label,
          {
            className: classNames.labelMin,
            containerClassName: classNames.labelContainer,
            formatLabel: this.formatLabel },
          this.props.minValue
        ),
        _react2['default'].createElement(
          Track,
          {
            classNames: classNames,
            ref: 'track',
            percentages: percentages,
            onTrackMouseDown: this.handleTrackMouseDown },
          renderSliders(this)
        ),
        showLabel && _react2['default'].createElement(
          Label,
          {
            className: classNames.labelMax,
            containerClassName: classNames.labelContainer,
            formatLabel: this.formatLabel },
          this.props.maxValue
        ),
        children,
        renderHiddenInputs && getKeys(this).map(function (key) {
          var name = _this2.isMultiValue ? '' + _this2.props.name + (0, _util.captialize)(key) : _this2.props.name;
          var value = _this2.isMultiValue ? _this2.props.value[key] : _this2.props.value;
          return _react2['default'].createElement('input', { key: name, type: 'hidden', name: name, value: value });
        })
      );
    }
  }, {
    key: 'trackClientRect',
    get: function get() {
      var track = this.refs.track;

      if (track) {
        return track.clientRect;
      }

      return {
        height: 0,
        left: 0,
        top: 0,
        width: 0
      };
    }
  }, {
    key: 'isMultiValue',
    get: function get() {
      return (0, _util.isObject)(this.props.value) || (0, _util.isObject)(this.props.defaultValue);
    }
  }]);

  return InputRange;
})(_react2['default'].Component);

exports['default'] = InputRange;

InputRange.propTypes = {
  ariaLabelledby: _propTypes2['default'].string,
  ariaControls: _propTypes2['default'].string,
  classNames: _propTypes2['default'].objectOf(_propTypes2['default'].string),
  defaultValue: _propTypes3.maxMinValuePropType,
  disabled: _propTypes2['default'].bool,
  formatLabel: _propTypes2['default'].func,
  labelPrefix: _propTypes2['default'].string,
  labelSuffix: _propTypes2['default'].string,
  maxValue: _propTypes3.maxMinValuePropType,
  minValue: _propTypes3.maxMinValuePropType,
  name: _propTypes2['default'].string.isRequired,
  onChange: _propTypes2['default'].func.isRequired,
  onChangeComplete: _propTypes2['default'].func,
  step: _propTypes2['default'].number,
  value: _propTypes3.maxMinValuePropType,
  Track: _propTypes2['default'].func,
  Slider: _propTypes2['default'].func,
  Label: _propTypes2['default'].func,
  children: _propTypes2['default'].any,
  showLabel: _propTypes2['default'].bool,
  renderHiddenInputs: _propTypes2['default'].bool
};

InputRange.defaultProps = {
  classNames: _defaultClassNames2['default'],
  defaultValue: 0,
  disabled: false,
  labelPrefix: '',
  labelSuffix: '',
  maxValue: 10,
  minValue: 0,
  step: 1,
  value: null,
  Track: _Track2['default'],
  Slider: _Slider2['default'],
  Label: _Label2['default'],
  showLabel: true,
  renderHiddenInputs: true
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Label":12,"./Slider":13,"./Track":14,"./defaultClassNames":15,"./propTypes":16,"./util":17,"./valueTransformer":18,"prop-types":6}],12:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var Label = (function (_React$Component) {
  _inherits(Label, _React$Component);

  function Label() {
    _classCallCheck(this, Label);

    _get(Object.getPrototypeOf(Label.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Label, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var containerClassName = _props.containerClassName;

      var labelValue = this.props.formatLabel ? this.props.formatLabel(this.props.children) : this.props.children;

      return _react2['default'].createElement(
        'span',
        { className: className },
        _react2['default'].createElement(
          'span',
          { className: containerClassName },
          labelValue
        )
      );
    }
  }]);

  return Label;
})(_react2['default'].Component);

exports['default'] = Label;

Label.propTypes = {
  children: _propTypes2['default'].node,
  className: _propTypes2['default'].string,
  containerClassName: _propTypes2['default'].string,
  formatLabel: _propTypes2['default'].func
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"prop-types":6}],13:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _util = require('./util');

function getStyle(slider) {
  var perc = (slider.props.percentage || 0) * 100;
  var style = {
    position: 'absolute',
    left: perc + '%'
  };

  return style;
}

var Slider = (function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this, props);

    (0, _util.autobind)(['handleClick', 'handleMouseDown', 'handleMouseUp', 'handleMouseMove', 'handleTouchStart', 'handleTouchEnd', 'handleTouchMove', 'handleKeyDown'], this);

    this.state = {
      active: false
    };
  }

  _createClass(Slider, [{
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      this.setState({ active: true });
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      this.setState({ active: false });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      this.props.onSliderMouseMove(event, this);
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      event.preventDefault();

      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.handleTouchEnd);
      this.setState({ active: true });
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      this.props.onSliderMouseMove(event, this);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      event.preventDefault();

      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.handleTouchEnd);
      this.setState({ active: false });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.props.onSliderKeyDown(event, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var classNames = _props.classNames;
      var Label = _props.Label;
      var children = _props.children;
      var active = this.state.active;

      var style = getStyle(this);

      var anchorClassName = [classNames.slider, active ? classNames.sliderActive : null].join(' ');

      return _react2['default'].createElement(
        'span',
        {
          className: classNames.sliderContainer,
          ref: 'slider',
          style: style },
        _react2['default'].createElement(
          Label,
          {
            className: classNames.labelValue,
            containerClassName: classNames.labelContainer,
            formatLabel: this.props.formatLabel },
          this.props.value
        ),
        _react2['default'].createElement('a', {
          'aria-labelledby': this.props.ariaLabelledby,
          'aria-controls': this.props.ariaControls,
          'aria-valuemax': this.props.maxValue,
          'aria-valuemin': this.props.minValue,
          'aria-valuenow': this.props.formatLabel ? this.props.formatLabel(this.props.value) : this.props.value,
          className: anchorClassName,
          draggable: 'false',
          href: '#',
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          role: 'slider' }),
        children
      );
    }
  }]);

  return Slider;
})(_react2['default'].Component);

exports['default'] = Slider;

Slider.propTypes = {
  ariaLabelledby: _propTypes2['default'].string,
  ariaControls: _propTypes2['default'].string,
  classNames: _propTypes2['default'].objectOf(_propTypes2['default'].string),
  formatLabel: _propTypes2['default'].func,
  maxValue: _propTypes2['default'].number,
  minValue: _propTypes2['default'].number,
  onSliderKeyDown: _propTypes2['default'].func.isRequired,
  onSliderMouseMove: _propTypes2['default'].func.isRequired,
  percentage: _propTypes2['default'].number.isRequired,
  type: _propTypes2['default'].string.isRequired,
  value: _propTypes2['default'].number.isRequired,
  Label: _propTypes2['default'].func,
  children: _propTypes2['default'].any
};

Slider.defaultProps = {
  Label: _Label2['default']
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Label":12,"./util":17,"prop-types":6}],14:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

function getActiveTrackStyle(track) {
  var props = track.props;

  var width = (props.percentages.max - props.percentages.min) * 100 + '%';
  var left = props.percentages.min * 100 + '%';

  var activeTrackStyle = {
    left: left,
    width: width
  };

  return activeTrackStyle;
}

var Track = (function (_React$Component) {
  _inherits(Track, _React$Component);

  function Track(props) {
    _classCallCheck(this, Track);

    _get(Object.getPrototypeOf(Track.prototype), 'constructor', this).call(this, props);

    (0, _util.autobind)(['handleMouseDown', 'handleTouchStart'], this);
  }

  _createClass(Track, [{
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var trackClientRect = this.clientRect;

      var _ref = event.touches ? event.touches[0] : event;

      var clientX = _ref.clientX;

      var position = {
        x: clientX - trackClientRect.left,
        y: 0
      };

      this.props.onTrackMouseDown(event, this, position);
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      event.preventDefault();

      this.handleMouseDown(event);
    }
  }, {
    key: 'render',
    value: function render() {
      var activeTrackStyle = getActiveTrackStyle(this);
      var classNames = this.props.classNames;

      return _react2['default'].createElement(
        'div',
        {
          className: classNames.trackContainer,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          ref: 'track' },
        _react2['default'].createElement('div', {
          style: activeTrackStyle,
          className: classNames.trackActive }),
        this.props.children
      );
    }
  }, {
    key: 'clientRect',
    get: function get() {
      var track = this.refs.track;

      var clientRect = track.getBoundingClientRect();

      return clientRect;
    }
  }]);

  return Track;
})(_react2['default'].Component);

exports['default'] = Track;

Track.propTypes = {
  children: _propTypes2['default'].node,
  classNames: _propTypes2['default'].objectOf(_propTypes2['default'].string),
  onTrackMouseDown: _propTypes2['default'].func.isRequired,
  percentages: _propTypes2['default'].objectOf(_propTypes2['default'].number).isRequired
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util":17,"prop-types":6}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  component: 'InputRange',
  labelContainer: 'InputRange-labelContainer',
  labelMax: 'InputRange-label InputRange-label--max',
  labelMin: 'InputRange-label InputRange-label--min',
  labelValue: 'InputRange-label InputRange-label--value',
  slider: 'InputRange-slider',
  sliderActive: 'InputRange-slider--active',
  sliderContainer: 'InputRange-sliderContainer',
  trackActive: 'InputRange-track InputRange-track--active',
  trackContainer: 'InputRange-track InputRange-track--container',
  disabled: 'is-disabled'
};
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.maxMinValuePropType = maxMinValuePropType;

var _util = require('./util');

function maxMinValuePropType(props) {
  var maxValue = props.maxValue;
  var minValue = props.minValue;
  var value = props.value;
  var defaultValue = props.defaultValue;
  var isValueNumber = (0, _util.isNumber)(value);
  var isDefaultValueNumber = (0, _util.isNumber)(defaultValue);
  var isValueNumberObject = (0, _util.objectOf)(value, _util.isNumber);
  var isDefaultValueNumberObject = (0, _util.objectOf)(defaultValue, _util.isNumber);

  if (value === undefined) {
    return new Error('`value` must be defined');
  }

  if (!isValueNumber && !isDefaultValueNumber && !isValueNumberObject && !isDefaultValueNumberObject) {
    return new Error('`value` or `defaultValue` must be a number or an array');
  }

  if (minValue >= maxValue) {
    return new Error('`minValue` must be smaller than `maxValue`');
  }

  if (maxValue <= minValue) {
    return new Error('`maxValue` must be larger than `minValue`');
  }

  if (value < minValue || value > maxValue) {
    return new Error('`value` must be within `minValue` and `maxValue`');
  }
}

},{"./util":17}],17:[function(require,module,exports){
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

function extend() {
  return Object.assign.apply(Object, arguments);
}

function includes(array, value) {
  return array.indexOf(value) > -1;
}

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

function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function distanceTo(pointA, pointB) {
  return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}

function length(numA, numB) {
  return Math.abs(numA - numB);
}

function isNumber(value) {
  return typeof value === 'number';
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isDefined(value) {
  return value !== undefined && value !== null;
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

  for (var i = 0, len = array.length; i < len; i++) {
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

  var props = keys || Object.keys(object);

  for (var i = 0, len = props.length; i < len; i++) {
    var prop = props[i];

    if (!predicate(object[prop])) {
      return false;
    }
  }

  return true;
}

function autobind(methodNames, instance) {
  methodNames.forEach(function (methodName) {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _util = require('./util');

function percentageFromPosition(inputRange, position) {
  var length = inputRange.trackClientRect.width;
  var sizePerc = position.x / length;

  return sizePerc || 0;
}

function valueFromPosition(inputRange, position) {
  var sizePerc = percentageFromPosition(inputRange, position);
  var valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  var value = inputRange.props.minValue + valueDiff * sizePerc;

  return value;
}

function valuesFromProps(inputRange) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? inputRange : arguments[1];

  var props = _ref.props;
  return (function () {
    if (inputRange.isMultiValue) {
      var values = props.value;

      if ((0, _util.isEmpty)(values) || !(0, _util.objectOf)(values, _util.isNumber)) {
        values = props.defaultValue;
      }

      return Object.create(values);
    }

    var value = (0, _util.isNumber)(props.value) ? props.value : props.defaultValue;

    return {
      min: props.minValue,
      max: value
    };
  })();
}

function percentageFromValue(inputRange, value) {
  var validValue = (0, _util.clamp)(value, inputRange.props.minValue, inputRange.props.maxValue);
  var valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  var valuePerc = (validValue - inputRange.props.minValue) / valueDiff;

  return valuePerc || 0;
}

function percentagesFromValues(inputRange, values) {
  var percentages = {
    min: percentageFromValue(inputRange, values.min),
    max: percentageFromValue(inputRange, values.max)
  };

  return percentages;
}

function positionFromValue(inputRange, value) {
  var length = inputRange.trackClientRect.width;
  var valuePerc = percentageFromValue(inputRange, value);
  var positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0
  };
}

function positionsFromValues(inputRange, values) {
  var positions = {
    min: positionFromValue(inputRange, values.min),
    max: positionFromValue(inputRange, values.max)
  };

  return positions;
}

function positionFromEvent(inputRange, event) {
  var trackClientRect = inputRange.trackClientRect;
  var length = trackClientRect.width;

  var _ref2 = event.touches ? event.touches[0] : event;

  var clientX = _ref2.clientX;

  var position = {
    x: (0, _util.clamp)(clientX - trackClientRect.left, 0, length),
    y: 0
  };

  return position;
}

function stepValueFromValue(inputRange, value) {
  return Math.round(value / inputRange.props.step) * inputRange.props.step;
}

exports['default'] = {
  percentageFromPosition: percentageFromPosition,
  percentageFromValue: percentageFromValue,
  percentagesFromValues: percentagesFromValues,
  positionFromEvent: positionFromEvent,
  positionFromValue: positionFromValue,
  positionsFromValues: positionsFromValues,
  stepValueFromValue: stepValueFromValue,
  valueFromPosition: valueFromPosition,
  valuesFromProps: valuesFromProps
};
module.exports = exports['default'];

},{"./util":17}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _InputRange = require('./InputRange');

var _InputRange2 = _interopRequireDefault(_InputRange);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

exports['default'] = _InputRange2['default'];
exports.Track = _Track2['default'];
exports.Slider = _Slider2['default'];
exports.Label = _Label2['default'];

},{"./InputRange":11,"./Label":12,"./Slider":13,"./Track":14}]},{},[19])(19)
});