"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("japa");
const Validator_1 = require("../src/Validator");
test.group('Validator', () => {
    test('run validations on data with defined rules', async (assert) => {
        assert.plan(1);
        const validator = new Validator_1.Validator();
        const data = {};
        const rules = {
            username: 'required',
        };
        try {
            await validator.validate(data, rules, {});
        }
        catch (errors) {
            assert.deepEqual(errors, [{
                    error: 'required validation failed on username',
                    field: 'username',
                    validation: 'required',
                }]);
        }
    });
    test('cache schema using cacheKey', async (assert) => {
        assert.plan(2);
        const validator = new Validator_1.Validator();
        const data = {};
        const rules = {
            username: 'required',
        };
        try {
            await validator.validate(data, rules, {}, { cacheKey: 'foo' });
        }
        catch (errors) {
            assert.deepEqual(errors, [{
                    error: 'required validation failed on username',
                    field: 'username',
                    validation: 'required',
                }]);
        }
        const newRules = {
            age: 'required',
        };
        try {
            await validator.validate(data, newRules, {}, { cacheKey: 'foo' });
        }
        catch (errors) {
            assert.deepEqual(errors, [{
                    error: 'required validation failed on username',
                    field: 'username',
                    validation: 'required',
                }]);
        }
    });
});
test.group('casts | number', () => {
    test('cast value to number when number rule is used', async (assert) => {
        assert.plan(1);
        const validator = new Validator_1.Validator();
        const data = {
            age: '20',
        };
        const rules = {
            age: 'number',
        };
        await validator.validate(data, rules, {});
        assert.deepEqual(data, { age: 20 });
    });
    test('cast value to number inside a nested object', async (assert) => {
        assert.plan(1);
        const validator = new Validator_1.Validator();
        const data = {
            profile: {
                age: '20',
            },
        };
        const rules = {
            'profile.age': 'number',
        };
        await validator.validate(data, rules, {});
        assert.deepEqual(data, { profile: { age: 20 } });
    });
    test('cast value to number inside a nested object', async (assert) => {
        assert.plan(1);
        const validator = new Validator_1.Validator();
        const data = {
            profile: {
                age: '20',
            },
        };
        const rules = {
            'profile.age': 'number',
        };
        await validator.validate(data, rules, {});
        assert.deepEqual(data, { profile: { age: 20 } });
    });
    test('cast value to number inside an array', async (assert) => {
        assert.plan(1);
        const validator = new Validator_1.Validator();
        const data = {
            codes: ['20'],
        };
        const rules = {
            'codes.*': 'number',
        };
        await validator.validate(data, rules, {});
        assert.deepEqual(data, { codes: [20] });
    });
});
