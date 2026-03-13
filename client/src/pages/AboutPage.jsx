import React from "react";
import { motion } from "framer-motion";
import MainLayout from "../components/common/MainLayout";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent mb-6">
              About LuxeDrive
            </h1>
            <p className="text-xl text-textMuted max-w-2xl mx-auto leading-relaxed">
              Experience unparalleled luxury with our premium fleet. From
              supercars to executive sedans, every journey becomes
              extraordinary.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 mb-20"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                Premium Fleet
              </h3>
              <p className="text-textMuted leading-relaxed">
                Curated selection of the world's finest vehicles. Every car
                undergoes rigorous maintenance for flawless performance.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                24/7 Concierge
              </h3>
              <p className="text-textMuted leading-relaxed">
                Dedicated service team available around the clock. From delivery
                to white-glove handover, we handle every detail.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
