import { Link } from 'react-router-dom';
import AuthModal from '../../components/auth/Modal';
import ParkList from '../../components/park/ParkList';
import { useAuth } from '../../context/AuthContext';
import Hero from '../../components/layout/Hero';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div id="main-content" className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-green-900 text-center mb-12">Featured Parks</h2>
            <ParkList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;