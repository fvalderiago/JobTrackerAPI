# JobTrackerAPI
A simple job application tracker with ASP.NET Core Web API and React frontend.

🚀 Features

Add, view, and update job applications

Update application status via dropdown

View all applications in a table

Uses in-memory database (can be switched to SQLite)

Swagger UI enabled for backend API documentation

🧰 Tech Stack

Backend: ASP.NET Core Web API, Entity Framework Core (In-Memory DB)

Frontend: React, Axios

Optional Styling: Tailwind CSS (or replace with your preferred CSS framework)

⚙️ Setup Instructions

Backend

Open the JobTrackerAPI project folder in your terminal.

Run the following command:

dotnet run

API will be available at https://localhost:5001/api/applications

Swagger UI available at https://localhost:5001/swagger

Frontend

Navigate to the React app folder:

cd job-tracker

Install dependencies:

npm install

Start the development server:

npm start

Visit http://localhost:3000 in your browser.

⚠️ Make sure your backend is running and accessible via HTTPS for API calls.

📌 Assumptions Made

Status options are limited to: Applied, Interview, Offer, Rejected

In-memory database used for simplicity. No persistence across sessions.

No authentication or user management (single-user prototype)

Date is auto-set to current date when adding a job application

📑 API Endpoints

Method

Endpoint

Description

GET

/api/applications

Get all applications

GET

/api/applications/{id}

Get application by ID

POST

/api/applications

Create new application

PUT

/api/applications/{id}

Update application (e.g. status)
