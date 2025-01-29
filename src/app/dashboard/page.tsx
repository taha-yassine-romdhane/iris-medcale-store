'use client';

import Link from 'next/link';
import {
  Package,
  Users,
  MessageSquare,
  Calendar,
  ShoppingBag,
  JapaneseYen
} from 'lucide-react';
import TranslationsPage from './translations/page';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-gray-50 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tableau de bord</h1>
      <p className="text-gray-600 mb-12">Sélectionnez une option ci-dessous pour continuer.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Card for Products */}
        <Link href="/dashboard/products" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Gérer les Produits</h2>
              <p className="text-gray-500">Accédez à la gestion des produits.</p>
            </div>
          </div>
        </Link>

        {/* Card for Users */}
        <Link href="/dashboard/users" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-green-100">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Gérer les Utilisateurs</h2>
              <p className="text-gray-500">Accédez à la gestion des utilisateurs.</p>
            </div>
          </div>
        </Link>

        {/* Card for Orders */}
        <Link href="/dashboard/orders" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-green-100">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Gestion des Commandes</h2>
              <p className="text-gray-500">Gérer les commandes des clients</p>
            </div>
          </div>
        </Link>

        {/* Card for Messages */}
        <Link href="/dashboard/messages" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <MessageSquare className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Messages de Contact</h2>
              <p className="text-gray-500">Gérez les messages des clients.</p>
            </div>
          </div>
        </Link>

        {/* Card for Messages */}
        <Link href="/dashboard/translations" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <JapaneseYen className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Traductions</h2>
              <p className="text-gray-500">Gérez les traductions des produits.</p>
            </div>
          </div>
        </Link>

        {/* Card for Appointments */}
        <Link href="/dashboard/appointments" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-purple-100">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Rendez-vous</h2>
              <p className="text-gray-500">Gérez les demandes de rendez-vous.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
