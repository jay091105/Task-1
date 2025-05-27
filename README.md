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

- **🔐 Sign In Page**  
  ![Sign In Page](https://raw.githubusercontent.com/jay091105/codsoft_task-2/main/assets/SignIn.png)

- **📝 Sign Up Page**  
  ![Sign Up Page](https://raw.githubusercontent.com/jay091105/codsoft_task-2/main/assets/SignUp.png)

- **🌐 Landing Page**  
  ![Landing Page](https://raw.githubusercontent.com/jay091105/codsoft_task-2/main/assets/LandingPage.png)

- **🏠 Home Page**  
  ![Home Page](https://raw.githubusercontent.com/jay091105/codsoft_task-2/main/assets/Home.png)

- **❓ Quiz Page**  
  ![Quiz Page](https://raw.githubusercontent.com/jay091105/codsoft_task-2/main/assets/Quiz1.png)
  ![Quiz Page](https://raw.githubusercontent.com/jay091105/codsoft_task-2/main/assets/Quiz2.png)

- **📋 Quizzes List**  
  ![Quizzes List](https://raw.githubusercontent.com/jay091105/codsoft_task-2/main/assets/Quiz_List.png)

- **👤 Profile Page**  
  ![Profile Page](https://raw.githubusercontent.com/jay091105/codsoft_task-2/main/assets/Profile.png)

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

📄 License
This project is licensed under the MIT License.

