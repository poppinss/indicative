'use strict';

function isObj(r){return null!==r&&"object"==typeof r}function prop(r,e){if(!isObj(r)||"string"!=typeof e)return r;for(var n=e.split("."),i=0;i<n.length;i++){var o=n[i];if(null===(r=r.hasOwnProperty(o)?r[o]:null))break}return r}function pope(r,e,n){n=n||{skipUndefined:!1,throwOnUndefined:!1};for(var i,o=/{{2}(.+?)}{2}/g,p=r;null!==(i=o.exec(r));){var t=i[1].trim();if(t){var f=prop(e,t);if(void 0!==f&&null!==f)p=p.replace(i[0],f);else{if(n.throwOnUndefined){var l=new Error("Missing value for "+i[0]);throw l.key=t, l.code="E_MISSING_KEY", l}n.skipUndefined||(p=p.replace(i[0],""));}}}return p}

/**
 * This method creates a lazy promise which is only executed
 * when `.then` or `.catch` are called on the PLazy instance.
 *
 * Since this class is used internally and never meant to be
 * used as a public interface, we take the advantage or
 * creating a non-complaint promise constructor.
 *
 * ## NOTE
 * Never use this class in your own code, there are better implementations
 * of lazy promises on npm.
 *
 * @class Plazy
 *
 * @param {Function} fn
 *
 * @example
 * return new PLazy((resolve, reject) => {
 *   // evaluated when .then is called
 * })
 */

function PLazy(fn) {
  this.fn = fn;
  this._promise = null;
}

PLazy.prototype.then = function (onFulfilled, onRejected) {
  this._promise = this._promise || new Promise(this.fn);
  return this._promise.then(onFulfilled, onRejected);
};

PLazy.prototype.catch = function (onRejected) {
  this._promise = this._promise || new Promise(this.fn);
  return this._promise.catch(onRejected);
};

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns an object containing enough info about
 * whether the promise has been resolved or not.
 *
 * @method onResolved
 *
 * @param {Mixed} result
 *
 * @returns {Object}
 */

function onResolved(result) {
  return {
    fullFilled: true,
    rejected: false,
    value: result,
    reason: null
  };
}

/**
 * Returns an object containing enough info whether
 * the promises was rejected or not.
 *
 * @method onRejected
 *
 * @param {Object} error
 *
 * @returns {Object}
 */
function onRejected(error) {
  return {
    fullFilled: false,
    rejected: true,
    value: null,
    reason: error
  };
}

/**
 * Here we run an array of promises in sequence until the last
 * promise is finished.
 *
 * When `bail=true`, it will break the chain when first promise returns
 * the error/exception.
 *
 * ## Why serial?
 * Since the validations have to be executed one after the other, the
 * promises execution has to be in sequence
 *
 * ## Why wait for all promises?
 * The `validateAll` method of the library allows to run all validations,
 * even when they fail. So this method handles that too.
 *
 * ## Note
 * This method will never reject, instead returns an array of objects, which
 * has `rejected` and `fullFilled` properties to find whether the promise
 * was rejected or not.
 *
 * @method pSeries
 *
 * @param {Array} iterable
 * @param {Boolean} bail
 *
 * @return {Object[]}  result - Array of objects holding promises results
 * @property {Boolean} result.fullFilled
 * @property {Boolean} result.rejected
 * @property {Mixed}   result.value - Resolved value if fullFilled
 * @property {Mixed}   result.reason - Error value if rejected
 *
 * @example
 * pSeries([p1, p2])
 * .then((result) => {
 *  const errors = result.filter((item) => item.rejected)
 *  if (errors.length) {
 *    console.log(errors)
 *  }
 * })
 *
 * // stopping after first failure
 * pSeries([p1, p2], true)
 * .then((result) => {
 *  const errors = result.filter((item) => item.rejected)
 *  if (errors.length) {
 *    console.log(errors[0])
 *  }
 * })
 */
function pSeries(iterable, bail) {
  var result = [];
  var iterableLength = iterable.length;

  function noop(index, bail) {
    /**
     * End of promises
     */
    if (index >= iterableLength) {
      return Promise.resolve(result);
    }

    return iterable[index].then(function (output) {
      result.push(onResolved(output));
      return noop(index + 1, bail);
    }).catch(function (error) {
      result.push(onRejected(error));

      /**
       *
       *  When bail is false, we continue after rejections
       *  too.
       */
      if (!bail) {
        return noop(index + 1, bail);
      }

      /**
       *  Otherwise we resolve the promise
       */
      return Promise.resolve(result);
    });
  }

  return noop(0, bail);
}

function Pipe(e,t){t.add();const a=e.length;let n=0,d="name";for(;n<a;){const a=e[n++],o=a.charCodeAt(0);58===o||44===o?(d="arg", t.shiftValue()):124===o?(d="name", t.add()):"arg"===d?t.appendValue(a):t.appendKey(a,o);}return t.toJSON()}var hayePipe=Pipe;

function ArrayPresenter(){return{nodes:[],currentNode:null,add(){this.currentNode={name:"",args:[]}, this.nodes.push(this.currentNode);},appendKey(e,r){32!==r&&(this.currentNode.name+=e);},appendValue(e){this.currentNode.args[this.currentNode.args.length-1]+=e;},shiftValue(){this.currentNode.args.push("");},toJSON(){return this.nodes}}}var hayeArrayPresenter=ArrayPresenter;

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * This method loops over an array and build properties based upon
 * values available inside the data object.
 *
 * This method is supposed to never throw any exceptions, and instead
 * skip a property when data or pairs are not in right format.
 *
 * @method starToIndex
 *
 * @param {Array}  pairs
 * @param {Object} data
 * @param {Number} i
 * @param {Out}    out
 *
 * @example
 * const pairs = ['users', 'username']
 * const data = { users: [ { username: 'foo' }, { username: 'bar' } ] }
 *
 * startToIndex(pairs, data)
 * // output ['users.0.username', 'users.1.username']
 */
function starToIndex(pairs, data, i, out) {
  if (!data) {
    return [];
  }

  i = i || 0;
  var curr = pairs[i++];
  var next = pairs[i];

  /**
   * When out is not defined, then start
   * with the current node
   */
  if (!out) {
    out = [curr];
    curr = '';
  }

  /**
   *  Keep on adding to the out array. The reason we call reduce
   *  operation, as we have to modify the existing keys inside
   *  the `out` array.
   */
  out = out.reduce(function (result, existingNode) {
    var nName = curr ? existingNode + '.' + curr : existingNode;

    /**
     * We pull childs when `next` is not undefined, otherwise
     * we assume the end of `*` expression
     */
    if (next !== undefined) {
      var value = prop(data, nName);
      if (Array.isArray(value)) {
        var dataLength = value.length;
        for (var _i = 0; _i < dataLength; _i++) {
          result.push(nName + '.' + _i);
        }
      }
    } else {
      result.push(nName);
    }
    return result;
  }, []);

  /**
   *  Recursively call this method until we loop through the entire
   *  array.
   */
  return i === pairs.length ? out : starToIndex(pairs, data, i, out);
}

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * This method parses the rules object into a new object with
 * expanded field names and transformed rules.
 *
 * ### Expanding fields
 * One can define `*` expression to denote an array of fields
 * to be validated.
 *
 * The `*` expression is expanded based upon the available data.
 * For example
 *
 * ```js
 * const rules = {
 *  'users.*.username': required
 * }
 *
 * // ( users.length = 2 )
 * const data = {
 *  users: [{}, {}]
 * }
 *
 * output = {
 *  'users.0.username' : [{ name: 'required', args: [] }],
 *  'users.1.username' : [{ name: 'required', args: [] }]
 * }
 * ```
 *
 * @param {Object} fields
 * @param {Object} [data = {}]
 *
 * @method parseRules
 *
 * @example
 * ```js
 *  rules = { username: 'required|alpha' }
 *
 *  output = {
 *    username: [{ name: 'required', args: [] }, { name: 'alpha',args: [] }]
 *  }
 * ```
 *
 * @throws {Error} when rules are not defined as a string or pre-expanded array
 */
function parseRules(fields, data) {
  data = data || {};

  return Object.keys(fields).reduce(function (result, field) {
    var rules = fields[field];

    /**
     * Strings are passed to haye for further processing
     * and if rules are not an array or a string, then
     * we should blow.
     */
    if (typeof rules === 'string') {
      rules = hayePipe(rules, new hayeArrayPresenter());
    } else if (!Array.isArray(rules)) {
      throw new Error('Rules must be defined as a string or an array');
    }

    /**
     * When field name has a star in it, we need to do some heavy
     * lifting and expand the field to dot properties based upon
     * the available data inside the data object.
     */
    if (field.indexOf('*') > -1) {
      var nodes = field.split(/\.\*\.?/);
      starToIndex(nodes, data).forEach(function (f) {
        result[f] = rules;
      });
    } else {
      result[field] = rules;
    }

    return result;
  }, {});
}

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns message for a given field and a validation rule. The priority is
 * defined as follows in order from top to bottom.
 *
 * 1. Message for `field.validation`
 * 2. Message for validation
 * 3. Default message
 *
 * ### Templating
 * Support dynamic placeholders in messages as shown below.
 *
 * ```
 * {{ validation }} validation failed on {{ field }}
 * ```
 * 1. validation - Validation name
 * 2. field - Field under validation
 * 3. argument - An array of values/args passed to the validation.
 *
 * ### Closure
 * Also you can define a closure for a message, which receives
 * following arguments.
 *
 * ```
 * required: function (field, validation, args) {
 *  return `${validation} failed on ${field}`
 * }
 * ```
 *
 * @method getMessage
 *
 * @param {Object} messages
 * @param {String} field
 * @param {String} validation
 * @param {Array}  args
 *
 * @returns String
 */
function getMessage(messages, field, validation, args) {
  /**
   * Since we allow array expression as `*`, we want all index of the
   * current field to be replaced with `.*`, so that we get the
   * right message.
   */
  var originalField = field.replace(/\.\d/g, '.*');

  var message = messages[originalField + '.' + validation] || messages[validation] || '{{validation}} validation failed on {{ field }}';

  return typeof message === 'function' ? message(originalField, validation, args) : pope(message, { field: field, validation: validation, argument: args });
}

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

var snakeToCamelCase = (function (str) {
  return str.replace(/_(\w)/g, function (match, group) {
    return group.toUpperCase();
  });
});

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns a lazy promise which runs the validation on a field
 * for a given rule. This method will register promise
 * rejections with the formatter.
 *
 * @method validationFn
 *
 * @param    {Object} validations
 * @param    {Object} rule
 * @property {String} rule.name
 * @property {Array}  rule.args
 * @param    {String} field
 * @param    {Object} data
 * @param    {Object} messages
 * @param    {Object} formatter
 *
 * @returns {Promise}
 */
function validationFn(validations, _ref, field, data, messages, formatter) {
  var name = _ref.name,
      args = _ref.args;

  return new PLazy(function (resolve, reject) {
    name = snakeToCamelCase(name);
    if (typeof validations[name] !== 'function') {
      var error = new Error(name + ' is not defined as a validation rule');
      formatter.addError(error, field, name, args);
      reject(error);
      return;
    }

    var message = getMessage(messages, field, name, args);
    validations[name](data, field, message, args, prop).then(resolve).catch(function (error) {
      formatter.addError(error, field, name, args);
      reject(error);
    });
  });
}

