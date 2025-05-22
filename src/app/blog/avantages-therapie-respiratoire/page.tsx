'use client';
import { 
  Heart, 
  Brain, 
  Zap, 
  Moon, 
  Clock, 
  Activity, 
  ShieldCheck, 
  Phone, 
  Mail,
  Users,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';

export default function RespiratoryTherapyBenefits() {
  const { t } = useTranslation();
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            {t('respiratoryTherapyBlog.pageTitle')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('respiratoryTherapyBlog.pageDescription')}
          </p>
          <div className="relative h-80 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src="/Respiratoire-2-1024x811.jpg"
              alt={t('respiratoryTherapyBlog.heroImageAlt')}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            {t('respiratoryTherapyBlog.introduction.title')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('respiratoryTherapyBlog.introduction.paragraph1')}
          </p>
          <p className="text-gray-700 mb-4">
            {t('respiratoryTherapyBlog.introduction.paragraph2')}
          </p>
        </section>

        {/* Key Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200">
            {t('respiratoryTherapyBlog.keyBenefits.title')}
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <div className="flex items-center mb-4">
                <div className="bg-red-50 p-3 rounded-full mr-4">
                  <Heart className="text-red-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{t('respiratoryTherapyBlog.keyBenefits.cardiovascularHealth.title')}</h3>
              </div>
              <p className="text-gray-700">
                {t('respiratoryTherapyBlog.keyBenefits.cardiovascularHealth.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <div className="flex items-center mb-4">
                <div className="bg-purple-50 p-3 rounded-full mr-4">
                  <Brain className="text-purple-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{t('respiratoryTherapyBlog.keyBenefits.cognitiveFunction.title')}</h3>
              </div>
              <p className="text-gray-700">
                {t('respiratoryTherapyBlog.keyBenefits.cognitiveFunction.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-50 p-3 rounded-full mr-4">
                  <Zap className="text-yellow-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{t('respiratoryTherapyBlog.keyBenefits.energyLevels.title')}</h3>
              </div>
              <p className="text-gray-700">
                {t('respiratoryTherapyBlog.keyBenefits.energyLevels.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <div className="flex items-center mb-4">
                <div className="bg-blue-50 p-3 rounded-full mr-4">
                  <Moon className="text-blue-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{t('respiratoryTherapyBlog.keyBenefits.sleepQuality.title')}</h3>
              </div>
              <p className="text-gray-700">
                {t('respiratoryTherapyBlog.keyBenefits.sleepQuality.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Long-term Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200">
            {t('respiratoryTherapyBlog.longTermBenefits.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-green-50 p-2 rounded-full mr-4 mt-1">
                <Clock className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('respiratoryTherapyBlog.longTermBenefits.lifeExpectancy.title')}</h3>
                <p className="text-gray-700">
                  {t('respiratoryTherapyBlog.longTermBenefits.lifeExpectancy.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-50 p-2 rounded-full mr-4 mt-1">
                <Activity className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('respiratoryTherapyBlog.longTermBenefits.diseaseProgression.title')}</h3>
                <p className="text-gray-700">
                  {t('respiratoryTherapyBlog.longTermBenefits.diseaseProgression.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-50 p-2 rounded-full mr-4 mt-1">
                <Activity className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('respiratoryTherapyBlog.longTermBenefits.exerciseCapacity.title')}</h3>
                <p className="text-gray-700">
                  {t('respiratoryTherapyBlog.longTermBenefits.exerciseCapacity.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-50 p-2 rounded-full mr-4 mt-1">
                <Users className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('respiratoryTherapyBlog.longTermBenefits.socialRelationships.title')}</h3>
                <p className="text-gray-700">
                  {t('respiratoryTherapyBlog.longTermBenefits.socialRelationships.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Respiratory Therapies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200">
            {t('respiratoryTherapyBlog.therapyTypes.title')}
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{t('respiratoryTherapyBlog.therapyTypes.oxygenTherapy.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('respiratoryTherapyBlog.therapyTypes.oxygenTherapy.description')}
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <Link href="/blog/choisir-concentrateur-oxygene" className="flex items-center hover:text-blue-800 transition-colors">
                  {t('respiratoryTherapyBlog.therapyTypes.oxygenTherapy.learnMore')}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{t('respiratoryTherapyBlog.therapyTypes.cpapTherapy.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('respiratoryTherapyBlog.therapyTypes.cpapTherapy.description')}
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <Link href="/blog/oxygenotherapie-cpap" className="flex items-center hover:text-blue-800 transition-colors">
                  {t('respiratoryTherapyBlog.therapyTypes.cpapTherapy.discover')}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{t('respiratoryTherapyBlog.therapyTypes.nebulization.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('respiratoryTherapyBlog.therapyTypes.nebulization.description')}
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <Link href="/products?category=Nébuliseurs" className="flex items-center hover:text-blue-800 transition-colors">
                  {t('respiratoryTherapyBlog.therapyTypes.nebulization.discover')}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200">
            {t('respiratoryTherapyBlog.testimonials.title')}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-blue-50 p-6 rounded-xl relative">
              <div className="text-blue-300 absolute top-4 left-4 text-4xl">&quot;</div>
              <div className="ml-6 mt-2">
                <p className="text-gray-700 italic mb-4">
                  {t('respiratoryTherapyBlog.testimonials.testimonial1.quote')}
                </p>
                <p className="text-blue-800 font-medium">{t('respiratoryTherapyBlog.testimonials.testimonial1.author')}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl relative">
              <div className="text-blue-300 absolute top-4 left-4 text-4xl">&quot;</div>
              <div className="ml-6 mt-2">
                <p className="text-gray-700 italic mb-4">
                  {t('respiratoryTherapyBlog.testimonials.testimonial2.quote')}
                </p>
                <p className="text-blue-800 font-medium">{t('respiratoryTherapyBlog.testimonials.testimonial2.author')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance and Compliance */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200">
            {t('respiratoryTherapyBlog.maintenance.title')}
          </h2>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <ShieldCheck className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-blue-800">{t('respiratoryTherapyBlog.maintenance.regularMaintenance.title')}</h3>
            </div>
            <p className="text-gray-700 mb-4">
              {t('respiratoryTherapyBlog.maintenance.regularMaintenance.description')}
            </p>
            <div className="flex items-center text-blue-600 font-medium">
              <Link href="/blog/entretien-equipement-respiratoire" className="flex items-center hover:text-blue-800 transition-colors">
                {t('respiratoryTherapyBlog.maintenance.regularMaintenance.linkText')}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <Clock className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-blue-800">{t('respiratoryTherapyBlog.maintenance.treatmentCompliance.title')}</h3>
            </div>
            <p className="text-gray-700 mb-4">
              {t('respiratoryTherapyBlog.maintenance.treatmentCompliance.description1')}
            </p>
            <p className="text-gray-700">
              {t('respiratoryTherapyBlog.maintenance.treatmentCompliance.description2')}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-xl text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{t('respiratoryTherapyBlog.ctaSection.title')}</h2>
          <p className="mb-6 max-w-2xl mx-auto">{t('respiratoryTherapyBlog.ctaSection.description')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center justify-center">
              <Mail className="mr-2" size={18} />
              {t('respiratoryTherapyBlog.ctaSection.appointmentButton')}
            </Link>
            <Link href="tel:+21655820000" className="border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-800 transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2" size={18} />
              +216 55 820 000
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
