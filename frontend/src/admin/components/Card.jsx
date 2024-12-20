import React from 'react';

const Card = ({ title, value, color }) => {
  const displayValue = value === null || value === undefined ? '-' : 
    typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <div className={`${color || 'bg-gray-500'} text-white rounded-lg shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden`}>
      <div className="p-4 sm:p-6 relative z-10">
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 opacity-90">{title || 'Untitled'}</h3>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {displayValue}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className={`h-1 w-full bg-white bg-opacity-20 rounded-b-lg absolute bottom-0`}></div>
    </div>
  );
};

export default Card;