/**
 * This method loops over the fields and returns a flat stack of
 * validations for each field and multiple rules on that field.
 *
 * Also all validation methods are wrapped inside a Lazy promise,
 * so they are executed when `.then` or `.catch` is called on
 * them.
 *
 * @method getValidationsStack
 *
 * @param {Object}  validations  - Object of available validations
 * @param {Object}  data         - Data to validate
 * @param {Object}  fields       - Fields and their rules
 * @param {Object}  messages     - Custom messages
 * @param {Object}  formatter    - Formatter to be used
 *
 * @returns {Promise[]} An array of lazy promises
 */
function getValidationsStack(validations, fields, data, messages, formatter) {
  return Object.keys(fields).reduce(function (flatValidations, field) {
    fields[field].map(function (rule) {
      flatValidations.push(validationFn(validations, rule, field, data, messages, formatter));
    });
    return flatValidations;
  }, []);
}

/**
 * Run `validations` on `data` using rules defined on `fields`.
 *
 * @method validate
 *
 * @param {Object}  validations  - Object of available validations
 * @param {Boolean} bail         - Whether to bail on first error or not
 * @param {Object}  data         - Data to validate
 * @param {Object}  fields       - Fields and their rules
 * @param {Object}  messages     - Custom messages
 * @param {Object}  formatter    - Formatter to be used
 *
 * @returns {Promise} Promise is rejected with an array of errors or resolved with original data
 */
function _validate(validations, bail, data, fields, messages, formatter) {
  return new Promise(function (resolve, reject) {
    messages = messages || {};

    /**
     * This is expanded form of fields and rules
     * applied on them
     */
    var parsedFields = parseRules(fields, data);

    /**
     * A flat validations stack, each node is a lazy promise
     */
    var validationsStack = getValidationsStack(validations, parsedFields, data, messages, formatter);

    pSeries(validationsStack, bail).then(function (response) {
      var errors = formatter.toJSON();
      if (!Array.isArray(errors) && errors || errors.length) {
        return reject(errors);
      }
      resolve(data);
    });
  });
}

/**
 * Returns a validator instance to later run validations. Also you need to
 * pass an object of validations to be used when calling `validate` or
 * `validateAll` methods.
 *
 * @param    {Object} validations
 * @param    {Object} defaultFormatter
 *
 * @method validator
 *
 * @return   {Object}   fns
 * @property {validate}
 * @property {validateAll} validateAll
 *
 * @example
 * const { email, required } = require('indicative/validations')
 * const validatorInstance = validator({ email, required })
 *
 * // later
 * validatorInstance.validate()
 */
var validator = (function (validations, defaultFormatter) {
  var message = 'Cannot instantiate validator without';
  if (!validations) {
    throw new Error(message + ' validations');
  }

  if (!defaultFormatter) {
    throw new Error(message + ' error formatter');
  }

  return {
    /**
     * Run validations on a set of data with rules defined on fields.
     *
     * @param {Object}  data         - Data to validate
     * @param {Object}  fields       - Fields and their rules
     * @param {Object}  messages     - Custom messages
     * @param {String}  formatter    - Formatter to be used
     *
     * @returns {Promise} Promise is rejected with an array of errors or resolved with original data
     */
    validate: function validate(data, fields, messages, formatter) {
      formatter = new (formatter || defaultFormatter)();
      return _validate(validations, true, data, fields, messages, formatter);
    },


    /**
     * Run validations on all fields, regardless of whether they fail or pass
     * on a set of data with rules defined on fields.
     *
     * @param {Object}  data         - Data to validate
     * @param {Object}  fields       - Fields and their rules
     * @param {Object}  messages     - Custom messages
     * @param {String}  formatter    - Formatter to be used
     *
     * @returns {Promise} Promise is rejected with an array of errors or resolved with original data
     */
    validateAll: function validateAll(data, fields, messages, formatter) {
      formatter = new (formatter || defaultFormatter)();
      return _validate(validations, false, data, fields, messages, formatter);
    }
  };
});

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var clone_1 = createCommonjsModule(function (module) {
var clone = (function() {
function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if ('object' === 'object' && module.exports) {
  module.exports = clone;
}
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Returns a boolean on whether param is an
 * object or not.
 *
 * @method isObj
 *
 * @param  {Mixed} obj
 *
 * @return {Boolean}
 */
function isObj$1(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Set nested values on a object, using `path` as
 * the (dot) seperated string.
 *
 * @method setPath
 *
 * @param  {Object} obj
 * @param  {String} itemPath
 * @param  {Mixed}  value
 *
 * @return {void}
 */
function setPath(obj, itemPath, value) {
  if (!isObj$1(obj) || typeof itemPath !== 'string') {
    return;
  }

  var pathArr = itemPath.split('.');

  function noop(obj, i) {
    var item = pathArr[i];

    /**
     * Finally set the value when array is done
     */
    if (i + 1 === pathArr.length) {
      obj[item] = value;
      return;
    }

    if (!isNaN(parseInt(pathArr[i + 1])) && !Array.isArray(obj[item])) {
      obj[item] = [];
    } else if (!isObj$1(obj[item])) {
      obj[item] = {};
    }

    /**
     * Carry on recursively.
     */
    return noop(obj[item], i + 1);
  }

  /**
   * Start recursion
   */
  return noop(obj, 0);
}

/**
 * Runs a bunch of sanitization rules on a given value
 *
 * @method sanitizeField
 *
 * @param  {Object} sanitizations
 * @param  {Mixed}  value
 * @param  {Array}  rules
 *
 * @return {Mixed}
 *
 * @throws {Exception} If sanitization rule doesnt exists
 */
function sanitizeField(sanitizations, value, rules) {
  var result = value;

  rules.forEach(function (rule) {
    var ruleFn = snakeToCamelCase(rule.name);
    if (typeof sanitizations[ruleFn] !== 'function') {
      throw new Error(ruleFn + ' is not a sanitization method');
    }
    result = sanitizations[ruleFn](result, rule.args);
  });

  return result;
}

var sanitizor = (function (sanitizations) {
  return {
    sanitize: function sanitize(data, fields) {
      var parsedFields = parseRules(fields, data);

      return Object.keys(parsedFields).reduce(function (result, field) {
        var fieldValue = prop(data, field);
        if (fieldValue !== null) {
          setPath(result, field, sanitizeField(sanitizations, fieldValue, parsedFields[field]));
        }
        return result;
      }, clone_1(data, false));
    }
  };
});

var toPromise = (function (cb) {
  return new Promise(function (resolve, reject) {
    var error = cb();
    if (error) {
      return reject(error);
    }
    resolve('validation passed');
  });
});

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

var config = {
  /**
   * When existy strict is set to `true`, unless `undefined` values will be
   * considered as non-existy.
   *
   * Otherwise `empty strings`, `null` and `undefined` are considered
   * non-existy.
   *
   * @type {Boolean}
   */
  EXISTY_STRICT: false,

  /**
   * The formatter to be used for formatting errors. If this value is `null` at
   * runtime, indicative will use the vanilla formatter.
   *
   * @type {Class|Null}
   */
  FORMATTER: null
};

var existy = (function (input) {
  if (typeof input === 'string') {
    return input.trim().length > 0;
  }
  return input !== null && input !== undefined;
});

var skippable = (function (value) {
  return config.EXISTY_STRICT ? value === undefined : !existy(value);
});

/**
 * Tells if `input` is greator than `comparsionInput`. If strings are
 * passed, they will be converted to number.
 *
 * @method above
 *
 * @param  {Number|String} input
 * @param  {Number|String} comparsionInput
 *
 * @return {Boolean}
 */
var above$1 = (function (input, comparsionInput) {
  return Number(input) > Number(comparsionInput);
});

/**
 * Makes sure the value provided by the end user is above the
 * expected value.
 * This method will wrap both the values inside the `Number` function.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'above:20'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('above', 20)
 *   ]
 * }
 * ----
 */
var above = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      minValue = _ref2[0];

  return toPromise(function () {
    if (!minValue) {
      return new Error('above:make sure to define minValue');
    }

    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && !above$1(fieldValue, minValue)) {
      return message;
    }
  });
});

var truthy = (function (input) {
  return existy(input) && input !== false && input !== 0;
});

/**
 * Ensures that the field under validation is accepted.
 * Empty strings, `false`, `null`, `0` and undefined
 * values will be considered as not accepted.
 *
 * [source, js]
 * ----
 * const rules = {
 *   terms: 'accepted'
 * }
 *
 * // or
 * const rules = {
 *   terms: [
 *     rule('accepted')
 *   ]
 * }
 * ----
 */
var accepted = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !truthy(fieldValue)) {
      return message;
    }
  });
});

var alphaRegex = /^[a-z]+$/i;
var alpha$1 = (function (input) {
  return alphaRegex.test(input);
});

/**
 * Makes sure the field under validation is alpha only. The regex used is `/^[a-z]+$/i`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'alpha'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('alpha')
 *   ]
 * }
 * ----
 */
var alpha = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !alpha$1(fieldValue)) {
      return message;
    }
  });
});

var alphaNumericRegex = /^[a-z0-9]+$/i;
var alphaNumeric$1 = (function (input) {
  return alphaNumericRegex.test(input);
});

/**
 * Makes sure the field under validation is alpha numeric only.
 * The regex used is `/^[a-z0-9]+$/i`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'alpha_numeric'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('alpha_numeric')
 *   ]
 * }
 * ----
 */
var alphaNumeric = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !alphaNumeric$1(fieldValue)) {
      return message;
    }
  });
});

/**
 * Ensure the value is a valid array. Also this validation will never
 * validate the size of array.
 *
 * [source, js]
 * ----
 * const rules = {
 *   whiteListedUrls: 'array'
 * }
 *
 * // or
 * const rules = {
 *   whiteListedUrls: [
 *     rule('array')
 *   ]
 * }
 * ----
 */
var array = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !Array.isArray(fieldValue)) {
      return message;
    }
  });
});

var boolean$1 = (function (input) {
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var bools = [true, false, 0, 1];
  if (strict) {
    return bools.indexOf(input) > -1;
  }
  return bools.map(function (b) {
    return String(b);
  }).indexOf(String(input)) > -1;
});

/**
 * Ensures the value of a field is a boolean. Also it will cast following
 * strings to their boolean counter parts.
 *
 * [source, plain]
 * ----
 * '0' -> 0
 * '1' -> 1
 * 'true' -> true
 * 'false' -> false
 * ----
 *
 * [source, js]
 * ----
 * const rules = {
 *   remember_me: 'boolean'
 * }
 *
 * // or
 * const rules = {
 *   remember_me: [
 *     rule('boolean')
 *   ]
 * }
 * ----
 */
var boolean = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !boolean$1(fieldValue, false)) {
      return message;
    }
  });
});

var same = (function (input, comparsionInput) {
  return input === comparsionInput;
});

/**
 * Ensures a field value as confirmed using a `_confirmation` convention. This is
 * mainly used for password confirmation field.
 *
 * For example: If the password field name is `password`, then another field called
 * `password_confirmation` must exist and should have the same value as the actual
 * field.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'confirmed'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('confirmed')
 *   ]
 * }
 * ----
 */
var confirmed = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !same(fieldValue, get(data, field + '_confirmation'))) {
      return message;
    }
  });
});

