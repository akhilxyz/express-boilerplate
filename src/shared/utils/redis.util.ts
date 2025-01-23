import Redis from 'ioredis';

export class RedisUtil {
    private static client = new Redis(); // Configure your Redis connection

    static async set(key: string, value: string, ttl: number): Promise<void> {
        await this.client.setex(key, ttl, value);  // Set key with TTL
    }

    static async get(key: string): Promise<string | null> {
        return await this.client.get(key);  // Retrieve the key
    }
    
}
