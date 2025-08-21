'use client';

import { useState } from 'react';
import { Info, CheckCircle, AlertTriangle, Stethoscope, Clock, Brain, Heart, Plus } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

export default function SleepApneaPage() {
    const [activeTab, setActiveTab] = useState('symptoms');
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white py-16">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"></div>
                <div className="relative max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {t('apneeDuSommeil.apnéesDuSommeil')}
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-gray-300">
                            {t('apneeDuSommeil.comprendreDiagnostiquerEtTraiterLesTroublesDuSommeil')}
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Main Content */}
            <section className="pt-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Introduction */}
                    <div className="max-w-5xl mx-auto mb-16">
                        <div className="grid md:grid-cols-1 gap-8">
                            {/* YouTube Video Embed */}
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-8">
                                <iframe
                                    src="https://www.youtube.com/embed/depYIECNT2U"
                                    title={t('apneeDuSommeil.question')}
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Text Content */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Info className="h-6 w-6 text-emerald-600" />
                                    <h2 className="text-2xl font-semibold text-gray-900">{t('apneeDuSommeil.question')}</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    {t('apneeDuSommeil.reponse')}
                                </p>

                                {/* GIF Image */}
                                <div className="mt-6 w-full max-w-lg mx-auto">
                                    <Image
                                        src="/schlafapnoe-animation-1.gif"
                                        alt="Schlafapnoe Animation"
                                        width={300}
                                        height={300}
                                        className="w-full h-auto rounded-lg border border-gray-200"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
                            <button
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === 'symptoms' 
                                        ? 'bg-white text-gray-900 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                                onClick={() => setActiveTab('symptoms')}
                            >
                                {t('apneeDuSommeil.symptoms')}
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === 'risks' 
                                        ? 'bg-white text-gray-900 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                                onClick={() => setActiveTab('risks')}
                            >
                                {t('apneeDuSommeil.risks')}
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === 'treatment' 
                                        ? 'bg-white text-gray-900 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                                onClick={() => setActiveTab('treatment')}
                            >
                                {t('apneeDuSommeil.treatment')}
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="max-w-5xl mx-auto pb-16">
                        {activeTab === 'symptoms' && (
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-emerald-600" />
                                            {t('apneeDuSommeil.pendantLaNuit')}
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{t('apneeDuSommeil.ronflements')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{t('apneeDuSommeil.pausesRespiratoires')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{t('apneeDuSommeil.reveils')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{t('apneeDuSommeil.etouffement')}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Brain className="h-5 w-5 text-emerald-600" />
                                            {t('apneeDuSommeil.pendantLaJournee')}
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{t('apneeDuSommeil.fatigueEtSomnolenceExcessive')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{t('apneeDuSommeil.mauxDeTeteMatinaux')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{t('apneeDuSommeil.difficultesDeConcentration')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{t('apneeDuSommeil.irritabiliteEtChangementsDHumeur')}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="flex justify-center">
                                    <Image
                                        src="/symtomes.jpg"
                                        alt={t('apneeDuSommeil.symptoms')}
                                        width={800}
                                        height={450}
                                        className="w-full max-w-3xl h-auto rounded-lg border border-gray-200"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'risks' && (
                            <div className="space-y-8">
                                <div className="bg-white p-8 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-emerald-600" />
                                        {t('apneeDuSommeil.complicationsPossibles')}
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <Heart className="h-5 w-5 text-red-500 mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{t('apneeDuSommeil.problemesCardiovasculaires')}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{t('apneeDuSommeil.hypertensionRisqueDavcTroublesDuRythmeCardiaque')}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Brain className="h-5 w-5 text-purple-500 mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{t('apneeDuSommeil.troublesCognitifs')}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{t('apneeDuSommeil.perteDeMemoireDifficultesDeConcentration')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{t('apneeDuSommeil.complicationsMetaboliques')}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{t('apneeDuSommeil.diabetePriseDePoidsSyndromeMetabolique')}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Plus className="h-5 w-5 text-emerald-500 mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{t('apneeDuSommeil.autresRisques')}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{t('apneeDuSommeil.accidentsDeLaRouteDepressionProblemesRelationnels')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="flex justify-center">
                                    <Image
                                        src="/conséquences.jpg"
                                        alt={t('apneeDuSommeil.complicationsPossibles')}
                                        width={800}
                                        height={450}
                                        className="w-full max-w-3xl h-auto rounded-lg border border-gray-200"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'treatment' && (
                            <div className="space-y-8">
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Stethoscope className="h-5 w-5 text-emerald-600" />
                                        {t('apneeDuSommeil.solutionsTherapeutiques')}
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="border-b border-gray-200 pb-4">
                                            <h4 className="font-medium mb-2 text-gray-900">{t('apneeDuSommeil.ppcPressionPositiveContinue')}</h4>
                                            <p className="text-gray-700 text-sm">
                                                {t('apneeDuSommeil.descriptionPpc')}
                                            </p>
                                        </div>
                                        <div className="border-b border-gray-200 pb-4">
                                            <h4 className="font-medium mb-2 text-gray-900">{t('apneeDuSommeil.ortheseDavanceeMandibulaire')}</h4>
                                            <p className="text-gray-700 text-sm">
                                                {t('apneeDuSommeil.descriptionOrthèse')}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-3 text-gray-900">{t('apneeDuSommeil.changementsDeModeDeVie')}</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-3">
                                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                                    <span className="text-gray-700 text-sm">{t('apneeDuSommeil.perteDePoidsSiNecessaire')}</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                                    <span className="text-gray-700 text-sm">{t('apneeDuSommeil.positionDeSommeilAdaptee')}</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                                    <span className="text-gray-700 text-sm">{t('apneeDuSommeil.arretDuTabacEtReductionDeLalcool')}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Video Section */}
                                <div className="flex justify-center">
                                    <video
                                        controls
                                        className="w-full max-w-3xl rounded-lg border border-gray-200"
                                    >
                                        <source src="/étapes.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        )}
                    </div>
                </div> 
            </section>
        </div>
    );
}