/**
 * Ensures the value of the field under validation is always different from
 * the targeted field value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   secondary_email: 'different:primary_email'
 * }
 *
 * // or
 * const rules = {
 *   secondary_email: [
 *     rule('different', 'primary_email')
 *   ]
 * }
 * ----
 */
var different = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      targetedField = _ref2[0];

  return toPromise(function () {
    if (!targetedField) {
      throw new Error('different:make sure to define target field for comparison');
    }
    var fieldValue = get$$1(data, field);
    var targetedFieldValue = get$$1(data, targetedField);

    if (!skippable(fieldValue) && targetedFieldValue && targetedFieldValue === fieldValue) {
      return message;
    }
  });
});

var assertString_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];
});

unwrapExports(assertString_1);

var merge_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];
});

unwrapExports(merge_1);

var isByteLength_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];
});

unwrapExports(isByteLength_1);

var isFQDN_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;



var _assertString2 = _interopRequireDefault(assertString_1);



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFQDN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    // disallow spaces
    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];
});

unwrapExports(isFQDN_1);

var isEmail_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;



var _assertString2 = _interopRequireDefault(assertString_1);



var _merge2 = _interopRequireDefault(merge_1);



var _isByteLength2 = _interopRequireDefault(isByteLength_1);



var _isFQDN2 = _interopRequireDefault(isFQDN_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 254 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];
});

var isCreditCard = unwrapExports(isEmail_1);

var email$1 = (function (input, options) {
  return isCreditCard(String(input), options);
});

/**
 * Ensures the field under validation is a valid email format.
 *
 * NOTE: This validation never checks for the existence of the email address.
 *
 * [source, js]
 * ----
 * const rules = {
 *   email: 'email'
 * }
 *
 * // or
 * const rules = {
 *   email: [
 *     rule('email')
 *   ]
 * }
 * ----
 */
var email = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !email$1(fieldValue)) {
      return message;
    }
  });
});

/**
 * Ensure the value of field under validation ends with a certain substr. This
 * validation will also trim whitespaces before making the check
 *
 * [source, js]
 * ----
 * const rules = {
 *   reg_no: 'ends_with:qaw'
 * }
 *
 * // or
 * const rules = {
 *   reg_no: [
 *     rule('ends_with', 'qaw')
 *   ]
 * }
 * ----
 */
var endsWith = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      substring = _ref2[0];

  return toPromise(function () {
    if (!substring) {
      throw new Error('endsWith:make sure to define the matching substring');
    }

    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && String(fieldValue).trim().substr(-substring.length) !== String(substring)) {
      return message;
    }
  });
});

/**
 * Ensures 2 values are lossely same. This validation will not check for the same type, but
 * instead checks for the same value.
 *
 * Since HTTP request data is always a string, it is better not to perform type checks on it.
 *
 * [source, js]
 * ----
 * const rules = {
 *   coupon: 'equals:5050'
 * }
 *
 * // or
 * const rules = {
 *   coupon: [
 *     rule('equals', 5050)
 *   ]
 * }
 * ----
 */
var equals = (function (data, field, message, args, get) {
  var targetedValue = args[0];
  return toPromise(function () {
    var fieldValue = get(data, field);

    if (!skippable(fieldValue) && targetedValue != fieldValue) {
      // eslint-disable-line eqeqeq
      return message;
    }
  });
});

var inArray = (function (input, dict) {
  return typeof dict.indexOf === 'function' ? dict.indexOf(input) > -1 : false;
});

/**
 * Ensures the value of a given field matches one of expected values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   post_type: 'in:draft,published'
 * }
 *
 * // or
 * const rules = {
 *   post_type: [
 *     rule('in', ['draft', 'published'])
 *   ]
 * }
 * ----
 */
var _in = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !inArray(fieldValue, args)) {
      return message;
    }
  });
});

/**
 * Ensures the value of field under validation contains a given substring.
 *
 * [source, js]
 * ----
 * const rules = {
 *   url: 'includes:adonisjs.com'
 * }
 *
 * // or
 * const rules = {
 *   url: [
 *     rule('includes', ['adonisjs.com'])
 *   ]
 * }
 * ----
 */
var includes = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      substring = _ref2[0];

  return toPromise(function () {
    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && String(fieldValue).indexOf(substring) === -1) {
      return message;
    }
  });
});

/**
 * Ensures the value is a valid integer.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'integer'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('integer')
 *   ]
 * }
 * ----
 */
var integer = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !Number.isInteger(fieldValue)) {
      return message;
    }
  });
});

var ipv4Regex = /^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}$/;
var ipv4 = (function (input) {
  return ipv4Regex.test(input);
});

var ipv6Regex = /^(?:(?:[0-9a-fA-F:]){1,4}(?:(?::(?:[0-9a-fA-F]){1,4}|:)){2,7})+$/;
var ipv6 = (function (input) {
  return ipv6Regex.test(input);
});

var ip$1 = (function (input) {
  return ipv4(input) || ipv6(input);
});

/**
 * Ensures the value is a valid ip address as per `ipv4` and `ipv6` specs.
 *
 * [source, js]
 * ----
 * const rules = {
 *   ip_address: 'ip'
 * }
 *
 * // or
 * const rules = {
 *   ip_address: [
 *     rule('ip')
 *   ]
 * }
 * ----
 */
var ip = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);

    if (!skippable(fieldValue) && !ip$1(fieldValue)) {
      return message;
    }
  });
});

/**
 * Ensures the value is a valid ip address as per `ipv4` spec only.
 *
 * [source, js]
 * ----
 * const rules = {
 *   ip_address: 'ipv4'
 * }
 *
 * // or
 * const rules = {
 *   ip_address: [
 *     rule('ipv4')
 *   ]
 * }
 * ----
 */
var ipv4$1 = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !ipv4(fieldValue)) {
      return message;
    }
  });
});

/**
 * Ensures the value is a valid ip address as per `ipv6` spec only.
 *
 * [source, js]
 * ----
 * const rules = {
 *   ip_address: 'ipv6'
 * }
 *
 * // or
 * const rules = {
 *   ip_address: [
 *     rule('ipv6')
 *   ]
 * }
 * ----
 */
var ipv6$1 = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !ipv6(fieldValue)) {
      return message;
    }
  });
});

var json$1 = (function (input) {
  try {
    var __o__ = JSON.parse(input) || {};
    return !!__o__;
  } catch (e) {
    return false;
  }
});

/**
 * Ensures the value of field under validation is safe to be parsed
 * using `JSON.parse` method.
 *
 * [source, js]
 * ----
 * const rules = {
 *   payload: 'json'
 * }
 *
 * // or
 * const rules = {
 *   payload: [
 *     rule('json')
 *   ]
 * }
 * ----
 */
var json = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);

    if (!skippable(fieldValue) && !json$1(fieldValue)) {
      return message;
    }
  });
});

/**
 * Ensures the length of a string is not greater than
 * the defined length.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'max:40'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('max', 40)
 *   ]
 * }
 * ----
 */
var max = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      maxLength = _ref2[0];

  return toPromise(function () {
    if (!maxLength) {
      throw new Error('max:make sure to define max length');
    }
    var fieldValue = get$$1(data, field);

    if (!skippable(fieldValue) && String(fieldValue).length > maxLength) {
      return message;
    }
  });
});

/**
 * Ensures the length of a string is not is not less than
 * the expected length
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'min:6'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('min', 6)
 *   ]
 * }
 * ----
 */
var min = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      minLength = _ref2[0];

  return toPromise(function () {
    if (!minLength) {
      throw new Error('min:make sure to define min length');
    }

    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && String(fieldValue).length < minLength) {
      return message;
    }
  });
});

/**
 * Makes sure that the value of field under validation is not
 * same as the defined value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'not_equals:root'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('not_equals', 'root')
 *   ]
 * }
 * ----
 */
var notEquals = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      targetedValue = _ref2[0];

  return toPromise(function () {
    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && targetedValue == fieldValue) {
      // eslint-disable-line eqeqeq
      return message;
    }
  });
});

/**
 * Makes sure that the value of field under validation is not
 * from one of the defined values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'not_in:root,admin,super'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('not_in', ['root', 'admin', 'super'])
 *   ]
 * }
 * ----
 */
var notIn = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && inArray(fieldValue, args)) {
      return message;
    }
  });
});

var isNumber = (function (input) {
  return typeof input === 'number' && !isNaN(input);
});

/**
 * Makes sure that the value of field under validation is a valid
 * number. The validation will pass for floats too, since it uses `typeof` internally.
 *
 * For strict integers, you must use the link:integer[integer] rule.
 *
 * [source, js]
 * ----
 * const rules = {
 *   game_points: 'number'
 * }
 *
 * // or
 * const rules = {
 *   game_points: [
 *     rule('number')
 *   ]
 * }
 * ----
 */
var number = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !isNumber(fieldValue)) {
      return message;
    }
  });
});

var isObject = (function (input) {
  return input instanceof Object && !Array.isArray(input);
});

/**
 * Ensures the value of field under validation is a valid Javascript
 * object.
 *
 * The validation will fail for `Arrays`, though they are objects too in Javascript.
 *
 * [source, js]
 * ----
 * const rules = {
 *   user: 'object'
 * }
 *
 * // or
 * const rules = {
 *   user: [
 *     rule('object')
 *   ]
 * }
 * ----
 */
var object = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !isObject(fieldValue)) {
      return message;
    }
  });
});

var between = (function (input, min, max) {
  input = Number(input);
  return input > Number(min) && input < Number(max);
});

/**
 * Ensures the value of field under validation is under a given range. The values will
 * be cased to `Number` automatically.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'range:16,60'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('range', [16, 60])
 *   ]
 * }
 * ----
 */
var range = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 2),
      min = _ref2[0],
      max = _ref2[1];

  return toPromise(function () {
    if (!min || !max) {
      return new Error('range:min and max values are required for range validation');
    }

    var fieldValue = get$$1(data, field);

    if (!skippable(fieldValue) && !between(fieldValue, min, max)) {
      return message;
    }
  });
});

/**
 * Ensures the value of field under validation, passes the regex test. The regex
 * can be defined as a string or a RegExp object.
 *
 * NOTE: For complex `regex`, always use the `rule` method.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: [
 *     rule('regex', /[a-z]+/)
 *   ]
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('regex', new RegExp('[a-z]+'))
 *   ]
 * }
 * ----
 */
var regex = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 2),
      regexExp = _ref2[0],
      regexFlags = _ref2[1];

  return toPromise(function () {
    var fieldValue = get$$1(data, field);

    var expression = regexExp instanceof RegExp ? regexExp : new RegExp(regexExp, regexFlags);
    if (!skippable(fieldValue) && !expression.test(fieldValue)) {
      return message;
    }
  });
});

/**
 * @description tells whether input is empty or not
 * @method empty
 * @param  {Mixed} input
 * @return {Boolean}
 * @example
 *   Following yield to true
 *    empty({})
 *    empty([])
 *    empty('')
 *    empty(null)
 *    empty(undefined)
 */
var empty = (function (input) {
  if (!existy(input)) {
    return true;
  }

  if (input instanceof Date) {
    return false;
  }

  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
    return Object.keys(input).length === 0;
  }

  return false;
});

