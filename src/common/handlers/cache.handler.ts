type CacheEntry<T> = {
  value: T;
  expiresAt?: number;
};

export default class CacheManager<T> {
  private static globalCache: Map<string, CacheEntry<any>> = new Map();
  private cache: Map<string, CacheEntry<T>>;
  private ttl: number;
  private maxSize: number;

  constructor(
    options: {
      ttl?: number;
      maxSize?: number;
      scope?: 'local' | 'global';
    } = {}
  ) {
    this.ttl = options.ttl ?? 60000; 
    this.maxSize = options.maxSize ?? 100; 
    this.cache =
      options.scope === 'local'
        ? new Map<string, CacheEntry<T>>()
        : (CacheManager.globalCache as Map<string, CacheEntry<T>>);
  }

  set(key: string, value: T): void {
    const expiresAt = Date.now() + this.ttl;

    if (this.cache.size >= this.maxSize) {
      this.evict();
    }

    this.cache.set(key, { value, expiresAt });
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) return undefined;

    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private evict(): void {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
    }
  }

  size(): number {
    return this.cache.size;
  }
}
