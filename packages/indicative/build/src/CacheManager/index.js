"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheManager {
    constructor() {
        this._cache = {};
    }
    get(key) {
        return this._cache[key] || null;
    }
    set(key, value) {
        this._cache[key] = value;
    }
}
exports.CacheManager = CacheManager;
