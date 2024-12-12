import React, { useState, useEffect } from 'react';
import ParkCard from './ParkCard';
import { getParkList } from '../../services/parkService';

const ParkList = () => {
  const [parks, setParks] = useState([]);
  const [visibleParks, setVisibleParks] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to fetch parks');
        const data = await getParkList();
        console.log('Fetched parks:', data);
        setParks(data || []);
      } catch (err) {
        console.error('Error in fetchParks:', err);
        setError(err.message || 'Failed to load parks');
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  const handleViewMore = () => {
    setVisibleParks(prevVisible => Math.min(prevVisible + 6, parks.length));
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <div className="flex items-center space-x-2 text-green-600">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg">Loading parks...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <div className="text-red-600 text-lg flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!parks.length) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <div className="text-gray-600 text-lg flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <span>No parks found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {parks.slice(0, visibleParks).map(park => (
          <ParkCard key={park.id} park={park} />
        ))}
      </div>
      
      {visibleParks < parks.length && (
        <div className="text-center mt-12">
          <button 
            onClick={handleViewMore}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span>View More Parks</span>
            <span className="ml-2 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
              {parks.length - visibleParks} more
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ParkList;
