import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const RootLayout = () => {
  const location = useLocation();
  
  // Pages that should use the green theme
  const isAdminPage = location.pathname.startsWith('/admin');
  const useGreenTheme = [
    '/about',
    '/information',
    '/notifications',
    '/admin',
    '/profile',
    '/report-damage',
  ].some(path => location.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar useGreenTheme={useGreenTheme} />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default RootLayout;
