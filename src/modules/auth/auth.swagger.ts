export const authSwagger = {
    '/auth/request-otp': {
        post: {
            tags: ['Auth'],
            summary: 'Request OTP',
            description: 'Endpoint to request an OTP.',
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
                                    example: 'akhil@gmail.com',
                                },
                                type: {
                                    type: 'string',
                                    example: 'password-reset-otp',
                                },
                            },
                            required: ['email'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'OTP sent successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'OTP sent successfully',
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
    },
    '/auth/reset-password': {
        post: {
            tags: ['Auth'],
            summary: 'Reset Password',
            description: 'Endpoint to reset password.',
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
                                otp: {
                                    type: 'integer',
                                    example: 686781,
                                },
                                password: {
                                    type: 'string',
                                    example: 'akhil@123',
                                },
                            },
                            required: ['email', 'otp', 'password'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Password reset successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Password reset successfully',
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
                                        example: 'Invalid OTP or input data',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/auth/sign-in': {
        post: {
            tags: ['Auth'],
            summary: 'Sign In',
            description: 'Endpoint to sign in a user.',
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
                                    example: 'akhil@123',
                                },
                            },
                            required: ['email', 'password'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'User signed in successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'User signed in successfully',
                                    },
                                    token: {
                                        type: 'string',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                    },
                                },
                            },
                        },
                    },
                },
                '401': {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example: 'Invalid credentials',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
}
