'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from '@/app/hooks/useForm';
import { useFormError } from '@/app/hooks/useAuth';
import { registerSchema } from '@/app/lib/validators';
import { MESSAGES, NAME_MAX_LENGTH } from '@/app/lib/constants';

export default function RegisterPage() {
  const router = useRouter();
  const { error, setError, clearError } = useFormError();
  
  const initialValues = {
    name: '',
    firstName: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  };

  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    isLoading,
    setIsLoading,
  } = useForm(initialValues, async (data) => {
    try {
      // TODO: Remplacer par l'appel API réel
      console.log('Données d\'inscription:', data);
      router.push('/auth/login?message=' + encodeURIComponent(MESSAGES.REGISTER_SUCCESS));
    } catch (err) {
      setError(MESSAGES.REGISTER_ERROR);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);

    try {
      // Valider les données
      const result = registerSchema.safeParse(formData);
      
      if (!result.success) {
        const errorMessages = result.error.errors.map(err => err.message).join(', ');
        setError(errorMessages);
        setIsLoading(false);
        return;
      }

      // Pour l'instant, on simule l'inscription
      console.log('Données validées:', result.data);
      router.push('/auth/login?message=' + encodeURIComponent(MESSAGES.REGISTER_SUCCESS));
    } catch (err) {
      setError(MESSAGES.REGISTER_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Rejoignez notre association
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/80 border border-red-700 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength="50"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-400 mt-1">{formData.name.length}/50</p>
            </div>

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                Prénom
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                maxLength="50"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-400 mt-1">{formData.firstName.length}/50</p>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300">
                Date de naissance
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Au moins 6 caractères"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Retapez votre mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition duration-200"
              >
                {isLoading ? 'Inscription...' : "S'inscrire"}
              </button>
            </div>

          <div className="text-center">
            <p className="text-sm text-gray-300">
              Déjà un compte ?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-green-400 hover:text-green-300"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}