

export class ServerConfig {
    constructor(
        public readonly BASE_URL: any,
        public readonly PORT: any,
        public readonly CORS_ORIGIN: any,
        public readonly HOST_URL: any
    ) { }

    static create(): ServerConfig {
        return new ServerConfig(
            process.env.BASE_URL || '/api/v1',
            process.env.PORT || 3000,
            process.env.CORS_ORIGIN || '*',
            process.env.HOST_URL || 'http://localhost'
        );
    }
}


