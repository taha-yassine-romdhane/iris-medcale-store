'use client';
import { 
  Phone, 
  Mail,
  CheckCircle,
  Move3D,
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import Link from 'next/link';

export default function OxygenConcentratorGuide() {
  const { t } = useTranslation();

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          {t('blog.oxygenConcentrator.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('blog.oxygenConcentrator.description')}
        </p>
      </div>

      <div className="prose lg:prose-xl max-w-none">
        {/* Why Important Section */}
        <section className="mb-16 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            {t('blog.oxygenConcentrator.sections.whyImportant.title')}
          </h2>
          <p className="mb-4">
            {t('blog.oxygenConcentrator.sections.whyImportant.description')}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {t('blog.oxygenConcentrator.sections.whyImportant.points', { returnObjects: true }).map((point: string, index: number) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Selection Criteria */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200">
            {t('blog.oxygenConcentrator.sections.selectionCriteria.title')}
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-50">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <Move3D className="mr-2" size={24} />
                {t('blog.oxygenConcentrator.sections.selectionCriteria.mobility.title')}
              </h3>
              
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3 text-lg">
                    {t('blog.oxygenConcentrator.sections.selectionCriteria.mobility.fixedModels.title')}
                  </h4>
                  <ul className="space-y-2">
                    {t('blog.oxygenConcentrator.sections.selectionCriteria.mobility.fixedModels.pros', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        {item.startsWith('+') ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        ) : (
                          <span className="text-red-500 mr-2">•</span>
                        )}
                        <span>{item.replace(/^[+-]\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3 text-lg">
                    {t('blog.oxygenConcentrator.sections.selectionCriteria.mobility.portableModels.title')}
                  </h4>
                  <ul className="space-y-2">
                    {t('blog.oxygenConcentrator.sections.selectionCriteria.mobility.portableModels.pros', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        {item.startsWith('+') ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        ) : (
                          <span className="text-red-500 mr-2">•</span>
                        )}
                        <span>{item.replace(/^[+-]\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-xl text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{t('respiratoryTherapyBlog.ctaSection.title')}</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            {t('respiratoryTherapyBlog.ctaSection.description')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center justify-center"
            >
              <Mail className="mr-2" size={18} />
              {t('respiratoryTherapyBlog.ctaSection.appointmentButton')}
            </Link>
            <Link 
              href="tel:+21655820000" 
              className="border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-800 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2" size={18} />
              +216 55 820 000
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}