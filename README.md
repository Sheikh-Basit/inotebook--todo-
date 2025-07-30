# MERN Stack Project

A full-stack web application built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. This project demonstrates clean code structure, scalable API development, and responsive frontend UI using Tailwind CSS and React Router.

---

## 📁 Folder Structure

iNotebook/
├── backend/ # Backend server using Node.js & Express
├── frontend/ # Frontend built with React.js + Vite
└── .env # Environment variables for backend


---

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Campus
- **Dev Tools**: Nodemon, Concurrently, ESLint

---

## ⚙️ Installation & Setup

### Step 1: Clone the repository

git clone :
https://github.com/Sheikh-Basit/inotebook--todo-.git
cd inotebook

### Step 2: Setup Backend

cd backend
npm install

### .env file
Create .env file inside backend folder

PORT=your_port
MONGO_URI=your_mongodb_connection_string

### Step 3: Setup Frontend

cd ../frontend
npm install

### Step 4: Start the App
To run both frontend and backend together:

Make sure you are in the root (iNotebook) directory and have concurrently installed.
npm install concurrently
npm run start

📝 Available Commands
In the root (inotebook/package.json)

"scripts": {
  "dev": "vite",
  "server": "nodemon backend/index.js",
  "start": "concurrently \"npm run dev --prefix frontend\" \"npm run server\""
}







