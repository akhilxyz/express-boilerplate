export class JWTConfig {
    constructor(
        public readonly accessSecretKey: any,
        public readonly refreshSecretKey: any
    ) { }

    static create(): JWTConfig {
        return new JWTConfig(
            process.env.ACCESS_SECRET_KEY || 'your_jwt_secret',
            process.env.REFRESH_SECRET_KEY || 'your_refresh_jwt_secret'
        );
    }
}