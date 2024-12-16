import { useState } from 'react';
import { Link } from 'react-router-dom';

const ParkCard = ({ park }) => {
  const [imageError, setImageError] = useState(false);

  // Parse facilities if it's a string
  const facilities = typeof park.facilities === 'string' ? JSON.parse(park.facilities) : park.facilities || [];

  // Format opening hours
  const openHours = park.openhours || 'Hours not specified';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 bg-green-50">
        {!imageError && park.imageUrl ? (
          <img
            src={park.imageUrl}
            alt={park.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-green-500 bg-green-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <span className="text-sm mt-2">Park Image</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-green-800 mb-2">{park.name}</h3>
        <p className="text-green-600 text-sm mb-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {park.location}
        </p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{park.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {facilities.slice(0, 3).map((facility, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {facility}
            </span>
          ))}
          {facilities.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{facilities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-sm text-green-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {openHours}
          </span>
          <Link
            to={`/park/${park.id}`}
            className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium text-green-700 hover:text-green-800 hover:bg-green-50 transition-colors"
          >
            Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParkCard;
