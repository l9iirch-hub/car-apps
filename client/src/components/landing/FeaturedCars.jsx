import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const mockCars = [
  {
    _id: '1',
    name: 'G-Class AMG 63',
    pricePerDay: 600,
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80',
    type: 'Luxury SUV'
  },
  {
    _id: '2',
    name: '911 Carrera S',
    pricePerDay: 550,
    image: 'https://images.unsplash.com/photo-1503376710356-70e68c8c5123?auto=format&fit=crop&q=80',
    type: 'Sports'
  },
  {
    _id: '3',
    name: 'S-Class 2024',
    pricePerDay: 450,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80',
    type: 'Luxury Sedan'
  }
];

const FeaturedCars = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary tracking-widest uppercase text-sm font-semibold mb-2">The Collection</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Featured Vehicles</h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/cars" className="text-white border-b border-primary pb-1 hover:text-primary transition-colors flex items-center gap-2">
              View Entire Fleet
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="w-full relative z-10">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full max-w-[1400px] mx-auto pt-10 pb-16"
        >
          {mockCars.map((car) => (
            <SwiperSlide key={car._id} className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px] rounded-xl overflow-hidden glass-card group">
              <div className="relative aspect-[16/9] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 flex justify-between items-end">
                  <div>
                    <p className="text-primary text-sm font-medium tracking-wider uppercase mb-1">{car.type}</p>
                    <h4 className="text-2xl md:text-4xl font-display font-bold text-white">{car.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-sm">Starting from</p>
                    <p className="text-xl md:text-3xl font-display font-bold text-white">${car.pricePerDay}<span className="text-sm font-normal text-white/50">/day</span></p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedCars;
