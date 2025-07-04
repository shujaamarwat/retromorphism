module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Color Ramp (Yellow/Orange)
        "primarysolid-10": "var(--primarysolid-10)",
        "primarysolid-20": "var(--primarysolid-20)",
        "primarysolid-30": "var(--primarysolid-30)",
        "primarysolid-40": "var(--primarysolid-40)",
        "primarysolid-50": "var(--primarysolid-50)",
        "primarysolid-60": "var(--primarysolid-60)",
        "primarysolid-70": "var(--primarysolid-70)",
        "primarysolid-80": "var(--primarysolid-80)",
        "primarysolid-90": "var(--primarysolid-90)",

        // Secondary Color Ramp (Blue)
        "secondarysolid-10": "var(--secondarysolid-10)",
        "secondarysolid-20": "var(--secondarysolid-20)",
        "secondarysolid-30": "var(--secondarysolid-30)",
        "secondarysolid-40": "var(--secondarysolid-40)",
        "secondarysolid-50": "var(--secondarysolid-50)",
        "secondarysolid-60": "var(--secondarysolid-60)",
        "secondarysolid-70": "var(--secondarysolid-70)",
        "secondarysolid-80": "var(--secondarysolid-80)",
        "secondarysolid-90": "var(--secondarysolid-90)",

        // Neutral/Black Color Ramp
        "black-10": "var(--black-10)",
        "black-20": "var(--black-20)",
        "black-30": "var(--black-30)",
        "black-40": "var(--black-40)",
        "black-50": "var(--black-50)",
        "black-60": "var(--black-60)",
        "black-70": "var(--black-70)",
        "black-80": "var(--black-80)",
        "black-90": "var(--black-90)",
        "black-100": "var(--black-100)",

        // White
        "white-100": "var(--white-100)",

        // Error Color Ramp (Pink/Red)
        "error-10": "var(--error-10)",
        "error-20": "var(--error-20)",
        "error-30": "var(--error-30)",
        "error-40": "var(--error-40)",
        "error-50": "var(--error-50)",
        "error-60": "var(--error-60)",
        "error-70": "var(--error-70)",
        "error-80": "var(--error-80)",
        "error-90": "var(--error-90)",
        "communicationsoliderror": "var(--communicationsoliderror)",

        // Success Color Ramp (Green)
        "success-10": "var(--success-10)",
        "success-20": "var(--success-20)",
        "success-30": "var(--success-30)",
        "success-40": "var(--success-40)",
        "success-50": "var(--success-50)",
        "success-60": "var(--success-60)",
        "success-70": "var(--success-70)",
        "success-80": "var(--success-80)",
        "success-90": "var(--success-90)",

        // Warning Color Ramp (Amber/Orange)
        "warning-10": "var(--warning-10)",
        "warning-20": "var(--warning-20)",
        "warning-30": "var(--warning-30)",
        "warning-40": "var(--warning-40)",
        "warning-50": "var(--warning-50)",
        "warning-60": "var(--warning-60)",
        "warning-70": "var(--warning-70)",
        "warning-80": "var(--warning-80)",
        "warning-90": "var(--warning-90)",

        // Info Color Ramp (Cyan/Blue)
        "info-10": "var(--info-10)",
        "info-20": "var(--info-20)",
        "info-30": "var(--info-30)",
        "info-40": "var(--info-40)",
        "info-50": "var(--info-50)",
        "info-60": "var(--info-60)",
        "info-70": "var(--info-70)",
        "info-80": "var(--info-80)",
        "info-90": "var(--info-90)",

        // Legacy support
        "secondaryopacity-80": "var(--secondarysolid-50)",

        // Shadcn UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // Display Typography
        "display-48-black": "var(--display-48-black-font-family)",
        "display-40-black": "var(--display-40-black-font-family)",
        "display-32-black": "var(--display-32-black-font-family)",

        // Title Typography
        "title-28-black": "var(--title-28-black-font-family)",
        "title-24-black": "var(--title-24-black-font-family)",
        "title-20-black": "var(--title-20-black-font-family)",
        "title-18-black": "var(--title-18-black-font-family)",
        "title-16-black": "var(--title-16-black-font-family)",
        "title-14-black": "var(--title-14-black-font-family)",

        // Body Text Typography
        "text-18-reg": "var(--text-18-reg-font-family)",
        "text-18-med": "var(--text-18-med-font-family)",
        "text-16-reg": "var(--text-16-reg-font-family)",
        "text-16-med": "var(--text-16-med-font-family)",
        "text-14-reg": "var(--text-14-reg-font-family)",
        "text-14-med": "var(--text-14-med-font-family)",
        "text-12-reg": "var(--text-12-reg-font-family)",
        "text-12-med": "var(--text-12-med-font-family)",

        // Caption Typography
        "caption-11-reg": "var(--caption-11-reg-font-family)",
        "caption-11-med": "var(--caption-11-med-font-family)",
        "caption-10-reg": "var(--caption-10-reg-font-family)",
        "caption-10-med": "var(--caption-10-med-font-family)",

        // Default sans fallback
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        // Display sizes
        'display-48': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '900' }],
        'display-40': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '900' }],
        'display-32': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '900' }],

        // Title sizes
        'title-28': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '900' }],
        'title-24': ['24px', { lineHeight: '32px', letterSpacing: '0px', fontWeight: '900' }],
        'title-20': ['20px', { lineHeight: '28px', letterSpacing: '0px', fontWeight: '900' }],
        'title-18': ['18px', { lineHeight: '26px', letterSpacing: '0px', fontWeight: '900' }],
        'title-16': ['16px', { lineHeight: '24px', letterSpacing: '0px', fontWeight: '900' }],
        'title-14': ['14px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '900' }],

        // Body text sizes
        'text-18-reg': ['18px', { lineHeight: '26px', letterSpacing: '0px', fontWeight: '400' }],
        'text-18-med': ['18px', { lineHeight: '26px', letterSpacing: '0px', fontWeight: '500' }],
        'text-16-reg': ['16px', { lineHeight: '24px', letterSpacing: '0px', fontWeight: '400' }],
        'text-16-med': ['16px', { lineHeight: '24px', letterSpacing: '0px', fontWeight: '500' }],
        'text-14-reg': ['14px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '400' }],
        'text-14-med': ['14px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '500' }],
        'text-12-reg': ['12px', { lineHeight: '16px', letterSpacing: '0px', fontWeight: '400' }],
        'text-12-med': ['12px', { lineHeight: '16px', letterSpacing: '0px', fontWeight: '500' }],

        // Caption sizes
        'caption-11-reg': ['11px', { lineHeight: '14px', letterSpacing: '0px', fontWeight: '400' }],
        'caption-11-med': ['11px', { lineHeight: '14px', letterSpacing: '0px', fontWeight: '500' }],
        'caption-10-reg': ['10px', { lineHeight: '12px', letterSpacing: '0px', fontWeight: '400' }],
        'caption-10-med': ['10px', { lineHeight: '12px', letterSpacing: '0px', fontWeight: '500' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};