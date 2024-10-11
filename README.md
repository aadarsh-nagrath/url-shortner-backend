# URL Shortener API

A URL shortening service where users can create shortened URLs for long URLs, manage their accounts with sign-up, login, and OTP-based password recovery, and use caching for optimized database calls.

## Features

- **User Authentication**: Sign-up, login, and OTP-based password recovery.
- **URL Shortening**: Create short URLs from long URLs and retrieve the original URL using the shortened one.
- **Caching**: Reduce database calls by using caching for URL shortening and redirection.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **bcrypt** for password hashing
- **JWT (JSON Web Tokens)** for authentication
- **Nodemailer** for OTP-based email verification
- **Shortid** for generating unique URL codes
- **Redis** for caching (will be implemented soonI)

## Setup Instructions

### Prerequisites

- **Node.js** installed (v14+)
- **MongoDB** installed locally or use a MongoDB cloud provider (like MongoDB Atlas)
- **Redis** installed (ongoing)
- A working **email service** (e.g., Gmail) for sending OTPs using Nodemailer

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aadarsh-nagrath/capex-assignment.git
   cd capex-assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory take reference fromn .env.example:

   ```bash
   touch .env
   ```

4. Add the following environment variables in the `.env` file:

   ```bash
    MONGO_URI=mongodb+srv://username:pass@capex.fbfd8.mongodb.net/?retryWrites=true&w=majority&appName=Capex
    JWT_SECRET=jwt_key
    BASE_URL=http://localhost:5000
    EMAIL=email
    EMAIL_PASSWORD=pass
    PORT=5000
   ```


5. Run the application:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`.

   ![image](https://github.com/user-attachments/assets/211421ce-8f13-4380-963e-183dd0dff5c6)


### Folder Structure

```bash
/capex-assignment
  ├── /config
  │    └── db.js                
  ├── /controllers
  │    ├── authController.js     
  │    └── urlController.js      
  ├── /middleware
  │    └── authMiddleware.js    
  ├── /models
  │    ├── User.js              
  │    └── Url.js                
  ├── /routes
  │    ├── authRoutes.js        
  │    └── urlRoutes.js          
  ├── /utils
  │    └── sendEmail.js         
  ├── .env                      
  ├── server.js                  
  ├── package.json               
```

## API Endpoints

### Authentication

Get a temporary email from [temp email](https://temp-mail.org/en/view/66faae0c418827001935386e) 

#### POST `/api/signup`

- **Description**: Creates a new user.
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "P@ssw0rd"
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "token": "jwt_token_here"
  }
  ```
  ![image](https://github.com/user-attachments/assets/825fafce-a6a8-464a-94f8-73259b94a194)


#### POST `/api/signin`

- **Description**: Logs in a user and returns a JWT token.
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "P@ssw0rd"
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "token": "jwt_token_here"
  }
  ```
  ![image](https://github.com/user-attachments/assets/6ad6c399-8f6b-4281-9009-114d89e93d2b)


#### POST `/api/forgetPassword`

- **Description**: Sends an OTP to the user's email for password recovery.
- **Request Body**:

  ```json
  {
    "email": "user@example.com"
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "message": "OTP sent to email"
  }
  ```
![image](https://github.com/user-attachments/assets/65696d58-f7d8-4fbe-9f27-d01157d6eeb7)
![image](https://github.com/user-attachments/assets/219bf1d6-be1d-4bdd-bc3a-54c77cf8adb2)


### URL Shortening

NOTE - In post man in Authorisation choose Bearer Token and add the token generated in response of sign in post request,copy-paste that token in shorten post request authorization. Once done request will generate shorten url.

#### POST `/url/shorten`

- **Description**: Shortens a long URL.
- **Request Header**: Authorization: Bearer `jwt_token`
- **Request Body**:

  ```json
  {
    "longUrl": "http://example.com/very/long/url"
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "data": {
      "longUrl": "http://example.com/very/long/url",
      "shortUrl": "http://localhost:5000/xyz123",
    }
  }
  ```
  ![image](https://github.com/user-attachments/assets/086debb1-f507-4587-b44e-18227524cd31)

****

#### GET `/:urlCode`

- **Description**: Redirects to the original URL corresponding to the shortened URL code.
- **Request Parameter**: `urlCode` - Shortened URL code
- **Response**: Redirects to the original URL (302 Redirect)


## Future Enhancements

- Implement rate-limiting to avoid abuse of the service.
- Add analytics to track how often a short URL is accessed.
- Implement custom short URLs.
- Add frontend for user interaction.

## License

This project is licensed under the MIT License.

