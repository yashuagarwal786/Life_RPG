export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-arcane-600/10 border-y border-arcane-400/20">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-cinzel font-bold text-white mb-6">Ready to Begin Your Quest?</h2>
        <p className="text-purple-400/60 mb-8">Join hundreds of adventurers building better lives through gamification.</p>
        <a href="/signup" className="inline-block px-8 py-4 rounded-lg bg-arcane-600 hover:bg-arcane-500 text-white font-bold transition-colors">
          Create Account
        </a>
      </div>
    </section>
  )
}
