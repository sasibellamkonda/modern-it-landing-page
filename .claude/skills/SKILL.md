# Frontend Design Skill

## Core Philosophy
Build interfaces that feel premium, intentional, and human. Avoid generic AI aesthetics.

## Typography
- Use a real type scale: 12/14/16/20/24/32/48/64px
- Headings: font-bold or font-extrabold, tight tracking (tracking-tight)
- Body: font-normal, relaxed line height (leading-relaxed)
- Never mix more than 2 font families

## Spacing
- Base grid: 8px (use Tailwind's 2/4/6/8/12/16/24/32 scale)
- Generous padding on sections: py-24 or py-32
- Consistent component padding: p-6 or p-8

## Colors
- Define tokens: primary, neutral, accent — no random hex codes
- Use slate/zinc for neutrals, not gray
- High contrast text: always check readability
- Subtle backgrounds: slate-50, zinc-900 for dark mode

## Components
- Buttons: rounded-full or rounded-lg, never square
- Cards: subtle shadow (shadow-sm), border (border border-slate-200)
- Hover states: always include transition-all duration-200
- Focus states: always visible for accessibility

## Animations (Framer Motion)
- Scroll reveals: fade up with 0.5s duration, 0.1s stagger between items
- Hover: scale(1.02) on cards, scale(1.05) on buttons
- Page transitions: fade in on mount
- Never animate more than opacity + transform together

## Layout
- Max content width: max-w-6xl centered
- Mobile-first: design for 375px, enhance for desktop
- Sections: full-width with centered content container
- Grid: prefer CSS Grid for complex layouts, Flexbox for simple ones

## Avoid
- Drop shadows that are too heavy
- Too many font sizes on one page
- Animations that block content loading
- Generic hero with stock photo background
- Centered text for long paragraphs
