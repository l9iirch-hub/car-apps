import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden animate-pulse flex flex-col h-full">
      <div className="aspect-[4/3] bg-surfaceLight/50" />
      <div className="p-6 flex-grow flex flex-col">
        <div className="h-4 bg-surfaceLight/50 rounded w-1/4 mb-4" />
        <div className="h-7 bg-surfaceLight/50 rounded w-3/4 mb-4" />
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-16 bg-surfaceLight/50 rounded" />
          <div className="h-6 w-16 bg-surfaceLight/50 rounded" />
          <div className="h-6 w-20 bg-surfaceLight/50 rounded" />
        </div>
        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between">
          <div className="h-4 bg-surfaceLight/50 rounded w-16" />
          <div className="h-4 bg-surfaceLight/50 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
