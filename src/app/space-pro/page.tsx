'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {  Rocket, Database, RefreshCw, Box, BarChart, Shield } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

export default function ComingSoonPage() {
  // Calculate the date 6 months from now (only once)
  const launchDate = useMemo(() => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 6);
    return currentDate;
  }, []);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  // Feature data with icons
  const features = [
    {
      icon: <Database className="h-6 w-6 text-blue-600" />,
      title: 'Gestion des Données Utilisateurs',
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-blue-600" />,
      title: 'Suivi des Transfers',
    },
    {
      icon: <Box className="h-6 w-6 text-blue-600" />,
      title: 'Gestion des Stocks',
    },
    {
      icon: <BarChart className="h-6 w-6 text-blue-600" />,
      title: 'Analyse en Temps Réel',
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: 'Sécurité Avancée',
    },
  ];

  // Function to animate countdown numbers
  const AnimatedNumber = ({ value, label }: { value: number; label: string }) => {
    return (
      <motion.div
        className="flex flex-col items-center"
        key={value} // Key ensures re-render and animation on value change
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-3xl font-bold text-blue-900">{value}</span>
        <span className="text-sm text-blue-600">{label}</span>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white-50 flex items-center justify-center p-6">
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Rocket Icon Animation */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 100 }}
        >
          <Rocket className="h-16 w-16 text-blue-600" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-5xl font-bold text-blue-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Bientôt Disponible
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg text-blue-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Nous construisons une plateforme professionnelle pour gérer tous vos services. Restez à l'écoute !
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          className="flex justify-center space-x-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <AnimatedNumber value={timeLeft.days} label="jours" />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <AnimatedNumber value={timeLeft.hours} label="heures" />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <AnimatedNumber value={timeLeft.minutes} label="minutes" />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <AnimatedNumber value={timeLeft.seconds} label="secondes" />
          </AnimatePresence>
        </motion.div>

        {/* Feature Table */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Fonctionnalités à Venir</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-blue-200">
              <thead>
                <tr className="bg-blue-50">
                  <th className="py-3 px-4 text-left text-blue-900 font-semibold">Fonctionnalité</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-blue-200 hover:bg-blue-50 transition-colors"
                    whileHover={{ scale: 1.05, backgroundColor: '#f0f4ff' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <td className="py-3 px-4 text-blue-800 flex items-center space-x-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.6 + index * 0.2, duration: 0.5, type: 'spring' }}
                      >
                        {feature.icon}
                      </motion.div>
                      <span>{feature.title}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-sm text-blue-500 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          &copy; 2025 Elite Medical Services. Tous droits réservés.
        </motion.p>
      </motion.div>
    </div>
  );
}