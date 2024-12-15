import React from 'react';

import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';

const AboutPage = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8">About Us</h1>
        <div className="space-y-6 text-gray-700">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Mission</h2>
            <p>
              Welcome to Jakarta Park Finder! Our mission is to help you discover, explore, and connect with the
              beautiful urban green spaces in Jakarta. Whether you're looking for a peaceful retreat, a place to
              exercise, or a spot to enjoy with family and friends, we've got you covered.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside">
              <li>Detailed information about various parks across Jakarta</li>
              <li>Facilities, opening hours, and locations of parks</li>
              <li>Encouragement to take advantage of these wonderful resources</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Why Parks Matter</h2>
            <p>
              We believe that parks play a crucial role in enhancing the quality of life in cities. They offer a place
              for relaxation, recreation, and social interaction, contributing to the overall well-being of the
              community.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Join Us</h2>
            <p>
              Thank you for visiting Jakarta Park Finder. We hope you find our platform useful and enjoy exploring the
              parks in Jakarta!
            </p>
            <div className="mt-4">
              <a href="/contact" className="text-green-600 hover:text-green-800 underline">
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
