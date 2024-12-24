'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
}

export default function DashboardPage() {
  const stats: StatCard[] = [
    {
      title: "Utilisateurs actifs",
      value: "120",
      change: 12,
      icon: Users,
      color: "blue"
    },
    {
      title: "Produits en stock",
      value: "1,234",
      change: -2,
      icon: Package,
      color: "green"
    },
    {
      title: "Commandes du jour",
      value: "25",
      change: 8,
      icon: ShoppingCart,
      color: "purple"
    },
    {
      title: "Chiffre d'affaires",
      value: "45,678 €",
      change: 24,
      icon: TrendingUp,
      color: "yellow"
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue dans votre espace de gestion</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="flex items-center space-x-1">
                <span className={`text-sm ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(stat.change)}%
                </span>
                {stat.change > 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
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
