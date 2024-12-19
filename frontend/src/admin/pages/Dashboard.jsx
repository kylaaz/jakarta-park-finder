import React from 'react';
import Card from '../components/Card';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Parks', 
      value: 15, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Active Reports', 
      value: 7, 
      color: 'bg-yellow-500' 
    },
    { 
      title: 'Users', 
      value: 120, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Repairs', 
      value: 12, 
      color: 'bg-red-500' 
    }
  ];

  return (
    <div>
      <h1 className="text-3xl mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.title}
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;