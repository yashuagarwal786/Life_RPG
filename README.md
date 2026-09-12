# Life RPG - Turn Your Life Into an Epic Adventure

A gamified life management app where you complete real-life quests, earn XP, level up your character, and build powerful streaks. Built with Next.js, React, TypeScript, Tailwind CSS, and Supabase.

## 🎮 Features

### Core Gameplay
- **Quest System** - Create and complete quests in 8 categories (Fitness, Coding, Study, Reading, Creativity, Social, Habit, Other)
- **XP & Leveling** - Gain experience points and level up your character
- **Character Attributes** - 7 unique stats (Strength, Intelligence, Agility, Endurance, Charisma, Creativity, Wisdom)
- **Difficulty Scaling** - Easy (1x) → Medium (2x) → Hard (3x) → Legendary (5x) XP multipliers
- **Streak System** - Build consecutive daily quest streaks for bonus rewards

### Customization
- **Character Classes** - Choose from Warrior, Mage, Rogue, or Ranger
- **Shop System** - Purchase cosmetic items (themes, badges, titles, avatar frames)
- **Inventory** - Manage and equip your purchased items
- **Profile Customization** - Personalize your character appearance

### Progression
- **Badge System** - Earn achievements for reaching milestones
- **Attribute Growth** - Attributes increase based on quest categories
- **Gold Currency** - Earn gold from quests to purchase shop items
- **Streak Bonuses** - Daily streaks provide bonus XP and gold

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15.3.5 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Radix UI (components)
- React Hook Form + Zod (validation)

**Backend:**
- Supabase (PostgreSQL database + Auth)
- Server Actions (mutations)
- Type-safe queries

**Deployment:**
- Vercel (Frontend)
- Supabase Cloud (Backend)

## 📋 Project Structure

```
life-rpg/
├── app/
│   ├── (app)/                 # Protected routes
│   │   ├── dashboard/         # Main dashboard
│   │   ├── quests/           # Quest management
│   │   ├── shop/             # Shop interface
│   │   ├── inventory/        # Inventory management
│   │   ├── attributes/       # Character stats
│   │   └── layout.tsx        # Protected layout
│   ├── actions/               # Server actions
│   │   ├── auth.ts           # Auth actions
│   │   ├── quests.ts         # Quest actions
│   │   └── shop.ts           # Shop actions
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── dashboard/             # Dashboard components
│   ├── landing/               # Landing page sections
│   ├── layout/                # Layout components
│   └── ui/                    # Reusable UI components
├── lib/
│   ├── rpg/                   # Game mechanics
│   │   ├── attributes.ts      # Attribute gains
│   │   ├── config.ts          # Config data
│   │   ├── rewards.ts         # XP/gold rewards
│   │   ├── streak.ts          # Streak logic
│   │   └── xp.ts              # Level/XP system
│   ├── supabase/              # Supabase clients
│   └── validations/           # Schema validations
├── middleware.ts              # Auth middleware
├── types/index.ts             # TypeScript types
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashuagarwal786/Life_RPG.git
   cd Life_RPG
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

4. **Run migrations**
   ```bash
   # Use Supabase dashboard or CLI to run migrations in supabase/migrations/
   supabase db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:3000

### Building

```bash
npm run build     # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 📖 Usage

### Creating a Character
1. Sign up on the landing page
2. Choose your character class (Warrior, Mage, Rogue, Ranger)
3. Start on the dashboard

### Creating Quests
1. Go to /quests
2. Click "Create New Quest"
3. Fill in title, description, category, and difficulty
4. Submit to add to your quest list

### Completing Quests
1. On the quests page, click "Complete" on any active quest
2. Receive XP and gold rewards
3. Earn attribute points based on quest category
4. Build your streak with daily completions

### Shopping
1. Visit /shop
2. Browse items filtered by rarity
3. Purchase with gold
4. Equip items in /inventory

### Tracking Progress
- **Dashboard**: See daily stats and active quests
- **Attributes**: View all character attributes and growth
- **Inventory**: Manage equipped items

## 🎯 Game Mechanics

### XP & Leveling
- Base XP per quest depends on difficulty
- Difficulty multipliers: Easy (1x), Medium (2x), Hard (3x), Legendary (5x)
- Streak bonus: +10% XP for maintaining daily streaks
- Level up with accumulated XP

### Attributes
Each attribute grows based on quest category:
- **Strength**: Fitness quests
- **Intelligence**: Study & Coding quests
- **Agility**: Fitness quests
- **Endurance**: Habit quests
- **Charisma**: Social quests
- **Creativity**: Creativity quests
- **Wisdom**: Study & Coding quests

### Rewards
- **XP**: Progress towards next level
- **Gold**: Currency for shop purchases
- **Attribute Points**: Increase character stats
- **Badges**: Achievements for milestones
- **Streak Bonus**: Extra rewards for daily consistency

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**One-click deployment:**
- Frontend: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyashuagarwal786%2FLife_RPG)

## 📱 Pages

- `/` - Landing page
- `/login` - Login (auth page)
- `/signup` - Sign up (auth page)
- `/dashboard` - Character dashboard
- `/quests` - Quest management
- `/shop` - Shop and cosmetics
- `/inventory` - Inventory and equipment
- `/attributes` - Character stats

## 🔐 Authentication

- Email/password authentication via Supabase
- Protected routes with middleware
- Session management with SSR
- Automatic redirect to login for unauthenticated users

## 🎨 Design

- RPG-themed dark UI with purple accents
- Smooth animations with Framer Motion
- Responsive mobile-first design
- Accessibility-focused with Radix UI
- Custom color palette optimized for gaming aesthetic

## 📊 Database Schema

**Tables:**
- `profiles` - User profiles and stats
- `quests` - User quests
- `character_attributes` - Character stats
- `shop_items` - Available cosmetics
- `user_inventory` - Purchased items
- `badges` - Achievement definitions
- `user_badges` - Earned achievements

## 🐛 Known Limitations

- Auth pages (login/signup) need UI implementation
- No social features yet (leaderboards, friend challenges)
- No analytics dashboard
- Mobile optimization can be improved

## 🚧 Future Roadmap

- [ ] Social features (friends, challenges)
- [ ] Leaderboards
- [ ] Daily challenges
- [ ] Quest templates/suggestions
- [ ] Mobile app (React Native)
- [ ] Multiplayer quests
- [ ] Advanced analytics
- [ ] Customizable avatars

## 📝 License

MIT

## 👨‍💻 Author

Built with ❤️ for gamified life improvement

## 🤝 Contributing

Contributions welcome! Feel free to fork and submit PRs.

---

**Ready to start your adventure?** 🎮
Deploy on Vercel or run locally and begin questing!
