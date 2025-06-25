'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Phone, MapPin, Building, Hash } from 'lucide-react';
import { z } from 'zod';

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
    required: boolean = true
  ) => (
    <div>
      <label className="flex items-center text-sm font-medium text-gray-700">
        {icon}
        {label}
        {required && <span className="text-red-500 ml-1"></span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className={`mt-1 block w-full px-3 py-2 border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Créer un compte</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
              connectez-vous à votre compte existant
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {renderInput('email', 'Email', 'email', <Mail className="h-4 w-4 mr-2" />)}
            {renderInput('motDePasse', 'Mot de passe', 'password', <Lock className="h-4 w-4 mr-2" />)}
            {renderInput('nom', 'Nom', 'text', <User className="h-4 w-4 mr-2" />)}
            {renderInput('prenom', 'Prénom', 'text', <User className="h-4 w-4 mr-2" />)}
            {renderInput('telephone', 'Téléphone', 'tel', <Phone className="h-4 w-4 mr-2" />)}
            {renderInput('adresse', 'Adresse', 'text', <MapPin className="h-4 w-4 mr-2" />)}
            {renderInput('ville', 'Ville', 'text', <Building className="h-4 w-4 mr-2" />)}
            {renderInput('codePostal', 'Code Postal', 'text', <Hash className="h-4 w-4 mr-2" />)}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Inscription en cours...' : "S'inscrire"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}