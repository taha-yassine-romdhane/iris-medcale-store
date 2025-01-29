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
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative max-w-screen-2xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {t('apneeDuSommeil.apnéesDuSommeil')}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8">
                            {t('apneeDuSommeil.comprendreDiagnostiquerEtTraiterLesTroublesDuSommeil')}
                        </p>
                    </div>
                </div>
            </section>
            

            {/* Main Content */}
            <section className="pt-12 bg-gray-50">
                <div className="max-w-screen-2xl mx-auto px-4">
                    {/* Introduction */}
                    <div className="max-w-5xl mx-auto mb-16">
                        <div className="grid md:grid-cols-1 gap-8 items-center">
                            {/* YouTube Video Embed */}
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
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
                                    <Info className="h-8 w-8 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">{t('apneeDuSommeil.question')}</h2>
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {t('apneeDuSommeil.reponse')}
                                </p>

                                {/* GIF Image */}
                                <div className="mt-6 w-full max-w-2xl mx-auto">
                                    <Image
                                        src="/schlafapnoe-animation-1.gif"
                                        alt="Schlafapnoe Animation"
                                        width={300}
                                        height={300}
                                        className="w-full h-auto rounded-xl shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'symptoms' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                                onClick={() => setActiveTab('symptoms')}
                            >
                                {t('apneeDuSommeil.symptoms')}
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'risks' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                                onClick={() => setActiveTab('risks')}
                            >
                                {t('apneeDuSommeil.risks')}
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'treatment' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                                onClick={() => setActiveTab('treatment')}
                            >
                                {t('apneeDuSommeil.treatment')}
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="max-w-4xl mx-auto">
                        {activeTab === 'symptoms' && (
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-xl shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Clock className="h-6 w-6 text-blue-600" />
                                        {t('apneeDuSommeil.pendantLaNuit')}
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>{t('apneeDuSommeil.ronflements')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>{t('apneeDuSommeil.pausesRespiratoires')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>{t('apneeDuSommeil.reveils')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>{t('apneeDuSommeil.etouffement')}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Brain className="h-6 w-6 text-blue-600" />
                                        {t('apneeDuSommeil.pendantLaJournee')}
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>{t('apneeDuSommeil.fatigueEtSomnolenceExcessive')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>{t('apneeDuSommeil.mauxDeTeteMatinaux')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>{t('apneeDuSommeil.difficultesDeConcentration')}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>{t('apneeDuSommeil.irritabiliteEtChangementsDHumeur')}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Image from the public folder */}
                                <div className="flex justify-center col-span-2 mb-8">
                                    <Image
                                        src="/symtomes.jpg"
                                        alt={t('apneeDuSommeil.symptoms')}
                                        width={800}
                                        height={450}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'risks' && (
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <AlertTriangle className="h-6 w-6 text-blue-600" />
                                    {t('apneeDuSommeil.complicationsPossibles')}
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Heart className="h-5 w-5 text-red-500 mt-1" />
                                            <div>
                                                <h4 className="font-medium">{t('apneeDuSommeil.problemesCardiovasculaires')}</h4>
                                                <p className="text-sm text-gray-600">{t('apneeDuSommeil.hypertensionRisqueDavcTroublesDuRythmeCardiaque')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Brain className="h-5 w-5 text-purple-500 mt-1" />
                                            <div>
                                                <h4 className="font-medium">{t('apneeDuSommeil.troublesCognitifs')}</h4>
                                                <p className="text-sm text-gray-600">{t('apneeDuSommeil.perteDeMemoireDifficultesDeConcentration')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                                            <div>
                                                <h4 className="font-medium">{t('apneeDuSommeil.complicationsMetaboliques')}</h4>
                                                <p className="text-sm text-gray-600">{t('apneeDuSommeil.diabetePriseDePoidsSyndromeMetabolique')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Plus className="h-5 w-5 text-green-500 mt-1" />
                                            <div>
                                                <h4 className="font-medium">{t('apneeDuSommeil.autresRisques')}</h4>
                                                <p className="text-sm text-gray-600">{t('apneeDuSommeil.accidentsDeLaRouteDepressionProblemesRelationnels')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image from the public folder */}
                                    <div className="flex p-8 justify-center col-span-2 mb-8">
                                        <Image
                                            src="/conséquences.jpg"
                                            alt={t('apneeDuSommeil.complicationsPossibles')}
                                            width={800}
                                            height={450}
                                            className="w-full h-auto rounded-lg shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'treatment' && (
                            <div className="space-y-8">
                                <div className="bg-white p-6 rounded-xl shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Stethoscope className="h-6 w-6 text-blue-600" />
                                        {t('apneeDuSommeil.solutionsTherapeutiques')}
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="border-b pb-4">
                                            <h4 className="font-medium mb-2">{t('apneeDuSommeil.ppcPressionPositiveContinue')}</h4>
                                            <p className="text-gray-700">
                                                {t('apneeDuSommeil.descriptionPpc')}
                                            </p>
                                        </div>
                                        <div className="border-b pb-4">
                                            <h4 className="font-medium mb-2">{t('apneeDuSommeil.ortheseDavanceeMandibulaire')}</h4>
                                            <p className="text-gray-700">
                                                {t('apneeDuSommeil.descriptionOrthèse')}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">{t('apneeDuSommeil.changementsDeModeDeVie')}</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                                    <span>{t('apneeDuSommeil.perteDePoidsSiNecessaire')}</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                                    <span>{t('apneeDuSommeil.positionDeSommeilAdaptee')}</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                                    <span>{t('apneeDuSommeil.arretDuTabacEtReductionDeLalcool')}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Video Section */}
                                <div className="flex justify-center">
                                    <video
                                        controls
                                        className="w-full max-w-3xl rounded-lg shadow-md"
                                    >
                                        <source src="/étapes.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 text-center py-12 bg-gray-100  ">
                        <h3 className="text-2xl font-bold mb-4">{t('apneeDuSommeil.vousPensezSouffrirDApneesDuSommeil')}</h3>
                        <p className="text-lg text-gray-700 mb-6">
                            {t('apneeDuSommeil.diagnosticPrecoce')}
                        </p>
                        <a href="/appointment" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            {t('apneeDuSommeil.prendreRendezVous')}
                        </a>
                    </div>
                </div> 
            </section>
        </div>
    );
}