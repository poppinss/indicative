"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicative_rules_1 = require("indicative-rules");
const indicative_formatters_1 = require("indicative-formatters");
const indicative_compiler_1 = require("indicative-compiler");
const CacheManager_1 = require("../CacheManager");
class Validator {
    constructor() {
        this._cacheManager = new CacheManager_1.CacheManager();
    }
    _getRunner(rules, messages, options) {
        if (!options.cacheKey) {
            return indicative_compiler_1.validationCompiler(rules, indicative_rules_1.validations, messages);
        }
        let runner = this._cacheManager.get(options.cacheKey);
        if (!runner) {
            runner = indicative_compiler_1.validationCompiler(rules, indicative_rules_1.validations, messages);
        }
        this._cacheManager.set(options.cacheKey, runner);
        return runner;
    }
    async validate(data, rules, messages, options) {
        options = Object.assign({}, options);
        const runner = this._getRunner(rules, messages, options);
        return runner(data, new indicative_formatters_1.VanillaFormatter(), options, true);
    }
    async validateAll(data, rules, messages, options) {
        options = Object.assign({}, options);
        const runner = this._getRunner(rules, messages, options);
        return runner(data, new indicative_formatters_1.VanillaFormatter(), options, false);
    }
}
exports.Validator = Validator;
