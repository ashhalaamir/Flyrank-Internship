# Task Management App - Frontend (FlyRank Assignment 1)

This repository contains the React frontend for a Task Management application, adapted specifically for the FlyRank Frontend Engineering Internship (Assignment 1: React app development with AI).

Originally built as part of a full-stack project, this frontend has been successfully decoupled from the backend to run as a standalone application. It utilizes mock data fallbacks and graceful error handling to render empty states without crashing.

## 🚀 Tech Stack

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **Icons:** Lucide React

## 📂 Project Structure

*   `/src/components` - Reusable UI components (Buttons, Inputs, Cards, etc.)
*   `/src/pages` - Main application views (Dashboard, Tasks, Profile, Team)
*   `/src/layouts` - Shared layouts (e.g., Sidebar/Navbar wrapper)
*   `/src/hooks` - Custom React hooks (e.g., form handling, local state)
*   `/src/types` - TypeScript interfaces and types

## 🛠️ Getting Started

Follow these steps to run the application locally:

### 1. Install Dependencies
Navigate into this project folder Flyrank-Internship\react-task-management-assignment> in your terminal and run:
```bash
npm install
```
2. Run the Development Server
bash
npm run dev
3. View the App
Open your browser and navigate to the URL provided in your terminal (usually http://localhost:5173).

🗺️ Application Routes
The application uses client-side routing. Here is a map of the available screens and their expected behavior in this standalone frontend version:

URL	Screen Description
/	Redirects automatically to /dashboard
/dashboard	Dashboard (empty stats, charts will render placeholders)
/tasks	Task list (empty state message)
/tasks/new	New task form
/tasks/1	Task detail — will show "Task not found" since the backend fetch fails gracefully
/tasks/1/edit	Edit form — same as above, will render but with no data
/profile	Profile (empty fields)
/team	Team overview (empty, plus it checks isAdmin internally)
