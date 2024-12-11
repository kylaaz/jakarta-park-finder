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
        console.log('Starting to fetch parks');
        const data = await getParkList();
        console.log('Fetched parks:', data);
        setParks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchParks:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  const handleViewMore = () => {
    setVisibleParks(prevVisible => prevVisible + 6);
  };

  if (loading) return <div>Loading parks...</div>;
  if (error) return <div>Error loading parks: {error.message}</div>;

  return (
    <div>
      {visibleParks < parks.length && (
        <div className="text-right mb-4">
          <button 
            onClick={handleViewMore}
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            View More Parks →
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {parks.slice(0, visibleParks).map(park => (
          <ParkCard key={park.id} park={park} />
        ))}
      </div>
    </div>
  );
};

export default ParkList;