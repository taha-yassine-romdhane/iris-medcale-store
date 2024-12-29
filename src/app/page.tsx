import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import AboutSection from "@/components/home/AboutSection";
import BrandsSection from "@/components/home/BrandsSection";


export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <ProductsSection />
      <BrandsSection />
    </div>
  );
}