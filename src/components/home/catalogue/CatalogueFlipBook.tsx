"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BookCover from './BookCover';
import BookSpread from './BookSpread';
import BookNavigation from './BookNavigation';
import { PageData } from './BookSpread';

const CatalogueFlipBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<PageData[]>([]);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);

  // Load all page images and create the page array
  useEffect(() => {
    const loadPages = async () => {
      setLoading(true);
      try {
        // Use the cover as the first page
        const pageData: PageData[] = [
          {
            src: '/catalogue-pages/catalogue-cover.webp',
            alt: 'Catalogue Cover',
            pageNumber: 1
          }
        ];
        
        // Add all interior pages (we need to ensure proper numbering)
        for (let i = 1; i <= 16; i++) {
          pageData.push({
            src: `/catalogue-pages/page-${i}.webp`,
            alt: `Page ${i}`,
            pageNumber: i + 1 // +1 because cover is page 1
          });
        }
        
        setPages(pageData);
        setTotalPages(pageData.length);
      } catch (error) {
        console.error('Error loading catalogue pages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPages();
  }, []);

  // Handle opening the book
  const handleOpenBook = () => {
    setIsOpen(true);
    setCurrentPage(0); // Start at the cover page
  };

  // Handle closing the book
  const handleCloseBook = () => {
    setIsOpen(false);
    setCurrentPage(0);
  };

  // Page turning logic (move by 2 pages at a time for proper book spreads)
  const handlePageTurn = (newPage: number) => {
    // Don't allow page turns during animations or for invalid pages
    if (newPage < 0 || newPage >= totalPages || flipping) {
      return;
    }

    // Determine if going forward or backward
    setFlipDirection(newPage > currentPage ? 'next' : 'prev');
    setFlipping(true);
    
    // Animate page turn and then update state
    setTimeout(() => {
      setCurrentPage(newPage);
      setFlipping(false);
      setFlipDirection(null);
    }, 500); // Match this with animation duration in motion elements
  };

  // Handle previous page - move by 2 for proper spread navigation
  const handlePrevPage = () => {
    const newPage = Math.max(0, currentPage - 2);
    handlePageTurn(newPage);
  };

  // Handle next page - move by 2 for proper spread navigation
  const handleNextPage = () => {
    const newPage = Math.min(totalPages - 1, currentPage + 2);
    handlePageTurn(newPage);
  };

  // Helpers to determine pages in current spread
  const getCurrentLeftPage = () => {
    // Left page exists only if we're beyond the cover
    return currentPage > 0 && currentPage - 1 < pages.length 
      ? pages[currentPage - 1] 
      : null;
  };

  const getCurrentRightPage = () => {
    // Right page is the current page, if it exists
    return currentPage < pages.length 
      ? pages[currentPage] 
      : null;
  };

  const getNextPage = () => {
    // Next page is 2 pages ahead (for the next spread)
    return currentPage + 2 < pages.length 
      ? pages[currentPage + 2] 
      : null;
  };

  const getPrevPage = () => {
    // Previous page is 2 pages back (for the previous spread)
    return currentPage - 2 >= 0 
      ? pages[currentPage - 2] 
      : null;
  };

  return (
    <div className="w-full my-16 flex flex-col items-center justify-center">
      <motion.h2 
        className="text-3xl  text-blue-900 font-semibold text-center mb-8 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Catalogue Yuwell
      </motion.h2>
      
      {/* Show either the cover or the open book */}
      {!isOpen ? (
        <BookCover onOpen={handleOpenBook} />
      ) : (
        <div className="relative w-full max-w-5xl pb-12">
          {/* Main book container with proper proportions */}
          <div className="relative w-full bg-transparent mx-auto my-8">
            {/* Book shadow for realism */}
            <div className="absolute -bottom-8 left-[10%] right-[10%] h-12 bg-black/20 blur-xl rounded-full z-0"></div>
            
            {/* Book container - using Tailwind for styling */}
            <div className="relative rounded-lg overflow-hidden z-10 bg-white shadow-2xl perspective-[2000px]">
              {loading ? (
                <div className="w-full aspect-[3.2/1] flex items-center justify-center min-h-[450px]">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="w-full aspect-[3.2/1] bg-gradient-to-b from-gray-50 to-white relative overflow-visible min-h-[450px]">
                  <BookSpread
                    leftPage={getCurrentLeftPage()}
                    rightPage={getCurrentRightPage() || pages[0]} // Fallback to first page
                    totalPages={totalPages}
                    isFlipping={flipping}
                    flipDirection={flipDirection}
                    nextPage={getNextPage()}
                    prevPage={getPrevPage()}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation controls for the book */}
          <BookNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevPage}
            onNext={handleNextPage}
            onClose={handleCloseBook}
            isFlipping={flipping}
          />
        </div>
      )}
    </div>
  );
};

export default CatalogueFlipBook;