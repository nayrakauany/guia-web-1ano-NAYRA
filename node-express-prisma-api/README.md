# Node Express Prisma API

This project is a RESTful API built with Node.js, Express, and Prisma. It provides a structured way to manage users and authentication, following best practices for security, error handling, and testing.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Features

- User authentication (login, register)
- User management (CRUD operations)
- Middleware for security and error handling
- Unit and integration tests
- Docker support for easy deployment

## Technologies

- Node.js
- Express
- Prisma
- TypeScript
- Jest (for testing)
- Docker

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/node-express-prisma-api.git
   cd node-express-prisma-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Run database migrations:
   ```
   npm run migrate
   ```

5. Seed the database (optional):
   ```
   npm run seed
   ```

## Usage

To start the server, run:
```
npm run start
```

The server will be running on `http://localhost:3000`.

## API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login an existing user

- **User Management**
  - `GET /api/users` - Get all users
  - `GET /api/users/:id` - Get a user by ID
  - `PUT /api/users/:id` - Update a user by ID
  - `DELETE /api/users/:id` - Delete a user by ID

## Testing

To run the tests, use:
```
npm run test
```

This will execute both unit and integration tests.

## Deployment

This project can be deployed using Docker. Follow these steps:

1. Build the Docker image:
   ```
   docker build -t node-express-prisma-api .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 --env-file .env node-express-prisma-api
   ```

For more advanced deployment options, refer to the `docker/docker-compose.yml` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.