'use client';
import Image from 'next/image';
import { Heart, Users, Trophy, Target, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

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
  "keyPoint6"
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('aboutPage.hero.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {t('aboutPage.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {t('aboutPage.mission.title')}
              </h2>
              <p className="text-lg text-gray-700">
                {t('aboutPage.mission.description')}
              </p>
              <div className="space-y-4">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{t(`aboutPage.mission.keyPoints.${point}`)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
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
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('aboutPage.values.title')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t(`aboutPage.values.${value.title}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`aboutPage.values.${value.title}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CNAM Collaboration Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {t('aboutPage.cnam.title')}
              </h2>
              <p className="text-lg text-gray-700">
                {t('aboutPage.cnam.description')}
              </p>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      {t(`aboutPage.cnam.bullet${index}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg bg-white p-8">
              <Image
                src="/CNAM_Tunisie.jpg"
                alt={t('aboutPage.cnam.imageAlt')}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {t('aboutPage.coverage.title')}
                </h2>
                <p className="text-lg text-gray-700">
                  {t('aboutPage.coverage.description')}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">
                      {t('aboutPage.coverage.northRegion')}
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {['grandTunis', 'capBon'].map((region, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-gray-700">
                            {t(`aboutPage.coverage.regions.${region}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">
                      {t('aboutPage.coverage.centerRegion')}
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {['sousse', 'monastir', 'mahdia'].map((region, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-gray-700">
                            {t(`aboutPage.coverage.regions.${region}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] p-8 flex items-center justify-center bg-white">
                <div className="relative w-full h-full max-w-[500px]">
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
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('aboutPage.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('aboutPage.cta.subtitle')}
          </p>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            {t('aboutPage.cta.button')}
          </a>
        </div>
      </section>
    </main>
  );
}