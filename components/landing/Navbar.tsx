export default function Navbar() {
  return (
    <nav className="bg-obsidian-950 border-b border-purple-400/10 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="font-cinzel font-black text-2xl text-white">Life RPG</h1>
        <a href="/login" className="px-4 py-2 rounded-lg bg-arcane-600 hover:bg-arcane-500 text-white font-semibold transition-colors">
          Get Started
        </a>
      </div>
    </nav>
  )
}
