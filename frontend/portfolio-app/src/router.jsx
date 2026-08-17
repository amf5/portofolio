import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyOTP from './components/auth/VerifyOTP';
import ChangePassword from './components/auth/ChangePassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import Portfolio from './pages/Portfolio';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import ProjectDetails from './components/project/ProjectDetails';
import CreateProject from './components/project/CreateProject';
import EditProject from './components/project/EditProject';
import Profile from './components/user/Profile';
import EditProfile from './components/user/EditProfile';
import ProtectedRoute from './components/common/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // ===== PUBLIC ROUTES =====
      { index: true, element: <Portfolio /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'project/:projectId', element: <ProjectDetails /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'verify-otp', element: <VerifyOTP /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'confirm-password', element: <ConfirmPassword /> },
      { path: 'about', element: <About /> },

      // ===== PROTECTED ROUTES =====
      {
        path: 'dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: 'profile/edit',
        element: <ProtectedRoute><EditProfile /></ProtectedRoute>
      },
      {
        path: 'project/create',
        element: <ProtectedRoute><CreateProject /></ProtectedRoute>
      },
     {
  path: 'project/edit/:projectId',  
  element: <ProtectedRoute><EditProject /></ProtectedRoute>
},

      // ===== 404 =====
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);