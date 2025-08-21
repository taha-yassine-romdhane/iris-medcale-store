'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Phone, MapPin, Building, Hash } from 'lucide-react';
import { z } from 'zod';
import { useTranslation } from '@/contexts/TranslationContext';

// Define the validation schema
const signUpSchema = z.object({
  email: z.string()
    .email('Format d\'email invalide')
    .min(1, 'L\'email est requis'),
  motDePasse: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  nom: z.string()
    .min(1, 'Le nom est requis')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  prenom: z.string()
    .min(1, 'Le prénom est requis')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  telephone: z.string()
    .min(8, 'Le numéro de téléphone doit contenir au moins 8 chiffres')
    .regex(/^[0-9+\s-]+$/, 'Numéro de téléphone invalide'),
  adresse: z.string()
    .min(1, 'L\'adresse est requise'),
  ville: z.string()
    .min(1, 'La ville est requise'),
  codePostal: z.string()
    .min(1, 'Le code postal est requis')
    .regex(/^\d{4}$/, 'Le code postal doit contenir 4 chiffres'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    motDePasse: '',
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    try {
      signUpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          setErrors((prev) => ({
            ...prev,
            email: data.message || 'Cette adresse email est déjà utilisée'
          }));
          toast.error(data.message || 'Cette adresse email est déjà utilisée');
          return;
        }
  
        if (response.status === 403) {
          setErrors((prev) => ({
            ...prev,
            email: data.error
          }));
          toast.error(data.error);
          return;
        }
  
        if (response.status === 400) {
          // Handle validation errors
          toast.error(data.error);
          return;
        }
  
        throw new Error(data.message || 'Une erreur est survenue');
      }
  
      // Success case
      localStorage.setItem('token', data.token);
  
      if (data.emailSent) {
        toast.success('Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.');
        router.push('/check-email');
      } else {
        toast.error('Inscription réussie mais l\'envoi de l\'email a échoué. Veuillez contacter le support.');
        router.push('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };
  // Helper function to render input field with error
  const renderInput = (
    name: keyof SignUpFormData,
    label: string,
    type: string,
    icon: React.ReactNode,
    placeholder: string = '',
    required: boolean = true
  ) => (
    <div>
      <label className="flex items-center text-sm font-medium text-gray-700">
        {icon}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`mt-1 block w-full px-3 py-2 border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-400`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-900">{t('signup.title')}</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {t('signup.subtitle')}{' '}
            <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
              {t('signup.loginLink')}
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-8 border border-gray-200 rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Account Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                {t('signup.sections.accountInfo')}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {renderInput('email', t('signup.fields.email.label'), 'email', <Mail className="h-4 w-4 mr-2" />, t('signup.fields.email.placeholder'))}
                {renderInput('motDePasse', t('signup.fields.password.label'), 'password', <Lock className="h-4 w-4 mr-2" />, t('signup.fields.password.placeholder'))}
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                {t('signup.sections.personalInfo')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput('prenom', t('signup.fields.firstName.label'), 'text', <User className="h-4 w-4 mr-2" />, t('signup.fields.firstName.placeholder'))}
                {renderInput('nom', t('signup.fields.lastName.label'), 'text', <User className="h-4 w-4 mr-2" />, t('signup.fields.lastName.placeholder'))}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {renderInput('telephone', t('signup.fields.phone.label'), 'tel', <Phone className="h-4 w-4 mr-2" />, t('signup.fields.phone.placeholder'))}
              </div>
            </div>

            {/* Address Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                {t('signup.sections.addressInfo')}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {renderInput('adresse', t('signup.fields.address.label'), 'text', <MapPin className="h-4 w-4 mr-2" />, t('signup.fields.address.placeholder'))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput('ville', t('signup.fields.city.label'), 'text', <Building className="h-4 w-4 mr-2" />, t('signup.fields.city.placeholder'))}
                {renderInput('codePostal', t('signup.fields.postalCode.label'), 'text', <Hash className="h-4 w-4 mr-2" />, t('signup.fields.postalCode.placeholder'))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
              >
                {loading ? t('signup.button.loading') : t('signup.button.submit')}
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                {t('signup.terms.text')}{' '}
                <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">
                  {t('signup.terms.termsLink')}
                </Link>{' '}
                {t('signup.terms.and')}{' '}
                <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">
                  {t('signup.terms.privacyLink')}
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}