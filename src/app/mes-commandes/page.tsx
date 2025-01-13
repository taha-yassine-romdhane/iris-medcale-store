'use client';

import { useEffect, useState } from 'react';
import { Package, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useTranslation } from '@/context/TranslationContext';

interface Order {
  id: string;
  dateCreation: string;
  status: 'EN_ATTENTE' | 'CONFIRMEE' | 'EN_COURS' | 'LIVREE' | 'ANNULEE' | 'DEVIS';
  total: number;
  items: {
    id: string;
    quantity: number;
    product: {
      name: string;
      brand: string;
      media?: { url: string }[];
    };
  }[];
}

export default function MesCommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error(t('ordersPage.errors.loginRequired'));
          router.push('/login');
          return;
        }

        const response = await fetch('/api/orders/user-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            toast.error(t('ordersPage.errors.sessionExpired'));
            router.push('/login');
            return;
          }
          throw new Error(t('ordersPage.errors.fetchFailed'));
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error(t('ordersPage.errors.fetchError'));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router, t]);

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
      CONFIRMEE: 'bg-blue-100 text-blue-800',
      EN_COURS: 'bg-purple-100 text-purple-800',
      LIVREE: 'bg-green-100 text-green-800',
      ANNULEE: 'bg-red-100 text-red-800',
      DEVIS: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: Order['status']) => {
    const statusTexts = {
      EN_ATTENTE: t('ordersPage.status.pending'),
      CONFIRMEE: t('ordersPage.status.confirmed'),
      EN_COURS: t('ordersPage.status.inProgress'),
      LIVREE: t('ordersPage.status.delivered'),
      ANNULEE: t('ordersPage.status.cancelled'),
      DEVIS: t('ordersPage.status.quote'),
    };
    return statusTexts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] py-14 px-4 sm:px-6 lg:px-8">
      <div className="py-5 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t('ordersPage.title')}</h1>
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {t('ordersPage.emptyOrders.title')}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {t('ordersPage.emptyOrders.description')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(order.dateCreation).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </div>
                </div>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      {item.product.media && item.product.media[0] && (
                        <Image
                          src={item.product.media[0].url}
                          alt={item.product.name}
                          width={120}
                          height={120}
                          className="object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.brand}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">
                            {t('ordersPage.quantity')}: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}