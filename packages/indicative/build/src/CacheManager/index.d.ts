export declare class CacheManager<CacheValue extends any> {
    private _cache;
    get(key: string): CacheValue | null;
    set(key: string, value: CacheValue): void;
}
