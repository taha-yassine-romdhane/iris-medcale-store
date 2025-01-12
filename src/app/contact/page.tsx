'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginDialog(true);
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
            id: user.id,
            nom: user.nom,
            email: user.email,
            telephone: user.telephone
          }
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
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
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-32">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-blue-600 font-medium mb-1">{info.content}</p>
                  <p className="text-gray-500 text-sm">{info.detail}</p>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {user && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
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

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Votre message
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="h-32"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !message.trim()}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Clock className="animate-spin" size={20} />
                      En cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={20} />
                      Envoyer le message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre emplacement</h2>
            <div className="w-full h-[500px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240.10481402433365!2d10.573908195586109!3d35.73488462620345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fdf5d82cc1ff89%3A0x327231a45eeeab57!2s%C3%94%20Medical%20Store!5e1!3m2!1sfr!2stn!4v1734970851542!5m2!1sfr!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-white border border-blue-100 rounded-lg shadow-lg">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-blue-900 text-xl font-bold">
              Connexion requise
            </DialogTitle>
            <DialogDescription className="text-blue-800">
              Vous devez être connecté pour envoyer un message. Voulez-vous vous connecter maintenant ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowLoginDialog(false)}
              className="text-blue-900 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            >
              Annuler
            </Button>
            <Button
              onClick={() => {
                setShowLoginDialog(false);
                router.push('/login');
              }}
              className="bg-blue-900 text-white hover:bg-blue-800"
            >
              Se connecter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
