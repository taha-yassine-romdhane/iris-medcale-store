'use client';

import { useState, useEffect } from 'react';
import { Trash2, Eye, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface User {
  nom: string | null;
  prenom: string | null;
  email: string;
  telephone: string | null;
  adresse: string | null;
  ville: string | null;
  codePostal: string | null;
}

enum StatusRdv {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRME = 'CONFIRME',
  ANNULE = 'ANNULE'
}

interface Appointment {
  id: string;
  dateCreation: string;
  dateMiseAJour: string;
  dateRdv: string;
  motif: string;
  status: StatusRdv;
  utilisateur: User;
  utilisateurId: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) return;

    try {
      const response = await fetch('/api/appointments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete appointment');
      
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const ViewModal = ({ appointment }: { appointment: Appointment }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Détails du Rendez-vous</h3>
          <button
            onClick={() => setIsViewModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nom</p>
            <p className="text-gray-900">
              {`${appointment.utilisateur.prenom || ''} ${appointment.utilisateur.nom || ''}`}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-gray-900">{appointment.utilisateur.email}</p>
          </div>
          {appointment.utilisateur.telephone && (
            <div>
              <p className="text-sm font-medium text-gray-500">Téléphone</p>
              <p className="text-gray-900">{appointment.utilisateur.telephone}</p>
            </div>
          )}
          {appointment.utilisateur.adresse && (
            <div>
              <p className="text-sm font-medium text-gray-500">Adresse</p>
              <p className="text-gray-900">{appointment.utilisateur.adresse}</p>
            </div>
          )}
          {appointment.utilisateur.ville && appointment.utilisateur.codePostal && (
            <div>
              <p className="text-sm font-medium text-gray-500">Ville</p>
              <p className="text-gray-900">
                {appointment.utilisateur.ville}, {appointment.utilisateur.codePostal}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Date du Rendez-vous</p>
            <p className="text-gray-900">
              {format(new Date(appointment.dateRdv), 'PPP', { locale: fr })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Motif</p>
            <p className="text-gray-900 whitespace-pre-wrap">{appointment.motif}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Statut</p>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              appointment.status === StatusRdv.EN_ATTENTE
                ? 'bg-yellow-100 text-yellow-800'
                : appointment.status === StatusRdv.CONFIRME
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {appointment.status === StatusRdv.EN_ATTENTE ? 'En attente' 
                : appointment.status === StatusRdv.CONFIRME ? 'Confirmé' 
                : 'Annulé'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Date de création</p>
            <p className="text-gray-900">
              {format(new Date(appointment.dateCreation), 'PPP à HH:mm', { locale: fr })}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsViewModalOpen(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-14 min-h-screen bg-gray-50 p-8">
      <div className="py-10 max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Rendez-vous</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date RDV
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {`${appointment.utilisateur.prenom || ''} ${appointment.utilisateur.nom || ''}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {format(new Date(appointment.dateRdv), 'PPP', { locale: fr })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === StatusRdv.EN_ATTENTE
                          ? 'bg-yellow-100 text-yellow-800'
                          : appointment.status === StatusRdv.CONFIRME
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status === StatusRdv.EN_ATTENTE ? 'En attente' 
                          : appointment.status === StatusRdv.CONFIRME ? 'Confirmé' 
                          : 'Annulé'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {appointment.utilisateur.telephone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsViewModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isViewModalOpen && selectedAppointment && (
        <ViewModal appointment={selectedAppointment} />
      )}
    </div>
  );
}
