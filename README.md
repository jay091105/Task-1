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

## Frontend Preview

- **Sign In Page**  
  ![Sign In Page](https://user-images.githubusercontent.com/6304bfa3-84bc-448a-b51c-f5bc2e969d54)

- **Sign Up Page**  
  ![Sign Up Page](https://user-images.githubusercontent.com/123456789/def456ghi78.png)

- **Home Page**  
  ![Home Page](https://user-images.githubusercontent.com/123456789/homepage.png)

- **Quiz Page**  
  ![Quiz Page](https://user-images.githubusercontent.com/123456789/quizpage.png)

- **Quizzes List**  
  ![Quizzes List](https://user-images.githubusercontent.com/123456789/quizzeslist.png)


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
