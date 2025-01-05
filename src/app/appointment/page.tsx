'use client';

import { useState } from 'react';
import { Calendar, Clock, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour prendre un rendez-vous",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment: formData,
          user: {
            nom: user.nom,
            email: user.email,
            telephone: user.telephone // Optional property
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send appointment request');
      }

      toast({
        title: "Succès",
        description: "Votre demande de rendez-vous a été envoyée avec succès. Vous recevrez un email de confirmation.",
      });
      
      // Clear form
      setFormData({
        date: '',
        time: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error sending appointment request:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen">
      {/* Spacer for fixed navbars */}
      <div className="h-32"></div>

      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-screen-2xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Votre Santé, Notre Priorité
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Prenez rendez-vous en quelques clics pour recevoir les meilleurs soins adaptés à vos besoins
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="mb-16">
            <p className="text-xl text-gray-800 mb-4 text-center max-w-4xl mx-auto">
              Chez Elite Medicale Service, nous nous engageons à vous offrir des soins personnalisés
              dans les plus brefs délais. Notre équipe de professionnels qualifiés est à votre
              disposition pour répondre à tous vos besoins médicaux. Profitez de notre système
              de réservation simple et rapide pour choisir le créneau qui vous convient le mieux.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full"></div>
              <img
                src="RDV.jpg"
                alt="Rendez-vous illustration"
                className="rounded-2xl shadow-xl w-full h-auto relative z-10"
              />
            </div>

            {/* Form Section */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-8 rounded-xl shadow-xl">
                {user && (
                  <div className="mb-6 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Vous prenez rendez-vous en tant que:</p>
                      <p className="font-medium text-gray-900">{user.nom}</p>
                      <p className="text-gray-600">{user.email}</p>
                      {user.telephone && <p className="text-gray-600">{user.telephone}</p>}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date souhaitée
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        id="date"
                        required
                        min={today}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Heure souhaitée
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="time"
                        id="time"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                    Motif du rendez-vous
                  </label>
                  <textarea
                    id="reason"
                    required
                    rows={4}
                    placeholder="Décrivez brièvement la raison de votre rendez-vous..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !user} // Disable if user is null
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}