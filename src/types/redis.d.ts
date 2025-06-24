declare module 'redis' {
  interface RedisClientOptions {
    url?: string;
  }

  interface SetOptions {
    EX?: number;
  }

  interface RedisClientType {
    connect(): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, options?: SetOptions): Promise<void>;
    on(event: string, listener: (...args: any[]) => void): void;
  }

  function createClient(options?: RedisClientOptions): RedisClientType;

  export { createClient, RedisClientType };
}
