'use client';
import {  
  Bed, 
  Wind, 
  Filter, 
  ShieldCheck, 
  Stethoscope, 
  Clock, 
  Battery, 
  Droplets, 
  Phone, 
  Mail,
  Puzzle,
  Video,
  MessageCircleQuestion
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

export default function OxygenTherapyPage() {
  const { t } = useTranslation();
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          {t('oxygenTherapyPage.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('oxygenTherapyPage.description')}
        </p>
      </div>

      <div className="prose lg:prose-xl max-w-none">
        {/* Introduction */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
            <Puzzle className="mr-3 text-blue-600" size={28} />
            {t('oxygenTherapyPage.introduction.title')}
          </h2>
          <p className="mb-4">{t('oxygenTherapyPage.introduction.description')}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {t('oxygenTherapyPage.introduction.conditions', { returnObjects: true }).map((condition: string, index: number) => (
              <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                {index === 0 && <Bed className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />}
                {index === 1 && <Puzzle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />}
                {index === 2 && <Wind className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />}
                {index === 3 && <Stethoscope className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />}
                <span>{condition}</span>
              </li>
            ))}
          </ul>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="font-medium text-blue-800 flex items-center">
              <ShieldCheck className="mr-2 text-blue-600" size={20} />
              {t('oxygenTherapyPage.introduction.expertTip.title')}
            </p>
            <p>{t('oxygenTherapyPage.introduction.expertTip.description')}</p>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200 flex items-center">
            <Stethoscope className="mr-3 text-blue-600" size={28} />
            {t('oxygenTherapyPage.equipment.title')}
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <Puzzle className="h-6 w-6 text-blue-500 mr-2" />
                {t('oxygenTherapyPage.equipment.oxygenConcentrators.title')}
              </h3>
              <p className="mb-4">{t('oxygenTherapyPage.equipment.oxygenConcentrators.description')}</p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center">
                    <Clock size={14} className="mr-1" /> {t('oxygenTherapyPage.equipment.oxygenConcentrators.new')}
                  </span>
                  {t('oxygenTherapyPage.equipment.oxygenConcentrators.portableModel')}
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center">
                    <ShieldCheck size={14} className="mr-1" /> {t('oxygenTherapyPage.equipment.oxygenConcentrators.bestSeller')}
                  </span>
                  {t('oxygenTherapyPage.equipment.oxygenConcentrators.homeOxPro')}
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center">
                    <Battery size={14} className="mr-1" /> {t('oxygenTherapyPage.equipment.oxygenConcentrators.autonomy')}
                  </span>
                  {t('oxygenTherapyPage.equipment.oxygenConcentrators.longBattery')}
                </li>
              </ul>
              <Link href="/products?category=CONCENTRATEURS+D%27OXYGENE" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                {t('oxygenTherapyPage.equipment.oxygenConcentrators.viewConcentrators')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <Wind className="h-6 w-6 text-blue-500 mr-2" />
                {t('oxygenTherapyPage.equipment.cpapMachines.title')}
              </h3>
              <p className="mb-4">{t('oxygenTherapyPage.equipment.cpapMachines.description')}</p>
              <ul className="space-y-3 mb-4">
                {t('oxygenTherapyPage.equipment.cpapMachines.features', { returnObjects: true }).map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/products?category=CPAP%2FPPC&subCategory=APPAREILS" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                {t('oxygenTherapyPage.equipment.cpapMachines.title')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Video/FAQ Section */}
        <section className="mb-16 bg-blue-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">{t('oxygenTherapyPage.resources.title')}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center"><Video className="mr-2" size={20} /> {t('oxygenTherapyPage.resources.videoDemo.title')}</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dEANrQTiY-A"
                  title={t('oxygenTherapyPage.resources.videoDemo.videoTitle')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-2 text-sm text-gray-600">{t('oxygenTherapyPage.resources.videoDemo.description')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center"><MessageCircleQuestion className="mr-2" size={20} /> {t('oxygenTherapyPage.resources.faq.title')}</h3>
              <div className="space-y-4">
                {(t('oxygenTherapyPage.resources.faq.questions', { returnObjects: true }) as unknown as Array<{question: string, answer: string}>).map((item: {question: string, answer: string}, index: number) => (
                  <div key={index}>
                    <p className="font-medium text-blue-800">{item.question}</p>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CPAP Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200 flex items-center">
            <Bed className="mr-3 text-blue-600" size={28} />
            {t('oxygenTherapyPage.products.title')}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {(t('oxygenTherapyPage.products.models', { returnObjects: true }) as unknown as Array<{name: string, type: string, features: string[]}>).map((product, index) => {
              // Add links based on product name
              const links = {
                'YUWELL YH-550': '/product/yh-550',
                'YUWELL YH-350': '/product/yh-350',
                'YUWELL YH-680': '/product/cpap-yh-680'
              };
              const link = links[product.name as keyof typeof links] || '/products';
              
              return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-blue-800 text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.type}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Bed className="text-blue-600" size={24} />
                  </div>
                </div>
                
                <ul className="space-y-2 mb-5">
                  {product.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start">
                      <ShieldCheck className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href={link} className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition-colors font-medium">
                  {t('oxygenTherapyPage.products.viewProduct')}
                </Link>
              </div>
            );})}
          </div>
        </section>

 
        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-xl text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{t('oxygenTherapyPage.cta.title')}</h2>
          <p className="mb-6 max-w-2xl mx-auto">{t('oxygenTherapyPage.cta.description')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center justify-center">
              <Mail className="mr-2" size={18} />
              {t('oxygenTherapyPage.cta.contactExpert')}
            </Link>
            <Link href="tel:+21655820000" className="border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-800 transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2" size={18} />
              {t('oxygenTherapyPage.cta.phone')}
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
            <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {t('oxygenTherapyPage.relatedArticles.title')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/blog/choisir-concentrateur-oxygene" className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                <Puzzle className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">{t('oxygenTherapyPage.relatedArticles.concentratorGuide.title')}</h3>
                <p className="text-sm text-gray-600">{t('oxygenTherapyPage.relatedArticles.concentratorGuide.description')}</p>
              </div>
            </Link>
            <Link href="/blog/entretien-equipement-respiratoire" className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                <Filter className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">{t('oxygenTherapyPage.relatedArticles.maintenanceGuide.title')}</h3>
                <p className="text-sm text-gray-600">{t('oxygenTherapyPage.relatedArticles.maintenanceGuide.description')}</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}