'use client';
import { 
  Filter, 
  Droplets, 
  Gauge, 
  ShieldCheck, 
  Puzzle, 
  Phone,
  Clock,
  Wind
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';

export default function MaintenanceGuide() {
  const { t } = useTranslation();
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          {t('maintenanceGuide.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('maintenanceGuide.description')}
        </p>
      </div>

      <div className="prose lg:prose-xl max-w-none">
        {/* Daily Maintenance */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
            <Droplets className="mr-3 text-blue-600" size={28} />
            {t('maintenanceGuide.dailyMaintenance.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <h3 className="text-lg font-medium text-blue-700 mb-4 flex items-center">
                <Filter className="h-5 w-5 text-blue-500 mr-2" />
                {t('maintenanceGuide.dailyMaintenance.maskCleaning.title')}
              </h3>
              <div className="flex mb-4">
                <Link href="/product/masque-facial-yf-02" className="block relative h-24 w-24 bg-gray-100 rounded overflow-hidden mr-4">
                  <Image 
                    src="https://utfs.io/f/Df43Y0C0ioj80Aeek5E5bGkro3SV7Be9E1uKXlpI0vyhxzOY"
                    alt="Masque Facial YUWELL"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </Link>
                <div>
                  <Link href="/product/masque-facial-yf-02" className="text-blue-700 font-medium hover:text-blue-800">Masque Facial YF-02</Link>
                  <p className="text-sm text-gray-600 mt-1">YUWELL</p>
                </div>
              </div>
              <ol className="space-y-3">
                {t('maintenanceGuide.dailyMaintenance.maskCleaning.steps', { returnObjects: true }).map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex-shrink-0">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50">
              <h3 className="text-lg font-medium text-blue-700 mb-4 flex items-center">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                {t('maintenanceGuide.dailyMaintenance.humidifier.title')}
              </h3>
              <div className="flex mb-4">
                <Link href="/product/humidificateur-löwenstein-prisma" className="block relative h-24 w-24 bg-gray-100 rounded overflow-hidden mr-4">
                  <Image 
                    src="https://utfs.io/f/AblcyIscdOCuUZ81xj2clMYfDQLsvKPyRXCndz0aN9m82OEB"
                    alt="Humidificateur Löwenstein"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </Link>
                <div>
                  <Link href="/product/humidificateur-löwenstein-prisma" className="text-blue-700 font-medium hover:text-blue-800">Humidificateur Löwenstein</Link>
                  <p className="text-sm text-gray-600 mt-1">Löwenstein</p>
                </div>
              </div>
              <ol className="space-y-3">
                {t('maintenanceGuide.dailyMaintenance.humidifier.steps', { returnObjects: true }).map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex-shrink-0">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Weekly Maintenance */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
            <Clock className="mr-3 text-blue-600" size={28} />
            {t('maintenanceGuide.weeklyMaintenance.title')}
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <Droplets className="h-6 w-6 text-blue-500 mr-2" />
                {t('maintenanceGuide.weeklyMaintenance.tubulures.title')}
              </h3>
              
              <div className="flex mb-4 space-x-4">
                <Link href="/product/tuyau-standard-22mm" className="block relative h-24 w-24 bg-gray-100 rounded overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <Wind className="text-blue-500" size={36} />
                  </div>
                </Link>
                <Link href="/product/tuyau-standard-15mm" className="block relative h-24 w-24 bg-gray-100 rounded overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <Wind className="text-blue-500" size={32} />
                  </div>
                </Link>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-blue-700 mb-2">{t('maintenanceGuide.weeklyMaintenance.tubulures.recommendedProducts')}</h4>
                <ul className="space-y-1">
                  <li className="text-sm">
                    <Link href="/product/tuyau-standard-22mm" className="text-blue-600 hover:text-blue-800">
                      {t('maintenanceGuide.weeklyMaintenance.tubulures.standardTubing22mm')}
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link href="/product/tuyau-standard-15mm" className="text-blue-600 hover:text-blue-800">
                      {t('maintenanceGuide.weeklyMaintenance.tubulures.standardTubing15mm')}
                    </Link>
                  </li>
                </ul>
              </div>
              
              <ul className="space-y-3">
                {t('maintenanceGuide.weeklyMaintenance.tubulures.steps', { returnObjects: true }).map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex-shrink-0">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <Filter className="h-6 w-6 text-blue-500 mr-2" />
                {t('maintenanceGuide.weeklyMaintenance.filters.title')}
              </h3>
              
              <div className="flex mb-4">
                <Link href="/product/filtre-standard-löwenstein" className="block relative h-24 w-24 bg-gray-100 rounded overflow-hidden mr-4">
                  <Image 
                    src="https://utfs.io/f/AblcyIscdOCuiK4oWgnDzMA749Qu0VfUOZLd6BTSb8kEhwIv"
                    alt={t('maintenanceGuide.weeklyMaintenance.filters.standardFilter')}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </Link>
                <div>
                  <Link href="/product/filtre-standard-löwenstein" className="text-blue-700 font-medium hover:text-blue-800">
                    {t('maintenanceGuide.weeklyMaintenance.filters.standardFilter')}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">Löwenstein</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {t('maintenanceGuide.weeklyMaintenance.filters.steps', { returnObjects: true }).map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex-shrink-0">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 flex items-center">
                  <ShieldCheck className="mr-2" size={16} />
                  {t('maintenanceGuide.weeklyMaintenance.filters.tip')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
            <ShieldCheck className="mr-3 text-blue-600" size={28} />
            {t('maintenanceGuide.troubleshooting.title')}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-all">
              <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                <Gauge className="h-5 w-5 text-blue-500 mr-2" />
                {t('maintenanceGuide.troubleshooting.unusualNoise.title')}
              </h3>
              <p className="text-gray-700 mb-4">{t('maintenanceGuide.troubleshooting.unusualNoise.description')}</p>
              <div className="flex items-center justify-between">
                <Link href="/product/filtre-standard-löwenstein" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <Filter className="mr-1" size={14} />
                  {t('maintenanceGuide.troubleshooting.unusualNoise.action')}
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-all">
              <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                <Wind className="h-5 w-5 text-blue-500 mr-2" />
                {t('maintenanceGuide.troubleshooting.oxygenFlowReduction.title')}
              </h3>
              <p className="text-gray-700 mb-4">{t('maintenanceGuide.troubleshooting.oxygenFlowReduction.description')}</p>
              <div className="flex items-center justify-between">
                <Link href="/product/tuyau-standard-22mm" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <Wind className="mr-1" size={14} />
                  {t('maintenanceGuide.troubleshooting.oxygenFlowReduction.action')}
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-all">
              <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                {t('maintenanceGuide.troubleshooting.maskLeaks.title')}
              </h3>
              <p className="text-gray-700 mb-4">{t('maintenanceGuide.troubleshooting.maskLeaks.description')}</p>
              <div className="flex items-center justify-between">
                <Link href="/masques" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <Droplets className="mr-1" size={14} />
                  {t('maintenanceGuide.troubleshooting.maskLeaks.action')}
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-all">
              <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                <Puzzle className="h-5 w-5 text-blue-500 mr-2" />
                {t('maintenanceGuide.troubleshooting.deviceFailure.title')}
              </h3>
              <p className="text-gray-700 mb-4">{t('maintenanceGuide.troubleshooting.deviceFailure.description')}</p>
              <div className="flex items-center justify-between">
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <Phone className="mr-1" size={14} />
                  {t('maintenanceGuide.troubleshooting.deviceFailure.action')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Schedule */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 pb-2 border-b border-blue-200 flex items-center">
            <Clock className="mr-3 text-blue-600" size={28} />
            {t('maintenanceGuide.maintenanceSchedule.title')}
          </h2>
          
          <div className="relative">
            <div className="sm:hidden text-xs text-gray-500 text-center mb-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {t('maintenanceGuide.maintenanceSchedule.scrollHint') || 'Faites défiler horizontalement pour voir tout le tableau'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0 p-1 rounded-xl shadow">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">{t('maintenanceGuide.maintenanceSchedule.element')}</th>
                        <th className="py-3 px-4 border-b text-left">{t('maintenanceGuide.maintenanceSchedule.frequency')}</th>
                        <th className="py-3 px-4 border-b text-left">{t('maintenanceGuide.maintenanceSchedule.action')}</th>
                        <th className="py-3 px-4 border-b text-left">{t('maintenanceGuide.maintenanceSchedule.recommendedProducts')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          item: t('maintenanceGuide.maintenanceSchedule.items.mask.name'), 
                          frequency: t('maintenanceGuide.maintenanceSchedule.items.mask.frequency'), 
                          action: t('maintenanceGuide.maintenanceSchedule.items.mask.action'),
                          product: {
                            name: t('maintenanceGuide.maintenanceSchedule.items.mask.product'),
                            link: '/product/masque-facial-yf-02'
                          }
                        },
                        {
                          item: t('maintenanceGuide.maintenanceSchedule.items.tubing.name'), 
                          frequency: t('maintenanceGuide.maintenanceSchedule.items.tubing.frequency'), 
                          action: t('maintenanceGuide.maintenanceSchedule.items.tubing.action'),
                          product: {
                            name: t('maintenanceGuide.maintenanceSchedule.items.tubing.product'),
                            link: '/product/tuyau-standard-22mm'
                          }
                        },
                        {
                          item: t('maintenanceGuide.maintenanceSchedule.items.filters.name'), 
                          frequency: t('maintenanceGuide.maintenanceSchedule.items.filters.frequency'), 
                          action: t('maintenanceGuide.maintenanceSchedule.items.filters.action'),
                          product: {
                            name: t('maintenanceGuide.maintenanceSchedule.items.filters.product'),
                            link: '/product/filtre-standard-löwenstein'
                          }
                        },
                        {
                          item: t('maintenanceGuide.maintenanceSchedule.items.humidifier.name'), 
                          frequency: t('maintenanceGuide.maintenanceSchedule.items.humidifier.frequency'), 
                          action: t('maintenanceGuide.maintenanceSchedule.items.humidifier.action'),
                          product: {
                            name: t('maintenanceGuide.maintenanceSchedule.items.humidifier.product'),
                            link: '/product/humidificateur-löwenstein-prisma'
                          }
                        },
                        {
                          item: t('maintenanceGuide.maintenanceSchedule.items.technicalCheck.name'), 
                          frequency: t('maintenanceGuide.maintenanceSchedule.items.technicalCheck.frequency'), 
                          action: t('maintenanceGuide.maintenanceSchedule.items.technicalCheck.action'),
                          product: {
                            name: t('maintenanceGuide.maintenanceSchedule.items.technicalCheck.product'),
                            link: '/contact'
                          }
                        }
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-3 px-4 border-b">{row.item}</td>
                          <td className="py-3 px-4 border-b">{row.frequency}</td>
                          <td className="py-3 px-4 border-b">{row.action}</td>
                          <td className="py-3 px-4 border-b">
                            <Link href={row.product.link} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              {row.product.name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-xl text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{t('maintenanceGuide.cta.title')}</h2>
          <p className="mb-6 max-w-2xl mx-auto">{t('maintenanceGuide.cta.description')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products?category=CPAP%2FPPC&subCategory=ACCESSOIRES" className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center justify-center">
              <Filter className="mr-2" size={18} />
              {t('maintenanceGuide.cta.accessories')}
            </Link>
            <Link href="/contact" className="border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-800 transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2" size={18} />
              {t('maintenanceGuide.cta.contact')}
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
