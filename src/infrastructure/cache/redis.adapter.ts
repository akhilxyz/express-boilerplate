import { createClient } from 'redis';

class RedisAdapter {
  private client;

  constructor() {
    this.client = createClient();
    this.client.on('error', (err :any) => console.error('Redis Client Error', err));
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async set(key: string, value: string, expirationInSeconds?: number): Promise<void> {
    if (expirationInSeconds) {
      await this.client.set(key, value, {
        EX: expirationInSeconds,
      });
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async disconnect(): Promise<void> {
    await this.client.disconnect();
  }
}

export const redisAdapter = new RedisAdapter();
