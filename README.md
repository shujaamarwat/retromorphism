# RetroMorphism Design System

A comprehensive React component library featuring retro-styled UI components with bold shadows, vibrant colors, and tactile interactions. Built with React, TypeScript, Tailwind CSS, and Radix UI primitives.

## 🚀 Live Demo

**[View Live Demo →](https://bolt-anima-project.netlify.app/)**

## ✨ Features

### Design Philosophy
- **RetroMorphic Aesthetics**: Elevated components with bold shadows and tactile interactions
- **Comprehensive Color System**: 6 complete color ramps (Primary, Secondary, Success, Warning, Error, Info) with neutral tones
- **Typography Scale**: Complete typography system from display (48px) to caption (10px) sizes
- **Accessibility First**: WCAG compliant with proper contrast ratios and semantic HTML
- **Responsive Design**: Mobile-first approach with thoughtful breakpoints

### Component Library
- **Enhanced Buttons**: Multiple variants, sizes, and icon combinations with press animations
- **Content Cards**: Elevated cards with images, badges, and action buttons
- **Form Elements**: Inputs, selects, textareas with retro styling
- **Interactive Controls**: Checkboxes, radio buttons, switches, and sliders
- **Display Components**: Badges, avatars, progress bars
- **Navigation**: Tabs with smooth transitions
- **Feedback**: Alerts and tooltips for user communication

### Technical Stack
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for utility-first styling
- **Radix UI** primitives for accessibility
- **Lucide React** for consistent iconography
- **Vite** for fast development and building

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
Complete typography scale based on Figma design specifications:

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

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd anima-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
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
│   └── ui/                 # Reusable UI components
│       ├── button.tsx      # Enhanced button component
│       ├── card.tsx        # Card components
│       ├── content-card.tsx # Content card with image
│       ├── input.tsx       # Form inputs
│       ├── slider.tsx      # Custom sliders
│       └── ...             # Other UI components
├── screens/
│   ├── ComponentShowcase/  # Main showcase page
│   └── Box/                # Button variations demo
├── lib/
│   └── utils.ts            # Utility functions
└── index.tsx               # Application entry point
```

## 🎯 Usage Examples

### Basic Button
```tsx
import { Button } from "@/components/ui/button";

<Button>Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
```

### Content Card
```tsx
import { ContentCard } from "@/components/ui/content-card";

<ContentCard
  title="Mountain Adventure"
  description="Discover breathtaking landscapes..."
  imageUrl="https://example.com/image.jpg"
  badge="Featured"
  primaryAction={{
    label: "Explore",
    onClick: () => console.log("Explore clicked")
  }}
/>
```

### Typography
```tsx
<h1 className="text-display-48 font-display-48-black text-black-100">
  Display Heading
</h1>
<p className="text-text-16-reg font-text-16-reg text-black-60">
  Body text content
</p>
```

## 🎨 Customization

### Extending Colors
Add new colors to `tailwind.css`:

```css
:root {
  --custom-color-10: rgba(255, 0, 0, 0.1);
  --custom-color-50: rgba(255, 0, 0, 1);
}
```

Then reference in `tailwind.config.js`:

```js
colors: {
  "custom-10": "var(--custom-color-10)",
  "custom-50": "var(--custom-color-50)",
}
```

### Adding Typography
Define new typography variables in `tailwind.css` and add corresponding utilities in `tailwind.config.js`.

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Style
- TypeScript for type safety
- Consistent component structure
- Tailwind CSS for styling
- Semantic HTML for accessibility

## 📱 Responsive Design

The design system is mobile-first with breakpoints:
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Anima** for the initial design system generation
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons
- **Inter Font** for typography

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Check the live demo for component examples
- Review the component showcase for implementation details

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**