/**
 * Ensures the value of field under validation is not empty. All of the following
 * values will be considered empty.
 *
 * [ul-shrinked]
 * - An empty Object `{}`
 * - Empty Array `[]`
 * - Empty string, `null` or `undefined`
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'required'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('required')
 *   ]
 * }
 * ----
 */
var required = (function (data, field, message, args, get) {
  return toPromise(function () {
    if (empty(get(data, field))) {
      return message;
    }
  });
});

/**
 * The field is checked for required validation, when expected field exists.
 *
 * [source, js]
 * ----
 * const rules = {
 *   address: 'required_if:needs_delivery'
 * }
 *
 * // or
 * const rules = {
 *   address: [
 *     rule('required_if', 'needs_delivery')
 *   ]
 * }
 * ----
 */
var requiredIf = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      whenField = _ref2[0];

  return toPromise(function () {
    if (existy(get$$1(data, whenField)) && empty(get$$1(data, field))) {
      return message;
    }
  });
});

/**
 * The field is checked for required validation, when expected field value is same
 * as the expected value.
 *
 * `{}`, `[]`, `''`, `null`, `undefined` are considered as empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   state: 'required_when:country,US'
 * }
 *
 * // or
 * const rules = {
 *   state: [
 *     rule('required_when', ['country', 'US'])
 *   ]
 * }
 * ----
 */
function requiredWhen (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 2),
      otherField = _ref2[0],
      expectedValue = _ref2[1];

  return toPromise(function () {
    var otherValue = get$$1(data, otherField);
    if (String(expectedValue) === String(otherValue) && empty(get$$1(data, field))) {
      return message;
    }
  });
}

/**
 * Ensures the field is required when all other fields have non-empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   tax_id: 'required_with_all:car,house'
 * }
 *
 * // or
 * const rules = {
 *   tax_id: [
 *     rule('required_with_all', ['car', 'house'])
 *   ]
 * }
 * ----
 */
var requiredWithAll = (function (data, field, message, args, get) {
  return toPromise(function () {
    var missingAnyField = args.some(function (item) {
      return !existy(get(data, item));
    });
    if (!missingAnyField && empty(get(data, field))) {
      return message;
    }
  });
});

/**
 * Ensures the field is required when any of the other fields have non-empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'required_with_any:username,email'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('required_with_any', ['username', 'email'])
 *   ]
 * }
 * ----
 */
var requiredWithAny = (function (data, field, message, args, get) {
  return toPromise(function () {
    var hasAnyField = args.some(function (item) {
      return existy(get(data, item));
    });
    if (hasAnyField && empty(get(data, field))) {
      return message;
    }
  });
});

/**
 * Ensures the field is required when all of the other fields has empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   zipcode: 'required_without_all:address,state'
 * }
 *
 * // or
 * const rules = {
 *   zipcode: [
 *     rule('required_without_all', ['address', 'state'])
 *   ]
 * }
 * ----
 */
var requiredWithoutAll = (function (data, field, message, args, get) {
  return toPromise(function () {
    var hasAnyField = args.some(function (item) {
      return existy(get(data, item));
    });
    if (!hasAnyField && empty(get(data, field))) {
      return message;
    }
  });
});

/**
 * Ensures the field is required when all of the other fields has empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   email: 'required_without_any:username,account_id'
 * }
 *
 * // or
 * const rules = {
 *   email: [
 *     rule('required_without_any', ['username', 'account_id'])
 *   ]
 * }
 * ----
 */
var requiredWithoutAny = (function (data, field, message, args, get) {
  return toPromise(function () {
    var hasAnyField = args.some(function (item) {
      return !existy(get(data, item));
    });
    if (hasAnyField && empty(get(data, field))) {
      return message;
    }
  });
});

/**
 * Ensures the value of 2 fields are same.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password_confirmation: 'same:password'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('same', ['password'])
 *   ]
 * }
 * ----
 */
var same$1 = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      targetedField = _ref2[0];

  return toPromise(function () {
    var fieldValue = get$$1(data, field);
    var targetedFieldValue = get$$1(data, targetedField);

    if (!skippable(fieldValue) && existy(targetedFieldValue) && targetedFieldValue !== fieldValue) {
      return message;
    }
  });
});

/**
 * Ensure the value of field under validation starts with a certain substr. This
 * validation will also trim whitespaces before making the check
 *
 * [source, js]
 * ----
 * const rules = {
 *   phone_no: 'starts_with:99'
 * }
 *
 * // or
 * const rules = {
 *   phone_no: [
 *     rule('starts_with', 99)
 *   ]
 * }
 * ----
 */
var startsWith = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      substring = _ref2[0];

  return toPromise(function () {
    if (!substring) {
      throw new Error('startsWith:make sure to define the matching substring');
    }

    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && String(fieldValue).trim().substr(0, substring.length) !== String(substring)) {
      return message;
    }
  });
});

var isString = (function (input) {
  return typeof input === 'string';
});

/**
 * Ensures the value is a string
 *
 * [source, js]
 * ----
 * const rules = {
 *   bio: 'string'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('bio', 'string')
 *   ]
 * }
 * ----
 */
var string = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !isString(fieldValue)) {
      return message;
    }
  });
});

/**
 * Ensures the value of a field is under a certain value. All values
 * will be casted to `Number`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'under:60'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('age', 60)
 *   ]
 * }
 * ----
 */
var under = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      maxValue = _ref2[0];

  return toPromise(function () {
    if (!maxValue) {
      throw new Error('under:make sure to pass the max value');
    }
    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && Number(fieldValue) >= Number(maxValue)) {
      return message;
    }
  });
});

var urlRegex = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}|localhost)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i;

/**
 * @description tells whether given input is a valid url
 * or not
 * @method url
 * @param  {String} input
 * @return {Boolean}
 * @example
 *   Following yields to true
 *   http://foo.com
 *   https://foo.com
 *   http://localhost
 *   http://foo.co.in
 */
var url$1 = (function (input) {
  return urlRegex.test(input);
});

/**
 * Ensures the value is a valid URL format.
 *
 * [source, js]
 * ----
 * const rules = {
 *   gh_profile: 'url'
 * }
 *
 * // or
 * const rules = {
 *   gh_profile: [
 *     rule('url')
 *   ]
 * }
 * ----
 */
var url = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !url$1(fieldValue)) {
      return message;
    }
  });
});

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

var is_date = isDate;

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;

var parseTokenDateTimeDelimeter = /[T ]/;
var parseTokenPlainTime = /:/;

// year tokens
var parseTokenYY = /^(\d{2})$/;
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
];

var parseTokenYYYY = /^(\d{4})/;
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
];

// date tokens
var parseTokenMM = /^-(\d{2})$/;
var parseTokenDDD = /^-?(\d{3})$/;
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
var parseTokenWww = /^-?W(\d{2})$/;
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/;
var parseTokenTimezoneZ = /^(Z)$/;
var parseTokenTimezoneHH = /^([+-])(\d{2})$/;
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse$1 (argument, dirtyOptions) {
  if (is_date(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits;
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
  } else {
    additionalDigits = Number(additionalDigits);
  }

  var dateStrings = splitDateString(argument);

  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;

  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset();
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {};
  var array = dateString.split(parseTokenDateTimeDelimeter);
  var timeString;

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits];
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits];

  var token;

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = parseTokenHH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token;
  var absoluteOffset;

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString);
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date
}

var parse_1 = parse$1;

/**
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|String|Number} date - the date that should be after the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter (dirtyDate, dirtyDateToCompare) {
  var date = parse_1(dirtyDate);
  var dateToCompare = parse_1(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime()
}

var is_after = isAfter;

/**
 * Ensures the value of the field is after the expected
 * date.
 *
 * This method will import link:https://date-fns.org/docs/isAfter[isAfter] function of date-fns.
 *
 * [source, js]
 * ----
 * const rules = {
 *   confCall: `after:`${new Date()}
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('after', new Date())
 *   ]
 * }
 * ----
 */
var after = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      afterDate = _ref2[0];

  return toPromise(function () {
    if (!afterDate) {
      return new Error('after:make sure to define the after date');
    }

    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && !is_after(fieldValue, afterDate)) {
      return message;
    }
  });
});

/**
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|String|Number} date - the date that should be before the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore (dirtyDate, dirtyDateToCompare) {
  var date = parse_1(dirtyDate);
  var dateToCompare = parse_1(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime()
}

var is_before = isBefore;

/**
 * Ensures the value of field under validation is before a given
 * date.
 *
 * This method will import link:https://date-fns.org/v1.29.0/docs/isBefore[isBefore] method from date-fns.
 *
 * [source, js]
 * ----
 * const rules = {
 *   confCall: 'before:2018-11-20'
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('before', new Date().setDate(new Date().getMonth() + 12))
 *   ]
 * }
 * ----
 */
var before = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 1),
      beforeDate = _ref2[0];

  return toPromise(function () {
    if (!beforeDate) {
      return new Error('before:make sure to define the before date');
    }

    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && !is_before(fieldValue, beforeDate)) {
      return message;
    }
  });
});

var date$1 = (function (input) {
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (input instanceof Date === true) {
    return true;
  }

  if (strict) {
    return false;
  }

  return new Date(input).toString() !== 'Invalid Date';
});

/**
 * Ensures the field under validation is a valid date. The value can be a
 * date object or a valid date string.
 *
 * If value is a string, it will be processed using `new Date(givenString)`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   login_at: 'date'
 * }
 *
 * // or
 * const rules = {
 *   login_at: [
 *     rule('date')
 *   ]
 * }
 * ----
 */
var date = (function (data, field, message, args, get) {
  return toPromise(function () {
    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !date$1(fieldValue, false)) {
      return message;
    }
  });
});

/**
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear (dirtyDate) {
  var cleanDate = parse_1(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_year = startOfYear;

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_day = startOfDay;

var MILLISECONDS_IN_MINUTE$1 = 60000;
var MILLISECONDS_IN_DAY = 86400000;

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = start_of_day(dirtyDateLeft);
  var startOfDayRight = start_of_day(dirtyDateRight);

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$1;
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$1;

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

var difference_in_calendar_days = differenceInCalendarDays;

/**
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear (dirtyDate) {
  var date = parse_1(dirtyDate);
  var diff = difference_in_calendar_days(date, start_of_year(date));
  var dayOfYear = diff + 1;
  return dayOfYear
}

var get_day_of_year = getDayOfYear;

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;

  var date = parse_1(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_week = startOfWeek;

/**
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek (dirtyDate) {
  return start_of_week(dirtyDate, {weekStartsOn: 1})
}

var start_of_iso_week = startOfISOWeek;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOYear (dirtyDate) {
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();

  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = start_of_iso_week(fourthOfJanuaryOfNextYear);

  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = start_of_iso_week(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

var get_iso_year = getISOYear;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOYear (dirtyDate) {
  var year = get_iso_year(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = start_of_iso_week(fourthOfJanuary);
  return date
}

var start_of_iso_year = startOfISOYear;

var MILLISECONDS_IN_WEEK = 604800000;

/**
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek (dirtyDate) {
  var date = parse_1(dirtyDate);
  var diff = start_of_iso_week(date).getTime() - start_of_iso_year(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}

var get_iso_week = getISOWeek;

/**
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {Date} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} argument must be an instance of Date
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid (dirtyDate) {
  if (is_date(dirtyDate)) {
    return !isNaN(dirtyDate)
  } else {
    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')
  }
}

var is_valid = isValid;

function buildDistanceInWordsLocale () {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };

  function localize (token, count, options) {
    options = options || {};

    var result;
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token];
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one;
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count);
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  return {
    localize: localize
  }
}

var build_distance_in_words_locale = buildDistanceInWordsLocale;

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
];

function buildFormattingTokensRegExp (formatters) {
  var formatterKeys = [];
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key);
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse();
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  );

  return formattingTokensRegExp
}

var build_formatting_tokens_reg_exp = buildFormattingTokensRegExp;

function buildFormatLocale () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var meridiemUppercase = ['AM', 'PM'];
  var meridiemLowercase = ['am', 'pm'];
  var meridiemFull = ['a.m.', 'p.m.'];

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getMonth()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getMonth()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getDay()]
    },

    // AM, PM
    'A': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
    },

    // am, pm
    'a': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
    }
  };

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W'];
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    };
  });

  return {
    formatters: formatters,
    formattingTokensRegExp: build_formatting_tokens_reg_exp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

var build_format_locale = buildFormatLocale;

/**
 * @category Locales
 * @summary English locale.
 */
