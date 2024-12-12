import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ParkInformation from '../../components/park/ParkInformation';

const InformationPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Park Information</h1>
          <ParkInformation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InformationPage;
