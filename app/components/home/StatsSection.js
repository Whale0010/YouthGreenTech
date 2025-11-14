import { STATS_DATA } from "@/app/lib/constants";

function StatCard({ number, label }) {
  return (
    <div className="text-center bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
      <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-2">
        {number}
      </div>
      <p className="text-gray-300 font-medium">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS_DATA.map((stat) => (
            <StatCard key={stat.label} number={stat.number} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
