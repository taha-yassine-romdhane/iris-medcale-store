"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BookNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  isFlipping: boolean;
}

const BookNavigation: React.FC<BookNavigationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onClose,
  isFlipping
}) => {
  
  // Calculate if we're at the first or last spread
  const isFirstSpread = currentPage <= 0;
  const isLastSpread = currentPage >= totalPages - 2;
  
  return (
    <div className="w-full relative">
      {/* Close button */}
      <motion.button
        className="absolute -top-12 right-0 z-50 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
      
      {/* Navigation buttons */}
      <div className="flex justify-center items-center mt-8 space-x-6">
        <motion.button
          className={`bg-primary text-white py-2 px-6 rounded-full shadow flex items-center
            ${(isFirstSpread || isFlipping) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          onClick={onPrevious}
          disabled={isFirstSpread || isFlipping}
          whileHover={!isFirstSpread && !isFlipping ? { scale: 1.05 } : {}}
          whileTap={!isFirstSpread && !isFlipping ? { scale: 0.95 } : {}}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Précédent
        </motion.button>
        
        <div className="text-gray-700 font-medium">
          {/* Show spread numbers instead of single page numbers */}
          Pages <span className="font-bold">{currentPage + 1}-{Math.min(currentPage + 2, totalPages)}</span> sur {totalPages}
        </div>
        
        <motion.button
          className={`bg-primary text-white py-2 px-6 rounded-full shadow flex items-center
            ${(isLastSpread || isFlipping) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          onClick={onNext}
          disabled={isLastSpread || isFlipping}
          whileHover={!isLastSpread && !isFlipping ? { scale: 1.05 } : {}}
          whileTap={!isLastSpread && !isFlipping ? { scale: 0.95 } : {}}
        >
          Suivant
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
      
      {/* Download link */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <a 
          href="/catalogue.pdf" 
          download="Elite_Medicale_Catalogue.pdf"
          className="text-primary hover:text-blue-700 underline flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Télécharger le catalogue complet
        </a>
      </motion.div>
    </div>
  );
};

export default BookNavigation;
