import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import AIPredictions from './pages/predictions/AIPredictions';
import AirQuality from './pages/air-quality/AirQuality';
import FanRecommendation from './pages/fan-recommendation/FanRecommendation';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Dashboard />} />
            <Route path="/air-quality" element={<AirQuality />} />
            <Route path="/ai-predictions" element={<AIPredictions />} />
            <Route path="/fan-recommendation" element={<FanRecommendation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
