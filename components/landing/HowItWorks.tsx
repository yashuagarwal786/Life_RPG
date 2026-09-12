export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-arcane-600/5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-cinzel font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">⚔️</div>
            <h3 className="font-bold text-white mb-2">Create Quests</h3>
            <p className="text-purple-400/60">Transform your daily tasks into RPG quests</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="font-bold text-white mb-2">Earn XP</h3>
            <p className="text-purple-400/60">Gain experience points for completing quests</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="font-bold text-white mb-2">Level Up</h3>
            <p className="text-purple-400/60">Grow stronger and unlock achievements</p>
          </div>
        </div>
      </div>
    </section>
  )
}
