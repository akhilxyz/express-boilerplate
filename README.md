# Node.js TypeScript Boilerplate

A highly scalable and maintainable Node.js boilerplate with TypeScript, following Domain-Driven Design (DDD) principles and clean architecture patterns.

## Features

- 🚀 **TypeScript** - Written in TypeScript for better developer experience
- 📦 **Modular Architecture** - DDD-inspired architecture for better code organization
- 🔐 **Authentication & Authorization** - JWT-based auth system with role-based access control
- 📝 **API Documentation** - Integrated Swagger for API documentation
- 🔄 **Database Migrations** - Database migration and seeding support
- 📊 **Caching** - Redis integration for caching
- 📩 **Queue System** - Bull queue integration for background jobs
- 🔍 **Logging** - Comprehensive logging system
- 🛡️ **Security** - Rate limiting and other security middleware
- ✅ **Testing** - Jest setup for unit and integration testing

## Project Structure

```
├── bootstrap/          # Application bootstrapping logic
├── config/            # Configuration files
├── core/              # Core domain logic and interfaces
│   ├── container/     # Dependency injection container
│   ├── decorators/    # TypeScript decorators
│   ├── domain/        # Domain entities and repositories
│   ├── exceptions/    # Custom exceptions
│   └── modules/       # Base module definitions
├── infrastructure/    # External services and adapters
│   ├── cache/         # Redis cache implementation
│   ├── database/      # Database connections and migrations
│   ├── queue/         # Queue system implementation
│   └── third-party/   # Third-party service integrations
├── modules/           # Feature modules
│   ├── auth/          # Authentication module
│   └── user/          # User management module
├── shared/            # Shared utilities and middleware
└── tests/             # Test files
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Redis (for caching)
- Docker (optional)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/akhilxyz/express-boilerplate
cd express-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Run database migrations:
```bash
npm run migration:run
```

5. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run migration:generate` - Generate database migrations
- `npm run migration:run` - Run database migrations
- `npm run seed` - Run database seeders
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## Authentication

The boilerplate uses JWT for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Error Handling

The application includes centralized error handling with custom exceptions:

- `HttpException` - Base class for HTTP errors
- `ValidationException` - For validation errors

## Middleware

- Authentication middleware
- Role-based authorization
- Request logging
- Rate limiting
- Validation middleware
- Error handling middleware

## Testing

The project includes a Jest setup for both unit and integration tests. Tests are located in the `tests/` directory.

To run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Bull](https://github.com/OptimalBits/bull)
- [Swagger](https://swagger.io/)