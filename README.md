# MindForge - Gamified Productivity Tracker

A comprehensive gamified productivity application that transforms real-life goals into RPG-style quests. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Live Demo

**[View Live Demo →](https://dancing-bombolone-5fccb4.netlify.app/)**

## ✨ Features

### Core Functionality
- **Epic Quests**: Transform your goals into engaging RPG-style adventures with clear objectives and rewards
- **Digital Companions (Virtuas)**: Train AI-powered companions that grow stronger as you complete tasks and build habits
- **Achievement System**: Collect rare runes and unlock achievements as you master productivity milestones
- **Habit Chains**: Build powerful habits through connected sequences of actions
- **Smart Analytics**: Get insights into your productivity patterns with comprehensive analytics and heatmaps
- **Task Management**: Advanced task system with dependencies, priorities, and smart scheduling

### Gamification Elements
- **XP & Leveling System**: Earn experience points and level up your profile and Virtuas
- **Streak Tracking**: Maintain daily streaks to build consistency
- **Rune Collection**: Unlock achievements with different rarity levels (Common, Rare, Epic, Legendary)
- **Progress Visualization**: Beautiful charts and progress rings to track your journey
- **Milestone Tracking**: Set and achieve long-term goals with visual progress indicators

### User Experience
- **Responsive Design**: Mobile-first approach with thoughtful breakpoints
- **RetroMorphic Aesthetics**: Bold shadows, vibrant colors, and tactile interactions
- **Comprehensive Color System**: 6 complete color ramps with neutral tones
- **Typography Scale**: Complete typography system from display (48px) to caption (10px) sizes
- **Accessibility First**: WCAG compliant with proper contrast ratios and semantic HTML

## 🎯 Application Structure

### Pages & Features
- **Landing Page**: Marketing site with features, testimonials, and pricing
- **Dashboard**: Overview of daily tasks, Virtuas, and progress
- **Tasks**: Comprehensive task management with filtering and dependencies
- **Quests**: Goal management system with progress tracking
- **Virtuas**: Digital companion management and training
- **Habit Chains**: Sequential habit building system
- **Achievements**: Rune collection and milestone tracking
- **Analytics**: Advanced insights with charts, heatmaps, and recommendations
- **Settings**: User preferences and account management

### Technical Stack
- **Frontend**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React for consistent iconography
- **State Management**: Zustand for global state
- **Database**: Supabase for backend services
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite for fast development and building
- **Deployment**: Netlify for hosting

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- npm or yarn package manager
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mindforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the migration files in the `supabase/migrations` folder
   - Enable Row Level Security (RLS) on all tables

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:5173/](http://localhost:5173/)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── achievements/           # Achievement system components
│   ├── analytics/              # Analytics and charts
│   ├── chains/                 # Habit chain components
│   ├── dashboard/              # Dashboard widgets
│   ├── gamification/           # XP, levels, streaks
│   ├── layout/                 # App layout components
│   ├── mobile/                 # Mobile-specific components
│   ├── notifications/          # Notification system
│   ├── quest/                  # Quest management
│   ├── social/                 # Social sharing features
│   ├── task/                   # Task management
│   └── virtua/                 # Virtua (companion) system
├── pages/                      # Main application pages
├── lib/                        # Utilities and configurations
│   ├── store.ts               # Zustand state management
│   ├── supabase.ts            # Database client and types
│   └── utils.ts               # Helper functions
└── index.tsx                  # Application entry point
```

## 🎨 Design System

### Color Palette
The design system includes comprehensive color ramps:

- **Primary (Yellow/Orange)**: `primarysolid-10` through `primarysolid-90`
- **Secondary (Blue)**: `secondarysolid-10` through `secondarysolid-90`
- **Success (Green)**: `success-10` through `success-90`
- **Warning (Amber)**: `warning-10` through `warning-90`
- **Error (Red/Pink)**: `error-10` through `error-90`
- **Info (Cyan)**: `info-10` through `info-90`
- **Neutral (Black)**: `black-10` through `black-100`

### Typography System
Complete typography scale based on design specifications:

#### Display Typography
- `display-48-black`: 48px, 900 weight, -0.02em spacing
- `display-40-black`: 40px, 900 weight, -0.02em spacing
- `display-32-black`: 32px, 900 weight, -0.01em spacing

#### Title Typography
- `title-28-black` through `title-14-black`: 900 weight titles
- Sizes: 28px, 24px, 20px, 18px, 16px, 14px

#### Body Text
- `text-18-reg/med` through `text-12-reg/med`
- Regular (400) and Medium (500) weights
- Sizes: 18px, 16px, 14px, 12px

#### Caption Text
- `caption-11-reg/med` and `caption-10-reg/med`
- For fine print and micro-copy

### Component Styling
- **Elevated Shadows**: `shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)]`
- **Border System**: 2px solid borders with `#001428` color
- **Border Radius**: Consistent 16px-24px rounded corners
- **Spacing**: 8px grid system for consistent layouts

## 🗄️ Database Schema

### Core Tables
- **users**: User profiles with XP, level, and preferences
- **virtuas**: Digital companions with domains and evolution stages
- **quests**: Goal management with progress tracking
- **tasks**: Task management with dependencies and scheduling
- **chains**: Habit chain definitions and progress
- **chain_steps**: Individual steps within habit chains
- **runes**: Achievement definitions with criteria and rewards
- **user_runes**: User's earned achievements
- **streak_logs**: Daily activity tracking for streaks

### Key Features
- Row Level Security (RLS) enabled on all tables
- Automatic timestamp updates with triggers
- Foreign key relationships for data integrity
- Enum types for status fields and rarity levels

## 🎯 Usage Examples

### Creating a Quest
```typescript
const questData = {
  title: "Learn React",
  description: "Master React fundamentals",
  virtua_id: "virtua-id",
  priority: 3,
  due_date: "2024-12-31"
};
```

### Task Management
```typescript
const taskData = {
  title: "Complete tutorial",
  difficulty: 2,
  priority: 3,
  xp_reward: 25,
  tags: ["learning", "react"]
};
```

### Virtua Training
```typescript
const virtuaData = {
  name: "Focus Spirit",
  domain: "Learning",
  traits: {
    personality: "Determined",
    preferences: "Morning tasks"
  }
};
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Style
- TypeScript for type safety
- Consistent component structure with proper prop interfaces
- Tailwind CSS for styling with custom design system
- Semantic HTML for accessibility
- ESLint and Prettier for code formatting

## 📱 Responsive Design

The application is mobile-first with breakpoints:
- **Mobile**: Default (320px+)
- **Tablet**: md (768px+)
- **Desktop**: lg (1024px+)
- **Large Desktop**: xl (1280px+)

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Proper color contrast ratios
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML structure
- Focus management
- ARIA labels and descriptions

## 🚀 Deployment

The application is deployed on Netlify with automatic builds from the main branch.

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables on your hosting platform

### Environment Variables
Required for production:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Add TypeScript types for all new components
- Include proper error handling
- Test responsive design on multiple devices
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Supabase** for backend infrastructure
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons
- **Recharts** for data visualization
- **Inter Font** for typography

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Check the live demo for feature examples
- Review the component documentation

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Supabase**

**Live Demo**: https://dancing-bombolone-5fccb4.netlify.app/