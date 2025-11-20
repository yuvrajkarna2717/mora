// src/components/Layout/MainLayout.jsx
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <main className="relative min-h-screen w-full bg-white text-gray-900 font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;