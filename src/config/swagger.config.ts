import { OpenAPIV3 } from 'openapi-types';

const swaggerDoc = {
    openapi: '3.0.1',
    info: {
        title: 'Lendary Asia API',
        description: 'API documentation for Lendary Asia',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Local Development Server',
        },
    ],
    paths: {

    }
}

export class SwaggerConfig {
    constructor(
        public readonly SwaggerDoc: OpenAPIV3.Document,
        public readonly username: string,
        public readonly password: string

    ) { }

    static create(): SwaggerConfig {
        return new SwaggerConfig(
            swaggerDoc,
            process.env.SWAGGER_USERNAME || 'your_username',
            process.env.SWAGGER_PASSWORD || 'your_password',
        );
    }
}
