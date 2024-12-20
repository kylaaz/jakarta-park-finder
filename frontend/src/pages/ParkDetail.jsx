import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parkService from '../services/parkService';

const ParkDetail = () => {
  const { id } = useParams();
  const [park, setPark] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPark = async () => {
      try {
        const response = await parkService.getParkById(id);
        setPark(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPark();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!park) return <div>Park not found</div>;

  return (
    <div>
      <div>
        {park.imageUrl ? (
          <img
            src={park.imageUrl}
            alt={park.name}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '400px',
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}>
            No Image Available
          </div>
        )}
        <h1>{park.name}</h1>
        <p>{park.description}</p>
        <p>Location: {park.location}</p>
        <p>Open Hours: {park.openhours}</p>
      </div>
    </div>
  );
};

export default ParkDetail;
