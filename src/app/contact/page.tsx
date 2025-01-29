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
import { useTranslation } from '@/contexts/TranslationContext';

const contactInfo = [
  {
    icon: Phone,
    title: "phone",
    content: "+216 55 820 000",
    detail: "available24_7"
  },
  {
    icon: Mail,
    title: "email",
    content: "eliteMedicaleServices@Gmail.com",
    detail: "responseWithin24h"
  },
  {
    icon: MapPin,
    title: "address",
    content: "11 Rue tayeb el hedi 4070 M'Saken Sousse",
    detail: "mainOffice"
  },
  {
    icon: Clock,
    title: "openingHours",
    content: "09H - 18H du lundi au vendredi",
    detail: "emergencyService24_7"
  }
];

export default function ContactPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

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
        throw new Error(data.error || t('error.failedToSendMessage'));
      }

      toast({
        title: t('contactPage.success.title'),
        description: t('contactPage.success.description'),
      });
      
      // Clear form
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('error.title'),
        description: t('error.generic'),
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(`contactPage.contactInfo.${info.title}.title`)}
                  </h3>
                  <p className="text-blue-600 font-medium mb-1">{info.content}</p>
                  <p className="text-gray-500 text-sm">
                    {t(`contactPage.contactInfo.${info.title}.detail`)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('contactPage.form.title')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {user && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('contactPage.form.userInfo')}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">{t('contactPage.form.name')}</p>
                        <p className="font-medium text-gray-900">{user.nom}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('contactPage.form.email')}</p>
                        <p className="font-medium text-gray-900">{user.email}</p>
                      </div>
                      {user.telephone && (
                        <div>
                          <p className="text-sm text-gray-600">{t('contactPage.form.phone')}</p>
                          <p className="font-medium text-gray-900">{user.telephone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('contactPage.form.messageLabel')}
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contactPage.form.messagePlaceholder')}
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
                      {t('contactPage.form.submitting')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={20} />
                      {t('contactPage.form.submitButton')}
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('contactPage.map.title')}
            </h2>
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
              {t('contactPage.loginDialog.title')}
            </DialogTitle>
            <DialogDescription className="text-blue-800">
              {t('contactPage.loginDialog.description')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowLoginDialog(false)}
              className="text-blue-900 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            >
              {t('contactPage.loginDialog.cancelButton')}
            </Button>
            <Button
              onClick={() => {
                setShowLoginDialog(false);
                router.push('/login');
              }}
              className="bg-blue-900 text-white hover:bg-blue-800"
            >
              {t('contactPage.loginDialog.loginButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}