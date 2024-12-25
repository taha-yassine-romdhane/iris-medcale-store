'use client';

import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Package,
  Users,
  ShoppingCart
} from 'lucide-react';

interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

export default function DashboardPage() {
  const stats: DashboardMetrics = {
    totalRevenue: 45678,
    totalOrders: 25,
    totalProducts: 1234,
    totalCustomers: 120
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue dans votre éspace de gestion</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-yellow-100`}>
              <TrendingUp className={`h-6 w-6 text-yellow-600`} />
            </div>
            <div className="flex items-center space-x-1">
              <span className={`text-sm text-green-600`}>
                24%
              </span>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Chiffre d&apos;affaires</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalRevenue} TND</p>
        </div>
        <div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-purple-100`}>
              <ShoppingCart className={`h-6 w-6 text-purple-600`} />
            </div>
            <div className="flex items-center space-x-1">
              <span className={`text-sm text-green-600`}>
                8%
              </span>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Commandes du jour</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalOrders}</p>
        </div>
        <div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-green-100`}>
              <Package className={`h-6 w-6 text-green-600`} />
            </div>
            <div className="flex items-center space-x-1">
              <span className={`text-sm text-red-600`}>
                -2%
              </span>
              <ArrowDown className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Produits en stock</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalProducts}</p>
        </div>
        <div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-blue-100`}>
              <Users className={`h-6 w-6 text-blue-600`} />
            </div>
            <div className="flex items-center space-x-1">
              <span className={`text-sm text-green-600`}>
                12%
              </span>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Utilisateurs actifs</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalCustomers}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Nouvelle commande #12345</p>
                  <p className="text-sm text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600">Voir les détails</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
