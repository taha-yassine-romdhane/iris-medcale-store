import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import BrandsSection from "@/components/home/BrandsSection";

export default function HomePage() {
    return (
        <div className="pt-20">
            <HeroSection/>
            <ProductsSection/>
            <BrandsSection/>
        </div>
    );
}