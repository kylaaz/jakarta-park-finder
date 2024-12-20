import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import reviewService from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';

export default function ReviewForm({ parkId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await reviewService.createReview(parkId, {
        rating,
        comment
      });
      
      // Add user info to the review for immediate display
      const newReview = {
        ...response.data,
        user_name: user.name,
        created_at: new Date().toISOString()
      };
      
      onReviewAdded(newReview);
      toast.success('Review submitted successfully!');
      
      // Reset form and close modal
      setRating(5);
      setComment('');
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message || 'Failed to submit review');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Add a Review
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-2xl font-bold text-green-800">Share Your Experience</h4>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-8">
                <label className="block text-lg font-semibold text-green-700 mb-3 text-center">How would you rate this park?</label>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                        rating >= value 
                          ? 'text-yellow-400 hover:text-yellow-500' 
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      <svg 
                        className="w-10 h-10 md:w-12 md:h-12" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        style={{
                          filter: rating >= value ? 'drop-shadow(0 0 2px rgba(251, 191, 36, 0.4))' : 'none'
                        }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <p className="text-center mt-2 text-gray-600">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-green-700 mb-3">Tell us more about your experience</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  rows="4"
                  placeholder="What did you like or dislike? What activities did you enjoy?"
                  required
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
