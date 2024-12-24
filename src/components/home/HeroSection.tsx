'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const heroProducts = [
  {
    id: 1,
    title: "Machine CPAP Pro",
    description: "Solution avancée pour l'apnée du sommeil avec technologie intelligente",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=1200",
    link: "/produits/cpap-pro",
    highlight: "Nouveau",
    price: "899,99 DT"
  },
  {
    id: 2,
    title: "Concentrateur d'Oxygène Premium",
    description: "Oxygénothérapie de haute performance pour un confort optimal",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1200",
    link: "/produits/concentrateur-oxygene",
    highlight: "Populaire",
    price: "1299,99 DT"
  },
  {
    id: 3,
    title: "Masque Nasal Confort+",
    description: "Masque ergonomique avec coussin en silicone pour un ajustement parfait",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1200",
    link: "/produits/masque-nasal",
    highlight: "Meilleure vente",
    price: "199,99 DT"
  },
  {
    id: 4,
    title: "Solution Anti-Ronflement Avancée",
    description: "Technologie innovante pour des nuits paisibles et silencieuses",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=1200",
    link: "/produits/anti-ronflement",
    highlight: "Promotion",
    price: "149,99 DT"
  },
  {
    id: 5,
    title: "Kit Complet Thérapie Respiratoire",
    description: "Ensemble complet pour une thérapie respiratoire optimale",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=1200",
    link: "/produits/kit-therapie",
    highlight: "Pack complet",
    price: "1499,99 DT"
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === heroProducts.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? heroProducts.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="relative h-[500px] overflow-hidden mt-16">
      {/* Background Images */}
      {heroProducts.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-all duration-700 ease-out transform
            ${index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
        >
          <Image
            src={product.image}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4">
        <div className="h-full flex items-center">
          <div className="max-w-xl space-y-6">
            <div 
              className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm text-white
                transform transition-all duration-500 hover:scale-105"
            >
              {heroProducts[currentIndex].highlight}
            </div>
            <h1 className="text-6xl font-bold text-white transition-all duration-500 ease-out transform">
              {heroProducts[currentIndex].title}
            </h1>
            <p className="text-xl text-white/90 transition-all duration-500 ease-out transform">
              {heroProducts[currentIndex].description}
            </p>
            <div className="flex items-center gap-6">
              <span className="text-3xl font-bold text-white">{heroProducts[currentIndex].price}</span>
              <Link 
                href={heroProducts[currentIndex].link}
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold 
                  hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Découvrir
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 
          rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 
          disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 
          rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 
          disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {heroProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${index === currentIndex 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
