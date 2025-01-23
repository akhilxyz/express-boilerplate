import { ServerConfig } from '@/config';
import rateLimit from 'express-rate-limit';

export class RateLimitMiddleware {
    private config: ServerConfig;

    constructor() {
        this.config = ServerConfig.create();
    }

    create() {
        return rateLimit({
            windowMs: this.config.rateLimitWindowMs,
            max: this.config.rateLimitMax,
        });
    }
}