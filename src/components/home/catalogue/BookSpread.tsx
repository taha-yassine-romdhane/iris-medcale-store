"use client";

import React from 'react';
import BookPage from './BookPage';
import { motion } from 'framer-motion';

export interface PageData {
  src: string;
  alt: string;
  pageNumber: number;
}

interface BookSpreadProps {
  leftPage?: PageData | null;
  rightPage: PageData;
  totalPages: number;
  isFlipping: boolean;
  flipDirection: 'next' | 'prev' | null;
  nextPage?: PageData | null;
  prevPage?: PageData | null;
}

const BookSpread: React.FC<BookSpreadProps> = ({
  leftPage,
  rightPage,
  totalPages,
  isFlipping,
  flipDirection,
  nextPage,
  prevPage
}) => {
  return (
    <div className="relative w-full h-full flex flex-row items-stretch">
      {/* Book spine/binding */}
      <div className="absolute left-1/2 top-0 bottom-0 w-5 -translate-x-1/2 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 z-10 shadow-inner"></div>
      
      {/* Left page (verso) */}
      <div className="w-1/2 h-full overflow-hidden relative">
        {leftPage && (
          <div className="absolute inset-0 bg-white rounded-l-lg shadow-md">
            <BookPage
              src={leftPage.src}
              alt={leftPage.alt}
              pageNumber={leftPage.pageNumber}
              totalPages={totalPages}
              isLeft={true}
            />
          </div>
        )}
      </div>
      
      {/* Right page (recto) */}
      <div className="w-1/2 h-full overflow-hidden relative">
        <div className="absolute inset-0 bg-white rounded-r-lg shadow-md">
          <BookPage
            src={rightPage.src}
            alt={rightPage.alt}
            pageNumber={rightPage.pageNumber}
            totalPages={totalPages}
          />
        </div>
      </div>
      
      {/* Flipping page animation */}
      {isFlipping && (
        <>
          {/* The page being turned */}
          <motion.div 
            className={`absolute top-0 ${flipDirection === 'next' ? 'right-0' : 'left-0'} w-1/2 h-full bg-white z-20 origin-${flipDirection === 'next' ? 'left' : 'right'} shadow-xl rounded-${flipDirection === 'next' ? 'r' : 'l'}-lg`}
            initial={{ rotateY: flipDirection === 'next' ? 0 : -180 }}
            animate={{ rotateY: flipDirection === 'next' ? -180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ 
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute inset-0 bg-white">
              <BookPage
                src={flipDirection === 'next' ? rightPage.src : (leftPage ? leftPage.src : rightPage.src)}
                alt={flipDirection === 'next' ? rightPage.alt : (leftPage ? leftPage.alt : rightPage.alt)}
                pageNumber={flipDirection === 'next' ? rightPage.pageNumber : (leftPage ? leftPage.pageNumber : rightPage.pageNumber)}
                totalPages={totalPages}
                isLeft={flipDirection === 'prev'}
              />
            </div>
          </motion.div>
          
          {/* The reverse side of the flipping page */}
          <motion.div 
            className={`absolute top-0 ${flipDirection === 'next' ? 'right-0' : 'left-0'} w-1/2 h-full bg-white z-10 origin-${flipDirection === 'next' ? 'left' : 'right'} shadow-xl rounded-${flipDirection === 'next' ? 'r' : 'l'}-lg`}
            initial={{ rotateY: flipDirection === 'next' ? 180 : 0 }}
            animate={{ rotateY: flipDirection === 'next' ? 0 : 180 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ 
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute inset-0 bg-white">
              <BookPage
                src={flipDirection === 'next' ? (nextPage ? nextPage.src : rightPage.src) : (prevPage ? prevPage.src : leftPage ? leftPage.src : rightPage.src)}
                alt={flipDirection === 'next' ? (nextPage ? nextPage.alt : rightPage.alt) : (prevPage ? prevPage.alt : leftPage ? leftPage.alt : rightPage.alt)}
                pageNumber={flipDirection === 'next' ? (nextPage ? nextPage.pageNumber : rightPage.pageNumber) : (prevPage ? prevPage.pageNumber : leftPage ? leftPage.pageNumber : rightPage.pageNumber)}
                totalPages={totalPages}
                isLeft={flipDirection === 'next'}
              />
            </div>
          </motion.div>
          
          {/* Page turn shadow effect */}
          <div 
            className={`absolute top-0 ${flipDirection === 'next' ? 'left-0' : 'right-0'} w-1/2 h-full z-5 pointer-events-none
              bg-gradient-to-${flipDirection === 'next' ? 'r' : 'l'} from-black/10 to-transparent`}>
          </div>
        </>
      )}
    </div>
  );
};

export default BookSpread;
