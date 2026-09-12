export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-cinzel font-bold text-white text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rpg-card p-6">
            <h3 className="font-bold text-white mb-2">🎯 Quest Categories</h3>
            <p className="text-purple-400/60 text-sm">Fitness, Coding, Study, Reading, Creativity, Social & more</p>
          </div>
          <div className="rpg-card p-6">
            <h3 className="font-bold text-white mb-2">📊 Character Attributes</h3>
            <p className="text-purple-400/60 text-sm">Grow 7 unique attributes through different quest types</p>
          </div>
          <div className="rpg-card p-6">
            <h3 className="font-bold text-white mb-2">🔥 Streaks & Rewards</h3>
            <p className="text-purple-400/60 text-sm">Build consistent streaks and earn bonus rewards</p>
          </div>
          <div className="rpg-card p-6">
            <h3 className="font-bold text-white mb-2">🏪 Shop & Items</h3>
            <p className="text-purple-400/60 text-sm">Purchase cosmetics and customize your character</p>
          </div>
        </div>
      </div>
    </section>
  )
}
