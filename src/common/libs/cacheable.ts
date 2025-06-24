import { Request } from 'express';
import redisClient from '@config/redis';

interface CacheOptions {
  ttl?: number;
  keyPrefix?: string;
  idParam?: string;
}

export function Cacheable(options: CacheOptions = {}) {
  const { ttl = 60, keyPrefix = '', idParam } = options;
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      let key = keyPrefix || propertyKey;

      if (idParam && req.params && req.params[idParam]) {
        key += `:${req.params[idParam]}`;
      } else if (req.query && Object.keys(req.query).length > 0) {
        key += `:${JSON.stringify(req.query)}`;
      }

      const cached = await redisClient.get(key);
      if (cached) {
        return JSON.parse(cached);
      }

      const result = await originalMethod.apply(this, args);
      await redisClient.set(key, JSON.stringify(result), { EX: ttl });
      return result;
    };

    return descriptor;
  };
}
