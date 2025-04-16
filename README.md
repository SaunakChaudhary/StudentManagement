# Student Management System

## Description
This is a student management system built with modern technologies to help educational institutions manage student data efficiently.

## Technologies Used
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file and add:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. Start server:
```bash
nodemon server.js
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

## API Endpoints

### Students
- GET `/api/students` - Get all students
- POST `/api/students` - Create new student
- PUT `/api/students/:id` - Update student
- DELETE `/api/students/:id` - Delete student

## Environment Variables
Make sure to set up the following environment variables:
- `PORT` - Backend server port
- `MONGODB_URI` - MongoDB connection string
