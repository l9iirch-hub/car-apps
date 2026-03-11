import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCarStore } from '../store/carStore';
import { carService } from '../services/carService';
import CarCard from '../components/cars/CarCard';
import CarFilter from '../components/cars/CarFilter';
import SkeletonCard from '../components/common/SkeletonCard';
import toast from 'react-hot-toast';

const CarsListingPage = () => {
  const { cars, loading, setCarsData, setLoading } = useCarStore();

  const fetchCars = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await carService.getCars(filters);
      setCarsData(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleFilterChange = (filters) => {
    fetchCars(filters);
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Our <span className="text-primary">Fleet</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-textMuted max-w-2xl"
          >
            Explore our curated collection of luxury, sports, and premium vehicles available for your next unforgettable journey.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filter */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/4"
          >
            <CarFilter onFilterChange={handleFilterChange} />
          </motion.div>

          {/* Cars Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : cars.length === 0 ? (
              <div className="glass-card p-12 text-center rounded-xl flex flex-col items-center justify-center min-h-[400px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-textMuted mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="text-2xl font-display font-bold text-white mb-2">No Vehicles Found</h3>
                <p className="text-textMuted">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </motion.div>
            )}
            
            {/* Pagination placeholder - could be extracted to component */}
            {!loading && cars.length > 0 && (
               <div className="mt-12 flex justify-center">
                  <button className="btn-secondary">Load More</button>
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarsListingPage;
