'use client';

import Link from 'next/link';
import {
  Package,
  Users,
  MessageSquare,
  Calendar,
  ShoppingBag,
  Languages
} from 'lucide-react';


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          </div>
          <p className="text-gray-600">Sélectionnez une option ci-dessous pour continuer.</p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card for Products */}
          <Link href="/dashboard/products" className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Gérer les Produits</h2>
                <p className="text-gray-600 text-sm">Accédez à la gestion des produits.</p>
              </div>
            </div>
          </Link>

          {/* Card for Users */}
          <Link href="/dashboard/users" className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Gérer les Utilisateurs</h2>
                <p className="text-gray-600 text-sm">Accédez à la gestion des utilisateurs.</p>
              </div>
            </div>
          </Link>

          {/* Card for Orders */}
          <Link href="/dashboard/orders" className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Gestion des Commandes</h2>
                <p className="text-gray-600 text-sm">Gérer les commandes des clients</p>
              </div>
            </div>
          </Link>

          {/* Card for Messages */}
          <Link href="/dashboard/messages" className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Messages de Contact</h2>
                <p className="text-gray-600 text-sm">Gérez les messages des clients.</p>
              </div>
            </div>
          </Link>

          {/* Card for Translations */}
          <Link href="/dashboard/translations" className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Languages className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Traductions</h2>
                <p className="text-gray-600 text-sm">Gérez les traductions des produits.</p>
              </div>
            </div>
          </Link>

          {/* Card for Appointments */}
          <Link href="/dashboard/appointments" className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Rendez-vous</h2>
                <p className="text-gray-600 text-sm">Gérez les demandes de rendez-vous.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
