'use client';

import { useState } from 'react';
import { Info, CheckCircle, AlertTriangle, Stethoscope, Clock, Brain, Heart, Plus } from 'lucide-react';
import Image from 'next/image'; // Import the Image component

export default function SleepApneaPage() {
    const [activeTab, setActiveTab] = useState('symptoms');

    return (
        <div className="min-h-screen">
            {/* Spacer for navbar */}
            <div className="h-32"></div>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative max-w-screen-2xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Apnées du Sommeil
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8">
                            Comprendre, diagnostiquer et traiter les troubles du sommeil pour retrouver des nuits reposantes
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-2xl mx-auto px-4">
                    {/* Introduction */}
                    <div className="max-w-5xl mx-auto mb-16">
                        <div className="grid md:grid-cols-1 gap-8 items-center">
                            {/* YouTube Video Embed */}
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
                                <iframe
                                    src="https://www.youtube.com/embed/depYIECNT2U"
                                    title="Qu&apos;est-ce que l&apos;apnée du sommeil ?"
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Text Content */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Info className="h-8 w-8 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">Qu&apos;est-ce que l&apos;apnée du sommeil ?</h2>
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    L&apos;apnée du sommeil est un trouble respiratoire qui se caractérise par des pauses respiratoires répétées pendant le sommeil.
                                    Ces interruptions, qui peuvent durer de quelques secondes à plusieurs minutes, perturbent le cycle naturel du sommeil et
                                    peuvent avoir des conséquences importantes sur la santé et la qualité de vie.
                                </p>

                                {/* GIF Image */}
                                <div className="mt-6 w-full max-w-2xl mx-auto">
                                    <Image
                                        src="/schlafapnoe-animation-1.gif"
                                        alt="Schlafapnoe Animation"
                                        width={800}
                                        height={450}
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
                                Symptômes
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'risks' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                                onClick={() => setActiveTab('risks')}
                            >
                                Risques
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'treatment' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                                onClick={() => setActiveTab('treatment')}
                            >
                                Traitements
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
                                        Pendant la nuit
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>Ronflements importants et irréguliers</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>Pauses respiratoires observées par l&apos;entourage</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>Réveils en sursaut avec sensation d&apos;étouffement</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>Sommeil agité et transpiration excessive</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Brain className="h-6 w-6 text-blue-600" />
                                        Pendant la journée
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>Fatigue et somnolence excessive</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>Maux de tête matinaux</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>Difficultés de concentration</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span>Irritabilité et changements d&apos;humeur</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Image from the public folder */}
                                <div className="flex justify-center col-span-2 mb-8">
                                    <Image
                                        src="/symtomes.jpg"
                                        alt="Description of the image"
                                        width={800}
                                        height={450}
                                        className="w-1/2 h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'risks' && (
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <AlertTriangle className="h-6 w-6 text-blue-600" />
                                    Complications possibles
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Heart className="h-5 w-5 text-red-500 mt-1" />
                                            <div>
                                                <h4 className="font-medium">Problèmes cardiovasculaires</h4>
                                                <p className="text-sm text-gray-600">Hypertension, risque d&apos;AVC, troubles du rythme cardiaque</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Brain className="h-5 w-5 text-purple-500 mt-1" />
                                            <div>
                                                <h4 className="font-medium">Troubles cognitifs</h4>
                                                <p className="text-sm text-gray-600">Perte de mémoire, difficultés de concentration</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                                            <div>
                                                <h4 className="font-medium">Complications métaboliques</h4>
                                                <p className="text-sm text-gray-600">Diabète, prise de poids, syndrome métabolique</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Plus className="h-5 w-5 text-green-500 mt-1" />
                                            <div>
                                                <h4 className="font-medium">Autres risques</h4>
                                                <p className="text-sm text-gray-600">Accidents de la route, dépression, problèmes relationnels</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image from the public folder */}
                                    <div className="flex p-8 justify-center col-span-2 mb-8">
                                        <Image
                                            src="/conséquences.jpg"
                                            alt="Description of the risks"
                                            width={800}
                                            height={450}
                                            className="w-3/4 h-auto rounded-lg shadow-md"
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
                                        Solutions thérapeutiques
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="border-b pb-4">
                                            <h4 className="font-medium mb-2">PPC (Pression Positive Continue)</h4>
                                            <p className="text-gray-700">
                                                Traitement de référence qui consiste à porter un masque connecté à un appareil
                                                délivrant de l&apos;air sous pression pendant le sommeil.
                                            </p>
                                        </div>
                                        <div className="border-b pb-4">
                                            <h4 className="font-medium mb-2">Orthèse d&apos;avancée mandibulaire</h4>
                                            <p className="text-gray-700">
                                                Dispositif dentaire maintenant la mâchoire inférieure en position avancée
                                                pour dégager les voies respiratoires.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Changements de mode de vie</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                                    <span>Perte de poids si nécessaire</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                                    <span>Position de sommeil adaptée</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                                    <span>Arrêt du tabac et réduction de l&apos;alcool</span>
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
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-bold mb-4">Vous pensez souffrir d&apos;apnées du sommeil ?</h3>
                        <p className="text-lg text-gray-700 mb-6">
                            N&apos;attendez plus pour consulter nos spécialistes. Un diagnostic précoce permet une meilleure prise en charge.
                        </p>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Prendre rendez-vous
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}