import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link, useParams } from 'react-router-dom';

import ReviewForm from '../../components/review/ReviewForm';
import { useAuth } from '../../context/AuthContext';
import parkService from '../../services/parkService';
import reviewService from '../../services/reviewService';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ParkDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [park, setPark] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch park details
        const parkResponse = await parkService.getParkById(id);
        setPark(parkResponse.data);

        // Fetch reviews
        const reviewsResponse = await reviewService.getReviewsByParkId(id);
        setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load park details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Function to render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(parseFloat(rating));
    const hasHalfStar = parseFloat(rating) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center space-x-2 text-green-600">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-lg">Loading park details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-red-600 text-lg mb-4">Error: {error}</div>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  if (!park) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-gray-600 text-lg mb-4">Park not found</div>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  const facilities = typeof park.facilities === 'string' ? JSON.parse(park.facilities) : park.facilities || [];
  const [lat, lng] = park.coordinates.split(',').map((coord) => parseFloat(coord.trim()));

  return (
    <div className="pt-32 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Parks
          </Link>
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-green-500">
          <div className="relative h-96">
            {!imageError && park.imageUrl ? (
              <img
                src={park.imageUrl}
                alt={park.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-green-50 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
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
                <span className="text-lg mt-2">Park Image</span>
              </div>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-800 mb-4">{park.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-green-700 mb-4">Location & Hours</h2>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {park.location}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
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
                    {park.openhours}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-green-700 mb-4">Facilities</h2>
                <div className="flex flex-wrap gap-2">
                  {facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
                {user && (
                  <div className="mt-4">
                    <Link
                      to="/report-damage"
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      Found damaged facilities? Report Now
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{park.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Location Map</h2>
              <div className="h-[400px] rounded-lg overflow-hidden border-2 border-green-200 relative z-0">
                <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[lat, lng]}>
                    <Popup>
                      <div className="font-semibold">{park.name}</div>
                      <div className="text-sm">{park.location}</div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Reviews ({reviews.length})</h2>
              {user && <ReviewForm parkId={id} onReviewAdded={(newReview) => setReviews([...reviews, newReview])} />}
              
              {reviews.length > 0 ? (
                <div className="space-y-6 mt-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-gray-600">({review.rating})</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">{review.user_name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet. {!user && 'Sign in to be the first to review!'}</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkDetailPage;
