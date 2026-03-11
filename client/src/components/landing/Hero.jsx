import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const textRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      });
    }, textRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Video or Image sequence for luxury feel */}
      <motion.div 
        style={{ y: y1, opacity }} 
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80" 
          alt="Luxury Car Dark" 
          className="w-full h-full object-cover object-center opacity-40"
        />
      </motion.div>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center translate-y-16">
        <div ref={textRef} className="max-w-3xl">
          <div className="overflow-hidden mb-2">
            <p className="hero-text-line text-primary tracking-[0.2em] uppercase text-sm font-semibold">
              The Ultimate Driving Experience
            </p>
          </div>
          
          <div className="overflow-hidden mb-4">
            <h1 className="hero-text-line text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight">
              Command <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                The Road.
              </span>
            </h1>
          </div>
          
          <div className="overflow-hidden mb-10">
            <p className="hero-text-line text-lg md:text-xl text-textMuted max-w-lg leading-relaxed">
              Exclusive access to the world's most prestigious automotive engineering. Arrive in unparalleled style.
            </p>
          </div>
          
          <div className="overflow-hidden">
            <div className="hero-text-line flex flex-wrap gap-4 mt-8">
              <Link to="/cars" className="btn-primary group relative overflow-hidden">
                <span className="relative z-10">Reserve a Vehicle</span>
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out flex items-center justify-center">
                  <span className="text-black font-semibold">Explore Fleet &rarr;</span>
                </div>
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase mb-2">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
