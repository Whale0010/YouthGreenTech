import { ArrowRight } from "lucide-react";

function ActionCard({ title, description }) {
  return (
    <div className="group cursor-pointer">
      <div className="w-full h-64 bg-gradient-to-br from-green-500 to-cyan-500 rounded-lg mb-4 overflow-hidden shadow-lg hover:shadow-xl transition-all">
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
          Image Placeholder
        </div>
      </div>
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
          En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  );
}

export function ActionsSection() {
  const actions = [
    {
      title: "Aide alimentaire",
      description: "Distribution de repas équilibrés et de colis alimentaires aux familles dans le besoin.",
    },
    {
      title: "Éducation des enfants",
      description: "Accès à l'éducation, bourses d'études et soutien scolaire pour tous les enfants.",
    },
    {
      title: "Accès à la santé",
      description: "Cliniques mobiles et consultations gratuites pour assurer le bien-être de tous.",
    },
    {
      title: "Formation professionnelle",
      description: "Programmes de formation pour l'insertion professionnelle et l'autonomie économique.",
    },
  ];

  return (
    <section id="actions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 inline-block">
            Nos Actions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            Découvrez les projets que nous menons pour impacter positivement nos communautés
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {actions.map((action) => (
            <ActionCard
              key={action.title}
              title={action.title}
              description={action.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
