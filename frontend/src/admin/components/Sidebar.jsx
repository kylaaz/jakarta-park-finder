import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/parks', label: 'Park Management', icon: '🌳' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/reports', label: 'Reports', icon: '📝' },
    { path: '/admin/repairs', label: 'Repair Tracking', icon: '🔧' },
  ];

  return (
    <div className="w-64 bg-green-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center py-2 hover:bg-green-700 rounded"
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;