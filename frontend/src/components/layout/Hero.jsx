import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const scrollToMainContent = () => {
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
  };

  const handleReportClick = () => {
    if (!isAuthenticated()) {
      toast.info('Please login to report facility damage');
      navigate('/login');
      return;
    }
    navigate('/report-damage');
  };

  return (
    <section
      className="relative min-h-[500px] md:min-h-[550px] lg:min-h-[600px] flex items-center justify-center pt-24"
      style={{
        backgroundImage: `
          linear-gradient(to bottom,
          #2D5A27,
          #2D5A27 10%,
          #3F7A3A 30%,
          #538D4D 60%,
          #85B06C 80%,
          #FFFFFF)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">Jakarta Park Finder</h1>
        <p className="text-xl text-white mb-10">
          Discover, Explore, and Connect with Jakarta&apos;s Urban Green Spaces
        </p>

        <div className="flex justify-center space-x-6 mb-12">
          <button
            onClick={scrollToMainContent}
            className="bg-white text-green-800 px-8 py-3 rounded-full hover:bg-green-50 transition"
          >
            Explore Map
          </button>
          <button 
            onClick={() => navigate('/about')}
            className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/20 transition"
          >
            Learn More
          </button>
        </div>

        <div className="mt-8">
          <p className="text-white text-lg mb-4">
            Found damaged facilities in a park?
          </p>
          <button
            onClick={handleReportClick}
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition flex items-center justify-center mx-auto shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Report Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
