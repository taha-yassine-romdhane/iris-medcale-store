'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { CartItem } from '@/types/cart';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';

interface DevisModalProps {
  isOpen: boolean;
  closeModal: () => void;
  items: CartItem[];
}

export default function DevisModal({ isOpen, closeModal, items }: DevisModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();
  const { clearCart } = useCart();

  const handleConfirmDevis = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Veuillez vous connecter pour créer un devis');
        router.push('/login');
        return;
      }

      // Debug logs
      console.log('Token from localStorage:', token);
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token payload:', tokenPayload);
      } catch (e) {
        console.error('Error decoding token:', e);
      }

      setIsSubmitting(true);
      
      // Format items for the API
      const formattedItems = items.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: formattedItems }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create devis');
      }

      setIsConfirmed(true);
      clearCart();
      toast.success('Votre demande de devis a été enregistrée avec succès !');
      
      // Redirect to orders page after a short delay
      setTimeout(() => {
        closeModal();
        router.push('/mes-commandes');
      }, 2000);

    } catch (error) {
      console.error('Error confirming devis:', error);
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.');
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
                      ? 'Demande de devis confirmée !'
                      : 'Confirmer votre demande de devis'}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-gray-500">
                      {isConfirmed 
                        ? 'Votre demande a été enregistrée. Notre équipe vous contactera très prochainement.'
                        : 'Veuillez vérifier les détails de votre demande avant de confirmer.'}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif de votre demande :</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Quantité: {item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-500 text-center">
                    Si vous avez des questions, n&apos;hésitez pas à nous contacter au{' '}
                    <a href="tel:+21655792605" className="text-blue-600 font-medium">
                      +216 55 792 605
                    </a>
                  </p>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  {!isConfirmed && (
                    <button
                      type="button"
                      className="inline-flex justify-center items-center rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                      onClick={handleConfirmDevis}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Confirmation en cours...
                        </>
                      ) : (
                        'Confirmer le devis'
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
