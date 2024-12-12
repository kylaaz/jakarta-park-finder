import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const AboutPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20 px-4">
      <h1 className="text-3xl font-bold">About Us</h1>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
