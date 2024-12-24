import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              À Propos de Notre Entreprise
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nous sommes spécialisés dans la fourniture d'équipements médicaux de haute qualité pour améliorer votre qualité de vie. Notre engagement envers l'excellence et le service client nous distingue.
            </p>
            
            {/* Key Highlights */}
            <div className="space-y-4">
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3 h-6 w-6" />
                <span className="text-gray-800">Qualité Supérieure</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3 h-6 w-6" />
                <span className="text-gray-800">Service Personnalisé</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3 h-6 w-6" />
                <span className="text-gray-800">Innovation Constante</span>
              </div>
            </div>

            {/* Call to Action */}
            <Link
              href="/a-propos"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              En savoir plus
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>

          {/* Image Section */}
          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?q=80&w=800" 
              alt="À Propos de Notre Entreprise" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-900 opacity-20 group-hover:opacity-10 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}