import React from 'react';

const Card = ({ title, value, color }) => {
  return (
    <div className={`p-4 rounded ${color} text-white`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Card;