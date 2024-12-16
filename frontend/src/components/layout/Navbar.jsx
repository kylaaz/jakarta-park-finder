import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/Modal';

function Navbar({ onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen ? 'bg-[#CCCCCC]/50 backdrop-blur-sm shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 w-1/4">
            <img src="/logo_jakartaparkfinder.png" alt="Jakarta Park Finder" className="h-16 md:h-20 lg:h-24" />
            <span
              className={`text-lg md:text-xl lg:text-2xl font-semibold transition-colors duration-300 ${
                isMenuOpen || scrolled ? 'text-[#2D5A27]' : 'text-white'
              }`}
            >
              Jakarta Park Finder
            </span>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden absolute right-4 p-2 z-50">
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${
                isMenuOpen || scrolled ? 'text-[#2D5A27]' : 'text-white'
              }`}
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
                  className={`relative group py-2 transition-colors duration-300 text-white/90 hover:text-white`}
                >
                  <span className="relative z-10 tracking-wide">{item}</span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 bg-white"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 rounded-full bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <AuthModal />
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
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] focus:outline-none"
                />
              </div>
              <div className="px-4 py-4 bg-gray-50 space-y-3 rounded-b-lg">
                <AuthModal isMobile />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
