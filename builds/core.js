(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.indicative = global.indicative || {}, global.indicative.validator = factory());
}(this, (function () { 'use strict';

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
  field = field.replace(/\.\d/g, '.*');

  var message = messages[field + '.' + validation] || messages[validation] || '{{validation}} validation failed on {{ field }}';

  return typeof message === 'function' ? message(field, validation, args) : pope(message, { field: field, validation: validation, argument: args });
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
   * The default formatter to be used for formatting errors. Out of the box
   * `JSONApi` and `Vanilla` are supported.
   *
   * @type {String}
   */
  DEFAULT_FORMATTER: 'Vanilla'
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
      formatter.addError(error, field, name);
      reject(error);
      return;
    }

    var message = getMessage(messages, field, name, args);
    validations[name](data, field, message, args, prop).then(resolve).catch(function (error) {
      formatter.addError(error, field, name);
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
    var parsedFields = parseRules(fields);

    /**
     * A flat validations stack, each node is a lazy promise
     */
    var validationsStack = getValidationsStack(validations, parsedFields, data, messages, formatter);

    pSeries(validationsStack, bail).then(function (response) {
      var errors = formatter.toJSON();
      if (errors.length) {
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
 * @param    {Object} formatters
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
var validator = (function (validations, formatters) {
  var message = 'Cannot instantiate validator without';
  if (!validations) {
    throw new Error(message + ' validations');
  }

  if (!formatters) {
    throw new Error(message + ' formatters');
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
      formatter = new formatters[formatter || config.DEFAULT_FORMATTER]();
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
      formatter = new formatters[formatter || config.DEFAULT_FORMATTER]();
      return _validate(validations, false, data, fields, messages, formatter);
    }
  };
});

return validator;

})));
