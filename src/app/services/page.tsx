import Image from 'next/image';
import { MapPin, Clock, Wrench, Phone, Truck, HeartPulse } from 'lucide-react';

const services = [
  {
    title: "Service à Domicile",
    description: "Installation et maintenance d'équipements médicaux directement chez vous",
    icon: Truck,
  },
  {
    title: "Support Technique 24/7",
    description: "Une équipe technique qualifiée disponible en permanence",
    icon: Wrench,
  },
  {
    title: "Suivi Personnalisé",
    description: "Un accompagnement adapté à vos besoins spécifiques",
    icon: HeartPulse,
  },
];

const regions = [
  "Sousse",
  "Monastir",
  "Mahdia",
  "Cap Bon",
  "Grand Tunis",
];

export default function ServicesPage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Services d'Oxygénothérapie Professionnels
          </h1>
          <p className="text-xl max-w-2xl">
            Solutions médicales spécialisées pour les patients nécessitant une assistance respiratoire,
            avec un service personnalisé à domicile pour votre confort et bien-être.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Main Description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Notre Expertise à Votre Service
              </h2>
              <p className="text-lg text-gray-700">
                Nous sommes une société spécialisée en oxygénothérapie, offrant des solutions
                médicales pour les patients nécessitant une assistance respiratoire. Nous
                proposons un service à domicile personnalisé pour garantir le confort et le bien-être
                de nos patients.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Zones de Couverture
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {regions.map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{region}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Services Grid */}
            <div className="grid gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Besoin d'Assistance ?
            </h2>
            <p className="text-lg text-gray-600">
              Notre équipe est disponible 24/7 pour répondre à vos besoins
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 bg-white px-8 py-4 rounded-full shadow-md">
              <Phone className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">+216 XX XXX XXX</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
