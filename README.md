# Quiz Maker

A full-stack web application that allows users to create, manage, and take quizzes. Built using React for the frontend and Node.js with Express for the backend.

## 🧠 Features

- User registration and authentication
- Create, edit, and delete quizzes
- Add multiple questions and options per quiz
- Take quizzes and receive immediate results
- Responsive UI with intuitive navigation
- Backend RESTful API for all quiz-related operations

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5 & CSS3
- Axios (for API requests)
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (if applicable)
- JWT (for authentication)
- dotenv (for environment config)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (if used in backend)

### Installation

#### Clone the repository:
```bash
git clone https://github.com/jay091105/Quiz_maker.git
cd Quiz_maker
cd backend
npm install

cd ../frontend
npm install

PORT=5000
MONGO_URI=mongodb://localhost:27017/quizmaker
JWT_SECRET=your_secret_key

cd backend
npm run dev

cd ../frontend
npm start


---

Would you like me to generate a downloadable `.md` file or help you commit this to your repo directly?