var en = {
  distanceInWords: build_distance_in_words_locale(),
  format: build_format_locale()
};

/**
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
 * @param {Object} [options] - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * var eoLocale = require('date-fns/locale/eo')
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  var options = dirtyOptions || {};

  var locale = options.locale;
  var localeFormatters = en.format.formatters;
  var formattingTokensRegExp = en.format.formattingTokensRegExp;
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters;

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp;
    }
  }

  var date = parse_1(dirtyDate);

  if (!is_valid(date)) {
    return 'Invalid Date'
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp);

  return formatFn(date)
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  'MM': function (date) {
    return addLeadingZeros(date.getMonth() + 1, 2)
  },

  // Quarter: 1, 2, 3, 4
  'Q': function (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Day of month: 1, 2, ..., 31
  'D': function (date) {
    return date.getDate()
  },

  // Day of month: 01, 02, ..., 31
  'DD': function (date) {
    return addLeadingZeros(date.getDate(), 2)
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function (date) {
    return get_day_of_year(date)
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(get_day_of_year(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  'd': function (date) {
    return date.getDay()
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function (date) {
    return date.getDay() || 7
  },

  // ISO week: 1, 2, ..., 53
  'W': function (date) {
    return get_iso_week(date)
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(get_iso_week(date), 2)
  },

  // Year: 00, 01, ..., 99
  'YY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4)
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function (date) {
    return String(get_iso_year(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return get_iso_year(date)
  },

  // Hour: 0, 1, ... 23
  'H': function (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  'HH': function (date) {
    return addLeadingZeros(date.getHours(), 2)
  },

  // Hour: 1, 2, ..., 12
  'h': function (date) {
    var hours = date.getHours();
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },

  // Minute: 0, 1, ..., 59
  'm': function (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  'mm': function (date) {
    return addLeadingZeros(date.getMinutes(), 2)
  },

  // Second: 0, 1, ..., 59
  's': function (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  'ss': function (date) {
    return addLeadingZeros(date.getSeconds(), 2)
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function (date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function (date) {
    return addLeadingZeros(date.getMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  'X': function (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  'x': function (date) {
    return date.getTime()
  }
};

function buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp);
  var length = array.length;

  var i;
  var formatter;
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]];
    if (formatter) {
      array[i] = formatter;
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }

  return function (date) {
    var output = '';
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters);
      } else {
        output += array[i];
      }
    }
    return output
  }
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output
}

var format_1 = format;

var dateFormat$1 = (function (input, formats) {
  return (Array.isArray(formats) ? formats : [formats]).some(function (pattern) {
    var sanitizedInput = input;
    var hasTimeZone = false;

    // Following https://www.w3.org/TR/NOTE-datetime
    if (pattern.endsWith('ZZ')) {
      sanitizedInput = input.replace(/(\+|-)\d{4}$/, '');
      pattern = pattern.replace(/ZZ$/, '');
      hasTimeZone = true;
    } else if (pattern.endsWith('Z')) {
      sanitizedInput = input.replace(/Z$/, '').replace(/(\+|-)\d{2}:\d{2}$/, '');
      pattern = pattern.replace(/Z$/, '');
      hasTimeZone = true;
    }

    var formattedInput = format_1(sanitizedInput, pattern);

    return formattedInput !== 'Invalid Date' && formattedInput === sanitizedInput && (!hasTimeZone || sanitizedInput !== input);
  });
});

/**
 * Ensures the date or date time is valid as the one of the defined formats.
 *
 * This method will import link:https://date-fns.org/v1.29.0/docs/format[format] method from dateFns.
 *
 * === Note
 * Following steps are performed to strip the timezone from the actual date
 * and then format the date. Keeping timezones on will result in different
 * output, though the format is correct.
 *
 * 1. Timezone is only stripped when the date format expects timezone to
 *    be present.
 * 2. `Z` and `ZZ` identifiers replaces their expected counter parts.
 * 3. Also date can have `Z`, which is equivalent to `+00:00`.
 * 4. If we will not strip the timezone offset from the actual date, then
 *    dateFns will format it in local timezone causing invalid date
 *    comparison.
 * 5. Validation will also fail, when format expects a timezone but missing
 *    in original date.
 *
 * [source, js]
 * ----
 * // always use the rule method
 *
 * const rules = {
 *   publish_at: [
 *     rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
 *   ]
 * }
 * ----
 */
var dateFormat = (function (data, field, message, args, get) {
  return toPromise(function () {
    if (args.length === 0) {
      throw new Error('dateFormat:make sure to define atleast one date format');
    }

    var fieldValue = get(data, field);
    if (!skippable(fieldValue) && !dateFormat$1(fieldValue, args)) {
      return message;
    }
  });
});

/**
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth (dirtyDate) {
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate()
}

var get_days_in_month = getDaysInMonth;

/**
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths (dirtyDate, dirtyAmount) {
  var date = parse_1(dirtyDate);
  var amount = Number(dirtyAmount);
  var desiredMonth = date.getMonth() + amount;
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = get_days_in_month(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date
}

var add_months = addMonths;

/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays (dirtyDate, dirtyAmount) {
  var date = parse_1(dirtyDate);
  var amount = Number(dirtyAmount);
  date.setDate(date.getDate() + amount);
  return date
}

var add_days = addDays;

/**
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added
 * @returns {Date} the new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds (dirtyDate, dirtyAmount) {
  var timestamp = parse_1(dirtyDate).getTime();
  var amount = Number(dirtyAmount);
  return new Date(timestamp + amount)
}

var add_milliseconds = addMilliseconds;

/**
 * The job of this method is to ensure that we pull less dependencies from
 * date-fns.
 *
 * @param  {Number} diffUnit
 * @param  {String} key
 * @param  {String} operator
 *
 * @return {String|Undefined}
 */
var calcUnits = (function (diffUnit, key, operator) {
  var viaMonths = {
    years: function years(unit) {
      return unit * 12;
    },
    quarters: function quarters(unit) {
      return unit * 3;
    },
    months: function months(unit) {
      return unit;
    }
  };

  var viaDays = {
    weeks: function weeks(unit) {
      return unit * 7;
    },
    days: function days(unit) {
      return unit;
    }
  };

  var viaMilliseconds = {
    hours: function hours(unit) {
      return unit * 3600000;
    },
    minutes: function minutes(unit) {
      return unit * 60000;
    },
    seconds: function seconds(unit) {
      return unit * 1000;
    },
    milliseconds: function milliseconds(unit) {
      return unit;
    }
  };

  diffUnit = Number(diffUnit);

  if (viaMonths[key]) {
    return add_months(new Date(), operator === '-' ? -viaMonths[key](diffUnit) : viaMonths[key](diffUnit));
  }

  if (viaDays[key]) {
    return add_days(new Date(), operator === '-' ? -viaDays[key](diffUnit) : viaDays[key](diffUnit));
  }

  if (viaMilliseconds[key]) {
    return add_milliseconds(new Date(), operator === '-' ? -viaMilliseconds[key](diffUnit) : viaMilliseconds[key](diffUnit));
  }
});

var beforeOffsetOf$1 = (function (input, diffUnit, key) {
  var expectedDate = calcUnits(diffUnit, key, '-');
  return expectedDate ? is_before(input, expectedDate) : false;
});

/**
 * Ensures the date is before a given offset of a given
 * time period. The `period` can be defined using
 * following properties.
 *
 * [ul-shrinked]
 * - years
 * - quarters
 * - months
 * - weeks
 * - days
 * - hours
 * - minutes
 * - seconds
 * - milliseconds
 *
 * [source, js]
 * ----
 * const rules = {
 *   confCall: 'before_offset_of:4,months'
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('before_offset_of', [4, 'months'])
 *   ]
 * }
 * ----
 */
var beforeOffsetOf = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 2),
      diffUnit = _ref2[0],
      key = _ref2[1];

  return toPromise(function () {
    if (!diffUnit || !key) {
      return new Error('beforeOffsetOf:make sure to define offset unit and key');
    }

    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && !beforeOffsetOf$1(fieldValue, diffUnit, key)) {
      return message;
    }
  });
});

var afterOffsetOf$1 = (function (input, diffUnit, key) {
  var expectedDate = calcUnits(diffUnit, key, '+');
  return expectedDate ? is_after(input, expectedDate) : false;
});

/**
 * Ensures the date is after a given offset of a given
 * time period. The `period` can be defined using
 * following properties.
 *
 * [ul-shrinked]
 * - years
 * - quarters
 * - months
 * - weeks
 * - days
 * - hours
 * - minutes
 * - seconds
 * - milliseconds
 *
 * [source, js]
 * ----
 * const rules = {
 *   meetup: 'after_offset_of:4,months'
 * }
 *
 * // or
 * const rules = {
 *   meetup: [
 *     rule('after_offset_of', [4, 'months'])
 *   ]
 * }
 * ----
 */
var afterOffsetOf = (function (data, field, message, _ref, get$$1) {
  var _ref2 = slicedToArray(_ref, 2),
      diffUnit = _ref2[0],
      key = _ref2[1];

  return toPromise(function () {
    if (!diffUnit || !key) {
      return new Error('afterOffsetOf:make sure to define offset unit and key');
    }
    var fieldValue = get$$1(data, field);
    if (!skippable(fieldValue) && !afterOffsetOf$1(fieldValue, diffUnit, key)) {
      return message;
    }
  });
});

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/



var validations = Object.freeze({
	above: above,
	accepted: accepted,
	alpha: alpha,
	alphaNumeric: alphaNumeric,
	array: array,
	boolean: boolean,
	confirmed: confirmed,
	different: different,
	email: email,
	endsWith: endsWith,
	equals: equals,
	in: _in,
	includes: includes,
	integer: integer,
	ip: ip,
	ipv4: ipv4$1,
	ipv6: ipv6$1,
	json: json,
	max: max,
	min: min,
	notEquals: notEquals,
	notIn: notIn,
	number: number,
	object: object,
	range: range,
	regex: regex,
	required: required,
	requiredIf: requiredIf,
	requiredWhen: requiredWhen,
	requiredWithAll: requiredWithAll,
	requiredWithAny: requiredWithAny,
	requiredWithoutAll: requiredWithoutAll,
	requiredWithoutAny: requiredWithoutAny,
	same: same$1,
	startsWith: startsWith,
	string: string,
	under: under,
	url: url,
	after: after,
	before: before,
	date: date,
	dateFormat: dateFormat,
	beforeOffsetOf: beforeOffsetOf,
	afterOffsetOf: afterOffsetOf
});

