export function Footer() {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 text-white">À propos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#mission" className="hover:text-green-400 transition-colors">
                  Notre mission
                </a>
              </li>
              <li>
                <a href="#actions" className="hover:text-green-400 transition-colors">
                  Nos actions
                </a>
              </li>
              <li>
                <a href="#donate" className="hover:text-green-400 transition-colors">
                  Nous soutenir
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Nos projets</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#actions" className="hover:text-green-400 transition-colors">
                  Aide humanitaire
                </a>
              </li>
              <li>
                <a href="#actions" className="hover:text-green-400 transition-colors">
                  Éducation
                </a>
              </li>
              <li>
                <a href="#actions" className="hover:text-green-400 transition-colors">
                  Santé
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Nous soutenir</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#donate" className="hover:text-green-400 transition-colors">
                  Faire un don
                </a>
              </li>
              <li>
                <a href="#donate" className="hover:text-green-400 transition-colors">
                  Bénévolat
                </a>
              </li>
              <li>
                <a href="#donate" className="hover:text-green-400 transition-colors">
                  Partenariats
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <p className="text-sm text-gray-300 mb-4">contact@espoirenaction.org</p>
            <p className="text-sm text-gray-300">+33 (0)1 23 45 67 89</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 EspoirEnAction. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
