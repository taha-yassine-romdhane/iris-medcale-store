'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';
import { Phone, MessageCircle, Clock } from 'lucide-react';

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {t('home.cta.title')}
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Phone className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="font-medium text-gray-900">
              {t('home.cta.features.expert.title')}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('home.cta.features.expert.description')}
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <MessageCircle className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="font-medium text-gray-900">
              {t('home.cta.features.personalized.title')}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('home.cta.features.personalized.description')}
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Clock className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="font-medium text-gray-900">
              {t('home.cta.features.support.title')}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('home.cta.features.support.description')}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            {t('home.cta.contactButton')}
          </Link>
          
          <p className="text-sm text-gray-500 mt-4">
            {t('home.cta.responseTime')}
          </p>
        </div>

        {/* Contact info */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-2">
            {t('home.cta.needHelp')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
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
    </section>
  );
}