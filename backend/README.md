# Quiz Maker Backend

A RESTful API backend for an online quiz maker application built with Express.js and MongoDB.

## Features

- User authentication (register/login)
- Create, read, update, and delete quizzes
- Multiple choice questions with correct answers
- Quiz results tracking
- Public and private quizzes
- Time limits for quizzes
- Detailed quiz results and statistics

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quiz-maker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Quizzes
- GET `/api/quizzes` - Get all public quizzes
- GET `/api/quizzes/my-quizzes` - Get user's created quizzes
- POST `/api/quizzes` - Create a new quiz
- GET `/api/quizzes/:id` - Get a specific quiz
- PUT `/api/quizzes/:id` - Update a quiz
- DELETE `/api/quizzes/:id` - Delete a quiz
- POST `/api/quizzes/:id/submit` - Submit quiz answers

### Results
- GET `/api/results/my-results` - Get user's quiz results
- GET `/api/results/quiz/:quizId` - Get results for a specific quiz
- GET `/api/results/:id` - Get detailed result for a specific attempt

## Data Models

### User
- username (String)
- email (String)
- password (String, hashed)
- createdAt (Date)

### Quiz
- title (String)
- description (String)
- creator (ObjectId, ref: User)
- questions (Array of Question objects)
- timeLimit (Number, in minutes)
- isPublic (Boolean)
- createdAt (Date)

### QuizResult
- quiz (ObjectId, ref: Quiz)
- user (ObjectId, ref: User)
- answers (Array of Answer objects)
- score (Number)
- totalQuestions (Number)
- timeTaken (Number, in seconds)
- completedAt (Date)

## Security

- Passwords are hashed using bcrypt
- JWT authentication for protected routes
- Input validation and sanitization
- Proper error handling
- Rate limiting (to be implemented)

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "message": "Error message here"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 