# Node Authentication API

[![Node.js](https://img.shields.io/badge/node-v18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-v4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/mongodb-v6.x-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

---

## About

This is a RESTful API for user authentication built with Node.js, Express, and MongoDB. It supports user registration, login with JWT token authentication, password hashing with bcrypt, and protected routes.

---

## Features

- User registration with validation
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected routes middleware
- Clean MVC architecture (Models, Controllers, Routes)
- Error handling and validation feedback

---

## Technologies

- Node.js
- Express.js
- MongoDB (via Mongoose)
- bcrypt
- JSON Web Tokens (JWT)
- dotenv for environment variables
- Joi (optional) for request validation

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   DB_USER=your_mongo_user
   DB_PASS=your_mongo_password
   SECRET=your_jwt_secret_key
   ```

4. Start the development server:

   ```bash
   npm start
   ```

---

## Environment Variables

| Variable   | Description                     | Example                  |
|------------|--------------------------------|--------------------------|
| `PORT`     | Port where the server runs      | `3000`                   |
| `DB_USER`  | MongoDB username                | `myUser`                 |
| `DB_PASS`  | MongoDB password                | `myPassword123`          |
| `SECRET`   | Secret key for JWT signing      | `supersecretkey`         |

---

## Usage

The API listens on `http://localhost:3000` (or your configured PORT).

You can use tools like Postman or cURL to test the endpoints.

---

## API Endpoints

### Public Routes

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | `/`               | API welcome message        |
| POST   | `/auth/register`  | User registration          |
| POST   | `/auth/login`     | User login, returns JWT    |

### Protected Routes

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | `/user/:id`       | Get user info (without password) |

> **Note:** Protected routes require the `Authorization` header with a valid JWT token:  
> `Authorization: Bearer <token>`

---

## Authentication Flow

1. User registers with name, email, password, and confirm password.
2. Password is hashed securely with bcrypt before saving.
3. User logs in with email and password.
4. Server verifies credentials and issues a JWT token.
5. Client includes the JWT token in `Authorization` headers for protected routes.
6. Server verifies the token and grants access accordingly.

---

## Error Handling

The API returns appropriate HTTP status codes and JSON messages for:

- Validation errors (422 Unprocessable Entity)
- Authentication failures (401 Unauthorized)
- Resource not found (404 Not Found)
- Server errors (500 Internal Server Error)

Example error response:

```json
{
  "msg": "User not found"
}
```

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

Steps to contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

