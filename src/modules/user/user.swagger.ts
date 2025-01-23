export const userSwagger = {
    '/users/register': {
        post: {
            tags: ['Users'],
            summary: 'Register a new user',
            description: 'Endpoint to register a new user.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    example: 'admin@gmail.com',
                                },
                                password: {
                                    type: 'string',
                                    example: 'admin@123',
                                },
                                otp: {
                                    type: 'integer',
                                    example: 123456,
                                },
                            },
                            required: ['email', 'password', 'otp'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'User registered successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'User registered successfully',
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example: 'Invalid input data',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    }
}