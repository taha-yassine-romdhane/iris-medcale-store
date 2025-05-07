"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, X, Search } from 'lucide-react';

interface BookPageProps {
  src: string;
  alt: string;
  pageNumber: number;
  totalPages: number;
  isLeft?: boolean;
}

const BookPage: React.FC<BookPageProps> = ({ 
  src, 
  alt, 
  pageNumber, 
  totalPages,
  isLeft = false 
}) => {
  // State for modal visibility and zoom level
  const [showModal, setShowModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Handle zoom in/out
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setZoomLevel(1);

  // Open page in modal
  const openModal = () => {
    setShowModal(true);
    // Reset zoom when opening modal
    setZoomLevel(1);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div 
        className={`relative w-full h-full flex justify-center items-center ${isLeft ? 'page-left' : 'page-right'}`}
        onClick={openModal}
      >
        <div className="relative w-full h-full overflow-visible flex justify-center items-center group cursor-zoom-in">
          {/* Book page image */}
          <Image 
            src={src}
            alt={alt}
            width={1000}
            height={700}
            priority
            className="object-contain max-w-full max-h-full"
            style={{ objectFit: 'contain' }}
          />
          
          {/* Page number indicator - positioned differently based on left/right page */}
          <div className={`absolute bottom-2 ${isLeft ? 'left-4' : 'right-4'} bg-white/80 text-gray-700 px-2 py-1 rounded-md text-sm font-medium shadow-sm`}>
            {pageNumber} / {totalPages}
          </div>
          
          {/* Zoom indicator overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/80 p-2 rounded-full shadow-md">
              <Search className="w-6 h-6 text-blue-800" />
            </div>
          </div>
          
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 bg-[url('/subtle-paper-texture.png')] bg-cover mix-blend-overlay opacity-15 pointer-events-none"></div>
          
          {/* Page fold shadow */}
          <div className={`absolute inset-y-0 ${isLeft ? 'right-0' : 'left-0'} w-8 
            bg-gradient-to-${isLeft ? 'l' : 'r'} 
            from-transparent to-black/5 pointer-events-none`}></div>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="relative bg-white p-2 rounded-lg shadow-2xl max-w-[90vw] max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image container with zoom */}
              <div className="relative overflow-auto h-[80vh] flex items-center justify-center">
                <div 
                  className="transform-gpu transition-transform duration-200 ease-out cursor-move"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                  }}
                >
                  <Image 
                    src={src}
                    alt={alt}
                    width={1600}
                    height={1200}
                    priority
                    className="object-contain max-w-full"
                  />
                </div>
              </div>
              
              {/* Zoom controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-full shadow-lg p-2 flex space-x-2">
                <button 
                  onClick={zoomOut}
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                  aria-label="Zoom out"
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="w-5 h-5 text-blue-700" />
                </button>
                <button 
                  onClick={resetZoom}
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                  aria-label="Reset zoom"
                >
                  <div className="text-xs font-medium text-blue-700">{Math.round(zoomLevel * 100)}%</div>
                </button>
                <button 
                  onClick={zoomIn}
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                  aria-label="Zoom in"
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="w-5 h-5 text-blue-700" />
                </button>
              </div>
              
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-100 rounded-full transition-colors shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
              
              {/* Page info */}
              <div className="absolute top-3 left-3 bg-white/90 text-blue-900 px-3 py-1 rounded-full text-sm font-medium shadow-md">
                Page {pageNumber} of {totalPages}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookPage;
