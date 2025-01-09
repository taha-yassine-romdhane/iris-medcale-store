'use client';

import { useState } from 'react';
import { Calendar, Clock, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const weekDays = [
    { id: 1, name: 'Lundi' },
    { id: 2, name: 'Mardi' },
    { id: 3, name: 'Mercredi' },
    { id: 4, name: 'Jeudi' },
    { id: 5, name: 'Vendredi' }
  ];



  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setFormData(prev => ({ ...prev, date: day }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) {
        toast({
          title: "Erreur",
          description: "Veuillez vous connecter pour prendre un rendez-vous",
          variant: "destructive",
        });
        return;
      }

      if (!user.id) {
        toast({
          title: "Erreur",
          description: "Informations utilisateur incomplètes",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment: {
            time: formData.time,
            reason: formData.reason,
          },
          user: {
            id: user.id,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Échec de la demande de rendez-vous');
      }

      toast({
        title: "Succès",
        description: "Rendez-vous demandé avec succès",
      });
      
      setFormData({ date: '', time: '', reason: '' });
      setSelectedDay('');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-32"></div>

      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prenez Rendez-vous
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Choisissez un créneau qui vous convient pour une consultation personnalisée
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* User Information */}
              {user && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vos informations</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Nom</p>
                      <p className="font-medium text-gray-900">{user.nom}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                    {user.telephone && (
                      <div>
                        <p className="text-sm text-gray-600">Téléphone</p>
                        <p className="font-medium text-gray-900">{user.telephone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Days Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Sélectionnez un jour
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {weekDays.map((day) => (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => handleDaySelect(day.name)}
                      className={`p-4 rounded-lg text-center transition-colors ${
                        selectedDay === day.name
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {day.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDay && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Choisissez une heure
                  </h3>
                  <div className="relative">
                    <select
                      value={formData.time}
                      onChange={(e) => handleTimeSelect(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      required
                    >
                      <option value="">Sélectionnez une heure</option>
                      {Array.from({ length: 15 }, (_, i) => {
                        const hour = 9 + Math.floor(i / 2);
                        const minute = i % 2 === 0 ? '00' : '30';
                        const time = `${hour}:${minute}`;
                        return (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        );
                      })}
                    </select>
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
              )}

              {/* Reason Input */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Motif du rendez-vous</h3>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Décrivez brièvement la raison de votre rendez-vous..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.date || !formData.time || !formData.reason || !user}
                className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Confirmer le rendez-vous
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Horaires flexibles</h3>
              <p className="text-gray-600">Du lundi au vendredi, de 9h à 16h</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Confirmation rapide</h3>
              <p className="text-gray-600">Recevez une confirmation par email</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Suivi personnalisé</h3>
              <p className="text-gray-600">Un accompagnement adapté à vos besoins</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}