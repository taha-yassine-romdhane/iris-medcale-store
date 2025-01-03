'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    content: "+216 55 820 000",
    detail: "Disponible 24/7"
  },
  {
    icon: Mail,
    title: "Email",
    content: "eliteMedicaleServices@Gmail.com",
    detail: "Réponse sous 24h"
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "11 Rue tayeb el hedi 4070 M'Saken Sousse ",
    detail: "Bureaux principaux"
  },
  {
    icon: Clock,
    title: "Heures d'ouverture",
    content: "Lun - Ven: 9h - 17h",
    detail: "Service d'urgence 24/7"
  }
];

export default function ContactPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour envoyer un message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          user: {
            nom: user.nom,
            email: user.email,
            telephone: user.telephone
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "Succès",
        description: "Votre message a été envoyé avec succès",
      });
      
      // Clear form
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Notre équipe est là pour répondre à toutes vos questions et vous accompagner dans vos besoins en matière de santé respiratoire.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Informations de Contact
            </h2>
            <div className="flex flex-wrap gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex-1 min-w-[500px] max-w-[300px]"
                >
                  <div className="flex items-start space-x-6">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <info.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{info.title}</h3>
                      <p className="text-blue-600 mt-2 break-all">{info.content}</p>
                      <p className="text-sm text-gray-500 mt-2">{info.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Envoyez-nous un message
            </h2>

            {user && (
              <div className="mb-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Vous envoyez ce message en tant que:</p>
                  <p className="font-medium text-gray-900">{user.nom}</p>
                  <p className="text-gray-600">{user.email}</p>
                  {user.telephone && <p className="text-gray-600">{user.telephone}</p>}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Écrivez votre message ici..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="w-full h-[600px] overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240.10481402433365!2d10.573908195586109!3d35.73488462620345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fdf5d82cc1ff89%3A0x327231a45eeeab57!2s%C3%94%20Medical%20Store!5e1!3m2!1sfr!2stn!4v1734970851542!5m2!1sfr!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
