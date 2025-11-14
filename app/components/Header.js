'use client';

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Heart } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { label: "Accueil", href: "#accueil" },
    { label: "Notre Mission", href: "#mission" },
    { label: "Nos Actions", href: "#actions" },
    { label: "Nous Soutenir", href: "#donate" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-600 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-md">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="hidden sm:block text-lg font-bold text-white group-hover:text-green-400 transition-colors">
              EspoirEnAction
            </span>
          </a>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white hover:text-green-400 transition-colors relative group border border-transparent hover:border-green-500/30 px-3 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Boutons de connexion */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                >
                  Mon Profil
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105 shadow-md"
                >
                  Espace Membre
                </Link>
              </div>
            )}

            {/* Menu mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors border border-gray-600"
            >
              {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-600 bg-gray-900/95 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-white hover:bg-gray-800 hover:text-green-400 transition-colors font-medium border border-gray-700"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}