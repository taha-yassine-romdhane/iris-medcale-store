'use client';
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroProducts = [
  {
    id: 1,
    image: "/hero section/slider3.jpeg",
    position: "center",
    alt: "cm5y5bbek0004l103t3bmd9dn",
  },
  {
    id: 2,
    image: "/hero section/slider4.jpeg",
    position: "center",
    alt: "cm5y5zi2g0000mn03a508mb4y",
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
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full overflow-hidden mb-2 sm:mb-8">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {heroProducts.map((product, index) => (
          <div
            key={product.id}
            className="relative w-full flex-shrink-0"
          >
            <Link href={`/product/${product.alt}`}>
              <div className="relative w-full h-full cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={0}
                  height={0}
                  className="object-contain w-full h-fit"
                  style={{ objectPosition: product.position }} // Adjust image position
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Hidden on Mobile */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:block absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Pagination Dots - Improved for Mobile */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}