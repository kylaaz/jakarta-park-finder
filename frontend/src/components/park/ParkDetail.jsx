import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getParkById } from '../../services/parkService';
import TemplateCreator from '../../view/templates/template-creator';

const ParkDetail = () => {
  const { id } = useParams();
  const [park, setPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkDetails = async () => {
      try {
        const response = await getParkById(id);
        // Ensure we're using the data property from the response
        setPark(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchParkDetails();
  }, [id]);

  if (loading) return <div>Loading park details...</div>;
  if (error) return <div>Error loading park details: {error.message}</div>;
  if (!park) return <div>Park not found</div>;

  // Parse facilities if it's a string
  const parsedPark = {
    ...park,
    facilities: typeof park.facilities === 'string' ? JSON.parse(park.facilities) : park.facilities || [],
    reviews: park.reviews || [] // Ensure reviews is always an array
  };

  return <TemplateCreator park={parsedPark} />;
};

export default ParkDetail;
