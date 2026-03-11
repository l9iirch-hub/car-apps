import React from 'react';
import Hero from '../components/landing/Hero';
import FeaturedCars from '../components/landing/FeaturedCars';

const LandingPage = () => {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <FeaturedCars />
      {/* Testimonials or Features will go here */}
    </div>
  );
};

export default LandingPage;
