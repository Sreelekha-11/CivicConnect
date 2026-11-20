# CivicConnect – Citizen Complaint Management System

CivicConnect is a web application that helps citizens report public issues, track complaints, and monitor their resolution.

## Features
- User registration and login
- Submit complaints with images and location details
- Track complaint status
- Admin dashboard to manage complaints and users
- Assign complaints to staff members
- Staff dashboard to manage assigned complaints
- Update complaint progress and status
- Add resolution remarks and images

## Workflow
1. Citizens register and log in.
2. Citizens submit complaints with relevant details and images.
3. Admin reviews complaints and assigns them to staff.
4. Staff updates complaint progress and status.
5. Citizens track their complaint status.
6. Staff adds resolution details and marks complaints as resolved.

## Technologies Used
- React.js
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Project Structure
- `src/` – Frontend source code
- `public/` – Static assets
- `backend/` – Backend API and server files

## Installation and Setup

### Clone the repository
```bash
git clone https://github.com/Sreelekha-11/Civic-Connect.git
cd Civic-Connect
```

### Install frontend dependencies
```bash
npm install
```

### Install backend dependencies
```bash
cd backend
npm install
```

### Environment Variables
Create a `.env` file inside the backend folder and configure the required MongoDB connection string, JWT secret, and port.

### Run the application

Start the backend:
```bash
npm run dev
```

Start the frontend in a separate terminal from the root folder:
```bash
npm run dev
```

## Project Objective
To make public complaint reporting and resolution tracking easier, more transparent, and accessible to citizens.
