'use client';

import { Wrench, Truck, HeartPulse } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('servicesPage.services.service1.title'),
      description: t('servicesPage.services.service1.description'),
      icon: Truck,
    },
    {
      title: t('servicesPage.services.service2.title'),
      description: t('servicesPage.services.service2.description'),
      icon: Wrench,
    },
    {
      title: t('servicesPage.services.service3.title'),
      description: t('servicesPage.services.service3.description'),
      icon: HeartPulse,
    },
  ];

  const regions = t('servicesPage.regions', { returnObjects: true }) || [];
  
  return (
    <main className="pt-16 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {t('servicesPage.hero.title')}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
            {t('servicesPage.hero.description')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Main Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {t('servicesPage.mainContent.title')}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {t('servicesPage.mainContent.description1')}
                </p>

                <p className="text-gray-700 leading-relaxed mt-4">
                  {t('servicesPage.mainContent.description2')}
                </p>

                <p className="text-gray-700 leading-relaxed mt-4">
                  {t('servicesPage.mainContent.description3')}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t('servicesPage.mainContent.coverageTitle')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {regions.map((region, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-gray-700 text-sm">{region}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Services Cards */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold">
              {t('servicesPage.contact.title')}
            </h2>
          </div>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('servicesPage.contact.description')}
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            {t('aboutPage.cta.button')}
          </a>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;