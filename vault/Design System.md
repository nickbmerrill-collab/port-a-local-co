# Design System

The frontend is styled to match [[The Palm Republic]] brand — an elevated coastal lifestyle aesthetic inspired by Port Aransas.

## Color Palette

The brand colors are derived from a **sunset photograph** taken the first night Collie & Winston returned to Port Aransas after Hurricane Harvey.

### Navy (Primary)
The primary brand color — deep, rich, nautical.

| Token | Hex | Use |
|-------|-----|-----|
| `navy-950` | `#0b1120` | Hero/nav/footer backgrounds |
| `navy-900` | `#111d35` | Dark backgrounds |
| `navy-800` | `#172a4a` | Secondary dark |
| `navy-700` | `#1e3a63` | Hero gradient end |
| `navy-500` | `#30639e` | Medium accent |
| `navy-400` | `#4a82ba` | Body text (on light) |
| `navy-300` | `#7aa5d0` | Muted text (on dark) |
| `navy-200` | `#adc7e3` | Light text (on dark) |
| `navy-50` | `#eef3f9` | Light background tint |

### Coral (Signature Accent)
Sunset-derived warm accent — the brand's most distinctive color.

| Token | Hex | Use |
|-------|-----|-----|
| `coral-600` | `#d14e5b` | Dark coral |
| `coral-500` | `#e8656f` | Primary CTA, section labels |
| `coral-400` | `#f08589` | Brand name, hover states, hero text |
| `coral-300` | `#f5a8aa` | Link hover on dark bg |
| `coral-50` | `#fef4f4` | Tag/badge backgrounds |

### Gold (Sunset Highlight)
Warm golden accent for prices, dividers, and premium elements.

| Token | Hex | Use |
|-------|-----|-----|
| `gold-600` | `#b8912f` | Prices, menu item costs |
| `gold-500` | `#d4a843` | Gold divider lines |
| `gold-400` | `#e0be6a` | Shimmer accents |
| `gold-50` | `#fdf9ef` | Feature card icon background |

### Sand (Neutral)
Warm neutral for backgrounds and borders.

| Token | Hex | Use |
|-------|-----|-----|
| `sand-50` | `#faf8f4` | Page background (`body`) |
| `sand-200` | `#ebe0cc` | Card borders |
| `sand-100` | `#f5f0e6` | Row dividers |

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display / Headings | Playfair Display (serif) | 400–800 |
| Body / UI | Inter (sans-serif) | 300–700 |

- Headings use `font-display` class
- Body uses `font-sans` (default)
- Hero headline features italic coral text for "Port Aransas"

## Key Design Elements

### Gradient Bars
Cards have a `navy → coral → gold` gradient bar at the top (1px)

### Gold/Coral Lines
Section dividers use CSS gradient lines:
- `.gold-line` — gold shimmer separator
- `.coral-line` — coral accent separator

### Card Hover
Cards lift 6px on hover with coral border highlight and soft shadow

### Buttons
- `.btn-coral` — Primary CTA (coral gradient, white text)
- `.btn-gold` — Secondary CTA (gold gradient, dark text)

### Dark Sections
Hero, Featured Spots, CTA, and Footer use `hero-gradient` (navy gradient) with `.palm-pattern` SVG overlay

### Verified Badge
Coral-tinted badge with coral glow shadow, used on business cards and detail pages

## CSS File
`src/app/globals.css`

## Related
- [[The Palm Republic]]
- [[Project Overview]]
