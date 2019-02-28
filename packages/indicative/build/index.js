"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = require("./src/Validator");
const validator = new Validator_1.Validator();
function validate(data, rules, messages, options) {
    return validator.validate(data, rules, messages || {}, options || {});
}
exports.validate = validate;
function validateAll(data, rules, messages, options) {
    return validator.validateAll(data, rules, messages || {}, options || {});
}
exports.validateAll = validateAll;