var normalizeEmail_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeEmail;



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_normalize_email_options = {
  // The following options apply to all email addresses
  // Lowercases the local part of the email address.
  // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
  // The domain is always lowercased, as per RFC 1035
  all_lowercase: true,

  // The following conversions are specific to GMail
  // Lowercases the local part of the GMail address (known to be case-insensitive)
  gmail_lowercase: true,
  // Removes dots from the local part of the email address, as that's ignored by GMail
  gmail_remove_dots: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  gmail_remove_subaddress: true,
  // Conversts the googlemail.com domain to gmail.com
  gmail_convert_googlemaildotcom: true,

  // The following conversions are specific to Outlook.com / Windows Live / Hotmail
  // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
  outlookdotcom_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  outlookdotcom_remove_subaddress: true,

  // The following conversions are specific to Yahoo
  // Lowercases the local part of the Yahoo address (known to be case-insensitive)
  yahoo_lowercase: true,
  // Removes the subaddress (e.g. "-foo") from the email address
  yahoo_remove_subaddress: true,

  // The following conversions are specific to iCloud
  // Lowercases the local part of the iCloud address (known to be case-insensitive)
  icloud_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  icloud_remove_subaddress: true
};

// List of domains used by iCloud
var icloud_domains = ['icloud.com', 'me.com'];

// List of domains used by Outlook.com and its predecessors
// This list is likely incomplete.
// Partial reference:
// https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/
var outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com'];

// List of domains used by Yahoo Mail
// This list is likely incomplete
var yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com'];

