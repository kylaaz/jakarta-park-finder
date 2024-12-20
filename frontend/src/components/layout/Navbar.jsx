import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/Modal';

function Navbar({ onMenuToggle, useGreenTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle && onMenuToggle(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isHomePage = location.pathname === '/';
  const showGreenBackground = scrolled || !isHomePage;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showGreenBackground ? 'bg-[#2D5A27] shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 w-1/4">
            <img src="/logo_jakartaparkfinder.png" alt="Jakarta Park Finder" className="h-16 md:h-20 lg:h-24" />
            <span className={`text-lg md:text-xl lg:text-2xl font-semibold ${scrolled ? 'text-white' : 'text-white'}`}>
              Jakarta Park Finder
            </span>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden absolute right-4 p-2 z-50">
            <svg
              className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8 lg:space-x-12">
              {['Home', 'Information', 'About'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`relative group py-2 ${scrolled ? 'text-white' : 'text-white'}`}
                >
                  <span className="relative z-10 tracking-wide">{item}</span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 bg-white"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Parks"
                className={`px-4 py-2 rounded-full ${
                  scrolled ? 'bg-white/30' : 'bg-white/30'
                } text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white`}
              />
            </form>
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Notification Icon */}
                <Link
                  to="/notifications"
                  className={`relative p-2 rounded-full ${scrolled ? 'text-white hover:bg-white/20' : 'text-white hover:bg-white/20'}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {/* Add notification badge */}
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </Link>
                {/* User Info & Logout */}
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-2 ${scrolled ? 'text-white' : 'text-white'}`}
                  >
                    <span className="text-sm font-medium">{user.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-full border ${
                      scrolled ? 'border-white text-white hover:bg-white/20' : 'border-white text-white hover:bg-white/20'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-full border ${
                  scrolled ? 'border-white text-white hover:bg-white/20' : 'border-white text-white hover:bg-white/20'
                }`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-[72px] z-40 md:hidden backdrop-blur-sm">
          <div className="bg-white/95 mx-4 rounded-lg shadow-lg">
            <div className="py-4 space-y-3">
              {['Home', 'Information', 'About'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block py-2 px-4 text-[#2D5A27] hover:bg-gray-50 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="px-4">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Parks"
                    className="w-full px-4 py-2 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] focus:outline-none"
                  />
                </form>
              </div>
              <div className="px-4 py-4 bg-gray-50 space-y-3 rounded-b-lg">
                {user ? (
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/profile"
                      className="flex items-center justify-center space-x-2 text-[#2D5A27] hover:bg-[#2D5A27]/10 py-2 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>{user.name}</span>
                    </Link>
                    <Link
                      to="/notifications"
                      className="flex items-center justify-center space-x-2 text-[#2D5A27] hover:bg-[#2D5A27]/10 py-2 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <span>Notifications</span>
                      <span className="block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 border border-[#2D5A27] text-[#2D5A27] rounded-full hover:bg-[#2D5A27]/10"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="w-full px-4 py-2 border border-[#2D5A27] text-[#2D5A27] rounded-full hover:bg-[#2D5A27]/10 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
