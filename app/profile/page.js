'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* En-tête */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">
            Mon Profil
          </h1>
          <p className="text-gray-300">
            Bienvenue dans votre espace personnel
          </p>
        </div>

        {/* Informations utilisateur */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Informations personnelles
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nom complet
              </label>
              <div className="text-white bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-600">
                {session.user?.name || 'Non renseigné'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Adresse email
              </label>
              <div className="text-white bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-600">
                {session.user?.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Rôle
              </label>
              <div className="text-green-400 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-600">
                {session.user?.role || 'Membre'}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mt-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Actions
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Se déconnecter
            </button>
            
            <Link 
              href="/"
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-center block"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>

        {/* Section Admin (si admin) */}
        {session.user?.role === 'admin' && (
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mt-8 border border-green-500/50">
            <h2 className="text-2xl font-semibold text-white mb-6">
              ⚙️ Espace Administrateur
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                Gérer les membres
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                Voir les statistiques
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}