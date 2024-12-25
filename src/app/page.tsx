import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProductsSection from "@/components/home/ProductsSection";
import AboutSection from "@/components/home/AboutSection";
import BrandsSection from "@/components/home/BrandsSection";
import AppointmentSection from "@/components/home/AppointmentSection";

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <BrandsSection />
      <FeaturesSection />
      <ProductsSection />
      <AppointmentSection />
      <AboutSection />
    </div>
  );
}