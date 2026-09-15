# AI Job Tracker

Production-style MERN + AI job application tracking platform.

## Overview

AI Job Tracker helps users manage job applications and provides
AI-powered job and CV analysis.

### Features

-   User registration and login
-   JWT authentication
-   Protected routes
-   Job CRUD
-   Dashboard statistics
-   Job Status Pie Chart
-   Applications Over Time Line Chart
-   Recent Jobs (latest 4)
-   AI Job Analyzer
-   AI CV Analyzer
-   REST APIs
-   MongoDB
-   Responsive React UI

## Tech Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   DaisyUI
-   Axios
-   React Router
-   Context API
-   Recharts
-   Lucide React

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   bcrypt
-   CORS
-   dotenv
-   Multer

### AI

-   OpenRouter
-   OpenAI package
-   `openrouter/free`

### Tools

-   Postman / Thunder Client
-   Git / GitHub
-   Render
-   Netlify
-   MongoDB Atlas

## Project Structure

``` text
AI-Job-Tracker/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── ai.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── jobController.js
│   │   │   ├── aiController.js
│   │   │   └── cvController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── Job.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── jobRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── aiRoutes.js
│   │   │   └── cvRoutes.js
│   │   └── index.js
│   ├── .env
│   └── .gitignore
│
└── README.md
```

## Environment Variables

Backend `.env`:

``` env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-job-tracker
JWT_SECRET_KEY=your-secret
OPENROUTER_API_KEY=your-openrouter-key
```

Never commit `.env` to GitHub.

## Database

MongoDB is used through Mongoose.

Local database:

``` text
mongodb://localhost:27017/ai-job-tracker
```

Production is planned with MongoDB Atlas.

## User Model

Fields: - name - email - password

Email is unique. Passwords are hashed with bcrypt.

## Job Model

Fields: - company - position - location - status - applicationDate -
jobUrl - notes - user

Status values:

``` text
Applied
Interview
Offer
Rejected
```

The `user` field references the authenticated user.

## Authentication

Authentication uses JWT, bcrypt, and protected Express middleware.

### Auth APIs

``` text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/protected
```

Flow:

``` text
Register → bcrypt hash → MongoDB
Login → JWT → frontend
Frontend → Bearer token → backend middleware
```

## Job APIs

``` text
POST   /api/jobs
GET    /api/jobs
GET    /api/jobs/:id
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

Job routes are protected and use the authenticated user's ID.

## Frontend Routes

``` text
/login
/signup
/dashboard
/jobs
/jobs/add
/jobs/:id
/jobs/:id/edit
/ai-analyzer
```

Protected pages redirect to login when no token exists.

## Dashboard

Current Dashboard includes:

-   Welcome user section
-   Total Jobs
-   Applied
-   Interviews
-   Job Status Pie Chart
-   Applications Over Time Line Chart
-   Recent Jobs

### Job Status Chart

`JobStatusChart.jsx` uses Recharts to show:

``` text
Applied
Interview
Offer
Rejected
```

### Applications Over Time

`ApplicationTrendChart.jsx` uses `applicationDate` to group and display
application counts over time.

### Recent Jobs

The Recent Jobs section displays the latest 4 applications, using the
application date to determine recency.

## AI Job Analyzer

API:

``` text
POST /api/ai/analyze-job
```

Input:

``` json
{
  "jobTitle": "Frontend Developer",
  "jobDescription": "Job description...",
  "skills": "React, JavaScript, HTML, CSS"
}
```

Result structure:

``` json
{
  "matchScore": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "analysis": "",
  "recommendation": ""
}
```

Features: - Match score - Matching skills - Missing skills - Analysis -
Recommendation

The AI key remains on the backend.

## AI CV Analyzer

The CV Analyzer is complete.

Frontend:

``` text
frontend/src/pages/CVAnalyzer.jsx
```

Backend:

``` text
backend/src/routes/cvRoutes.js
backend/src/controllers/cvController.js
```

API:

``` text
POST /api/cv/analyze
```

The frontend sends a PDF through multipart/form-data using the field:

``` text
cv
```

Flow:

``` text
PDF
↓
React FormData
↓
Multer
↓
PDF text extraction
↓
OpenRouter AI
↓
JSON result
↓
React UI
```

Result:

``` json
{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "summary": ""
}
```

The analyzer detects the dominant CV language and returns the analysis
in that language.

## AI Configuration

OpenRouter is accessed through the OpenAI package.

Base URL:

``` text
https://openrouter.ai/api/v1
```

Model:

``` text
openrouter/free
```

API key:

``` env
OPENROUTER_API_KEY=...
```

## Security Plan

Security hardening is the next phase.

Checklist:

-   `.env` protected by `.gitignore`
-   Secrets kept out of source code
-   Job ownership authorization
-   Protected AI and CV routes
-   Backend input validation
-   PDF-only CV validation
-   CV file-size limit
-   Helmet
-   Rate limiting
-   Production CORS
-   No sensitive internal errors returned to users
-   Passwords protected with bcrypt
-   Password excluded from API responses

Recommended packages:

``` bash
npm install helmet
npm install express-rate-limit
```

## Deployment Plan

Architecture:

``` text
React Frontend
      ↓
   Netlify
      ↓
