'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/contexts/TranslationContext';

const contactInfo = [
  {
    icon: Phone,
    title: "phone",
    content: ["+216 93 945 107", "+216 93 945 118"],
    detail: "available24_7"
  },
  {
    icon: Mail,
    title: "email",
    content: ["contact@iris-med.tn"],
    detail: "responseWithin24h"
  },
  {
    icon: MapPin,
    title: "address",
    content: ["Rue Yasser Arafet Immeuble Mahdi appartement 201 4054, Sousse"],
    detail: "mainOffice"
  },
  {
    icon: Clock,
    title: "openingHours",
    content: ["09H - 18H du lundi au vendredi"],
    detail: "emergencyService24_7"
  }
];

export default function ContactPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestData, setGuestData] = useState({
    nom: '',
    email: '',
    telephone: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleGuestDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      const userData = user ? {
        id: user.id,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone
      } : {
        ...guestData
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          user: userData,
          isGuest: !user
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
      if (!user) {
        setGuestData({ nom: '', email: '', telephone: '' });
      }
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
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('contactPage.title')}
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('contactPage.subtitle')}
            </p>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {t(`contactPage.contactInfo.${info.title}.title`)}
                  </h3>
                  <div className="space-y-1 mb-2">
                    {Array.isArray(info.content) ? (
                      info.content.map((item, idx) => (
                        <p key={idx} className="text-gray-700 font-medium text-sm">
                          {item}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-700 font-medium text-sm">{info.content}</p>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs">
                    {t(`contactPage.contactInfo.${info.title}.detail`)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form Section */}
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t('contactPage.form.title')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {user ? (
                    // Logged-in User Information Display
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {t('contactPage.form.userInfo')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  ) : (
                    // Guest User Form Fields
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contactPage.form.name')}*
                          </label>
                          <Input
                            name="nom"
                            value={guestData.nom}
                            onChange={handleGuestDataChange}
                            className="w-full border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            required
                            placeholder={t('contactPage.form.namePlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contactPage.form.email')}*
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={guestData.email}
                            onChange={handleGuestDataChange}
                            className="w-full border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            required
                            placeholder={t('contactPage.form.emailPlaceholder')}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contactPage.form.phone')}
                        </label>
                        <Input
                          type="tel"
                          name="telephone"
                          value={guestData.telephone}
                          onChange={handleGuestDataChange}
                          className="w-full border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder={t('contactPage.form.phonePlaceholder')}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {t('contactPage.form.phoneOptional')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Message Field - Common for both user types */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.form.messageLabel')}*
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('contactPage.form.messagePlaceholder')}
                      className="w-full h-32 border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-md text-white bg-gray-900 hover:bg-emerald-800 focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    disabled={
                      isSubmitting ||
                      !message.trim() ||
                      (!user && (!guestData.nom.trim() || !guestData.email.trim()))
                    }
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

                  {/* Form Guidelines */}
                  <div className="mt-4 text-sm text-gray-500">
                    <p>{t('contactPage.form.requiredFields')}</p>
                    <p className="mt-1">{t('contactPage.form.responseTime')}</p>
                  </div>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t('contactPage.map.title')}
                </h2>
                <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.7482899065677!2d10.593591158471843!3d35.83478693017845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302754069145861%3A0x50714f144aecddc!2sSt%C3%A9%20Iris%20Medical!5e0!3m2!1sfr!2stn!4v1703000000000!5m2!1sfr!2stn"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Société Iris Medical</p>
                      <p className="text-sm text-gray-600">
                        Rue Yasser Arafet Immeuble Mahdi appartement 201 4054, Sousse
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}