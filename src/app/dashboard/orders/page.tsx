'use client';

import React, { useEffect, useState } from 'react';
import { StatusCommande } from '@prisma/client';
import Image from 'next/image';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/product';

interface OrderItem {
  quantity: number;
  product: Product;
}

interface Order {
  id: string;
  dateCreation: string;
  status: StatusCommande;
  items: OrderItem[];
  utilisateur: {
    nom: string;
    prenom: string;
    email: string;
  };
}

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible.')) {
      return;
    }

    setDeletingOrder(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      // Refresh orders list after successful deletion
      fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete order');
    } finally {
      setDeletingOrder(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 p-8 bg-gray-50 container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Gestion des Commandes</h1>
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au tableau de bord
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Produits</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.dateCreation).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{`${order.utilisateur.nom} ${order.utilisateur.prenom}`}</div>
                    <div className="text-sm text-gray-500">{order.utilisateur.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {order.items.length} produit(s) {expandedOrder === order.id ? '▼' : '▶'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'EN_ATTENTE' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'CONFIRMEE' ? 'bg-green-100 text-green-800' :
                          order.status === 'ANNULEE' ? 'bg-red-100 text-red-800' :
                            order.status === 'EN_COURS' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'LIVREE' ? 'bg-purple-100 text-purple-800' :
                                order.status === 'DEVIS' ? 'bg-gray-100 text-gray-800' :
                                  'bg-gray-100 text-gray-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      disabled={deletingOrder === order.id}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                        ${deletingOrder === order.id
                          ? 'bg-red-100 text-red-400 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        }`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {deletingOrder === order.id ? 'Suppression...' : 'Supprimer'}
                    </button>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="border rounded-lg p-4 flex space-x-4 bg-gray-50">
                            {item.product.media[0] && (
                              <div className="w-24 h-24 relative flex-shrink-0">
                                <Image
                                  src={item.product.media[0].url}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900">{item.product.name}</h3>
                              <p className="text-sm text-gray-600">Marque: {item.product.brand}</p>
                              <p className="text-sm text-gray-600">Catégorie: {item.product.category}</p>
                              {item.product.subCategory && (
                                <p className="text-sm text-gray-600">Sous-catégorie: {item.product.subCategory}</p>
                              )}
                              <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                              <details className="mt-2">
                                <summary className="text-sm text-blue-600 cursor-pointer">Caractéristiques</summary>
                                <ul className="mt-2 text-sm text-gray-600">
                                  {Object.entries(item.product.features).map(([key, value]) => (
                                    <li key={key}>{value as string}</li>
                                  ))}
                                </ul>
                              </details>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}