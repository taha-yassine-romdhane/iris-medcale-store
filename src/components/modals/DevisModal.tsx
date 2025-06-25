'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { CartItem } from '@/types/cart';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';
import { useTranslation } from '@/contexts/TranslationContext';

interface DevisModalProps {
  isOpen: boolean;
  closeModal: () => void;
  items: CartItem[];
}

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
}

export default function DevisModal({ isOpen, closeModal, items }: DevisModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: '',
    email: '',
    phone: ''
  });
  const router = useRouter();
  const { clearCart } = useCart();
  const { t } = useTranslation();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateGuestInfo = () => {
    if (!isLoggedIn) {
      if (!guestInfo.name.trim()) {
        toast.error('Le nom est requis');
        return false;
      }
      if (!guestInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
        toast.error('Email invalide');
        return false;
      }
      if (!guestInfo.phone.trim() || !/^[0-9+\s-]{8,}$/.test(guestInfo.phone)) {
        toast.error('Numéro de téléphone invalide');
        return false;
      }
    }
    return true;
  };

  const handleConfirmDevis = async () => {
    try {
      if (!isLoggedIn && !validateGuestInfo()) {
        return;
      }

      setIsSubmitting(true);

      const token = localStorage.getItem('token');
      const formattedItems = items.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      const requestData = {
        items: formattedItems,
        ...((!isLoggedIn) && {
          guestInfo: {
            ...guestInfo,
            adresse: null,
            ville: null,
            codePostal: null
          }
        })
      };

      console.log('Sending request:', requestData);

      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isLoggedIn && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creating devis');
      }

      setIsConfirmed(true);
      clearCart();
      
      // Wait a bit before redirecting
      setTimeout(() => {
        closeModal();
        router.push('/');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="text-center mb-6">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold leading-6 text-gray-900 mt-4"
                  >
                    {isConfirmed 
                      ? t('devisModal.confirmedMessage')
                      : t('devisModal.confirmationMessage')}
                  </Dialog.Title>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">{t('devisModal.title')}</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {t('devisModal.quantity')} {item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Only show guest info form if user is not logged in and not confirmed */}
                {!isLoggedIn && !isConfirmed && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Vos informations</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={guestInfo.name}
                          onChange={handleGuestInfoChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          placeholder="Votre nom complet"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={guestInfo.email}
                          onChange={handleGuestInfoChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={guestInfo.phone}
                          onChange={handleGuestInfoChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          placeholder="+216 XX XXX XXX"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <p className="text-sm text-gray-500 text-center">
                    {t('devisModal.message')}
                    <a href="tel:+21655820000" className="text-green-600 font-medium">
                      +216 55 820 000
                    </a>
                  </p>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  {!isConfirmed && (
                    <button
                      type="button"
                      className="inline-flex justify-center items-center rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50"
                      onClick={handleConfirmDevis}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          {t('devisModal.confirming')}
                        </>
                      ) : (
                        t('devisModal.confirm')
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    {isConfirmed ? 'Fermer' : 'Annuler'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}