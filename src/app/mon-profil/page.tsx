'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { User as UserIcon, Mail, Phone, MapPin, Building, Hash, Home, Edit3, Save, X, Shield, Calendar } from 'lucide-react';
import Link from 'next/link';
import type { User} from '@/types/user';
import { useTranslation } from '@/contexts/TranslationContext';

export default function MonProfilPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('Veuillez vous connecter pour accéder à votre profil');
          router.push('/login');
          return;
        }

        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        
        if (!response.ok) {
          if (response.status === 401) {
            toast.error('Session expirée. Veuillez vous reconnecter.');
            router.push('/login');
            return;
          }
          const errorData = await response.json();
          console.error('Profile fetch error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Erreur lors de la récupération du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Veuillez vous connecter pour mettre à jour votre profil');
        router.push('/login');
        return;
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors mb-6"
          >
            <Home className="h-4 w-4 mr-2" />
            Accueil
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
            </div>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Modifier
              </button>
            ) : null}
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="h-10 w-10 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-white text-center">
                  {formData.prenom} {formData.nom}
                </h2>
                <p className="text-emerald-50 text-center text-sm mt-1">
                  {formData.email}
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 mr-3 text-emerald-600" />
                  <span>Compte vérifié</span>
                </div>
            
              </div>
            </div>
          </div>


          {/* Right Content - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Informations personnelles</h3>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profile || {});
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Prénom */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="prenom"
                          value={formData.prenom || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>

                    {/* Nom */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900 pb-2 border-b border-gray-100">Informations de contact</h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      {/* Téléphone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                            placeholder="+216 XX XXX XXX"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900 pb-2 border-b border-gray-100">Adresse de livraison</h4>
                    
                    {/* Adresse */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="adresse"
                          value={formData.adresse || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          placeholder="Rue, numéro, quartier..."
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Ville */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            name="ville"
                            value={formData.ville || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                            placeholder="Tunis, Sousse, Sfax..."
                          />
                        </div>
                      </div>

                      {/* Code Postal */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code Postal
                        </label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            name="codePostal"
                            value={formData.codePostal || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                            placeholder="0000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData(profile || {});
                        }}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        disabled={saving}
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Enregistrement...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Enregistrer
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}