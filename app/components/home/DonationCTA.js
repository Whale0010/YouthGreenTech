export function DonationCTA() {
  return (
    <section id="donate" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-cyan-500">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
          Rejoignez notre mouvement de solidarité
        </h2>
        <p className="text-xl text-green-50 mb-8 leading-relaxed text-balance">
          Chaque don, peu importe son montant, nous rapproche de notre objectif d'un monde plus juste. Votre
          générosité peut changer une vie aujourd'hui.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-green-600 rounded-lg font-bold hover:shadow-xl transition-all hover:scale-105 text-lg">
            Faire un don maintenant
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-green-600 transition-all text-lg">
            Devenir bénévole
          </button>
        </div>
      </div>
    </section>
  );
}
