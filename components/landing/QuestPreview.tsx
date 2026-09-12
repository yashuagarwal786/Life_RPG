export default function QuestPreview() {
  return (
    <section className="py-20 px-4 bg-arcane-600/5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-cinzel font-bold text-white text-center mb-12">Create Any Quest</h2>
        <div className="rpg-card p-8">
          <p className="text-purple-400/60 text-center mb-6">
            From quick 5-minute tasks to epic projects spanning hours, categorize by type and difficulty to maximize your rewards.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { emoji: '💪', label: 'Fitness' },
              { emoji: '💻', label: 'Coding' },
              { emoji: '📚', label: 'Study' },
              { emoji: '🎨', label: 'Creativity' },
            ].map(cat => (
              <div key={cat.label}>
                <p className="text-3xl mb-1">{cat.emoji}</p>
                <p className="text-sm text-purple-400/60">{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
