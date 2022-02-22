import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from 'views/ExternalViews/Login';

export function ExternalRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to={'/login'} />} />
    </Routes>
  );
}
