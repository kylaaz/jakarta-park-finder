import React from 'react';
import Hero from '../../components/layout/Hero';
import ParkList from '../../components/park/ParkList';

const HomePage = () => {
  return (
    <>
      <Hero />
      <div id="main-content" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-green-900 text-center mb-12">Featured Parks</h2>
          <ParkList />
        </div>
      </div>
    </>
  );
};

export default HomePage;
