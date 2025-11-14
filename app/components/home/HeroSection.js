import Link from "next/link";

export function HeroSection() {
  return (
    <section id="accueil" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight text-balance">
          Ensemble pour un monde plus{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            solidaire
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto text-balance bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          Chaque acte de générosité crée une onde de positivité. Rejoignez-nous pour construire un futur plus juste et
          inclusif pour tous.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#donate" className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105 shadow-lg text-center">
            Faire un don maintenant
          </a>
          <a href="#mission" className="px-8 py-4 border-2 border-green-500 text-green-400 rounded-lg font-semibold hover:bg-green-500/10 transition-all bg-gray-900/80 backdrop-blur-sm text-center">
            En savoir plus
          </a>
          <Link 
            href="/auth/login"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105 shadow-lg text-center"
          >
            Espace Membre
          </Link>
        </div>
      </div>
    </section>
  );
}
