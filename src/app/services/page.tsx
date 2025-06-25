'use client';

import { MapPin, Wrench, Truck, HeartPulse } from 'lucide-react';
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
    <main>
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('servicesPage.hero.title')}
          </h1>
          <p className="text-xl max-w-2xl">
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
              <h2 className="text-3xl font-bold text-gray-900">
                {t('servicesPage.mainContent.title')}
              </h2>
              <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('servicesPage.mainContent.description1')}
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  {t('servicesPage.mainContent.description2')}
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  {t('servicesPage.mainContent.description3')}
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  {t('servicesPage.mainContent.coverageTitle')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {regions.map((region, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{region}</span>
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
                  className="bg-green-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <service.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
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
              {t('servicesPage.contact.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('servicesPage.contact.description')}
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {t('aboutPage.cta.button')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;