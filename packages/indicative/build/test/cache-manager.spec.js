"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("japa");
const CacheManager_1 = require("../src/CacheManager");
test.group('CacheManager', () => {
    test('get/set value from cache', (assert) => {
        const cache = new CacheManager_1.CacheManager();
        cache.set('foo', 'hello');
        assert.equal(cache.get('foo'), 'hello');
    });
});
