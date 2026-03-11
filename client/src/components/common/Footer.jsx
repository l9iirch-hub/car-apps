import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              Luxe<span className="text-primary">Drive</span>
            </h2>
            <p className="text-textMuted max-w-md mb-8 leading-relaxed">
              Experience the pinnacle of automotive engineering and luxury. Our curated collection of premium vehicles ensures every journey is extraordinary.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="space-y-4">
              <li><a href="/cars" className="text-textMuted hover:text-primary transition-colors">The Fleet</a></li>
              <li><a href="#" className="text-textMuted hover:text-primary transition-colors">Private Chauffeur</a></li>
              <li><a href="#" className="text-textMuted hover:text-primary transition-colors">Corporate Events</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Connect</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-textMuted hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-textMuted hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="text-textMuted hover:text-primary transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-textMuted text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LuxeDrive Portfolio. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-textMuted">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
