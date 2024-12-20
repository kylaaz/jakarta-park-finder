import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import parkService from '../../services/parkService';
import damagedParkService from '../../services/damagedParkService';

function DamageReportForm() {
  const [parks, setParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingParks, setLoadingParks] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await parkService.getAllParks();
        setParks(response.data);
      } catch (error) {
        toast.error('Failed to load parks');
        console.error('Error fetching parks:', error);
      } finally {
        setLoadingParks(false);
      }
    };

    fetchParks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPark) {
      toast.error('Please select a park');
      return;
    }

    if (!description.trim()) {
      toast.error('Please provide a damage description');
      return;
    }

    try {
      setLoading(true);

      await damagedParkService.createDamagedPark({
        park_id: selectedPark,
        damage_description: description,
        images: image
      });
      
      toast.success('Damage report submitted successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to submit damage report');
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingParks) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 pt-12">
      <h2 className="text-2xl font-bold text-green-800 mb-8">Report Damaged Facility</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Park
          </label>
          <select
            value={selectedPark}
            onChange={(e) => setSelectedPark(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a park</option>
            {parks.map((park) => (
              <option key={park.id} value={park.id}>
                {park.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Damage Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Please describe the damage in detail..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 bg-green-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-200 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit Report'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DamageReportForm;
