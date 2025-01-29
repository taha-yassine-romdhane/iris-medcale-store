'use client';

import React, { useEffect, useState } from 'react';
import { StatusCommande } from '@prisma/client';
import Image from 'next/image';
import { ArrowLeft, ChevronDown, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { AnimatePresence, motion } from 'framer-motion';

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
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

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
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto flex-1 pt-32 p-8 bg-gray-50"
    >
      <div className=" max-w-[100vw]">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-8 text-gray-900"
        >
          Gestion des Commandes
        </motion.h1>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-6"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="container mx-auto bg-white rounded-lg shadow-lg"
        >
          <div className=" overflow-x-auto relative">
            <table className="w-full table-fixed min-w-[800px] divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-[15%] px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="w-[25%] px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Client</th>
                  <th className="w-[20%] px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Produits</th>
                  <th className="w-[20%] px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="w-[20%] px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.dateCreation).toLocaleDateString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {`${order.utilisateur.nom} ${order.utilisateur.prenom}`}
                        </div>
                        <div className="text-sm text-gray-500">{order.utilisateur.email}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          <span className="mr-2">{order.items.length} produit(s)</span>
                          <motion.div
                            animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </motion.button>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'EN_ATTENTE' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'CONFIRMEE' ? 'bg-green-100 text-green-800' :
                                order.status === 'ANNULEE' ? 'bg-red-100 text-red-800' :
                                  order.status === 'EN_COURS' ? 'bg-blue-100 text-blue-800' :
                                    order.status === 'LIVREE' ? 'bg-purple-100 text-purple-800' :
                                      order.status === 'DEVIS' ? 'bg-gray-100 text-gray-800' :
                                        'bg-gray-100 text-gray-800'}`}
                        >
                          {order.status}
                        </motion.span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
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
                        </motion.button>
                      </td>
                    </motion.tr>
                    <AnimatePresence>
                      {expandedOrder === order.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan={5} className="px-4 sm:px-6 py-4">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                              {order.items.map((item, itemIndex) => (
                                <motion.div
                                  key={item.product.id}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: itemIndex * 0.1 }}
                                  whileHover={{ scale: 1.02 }}
                                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
                                    <Image
                                      src={item.product.media[0].url}
                                      alt={item.product.name}
                                      fill
                                      sizes="96px"
                                      className="object-cover rounded-lg"
                                    />
                                  </div>
                                  <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                      {item.product.name}
                                    </h3>
                                    <div className="space-y-2">
                                      <p className="text-sm text-gray-600">
                                        <span className="font-medium">Marque:</span> {item.product.brand}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <span className="font-medium">Catégorie:</span> {item.product.category}
                                      </p>
                                      {item.product.subCategory && (
                                        <p className="text-sm text-gray-600">
                                          <span className="font-medium">Sous-catégorie:</span> {item.product.subCategory}
                                        </p>
                                      )}
                                      <p className="text-sm text-gray-600">
                                        <span className="font-medium">Quantité:</span> {item.quantity}
                                      </p>
                                      <motion.details
                                        initial={false}
                                        className="mt-4"
                                      >
                                        <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 transition-colors">
                                          Caractéristiques
                                        </summary>
                                        <motion.ul
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          className="mt-2 pl-6 space-y-1 text-sm text-gray-600 list-disc"
                                        >
                                          {Object.entries(item.product.features).map(([key, value]) => (
                                            <motion.li
                                              key={key}
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                            >
                                              {value as string}
                                            </motion.li>
                                          ))}
                                        </motion.ul>
                                      </motion.details>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}