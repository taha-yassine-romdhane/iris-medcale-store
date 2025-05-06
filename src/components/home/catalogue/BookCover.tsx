"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BookCoverProps {
  onOpen: () => void;
}

const BookCover: React.FC<BookCoverProps> = ({ onOpen }) => {
  // State to track actual image dimensions for better proportions
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Effect to pre-load the image and get its dimensions
  useEffect(() => {
    const img = new window.Image();
    img.src = '/catalogue-pages/catalogue-cover.webp';
    img.onload = () => {
      setImageDimensions({
        width: img.width,
        height: img.height
      });
    };
  }, []);

  // Calculate aspect ratio for better display
  const aspectRatio = imageDimensions.height / imageDimensions.width || 1.4;
  
  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Larger dimensions for the book cover */}
      <div 
        className="w-80 sm:w-96 md:w-[600px] relative shadow-2xl rounded-lg overflow-hidden bg-blue-50 border border-gray-300 transform rotate-2"
        style={{ 
          height: `${Math.round(aspectRatio * 610)}px`,
          maxHeight: '1000px'
        }}
      >
        {/* Book Cover */}
        <div className="relative w-full h-full">
          <Image 
            src="/catalogue-pages/catalogue-cover.webp"
            alt="Catalogue Cover"
            fill
            className="object-cover" // Changed to cover for better image fitting
            priority
            quality={100} // Higher quality for sharper image
          />
          
          {/* Overlay effect - subtle gradient for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent pointer-events-none" />
        </div>
        
        {/* Book spine effect - enhanced with texture */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-blue-900 to-blue-800">
          {/* Spine texture */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1h1v1H1V1zm2 2h1v1H3V3z\' fill=\'%23fff\'/%3E%3C/svg%3E")' }}>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.span
          className="inline-block bg-blue-900 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          Parcourir le catalogue
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default BookCover;
