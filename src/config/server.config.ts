export class ServerConfig {
    constructor(
        public readonly BASE_URL: any,
        public readonly PORT: any,
        public readonly CORS_ORIGIN: any,
        public readonly HOST_URL: any,
        public readonly corsOrigin: string,
        public readonly rateLimitMax: number,
        public readonly rateLimitWindowMs: number,
        public readonly expressSession: any
    ) { }

    static create(): ServerConfig {
        return new ServerConfig(
            process.env.BASE_URL || '/api/v1',
            process.env.PORT || 3000,
            process.env.CORS_ORIGIN || '*',
            process.env.HOST_URL || 'http://localhost',
            process.env.CORS_ORIGIN || '*',
            Number(process.env.RATE_LIMIT_MAX) || 100,
            Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
            {
                secret: process.env.EXPRESS_SESSION_KEY || 'your_session_key', // Change this secret to something secure
                resave: false,
                saveUninitialized: true,
            }
        );
    }
}


