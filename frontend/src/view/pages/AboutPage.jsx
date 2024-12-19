import { useState } from 'react';

import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-10 h-10 text-white"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ReportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-10 h-10 text-white"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ReviewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-10 h-10 text-white"
  >
    <path d="M12 17.75l-6.172 3.845 1.179-6.873L.465 8.242l6.9-1.002L12 1l4.635 6.24 6.9 1.002-4.542 4.73 1.179 6.873z" />
  </svg>
);

const ParkFeature = ({ icon: Icon, title, description, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-all duration-300 transform ${
        isHovered ? 'scale-105 bg-green-50' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mb-4 p-4 rounded-full inline-block ${color}`}>
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-green-900 mb-5 mt-10">
                Discover Jakarta&apos;s Urban Green Spaces
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Your ultimate guide to exploring, enjoying, and connecting with parks across Jakarta.
              </p>
            </div>
            <div className="hidden md:block">
              <img src="/api/placeholder/600/400" alt="Jakarta Park Landscape" className="rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Park Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <ParkFeature
              icon={MapPinIcon}
              title="Explore Locations"
              description="Discover hidden green spaces and park locations across Jakarta with our comprehensive guide."
              color="bg-green-500"
            />
            <ParkFeature
              icon={ReviewIcon}
              title="Park Reviews"
              description="Share your experiences and read reviews from other park visitors to make informed choices."
              color="bg-emerald-500"
            />
            <ParkFeature
              icon={ReportIcon}
              title="Report Issues"
              description="Help maintain our parks by reporting maintenance needs, damages, or safety concerns."
              color="bg-lime-600"
            />
          </div>

          {/* Community Reporting Section */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Community-Driven Park Maintenance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-green-800 mb-4">How Our Reporting Works</h3>
                <ul className="space-y-4 text-gray-700">
                  <li>
                    <span className="font-bold">1. Spot an Issue:</span> Notice something wrong in a park?
                  </li>
                  <li>
                    <span className="font-bold">2. Report Easily:</span> Use our simple, user-friendly reporting system
                  </li>
                  <li>
                    <span className="font-bold">3. Track Progress:</span> Follow up on your reported issues
                  </li>
                  <li>
                    <span className="font-bold">4. Community Impact:</span> Help keep Jakarta&apos;s parks clean and
                    safe
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">What Can You Report?</h3>
                <div className="grid grid-cols-2 gap-3 text-gray-700">
                  <div>
                    <p className="font-semibold">Infrastructure</p>
                    <ul className="text-sm list-disc list-inside">
                      <li>Broken Benches</li>
                      <li>Damaged Paths</li>
                      <li>Faulty Lighting</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Environmental</p>
                    <ul className="text-sm list-disc list-inside">
                      <li>Trash Accumulation</li>
                      <li>Tree Damage</li>
                      <li>Landscape Issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Jakarta Park Statistics */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Jakarta&apos;s Green Landscape</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-4xl font-bold mb-2">57+</p>
                <p className="text-lg">Public Parks</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">350 Ha</p>
                <p className="text-lg">Total Green Area</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">10+</p>
                <p className="text-lg">Districts Covered</p>
              </div>
            </div>
            <p className="mt-6 text-xl">Explore the green heart of Jakarta and reconnect with nature in the city.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