Express Backend
      ↓
    Render
      ↓
MongoDB Atlas
```

AI flow:

``` text
Frontend → Backend → OpenRouter
```

The OpenRouter API key stays on the backend.

### Frontend

Build:

``` bash
npm run build
```

Publish directory:

``` text
dist
```

For React Router, create:

``` text
frontend/public/_redirects
```

with:

``` text
/* /index.html 200
```

### Backend

Planned Render commands:

``` bash
npm install
npm start
```

### Production Backend Variables

``` env
NODE_ENV=production
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET_KEY=your-secret
OPENROUTER_API_KEY=your-openrouter-key
FRONTEND_URL=https://your-netlify-site.netlify.app
```

### Production Frontend Variable

``` env
VITE_API_URL=https://your-backend.onrender.com/api
```

## Testing Checklist

### Authentication

-   Register
-   Login
-   Wrong password rejected
-   Logout
-   Protected API without token rejected

### Jobs

-   Create
-   Read
-   Details
-   Update
-   Delete
-   User ownership authorization

### Dashboard

-   Total Jobs
-   Applied
-   Interviews
-   Job Status Chart
-   Applications Over Time
-   Recent 4 Jobs

### AI Job Analyzer

-   Analyze job
-   Match score
-   Matching skills
-   Missing skills
-   Recommendation
-   Authentication protection

### AI CV Analyzer

-   PDF upload
-   Text extraction
-   AI analysis
-   Result display
-   File validation
-   Authentication protection

## Current Status

  Area                     Status
  ------------------------ ----------
  Backend Foundation       Complete
  MongoDB Connection       Complete
  Authentication           Complete
  JWT Middleware           Complete
  Job Model                Complete
  Job CRUD                 Complete
  React Routing            Complete
  Auth Context             Complete
  Dashboard                Complete
  Job Status Chart         Complete
  Applications Over Time   Complete
  Recent Jobs              Complete
  AI Job Analyzer          Complete
  AI CV Analyzer           Complete
  Security Hardening       Next
  MongoDB Atlas            Planned
  Render Deployment        Planned
  Netlify Deployment       Planned
  Production Testing       Planned
  Final README             Planned
  Portfolio Polish         Planned

## Final Roadmap

``` text
Dashboard
  ↓
AI Job Analyzer
  ↓
AI CV Analyzer
  ↓
Security Hardening
  ↓
MongoDB Atlas
  ↓
Render Backend
  ↓
Netlify Frontend
  ↓
Production Testing
  ↓
Final README
  ↓
GitHub / LinkedIn / Portfolio
  ↓
Job Applications
```

## Project Goal

AI Job Tracker demonstrates practical Junior MERN Full Stack skills
through a complete application.

Skills demonstrated:

-   React
-   Vite
-   Tailwind CSS
-   React Router
-   Context API
-   Axios
-   Recharts
-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   bcrypt
-   REST APIs
-   CRUD
-   File uploads
-   PDF processing
-   AI API integration
-   Dashboard analytics
-   Git / GitHub
-   Deployment
