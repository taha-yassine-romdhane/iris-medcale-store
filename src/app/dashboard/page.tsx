'use client';

import Link from 'next/link';
import {
  Package,
  Users,
  Settings,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
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
      </div>

      {/* Management Dashboard Card */}
      <div className="mt-12 flex justify-center w-full">
        <Link 
          href="/dashboard/management" 
          className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition w-full max-w-lg"
        >
          <div className="p-6 rounded-full bg-purple-100 mb-6">
            <Settings className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tableau de Gestion</h2>
          <p className="text-gray-500 text-center">Accédez au tableau de gestion principal pour une vue complète et un contrôle facile.</p>
        </Link>
      </div>
    </div>
  );
}
