import { useState } from 'react';

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
    <div className="min-h-screen bg-white pt-28 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-900 mb-6 mt-8">Notifications</h1>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-green-50'}`}
            >
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              <p className="text-gray-600 mt-1">{notification.message}</p>
              <span className="text-sm text-gray-500 mt-2">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
