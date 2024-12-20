import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { 
      header: 'Park Management',
      items: [
        { path: '/admin/parks', label: 'Parks', icon: '🌳' },
        { path: '/admin/damaged-parks', label: 'Damaged Parks', icon: '⚠️' },
        { path: '/admin/repaired-parks', label: 'Repair Records', icon: '🔧' },
      ]
    },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
  ];

  const isActive = (path) => {
    return currentPath === path;
  };

  const renderMenuItem = (item) => {
    if (item.header) {
      return (
        <div key={item.header} className="mb-4">
          <h3 className="text-sm uppercase tracking-wide text-gray-300 mb-2 px-2">{item.header}</h3>
          {item.items.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className={`flex items-center py-2 px-2 rounded transition-colors duration-200 ${
                isActive(subItem.path)
                  ? 'bg-green-700 text-white'
                  : 'text-gray-100 hover:bg-green-700'
              }`}
            >
              <span className="mr-3">{subItem.icon}</span>
              <span className="whitespace-nowrap">{subItem.label}</span>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center py-2 px-2 rounded mb-2 transition-colors duration-200 ${
          isActive(item.path)
            ? 'bg-green-700 text-white'
            : 'text-gray-100 hover:bg-green-700'
        }`}
      >
        <span className="mr-3">{item.icon}</span>
        <span className="whitespace-nowrap">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="h-full w-64 bg-green-800 text-white p-4 shadow-lg overflow-y-auto">
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold whitespace-nowrap">Admin Panel</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </div>
  );
};

export default Sidebar;
