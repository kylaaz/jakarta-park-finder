import React, { useState, useEffect } from 'react';
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
        const parkData = await getParkById(id);
        setPark(parkData);
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

  return <TemplateCreator park={park} />;
};

export default ParkDetail;
