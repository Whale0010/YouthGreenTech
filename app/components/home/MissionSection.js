import { Heart, Users, Zap } from "lucide-react";
import { MISSION_CARDS } from "@/app/lib/constants";

function MissionCard({ icon: IconName, title, description }) {
  const iconMap = {
    Heart: Heart,
    Users: Users,
    Zap: Zap,
  };

  const Icon = iconMap[IconName];

  return (
    <div className="p-8 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-green-500/50 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 shadow-md">
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function MissionSection() {
  return (
    <section id="mission" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 inline-block">
            Notre Mission
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            Nous croyons qu'un changement positif est possible quand nous travaillons ensemble
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {MISSION_CARDS.map((card) => (
            <MissionCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
