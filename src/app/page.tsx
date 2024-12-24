import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProductsSection from "@/components/home/ProductsSection";
import AboutSection from "@/components/home/AboutSection";
import BrandsSection from "@/components/home/BrandsSection";

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <BrandsSection />
      <FeaturesSection />
      <ProductsSection />
      <AboutSection />
    </div>
  );
}