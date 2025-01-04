'use client';
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroProducts = [
  {
    id: 1,
    image: "/hero section/Untitled Project.png", // Fixed image path
  },
  {
    id: 2,
    image: "/hero section/Untitled Project 2.png", // Fixed image path
  },
  {
    id: 3,
    image: "/hero section/Untitled Project 3.png", // Fixed image path
  },
  {
    id: 4,
    image: "/hero section/Untitled Project 4.png", // Fixed image path
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === heroProducts.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Match the transition duration
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroProducts.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Match the transition duration
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500); // Match the transition duration
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[500px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {heroProducts.map((product, index) => (
          <div
            key={product.id}
            className="relative w-full h-[500px] sm:h-[500px] md:h-[600px] flex-shrink-0"
          >
            <Image
              src={product.image}
              alt="Hero Image"
              fill
              className="object-cover w-full h-full"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}