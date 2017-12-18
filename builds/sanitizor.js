(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.indicative = global.indicative || {}, global.indicative.sanitizor = factory());
}(this, (function () { 'use strict';

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

function isObj$1(r){return null!==r&&"object"==typeof r}function prop(r,e){if(!isObj$1(r)||"string"!=typeof e)return r;for(var n=e.split("."),i=0;i<n.length;i++){var o=n[i];if(null===(r=r.hasOwnProperty(o)?r[o]:null))break}return r}

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

var snakeToCamelCase = (function (str) {
  return str.replace(/_(\w)/g, function (match, group) {
    return group.toUpperCase();
  });
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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
 * Returns a boolean on whether param is an
 * object or not.
 *
 * @method isObj
 *
 * @param  {Mixed} obj
 *
 * @return {Boolean}
 */
function isObj(obj) {
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
  if (!isObj(obj) || typeof itemPath !== 'string') {
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
    } else if (!isObj(obj[item])) {
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

return sanitizor;

})));
