import React from 'react';
import { Link } from 'react-router-dom';

const ParkCard = ({ park }) => {
  const imageUrl = park.image_url 
    ? `http://localhost:3000${park.image_url}` 
    : '/default-park-image.jpg';

  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <img 
        src={imageUrl} 
        alt={park.name} 
        className="w-full h-48 object-cover rounded-t-xl mb-4" 
      />
      <h3 className="text-2xl font-bold text-green-800 mb-3">{park.name}</h3>
      <p className="text-green-600 mb-2">Location: {park.location}</p>
      <p className="text-green-700 line-clamp-2">{park.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-green-500">🌳 {park.type || 'Urban Park'}</span>
        <Link 
          to={`/park/${park.id}`} 
          className="text-green-600 hover:text-green-800 font-semibold"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ParkCard;
