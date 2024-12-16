// frontend/src/view/pages/NotificationsPage.jsx
import { useState } from 'react';

import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Park Review',
      message: 'Someone reviewed Taman Suropati',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      title: 'Damage Report Update',
      message: 'Your damage report for Taman Menteng has been processed',
      time: '1 day ago',
      read: true,
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar useGreenTheme={true} />
      <main className="flex-grow pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-green-50'}`}
              >
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                <span className="text-sm text-gray-500 mt-2">{notification.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
