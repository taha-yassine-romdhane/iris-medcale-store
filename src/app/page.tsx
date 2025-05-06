'use client'; // Add this to enable client-side interactivity

import { motion } from 'framer-motion';
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import BrandsSection from "@/components/home/BrandsSection";
import CatalogueFlipBook from "@/components/home/CatalogueFlipBook";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
       
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is visible
        variants={sectionVariants}
      >
        <HeroSection />
      </motion.div>

      {/* Products Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <ProductsSection />
      </motion.div>

      {/* Catalogue Flip Book Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <CatalogueFlipBook />
      </motion.div>

      {/* Brands Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <BrandsSection />
      </motion.div>
    </div>
  );
}