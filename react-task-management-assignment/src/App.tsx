import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import TaskList from './components/tasks/TaskList';
import TaskDetail from './components/tasks/TaskDetail';
import TaskForm from './components/tasks/TaskForm';
import UserProfile from './components/profile/UserProfile';
import Team from './components/team/Team';
import './index.css';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Demo Routes - ProtectedRoute removed for standalone showcase */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />

        <Route path="/tasks" element={
          <MainLayout>
            <TaskList />
          </MainLayout>
        } />

        <Route path="/tasks/new" element={
          <MainLayout>
            <TaskForm />
          </MainLayout>
        } />

        <Route path="/tasks/:id" element={
          <MainLayout>
            <TaskDetail />
          </MainLayout>
        } />

        <Route path="/tasks/:id/edit" element={
          <MainLayout>
            <TaskForm />
          </MainLayout>
        } />

        <Route path="/profile" element={
          <MainLayout>
            <UserProfile />
          </MainLayout>
        } />

        <Route path="/team" element={
          <MainLayout>
            <Team />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;