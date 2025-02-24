# Healthcare Insurance Management System (HIMS)

## Table of Contents

- [Live Deployment using Render](#live-deployment-using-render)
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)
- [References](#references)

  ## Live Deployment using Render
- [https://hims-f.onrender.com](https://hims-f.onrender.com)
- (The above link hosts the frontend using Static Site in Render. The backend is hosted too as a Web Service in Render which is automatically loaded by the frontend codebase).

## Overview

Healthcare Insurance Management System (HIMS) is a comprehensive web application designed to streamline the management of healthcare insurance operations. The platform enables users to create accounts, select insurance plans, fill in personal details, process claims, and generate application forms. In addition, an administrative dashboard allows authorized personnel to manage user profiles, policy records, and claims processing.

## Features

- **User Management:** Secure sign-up, login, and profile management.
- **Insurance Plan Management:** Browse available insurance plans and view policy details.
- **Application Process:** A multi-step process for applying to insurance plans with form validations.
- **Claims Processing:** Submit and track insurance claims.
- **Payment Integration:** Secure payment processing for policy subscriptions.
- **Administrative Dashboard:** Manage and perform CRUD operations on user data and insurance policies.
- **Secure Authentication:** Implemented using Firebase for reliable and safe user access.
- **Robust Database:** PostgreSQL database with a well-structured schema for data integrity and scalability.

## Technologies

### Frontend
- **React.js:** For building dynamic and responsive user interfaces.
- **ShadCN UI:** A collection of accessible and customizable React components built on Radix UI and Tailwind CSS.
- **Tailwind CSS:** Utility-first CSS framework for rapid and consistent styling.
- **Vite:** A fast build tool and development server that enhances the development workflow.

### Backend
- **Node.js & Express.js:** For creating RESTful APIs and managing server-side logic.
- **PostgreSQL:** A reliable relational database system for handling user, policy, and claims data.
- **Firebase:** For secure authentication and real-time database services.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL
- A Firebase project for authentication

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/KrishnaNAcharya/HIMS.git
cd HIMS
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend is built with Vite and React. Tailwind CSS and ShadCN UI are used for styling and UI components.

#### 3. Backend Setup
```bash
cd backend
npm install
node server.js
```
Ensure that PostgreSQL is running and that you have created a database (e.g., `hims_db`). Update your database connection details in the backend configuration accordingly.

#### 4. Firebase Configuration
- Create a Firebase project and enable Firebase Authentication.
- Update the Firebase configuration in the `firebase.js` file with your project credentials.

## Project Structure

```
HIMS/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── doc4.svg
│   │   ├── components/
│   │   │   ├── Loading.jsx
│   │   │   ├── Sparkles.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── config/
│   │   │   └── config.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── AboutUs.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── SignUp.jsx
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   │   └── insuranceController.js
│   ├── routes/
│   │   └── insuranceRoutes.js
│   ├── db/
│   │   ├── db.js
│   │   ├── migrate.js
│   │   └── schema.sql
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md      # This file
```
## Usage

- **User Registration and Login:** Secure authentication using Firebase.
- **Insurance Applications:** A guided, multi-step form for applying to insurance plans.
- **Payment Processing:** Secure integration for handling policy payments.
- **Admin Operations:** An admin dashboard for managing policies, claims, and user data.

## Acknowledgements

- **Mentorship:** Special thanks to Mr. Prajwal Hegde N and Mr. Karthik Subramanian for their guidance and feedback.
- **Open-Source Communities:** Appreciation for the resources and communities behind React, Firebase, PostgreSQL, and other technologies used in this project.

## References

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
