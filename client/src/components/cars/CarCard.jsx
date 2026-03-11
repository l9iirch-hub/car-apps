import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="glass-card rounded-xl overflow-hidden group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={car.images && car.images.length > 0 ? car.images[0].url : 'https://via.placeholder.com/400x300?text=No+Image'} 
          alt={car.name} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-sm font-medium text-white">${car.pricePerDay}<span className="text-textMuted text-xs">/day</span></span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <p className="text-primary text-xs tracking-wider uppercase mb-1 font-semibold">{car.brand}</p>
          <h3 className="text-xl font-display font-bold text-white mb-2">{car.name}</h3>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs text-textMuted bg-surfaceLight px-2 py-1 rounded-md border border-white/5">{car.transmission}</span>
            <span className="text-xs text-textMuted bg-surfaceLight px-2 py-1 rounded-md border border-white/5">{car.fuel}</span>
            <span className="text-xs text-textMuted bg-surfaceLight px-2 py-1 rounded-md border border-white/5">{car.seats} Seats</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center text-sm text-textMuted">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary mr-1">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
            {car.rating > 0 ? `${car.rating} (${car.numReviews})` : 'New'}
          </div>
          
          <Link to={`/cars/${car._id}`} className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
