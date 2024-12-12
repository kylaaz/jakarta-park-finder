import { Link } from 'react-router-dom';

import AuthModal from '../../components/auth/Modal';
import ParkList from '../../components/park/ParkList';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const scrollToMainContent = () => {
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo dan Nama */}
          <div className="flex items-center space-x-3">
            <img src="/path-to-logo.png" alt="Jakarta Park Finder Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-white">Jakarta Park Finder</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-green-200">
              Home
            </Link>
            <Link to="/information" className="text-white hover:text-green-200">
              Information
            </Link>
            <Link to="/about" className="text-white hover:text-green-200">
              About
            </Link>
            {/* Tambahkan kondisional untuk admin */}
            {user && user.role === 'admin' && (
              <Link to="/parks/new" className="text-white hover:text-green-200">
                Create Park
              </Link>
            )}
          </div>

          {/* Search dan Auth */}
          <div className="flex items-center space-x-4">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 rounded-full bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <AuthModal />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-gradient-to-b from-green-800 via-green-700 to-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-white mb-6">Jakarta Park Finder</h1>
          <p className="text-xl text-white mb-10">
            Discover, Explore, and Connect with Jakarta&apos;s Urban Green Spaces
          </p>

          <div className="flex justify-center space-x-6">
            <button
              onClick={scrollToMainContent}
              className="bg-white text-green-800 px-8 py-3 rounded-full hover:bg-green-50 transition"
            >
              Explore Map
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/20 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="main-content" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-green-900 text-center mb-12">Featured Parks</h2>
          <ParkList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
