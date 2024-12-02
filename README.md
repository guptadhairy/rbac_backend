# Role-Based Access Control (RBAC) System

A secure authentication and authorization system built with the MERN stack that implements Role-Based Access Control.

## Features

- User authentication (Register/Login)
- Role-based authorization (Admin, Moderator, User)
- Protected routes based on user roles
- JWT-based authentication
- Rate limiting for security
- Password hashing
- Input validation

## Tech Stack

- MongoDB (Database)
- Express.js (Backend Framework)
- Node.js (Runtime Environment)
- JWT (Authentication)
- bcrypt (Password Hashing)

## Prerequisites

Before running this project, make sure you have:

- Node.js installed (v14+ recommended)
- MongoDB installed locally or a MongoDB Atlas account
- npm or yarn package manager

## Installation & Setup

1. Clone the repository
bash
git clone <repository-url>
cd rbac-system

2. Install dependencies
npm install

3. Set up environment variables
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
PORT=3000

4. Start the server
node server.js or nodemon server.js




## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### User Routes
- `GET /api/users/profile` - Get user profile (All authenticated users)
- `GET /api/users/admin/users` - Get all users (Admin only)
- `GET /api/users/admin/system-overview` - Get system overview (Admin only)

## Test Users

Use these credentials to test different role-based functionalities:

1. Admin User
json
{
"email": "admin@test.com",
"password": "Admin@123",
"username": "adminuser",
"role": "admin"
}

2. Moderator User
json
{
"email": "mod@test.com",
"password": "Mod@123",
"username": "moduser",
"role": "moderator"
}



3. Regular User
json
{
"email": "user@test.com",
"password": "User@123",
"username": "regularuser",
"role": "user"
}


## Testing with Postman

1. Register a User
http
POST http://localhost:3000/api/auth/register
Content-Type: application/json
{
"username": "testuser",
"email": "test@example.com",
"password": "Test@123",
"role": "user"
}

2. Login
http
POST http://localhost:3000/api/auth/login
Content-Type: application/json
{
"email": "test@example.com",
"password": "Test@123"
}

3. Access Protected Routes
http
GET http://localhost:3000/api/users/profile
Authorization: Bearer <your-token>


