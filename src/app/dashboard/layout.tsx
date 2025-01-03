'use client';

import { useState } from 'react';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* Main Content */}
      <div>
        {children}
      </div>
    </div>
  );
}
