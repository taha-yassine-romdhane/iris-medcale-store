'use client';
import Image from 'next/image';
import { Heart, Users, Trophy, Target, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const values = [
  {
    icon: Heart,
    title: "patientCommitment",
    description: "patientCommitmentDescription"
  },
  {
    icon: Users,
    title: "experiencedTeam",
    description: "experiencedTeamDescription"
  },
  {
    icon: Trophy,
    title: "medicalExcellence",
    description: "medicalExcellenceDescription"
  },
  {
    icon: Target,
    title: "personalizedService",
    description: "personalizedServiceDescription"
  }
];

const keyPoints = [
  "keyPoint1",
  "keyPoint2",
  "keyPoint3",
  "keyPoint4",
  "keyPoint5",
  "keyPoint6",
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="pt-16 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {t('aboutPage.hero.title')}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
            {t('aboutPage.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {t('aboutPage.mission.title')}
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('aboutPage.mission.description')}
              </p>
              <div className="space-y-3 pt-4">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">{t(`aboutPage.mission.keyPoints.${point}`)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-gray-200">
              <Image
                src="/Respiratoire-2-1024x811.jpg"
                alt={t('aboutPage.mission.imageAlt')}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('aboutPage.values.title')}
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                  <value.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t(`aboutPage.values.${value.title}.title`)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(`aboutPage.values.${value.title}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CNAM Collaboration Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {t('aboutPage.cnam.title')}
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('aboutPage.cnam.description')}
              </p>
              <div className="space-y-3 pt-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">
                      {t(`aboutPage.cnam.bullet${index}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden border border-gray-200 bg-white p-8 flex items-center justify-center">
              <Image
                src="/CNAM_Tunisie.jpg"
                alt={t('aboutPage.cnam.imageAlt')}
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {t('aboutPage.coverage.title')}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {t('aboutPage.coverage.description')}
                </p>
                <div className="grid grid-cols-1 gap-4 pt-4">
                  {/* North Region */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">{t('aboutPage.coverage.northRegion')}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["capBon", "zaghouen"].map((region, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-gray-700 text-sm">{t(`aboutPage.coverage.regions.${region}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center Region */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">{t('aboutPage.coverage.centerRegion')}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["sousse", "monastir", "mehdia", "kairouan", "sidiBouzid", "gafsa"].map((region, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-gray-700 text-sm">{t(`aboutPage.coverage.regions.${region}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* South Region */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">{t('aboutPage.coverage.southRegion')}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["kasserine", "touzeur", "mednin", "jerba", "gabes"].map((region, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-gray-700 text-sm">{t(`aboutPage.coverage.regions.${region}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] p-6 flex items-center justify-center bg-white">
                <div className="relative w-full h-full max-w-[400px]">
                  <Image
                    src="/tn-04.png"
                    alt={t('aboutPage.coverage.imageAlt')}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold">
              {t('aboutPage.cta.title')}
            </h2>
          </div>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('aboutPage.cta.subtitle')}
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
}