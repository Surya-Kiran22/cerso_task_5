# Food Ordering System

A full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Responsive and user-friendly frontend** (React + React Bootstrap)
- **User registration/login** (JWT + bcrypt for authentication)
- **Dashboard** for users to manage foods (CRUD operations)
- **Backend REST API** (Express + MongoDB)
- **Search/filter functionality** on the Home page to easily find foods
- **Form validation** in both frontend and backend
- **Meaningful specific feature:** Real-time search filter and Admin dashboard to manage food items

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `backend` folder and add:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/food-order
   JWT_SECRET=supersecretkey
   ```
4. Start the backend server: `npm start`

### 2. Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the frontend app: `npm run dev`

### 3. Usage
- Go to `http://localhost:5173/` to view the app.
- Register an account, log in, and view the dashboard to add, edit, or delete food items.
- View the home page to search and filter foods.
