// src/components/Layout/MainLayout.jsx
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-orange-50">
      {children}
    </main>
  );
};

export default MainLayout;