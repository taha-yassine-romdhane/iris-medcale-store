'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

interface LoginDialogProps {
  isOpen: boolean;
  closeModal: () => void;
  message?: string;
}

export default function LoginDialog({ isOpen, closeModal, message = "Vous devez être connecté pour continuer." }: LoginDialogProps) {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
    closeModal();
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-center mb-6">
                  <LogIn className="h-12 w-12 text-blue-600" />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Connexion Requise
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 text-center">
                    {message}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleLogin}
                  >
                    Se connecter
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Annuler
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
