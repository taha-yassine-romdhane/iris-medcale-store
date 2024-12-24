import { Truck, Shield, Clock } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Livraison Gratuite",
      description: "Sur toutes les commandes"
    },
    {
      icon: Shield,
      title: "Paiement Sécurisé",
      description: "Transactions 100% sécurisées"
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Assistance dédiée"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-gray-800 space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
