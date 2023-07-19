# User Authentication and Management

This is a user authentication and management system built with Express.js, MongoDB, bcrypt, cookie-parser, jsonwebtoken, cors, and email-validator. It provides functionality for user signup, login, logout, and fetching user information.

## Features

- User signup with unique email and password
- Password hashing for security using bcrypt
- User login and JWT (JSON Web Token) generation for authentication
- Logout functionality with cookie management
- Fetching user information

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or a connection URL to a MongoDB server

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourname/jwt-authentication.git
cd user-authentication


Install Dependencies
npm install



Mongodb
PORT=3000
MONGODB_URI=mongodb://localhost:27017/my_database
SECRET_KEY=mysecretkey

START THE SERVER

NPM RUN DEV



User Signup
POST/SIGNUP

{
    "name":"Raj"
    "email": "Raj@example.com",
     "password": "secret123"
     "confirmPassword": "secret123"
}


User Login

POST/SIGNIN

{
    {
  "email": "Raj@example.com",
  "password": "secret123"
}

}