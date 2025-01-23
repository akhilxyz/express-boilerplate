export class SendGridConfig {
    constructor(
        public readonly email: any,
        public readonly apiKey: string
    ) { }

    static create(): SendGridConfig {
        return new SendGridConfig(
            process.env.SENDGRID_API_KEY || 'xxxxxxxxxx',
            process.env.SENDGRID_FROM_EMAIL || 'email@example.com',
        );
    }
}  
