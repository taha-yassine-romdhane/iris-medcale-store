'use client';

import { Settings, Database, RefreshCw, Package, BarChart, Shield } from 'lucide-react';

export default function SpaceProPage() {
  const features = [
    {
      icon: <Database className="w-6 h-6 text-gray-700" />,
      title: 'Gestion des Données Utilisateurs',
      description: 'Interface centralisée pour gérer toutes les informations patients et utilisateurs'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-gray-700" />,
      title: 'Suivi des Transferts',
      description: 'Traçabilité complète des équipements et interventions'
    },
    {
      icon: <Package className="w-6 h-6 text-gray-700" />,
      title: 'Gestion des Stocks',
      description: 'Inventaire en temps réel et gestion automatisée des commandes'
    },
    {
      icon: <BarChart className="w-6 h-6 text-gray-700" />,
      title: 'Analyse en Temps Réel',
      description: 'Tableaux de bord et rapports pour optimiser vos opérations'
    },
    {
      icon: <Shield className="w-6 h-6 text-gray-700" />,
      title: 'Sécurité Avancée',
      description: 'Conformité à la loi tunisienne sur la protection des données personnelles et sécurisation des données médicales'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Espace Professionnel
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Une plateforme complète pour les professionnels de santé permettant de gérer efficacement 
            les équipements médicaux, les patients et les services d'assistance respiratoire.
          </p>
        </div>

        {/* Status Banner */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Settings className="w-6 h-6 text-gray-700" />
            <span className="text-lg font-medium text-gray-900">En Cours de Développement</span>
          </div>
          <p className="text-gray-600 mb-4">
            Nous travaillons actuellement sur cette plateforme pour vous offrir la meilleure expérience possible.
          </p>
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Lancement prévu: Premier semestre 2025
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Fonctionnalités Prévues
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  {feature.icon}
                  <h3 className="font-medium text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-3">
            Intéressé par l'Espace Professionnel ?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour être informé du lancement et découvrir comment cette plateforme 
            peut optimiser la gestion de vos services médicaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Nous Contacter
            </a>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <a 
                href="tel:+21673820320" 
                className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              >
                (+216) 73 820 320
              </a>
              <a 
                href="tel:+21693945118" 
                className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              >
                (+216) 93 945 118
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}