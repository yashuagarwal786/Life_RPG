export default function Hero() {
  return (
    <section className="py-24 px-4 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-5xl md:text-6xl font-cinzel font-black text-white mb-6">
          Turn Your Life Into an Epic Adventure
        </h2>
        <p className="text-xl text-purple-400/80 mb-8">
          Gamify your real life. Complete quests, earn XP, build character attributes, and unlock powerful streaks. Life RPG is the game of self-improvement.
        </p>
        <a href="/signup" className="inline-block px-8 py-4 rounded-lg bg-arcane-600 hover:bg-arcane-500 text-white font-bold text-lg transition-colors">
          Start Your Adventure
        </a>
      </div>
    </section>
  )
}
