export default function Classes() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-cinzel font-bold text-white text-center mb-12">Choose Your Class</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji: '⚔️', name: 'Warrior', desc: 'Strength & Agility' },
            { emoji: '🧙', name: 'Mage', desc: 'Intelligence & Wisdom' },
            { emoji: '🗡️', name: 'Rogue', desc: 'Agility & Speed' },
            { emoji: '🏹', name: 'Ranger', desc: 'Wisdom & Charisma' },
          ].map(cls => (
            <div key={cls.name} className="rpg-card p-6 text-center hover:shadow-arcane transition-shadow">
              <div className="text-4xl mb-3">{cls.emoji}</div>
              <h3 className="font-bold text-white mb-1">{cls.name}</h3>
              <p className="text-xs text-purple-400/60">{cls.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