function normalizeEmail(email, options) {
  options = (0, _merge2.default)(options, default_normalize_email_options);

  var raw_parts = email.split('@');
  var domain = raw_parts.pop();
  var user = raw_parts.join('@');
  var parts = [user, domain];

  // The domain is always lowercased, as it's case-insensitive per RFC 1035
  parts[1] = parts[1].toLowerCase();

  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
    // Address is GMail
    if (options.gmail_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (options.gmail_remove_dots) {
      parts[0] = parts[0].replace(/\./g, '');
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.gmail_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
  } else if (~icloud_domains.indexOf(parts[1])) {
    // Address is iCloud
    if (options.icloud_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.icloud_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (~outlookdotcom_domains.indexOf(parts[1])) {
    // Address is Outlook.com
    if (options.outlookdotcom_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.outlookdotcom_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (~yahoo_domains.indexOf(parts[1])) {
    // Address is Yahoo
    if (options.yahoo_remove_subaddress) {
      var components = parts[0].split('-');
      parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.yahoo_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (options.all_lowercase) {
    // Any other address
    parts[0] = parts[0].toLowerCase();
  }
  return parts.join('@');
}
module.exports = exports['default'];
});

var normalizeEmail$1 = unwrapExports(normalizeEmail_1);

/**
 * Normalizes the email address by removing unwanted characters from it. For example
 * `foo+bar@gmail.com` will become `foobar@gmail.com` and also it will normalize
 * the characters case too.
 *
 * If value is not a string, it will be returned as it is, otherwise it is passed to
 * link:https://github.com/chriso/validator.js[validator.js] normalizeEmail method.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   email: [
 *     rule('normalize_email')
 *   ]
 * }
 *
 * // pass options
 * const sanitizationRules = {
 *   email: [
 *     rule('normalize_email', {
 *       all_lowercase: true,
 *       icloud_remove_subaddress: true
 *     })
 *   ]
 * }
 * ----
 */
var normalizeEmail = (function (email, args) {
  if (typeof email === 'string') {
    var options = args && args.length ? args[0] : {};
    return normalizeEmail$1(email, options);
  }
  return email;
});

var striptags = createCommonjsModule(function (module) {
(function (global) {

    // minimal symbol polyfill for IE11 and others
    if (typeof Symbol !== 'function') {
        var Symbol = function(name) {
            return name;
        };

        Symbol.nonNative = true;
    }

    const STATE_PLAINTEXT = Symbol('plaintext');
    const STATE_HTML      = Symbol('html');
    const STATE_COMMENT   = Symbol('comment');

    const ALLOWED_TAGS_REGEX  = /<(\w*)>/g;
    const NORMALIZE_TAG_REGEX = /<\/?([^\s\/>]+)/;

    function striptags(html, allowable_tags, tag_replacement) {
        html            = html || '';
        allowable_tags  = allowable_tags || [];
        tag_replacement = tag_replacement || '';

        let context = init_context(allowable_tags, tag_replacement);

        return striptags_internal(html, context);
    }

    function init_striptags_stream(allowable_tags, tag_replacement) {
        allowable_tags  = allowable_tags || [];
        tag_replacement = tag_replacement || '';

        let context = init_context(allowable_tags, tag_replacement);

        return function striptags_stream(html) {
            return striptags_internal(html || '', context);
        };
    }

    striptags.init_streaming_mode = init_striptags_stream;

    function init_context(allowable_tags, tag_replacement) {
        allowable_tags = parse_allowable_tags(allowable_tags);

        return {
            allowable_tags : allowable_tags,
            tag_replacement: tag_replacement,

            state         : STATE_PLAINTEXT,
            tag_buffer    : '',
            depth         : 0,
            in_quote_char : ''
        };
    }

    function striptags_internal(html, context) {
        let allowable_tags  = context.allowable_tags;
        let tag_replacement = context.tag_replacement;

        let state         = context.state;
        let tag_buffer    = context.tag_buffer;
        let depth         = context.depth;
        let in_quote_char = context.in_quote_char;
        let output        = '';

        for (let idx = 0, length = html.length; idx < length; idx++) {
            let char = html[idx];

            if (state === STATE_PLAINTEXT) {
                switch (char) {
                    case '<':
                        state       = STATE_HTML;
                        tag_buffer += char;
                        break;

                    default:
                        output += char;
                        break;
                }
            }

            else if (state === STATE_HTML) {
                switch (char) {
                    case '<':
                        // ignore '<' if inside a quote
                        if (in_quote_char) {
                            break;
                        }

                        // we're seeing a nested '<'
                        depth++;
                        break;

                    case '>':
                        // ignore '>' if inside a quote
                        if (in_quote_char) {
                            break;
                        }

                        // something like this is happening: '<<>>'
                        if (depth) {
                            depth--;

                            break;
                        }

                        // this is closing the tag in tag_buffer
                        in_quote_char = '';
                        state         = STATE_PLAINTEXT;
                        tag_buffer   += '>';

                        if (allowable_tags.has(normalize_tag(tag_buffer))) {
                            output += tag_buffer;
                        } else {
                            output += tag_replacement;
                        }

                        tag_buffer = '';
                        break;

                    case '"':
                    case '\'':
                        // catch both single and double quotes

                        if (char === in_quote_char) {
                            in_quote_char = '';
                        } else {
                            in_quote_char = in_quote_char || char;
                        }

                        tag_buffer += char;
                        break;

                    case '-':
                        if (tag_buffer === '<!-') {
                            state = STATE_COMMENT;
                        }

                        tag_buffer += char;
                        break;

                    case ' ':
                    case '\n':
                        if (tag_buffer === '<') {
                            state      = STATE_PLAINTEXT;
                            output    += '< ';
                            tag_buffer = '';

                            break;
                        }

                        tag_buffer += char;
                        break;

                    default:
                        tag_buffer += char;
                        break;
                }
            }

            else if (state === STATE_COMMENT) {
                switch (char) {
                    case '>':
                        if (tag_buffer.slice(-2) == '--') {
                            // close the comment
                            state = STATE_PLAINTEXT;
                        }

                        tag_buffer = '';
                        break;

                    default:
                        tag_buffer += char;
                        break;
                }
            }
        }

        // save the context for future iterations
        context.state         = state;
        context.tag_buffer    = tag_buffer;
        context.depth         = depth;
        context.in_quote_char = in_quote_char;

        return output;
    }

    function parse_allowable_tags(allowable_tags) {
        let tag_set = new Set();

        if (typeof allowable_tags === 'string') {
            let match;

            while ((match = ALLOWED_TAGS_REGEX.exec(allowable_tags))) {
                tag_set.add(match[1]);
            }
        }

        else if (!Symbol.nonNative &&
                 typeof allowable_tags[Symbol.iterator] === 'function') {

            tag_set = new Set(allowable_tags);
        }

        else if (typeof allowable_tags.forEach === 'function') {
            // IE11 compatible
            allowable_tags.forEach(tag_set.add, tag_set);
        }

        return tag_set;
    }

    function normalize_tag(tag_buffer) {
        let match = NORMALIZE_TAG_REGEX.exec(tag_buffer);

        return match ? match[1].toLowerCase() : null;
    }

    if (typeof undefined === 'function' && undefined.amd) {
        // AMD
        undefined(function module_factory() { return striptags; });
    }

    else if ('object' === 'object' && module.exports) {
        // Node
        module.exports = striptags;
    }

    else {
        // Browser
        global.striptags = striptags;
    }
}(commonjsGlobal));
});

/**
 * Strips HTML tags from a string. If value is not a string, it will be returned
 * as it is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'strip_tags'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('strip_tags')
 *   ]
 * }
 * ----
 *
 * Also you can pass an array of whitelisted tags.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'strip_tags:a,img'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('strip_tags', ['a', 'img'])
 *   ]
 * }
 * ----
 */
var stripTags = (function (value, args) {
  if (typeof value !== 'string') {
    return value;
  }
  return striptags(value, args);
});

/**
 * Converts value to a boolean. If value is an `empty string`, `'false'` or `'0'`, it
 * will be converted to `false`, otherwise to `true`.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   is_admin: 'boolean'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   is_admin: [
 *     rule('boolean')
 *   ]
 * }
 * ----
 */
var toBoolean = (function (value) {
  if (!value || value === 'false' || value === '0') {
    return false;
  }
  return true;
});

/**
 * Converts empty strings and `undefined` to `null`. It is
 * handy to keep data normalized at database level.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   bio: 'to_null'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   bio: [
 *     rule('to_null')
 *   ]
 * }
 * ----
 */
var toNull = (function (value) {
  if (!existy(value)) {
    return null;
  }
  return value;
});

/**
 * Converts value to an integer using `parseInt`.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   age: 'to_int'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   age: [
 *     rule('to_int')
 *   ]
 * }
 * ----
 */
var toInt = (function (value, args) {
  var radix = Array.isArray(args) && args[0] ? args[0] : 10;
  return parseInt(value, radix);
});

/**
 * Converts value to a date. If value is already an instance of `Date`, then it
 * is returned as it is.
 *
 * Otherwise, the value will be wrapped under `new Date()` and instance of it is
 * returned. In case `wrapped date` is invalid, `null` will be returned.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   created_at: 'date'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   created_at: [
 *     rule('date')
 *   ]
 * }
 * ----
 */
var toDate = (function (value) {
  if (value instanceof Date) {
    return value;
  }

  var toDate = new Date(value);
  return toDate.toString() === 'Invalid Date' ? null : toDate;
});

var pluralize = createCommonjsModule(function (module, exports) {
/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
    // Node.
    module.exports = pluralize();
  } else if (typeof undefined === 'function' && undefined.amd) {
    // AMD, registers as an anonymous module.
    undefined(function () {
      return pluralize();
    });
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(commonjsGlobal, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word
   * @param  {number}  count
   * @param  {boolean} inclusive
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'manga',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transporation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});
});

/**
 * Converts a value to it's plural version. If value is not a string
 * then it will return as it is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   controllerName: 'plural'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   controllerName: [
 *     rule('plural')
 *   ]
 * }
 * ----
 */
var plural = (function (value) {
  if (typeof value !== 'string') {
    return value;
  }
  return pluralize(value);
});

/**
 * Converts a value to it's singular version. If value is not a string
 * then it will return as it is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   modelName: 'singular'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   modelName: [
 *     rule('singular')
 *   ]
 * }
 * ----
 */
var singular = (function (value) {
  if (typeof value !== 'string') {
    return value;
  }
  return pluralize.singular(value);
});

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
var rsComboSymbolsRange = '\\u20d0-\\u20f0';
var rsDingbatRange = '\\u2700-\\u27bf';
var rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
var rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
var rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
var rsPunctuationRange = '\\u2000-\\u206f';
var rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
var rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
var rsVarRange = '\\ufe0e\\ufe0f';
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";
var rsBreak = '[' + rsBreakRange + ']';
var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
var rsDigits = '\\d+';
var rsDingbat = '[' + rsDingbatRange + ']';
var rsLower = '[' + rsLowerRange + ']';
var rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsUpper = '[' + rsUpperRange + ']';
var rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')';
var rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')';
var rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?';
var rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?';
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange + ']?';
var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString$1(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString$1(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

var lodash_kebabcase = kebabCase;

/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

var es6ObjectAssign = {
  assign: assign,
  polyfill: polyfill
};

/**
 * charmap
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

var assignFn = es6ObjectAssign.assign;

var latin = {
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
  'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I',
  'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O',
  'Õ': 'O', 'Ö': 'O', 'Ő': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U',
  'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH', 'Ÿ': 'Y', 'ß': 'ss', 'à': 'a',
  'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i',
  'ï': 'i', 'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o',
  'ö': 'o', 'ő': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
  'ű': 'u', 'ý': 'y', 'þ': 'th', 'ÿ': 'y',
};

var latinSymbols = {
  '©': '(c)', 'œ': 'oe', 'Œ': 'OE', '∑': 'sum', '®': '(r)', '†': '+',
  '“': '"', '”': '"', '‘': "'", '’': "'", '∂': 'd', 'ƒ': 'f', '™': 'tm',
  '℠': 'sm', '…': '...', '˚': 'o', 'º': 'o', 'ª': 'a', '•': '*',
  '∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
  '<': 'less', '>': 'greater', '@': 'at',
};

var greek = {
  'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h',
  'θ': '8', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3',
  'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f',
  'χ': 'x', 'ψ': 'ps', 'ω': 'w', 'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o',
  'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's', 'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y',
  'ΐ': 'i', 'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z',
  'Η': 'H', 'Θ': '8', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N',
  'Ξ': '3', 'Ο': 'O', 'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y',
  'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W', 'Ά': 'A', 'Έ': 'E', 'Ί': 'I',
  'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I', 'Ϋ': 'Y',
};

var turkish = {
  'ş': 's', 'Ş': 'S', 'ı': 'i', 'İ': 'I', 'ç': 'c', 'Ç': 'C', 'ü': 'u',
  'Ü': 'U', 'ö': 'o', 'Ö': 'O', 'ğ': 'g', 'Ğ': 'G',
};

var romanian = {
  'ă': 'a', 'î': 'i', 'ș': 's', 'ț': 't', 'â': 'a',
  'Ă': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T', 'Â': 'A',
};

var russian = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '',
  'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
  'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M',
  'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
  'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '',
  'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
};

var ukrainian = {
  'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G', 'є': 'ye', 'і': 'i',
  'ї': 'yi', 'ґ': 'g',
};

var czech = {
  'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't',
  'ů': 'u', 'ž': 'z', 'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R',
  'Š': 'S', 'Ť': 'T', 'Ů': 'U', 'Ž': 'Z',
};

var slovak = {
  'á': 'a', 'ä': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'í': 'i', 'ľ': 'l',
  'ĺ': 'l', 'ň': 'n', 'ó': 'o', 'ô': 'o', 'ŕ': 'r', 'š': 's', 'ť': 't',
  'ú': 'u', 'ý': 'y', 'ž': 'z',
  'Á': 'a', 'Ä': 'A', 'Č': 'C', 'Ď': 'D', 'É': 'E', 'Í': 'I', 'Ľ': 'L',
  'Ĺ': 'L', 'Ň': 'N', 'Ó': 'O', 'Ô': 'O', 'Ŕ': 'R', 'Š': 'S', 'Ť': 'T',
  'Ú': 'U', 'Ý': 'Y', 'Ž': 'Z',
};

var polish = {
  'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's',
  'ź': 'z', 'ż': 'z',
  'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S',
  'Ź': 'Z', 'Ż': 'Z',
};

var latvian = {
  'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l',
  'ņ': 'n', 'š': 's', 'ū': 'u', 'ž': 'z',
  'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'I', 'Ķ': 'K', 'Ļ': 'L',
  'Ņ': 'N', 'Š': 'S', 'Ū': 'U', 'Ž': 'Z',
};

var arabic = {
  'أ': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'g', 'ح': 'h', 'خ': 'kh', 'د': 'd',
  'ذ': 'th', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't',
  'ظ': 'th', 'ع': 'aa', 'غ': 'gh', 'ف': 'f', 'ق': 'k', 'ك': 'k', 'ل': 'l', 'م': 'm',
  'ن': 'n', 'ه': 'h', 'و': 'o', 'ي': 'y',
};

var lithuanian = {
  'ą': 'a', 'č': 'c', 'ę': 'e', 'ė': 'e', 'į': 'i', 'š': 's', 'ų': 'u',
  'ū': 'u', 'ž': 'z',
  'Ą': 'A', 'Č': 'C', 'Ę': 'E', 'Ė': 'E', 'Į': 'I', 'Š': 'S', 'Ų': 'U',
  'Ū': 'U', 'Ž': 'Z',
};

var serbian = {
  'ђ': 'dj', 'ј': 'j', 'љ': 'lj', 'њ': 'nj', 'ћ': 'c', 'џ': 'dz',
  'đ': 'dj', 'Ђ': 'Dj', 'Ј': 'j', 'Љ': 'Lj', 'Њ': 'Nj', 'Ћ': 'C',
  'Џ': 'Dz', 'Đ': 'Dj',
};

var azerbaijani = {
  'ç': 'c', 'ə': 'e', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
  'Ç': 'C', 'Ə': 'E', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U',
};

var georgian = {
  'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e', 'ვ': 'v', 'ზ': 'z',
  'თ': 't', 'ი': 'i', 'კ': 'k', 'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o',
  'პ': 'p', 'ჟ': 'j', 'რ': 'r', 'ს': 's', 'ტ': 't', 'უ': 'u', 'ფ': 'f',
  'ქ': 'q', 'ღ': 'g', 'ყ': 'y', 'შ': 'sh', 'ჩ': 'ch', 'ც': 'c', 'ძ': 'dz',
  'წ': 'w', 'ჭ': 'ch', 'ხ': 'x', 'ჯ': 'j', 'ჰ': 'h',
};

var vietnamese = {
  'Ạ': 'A', 'Ả': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A',
  'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ẹ': 'E', 'Ẻ': 'E',
  'Ẽ': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ị': 'I',
  'Ỉ': 'I', 'Ĩ': 'I', 'Ọ': 'O', 'Ỏ': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O',
  'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O',
  'Ỡ': 'O', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U',
  'Ự': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ỳ': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
  'Đ': 'D', 'ạ': 'a', 'ả': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a',
  'ẫ': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ẹ': 'e',
  'ẻ': 'e', 'ẽ': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
  'ị': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ọ': 'o', 'ỏ': 'o', 'ồ': 'o', 'ố': 'o',
  'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o',
  'ở': 'o', 'ỡ': 'o', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u',
  'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u', 'ỳ': 'y', 'ỵ': 'y', 'ỷ': 'y',
  'ỹ': 'y', 'đ': 'd',
};

var currency = {
  '€': 'euro', '₢': 'cruzeiro', '₣': 'french franc', '£': 'pound',
  '₤': 'lira', '₥': 'mill', '₦': 'naira', '₧': 'peseta', '₨': 'rupee',
  '₩': 'won', '₪': 'new shequel', '₫': 'dong', '₭': 'kip', '₮': 'tugrik',
  '₯': 'drachma', '₰': 'penny', '₱': 'peso', '₲': 'guarani', '₳': 'austral',
  '₴': 'hryvnia', '₵': 'cedi', '¢': 'cent', '¥': 'yen', '元': 'yuan',
  '円': 'yen', '﷼': 'rial', '₠': 'ecu', '¤': 'currency', '฿': 'baht',
  '$': 'dollar', '₹': 'indian rupee',
};

var charmap = assignFn(
  latin, latinSymbols,
  greek,
  turkish,
  romanian,
  russian,
  ukrainian,
  czech,
  slovak,
  polish,
  latvian,
  arabic,
  lithuanian,
  serbian,
  azerbaijani,
  georgian,
  vietnamese,
  currency
);

function transform$1 (text) {
  if (text === void 0) return ''

  var result = '';

  for (let i = 0; i < text.length; i++) {
    var char = text[i];
    result += charmap[char] !== void 0 ? charmap[char] : char;
  }

  return result
}

var src$1 = {
  transform: transform$1,
  charmap: charmap,
};

/**
 * node-slug
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */


var transform = src$1.transform;

/**
 * Slugify any given characters.
 *
 * @method slug
 *
 * @param {string|number}  text  Text to Slugify
 *
 * @return {string}
 */
function slug$1 (text) {
  if (text === void 0) return ''

  return lodash_kebabcase(transform(text.toString()))
}

var src = slug$1;

/**
 * Converts a string to URL friendly slug. If value is not a string, it will be
 * returned as it is.
 *
 * Also it will handle ascii charmaps and converts to their utf-8 counter parts.
 *
 * [source, text]
 * ----
 * I am > than you
 * ----
 *
 * will become
 *
 * [source, text]
 * ----
 * i-am-greater-than-you
 * ----
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   slug: 'slug'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   slug: [
 *     rule('slug')
 *   ]
 * }
 * ----
 */
var slug = (function (value) {
  if (typeof value !== 'string') {
    return value;
  }
  return src(value);
});

/**
 * Escapes HTML entities. Useful when you want to avoid XSS attacks.
 *
 * This method will only remove `&`, `"`, `'`, `<` and `>` characters. For advance escaping
 * make use of a 3rd party library like link:https://github.com/mathiasbynens/he[he].
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'escape'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('escape')
 *   ]
 * }
 * ----
 */
var _escape = (function (value) {
  if (typeof value !== 'string') {
    return value;
  }

  return value.replace(/&/g, '&amp;') // replace &
  .replace(/"/g, '&quot;') // replace "
  .replace(/'/g, '&#x27;') // replace '
  .replace(/</g, '&lt;') // replace <
  .replace(/>/g, '&gt;'); // replace >
});

var linksRegex = /<a\b[^>]*>(.*?)<\/a>/g;

/**
 * Strips `a` tags from a given string.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'strip_links'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('strip_links')
 *   ]
 * }
 * ----
 */
var stripLinks = (function (value) {
  if (typeof value !== 'string') {
    return value;
  }
  return value.replace(linksRegex, function (match, group) {
    return group.trim();
  });
});

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/



var sanitizations = Object.freeze({
	normalizeEmail: normalizeEmail,
	stripTags: stripTags,
	toBoolean: toBoolean,
	toNull: toNull,
	toInt: toInt,
	toDate: toDate,
	plural: plural,
	singular: singular,
	slug: slug,
	escape: _escape,
	stripLinks: stripLinks
});

/**
 *  Returns if the `input` is one of the affirmative keywords.
 *  Below is the list of keywords and are not case-sensitive
 *  except `A`.
 *
 *  - yes
 *  - true
 *  - y
 *  - ok
 *  - okay
 *  - A
 *
 *  @method affirmative
 *
 *  @param  {String}
 *
 *  @return {Boolean}
 */
var affirmative = (function (input) {
  if (input === 'A') {
    return true;
  }
  return ['yes', 'true', 'y', 'ok', 'okay'].indexOf(input.toLowerCase()) > -1;
});

var array$1 = (function (value) {
  return Array.isArray(value);
});

var creditCard = (function (input, options) {
  return isCreditCard(String(input), options);
});

var even = (function (input) {
  return Number(input) % 2 === 0;
});

var falsy = (function (input) {
  return !truthy(input);
});

var intersectAll = (function (input, intersectionArray) {
  if (!Array.isArray(input) || !Array.isArray(intersectionArray)) {
    return false;
  }
  return input.filter(function (n) {
    return intersectionArray.indexOf(n) > -1;
  }).length === input.length;
});

var intersectAny = (function (input, intersectionArray) {
  if (!Array.isArray(input) || !Array.isArray(intersectionArray)) {
    return false;
  }
  return input.filter(function (n) {
    return intersectionArray.indexOf(n) > -1;
  }).length > 0;
});

var isFunction = (function (input) {
  return typeof input === 'function';
});

var positive = (function (input) {
  return Number(input) >= 0;
});

var negative = (function (input) {
  return !positive(input);
});

var isNull = (function (input) {
  return input === null;
});

var odd = (function (input) {
  return !even(input);
});

var phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
var phone = (function (input) {
  return phoneRegex.test(input);
});

var regex$1 = (function (input, regex) {
  if (regex instanceof RegExp === false) {
    throw new Error('You must pass regex as the 2nd argument');
  }
  return regex.test(input);
});

var sameType = (function (input, comparsionInput) {
  return input === comparsionInput;
});

var sorted = (function (input) {
  if (!Array.isArray(input)) {
    return false;
  }

  var scaledDown = false;
  var i = 0;
  while (i < input.length) {
    var b = input[i++];
    var a = input[i - 2];
    if (a && a > b) {
      scaledDown = true;
      break;
    }
  }
  return !scaledDown;
});

var under$1 = (function (input, comparsionInput) {
  return !above$1(input, comparsionInput);
});

var isDate$2 = (function (input, strict) {
  var isDateInstance = input instanceof Date;
  if (!isDateInstance && !strict) {
    return new Date(input).toString() !== 'Invalid Date';
  }
  return isDateInstance;
});

/**
 * @category Day Helpers
 * @summary Is the given date today?
 *
 * @description
 * Is the given date today?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * var result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday (dirtyDate) {
  return start_of_day(dirtyDate).getTime() === start_of_day(new Date()).getTime()
}

var is_today = isToday;

/**
 * @category Day Helpers
 * @summary Is the given date yesterday?
 *
 * @description
 * Is the given date yesterday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is yesterday
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * var result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
function isYesterday (dirtyDate) {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return start_of_day(dirtyDate).getTime() === start_of_day(yesterday).getTime()
}

var is_yesterday = isYesterday;

/**
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * var result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow (dirtyDate) {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return start_of_day(dirtyDate).getTime() === start_of_day(tomorrow).getTime()
}

var is_tomorrow = isTomorrow;

/**
 * @category Common Helpers
 * @summary Is the given date in the past?
 *
 * @description
 * Is the given date in the past?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * var result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast (dirtyDate) {
  return parse_1(dirtyDate).getTime() < new Date().getTime()
}

var is_past = isPast;

/**
 * @category Common Helpers
 * @summary Is the given date in the future?
 *
 * @description
 * Is the given date in the future?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the future
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * var result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
function isFuture (dirtyDate) {
  return parse_1(dirtyDate).getTime() > new Date().getTime()
}

var is_future = isFuture;

/**
 * @category Range Helpers
 * @summary Is the given date within the range?
 *
 * @description
 * Is the given date within the range?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Date|String|Number} startDate - the start of range
 * @param {Date|String|Number} endDate - the end of range
 * @returns {Boolean} the date is within the range
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // For the date within the range:
 * isWithinRange(
 *   new Date(2014, 0, 3), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the range:
 * isWithinRange(
 *   new Date(2014, 0, 10), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> false
 */
function isWithinRange (dirtyDate, dirtyStartDate, dirtyEndDate) {
  var time = parse_1(dirtyDate).getTime();
  var startTime = parse_1(dirtyStartDate).getTime();
  var endTime = parse_1(dirtyEndDate).getTime();

  if (startTime > endTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return time >= startTime && time <= endTime
}

var is_within_range = isWithinRange;

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/



var raw = Object.freeze({
	above: above$1,
	affirmative: affirmative,
	alpha: alpha$1,
	alphaNumeric: alphaNumeric$1,
	array: array$1,
	between: between,
	boolean: boolean$1,
	creditCard: creditCard,
	date: date$1,
	email: email$1,
	empty: empty,
	even: even,
	existy: existy,
	falsy: falsy,
	inArray: inArray,
	intersectAll: intersectAll,
	intersectAny: intersectAny,
	ip: ip$1,
	ipv4: ipv4,
	ipv6: ipv6,
	isFunction: isFunction,
	json: json$1,
	negative: negative,
	isNull: isNull,
	isNumber: isNumber,
	isObject: isObject,
	odd: odd,
	phone: phone,
	positive: positive,
	regex: regex$1,
	same: same,
	sameType: sameType,
	sorted: sorted,
	isString: isString,
	truthy: truthy,
	under: under$1,
	url: url$1,
	isDate: isDate$2,
	today: is_today,
	yesterday: is_yesterday,
	tomorrow: is_tomorrow,
	past: is_past,
	future: is_future,
	inDateRange: is_within_range,
	afterOffsetOf: afterOffsetOf$1,
	beforeOffsetOf: beforeOffsetOf$1,
	dateFormat: dateFormat$1
});

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Indicative allows error formatters, which can format the
 * validation or core exceptions into a proper error object.
 *
 * You can add more formatters, but VanillaFormatter is
 * used when no custom formatter is used.
 *
 * @class VanillaFormatter
 *
 * @example
 * const formatter = new VanillaFormatter()
 *
 * // add error as -> error, field, validation
 * formatter.addError('error message', 'username', 'required')
 *
 * // get errors
 * formatter.toJSON()
 */

function VanillaFormatter() {
  this.errors = [];
}

/**
 * Stores the error to errors stack
 *
 * @method addError
 *
 * @param {Object} error
 * @param {String} field
 * @param {String} validation
 * @param {Array} args
 *
 * @return {void}
 */
VanillaFormatter.prototype.addError = function (error, field, validation, args) {
  var message = error;
  if (error instanceof Error) {
    validation = 'ENGINE_EXCEPTION';
    message = error.message;
  }
  this.errors.push({ message: message, field: field, validation: validation });
};

/**
 * Returns an array of errors
 *
 * @method toJSON
 *
 * @return {Array}
 */
VanillaFormatter.prototype.toJSON = function () {
  return this.errors;
};

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Returns all validation errors as per JSONAPI specs.
 *
 * @class JsonApiFormatter
 *
 * @example
 * const formatter = new JsonApiFormatter()
 *
 * // add error as -> error, field, validation
 * formatter.addError('error message', 'username', 'required')
 *
 * // get errors
 * formatter.toJSON()
 */

function JsonApiFormatter() {
  this.errors = [];
}

/**
 * Stores the error to errors stack
 *
 * @method addError
 *
 * @param {Object} error
 * @param {String} field
 * @param {String} validation
 * @param {Array} args
 *
 * @return {void}
 */
JsonApiFormatter.prototype.addError = function (error, field, validation, args) {
  var message = error;
  if (error instanceof Error) {
    validation = 'ENGINE_EXCEPTION';
    message = error.message;
  }

  this.errors.push({
    title: validation,
    detail: message,
    source: {
      pointer: field
    }
  });
};

/**
 * Returns error object with an array of
 * errors inside it.
 *
 * @method toJSON
 *
 * @return {Object}
 */
JsonApiFormatter.prototype.toJSON = function () {
  return {
    errors: this.errors
  };
};



var formatters$1 = Object.freeze({
	Vanilla: VanillaFormatter,
	JsonApi: JsonApiFormatter
});

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Since haye pipe expression cannot allow all the keywords, this
 * method helps in defining rules in a raw format.
 *
 * ## Note
 * When using `rule` method, you cannot make use of string expression
 * for that field. However, you can mix both for different fields.
 *
 * @param  {String}              name
 * @param  {Array|String|Number} args
 * @return {Object}
 *
 * @example
 * {
 *   username: [
 *    rule('required'),
 *    rule('alpha')
 *   ],
 *   email: 'email'
 * }
 */

function rule(name, args) {
  return { name: name, args: !args ? [] : Array.isArray(args) ? args : [args] };
}

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Override configuration values
 *
 * @method setConfig
 *
 * @param {Object}
 */
function setConfig(options) {
  Object.keys(options).forEach(function (option) {
    if (config[option] !== undefined) {
      config[option] = options[option];
    }
  });
}

/**
 * Copy config to `DEFAULTS` for reference.
 */
setConfig.DEFAULTS = Object.keys(config).reduce(function (result, key) {
  result[key] = config[key];
  return result;
}, {});

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Named exports are freezed and hence we need to create
 * a copy, so that it can be extended.
 */
var validationsCopy = Object.keys(validations).reduce(function (result, name) {
  result[name] = validations[name];
  return result;
}, {});

var sanitizationsCopy = Object.keys(sanitizations).reduce(function (result, name) {
  result[name] = sanitizations[name];
  return result;
}, {});

var index = {
  validate: function validate() {
    var _validator;

    return (_validator = validator(validationsCopy, config.FORMATTER || VanillaFormatter)).validate.apply(_validator, arguments);
  },
  validateAll: function validateAll() {
    var _validator2;

    return (_validator2 = validator(validationsCopy, config.FORMATTER || VanillaFormatter)).validateAll.apply(_validator2, arguments);
  },
  sanitize: function sanitize() {
    var _sanitizor;

    return (_sanitizor = sanitizor(sanitizationsCopy)).sanitize.apply(_sanitizor, arguments);
  },
  is: raw,
  sanitizor: sanitizationsCopy,
  validations: validationsCopy,
  rule: rule,
  formatters: formatters$1,
  configure: setConfig
};

module.exports = index;
