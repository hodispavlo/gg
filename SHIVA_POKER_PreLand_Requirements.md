# SHIVA POKER — Pre-Landing Requirements

Version: 1.2  
Source: design mockup `docs/design/preland-mockup.jpg`  
Scope: single-screen pre-landing (preland) that sends the user to the club Telegram **bot**.

This document is the implementation spec. Pixel-faithful match to the mockup is required for layout, copy, hierarchy, and visual mood.

---

## 1. Product

**SHIVA POKER** is a closed poker club. The preland is a conversion page, not a product site.

Goal: a visitor lands, understands the offer in one screen, and taps the CTA. The CTA opens the club Telegram **bot** (`https://t.me/shivapoker_bot`). CTA label and hint stay as in the mockup.

Out of scope for this version:

- Registration forms, auth, payments
- Game lobby, tables, limits catalog
- Blog, about, legal pages
- App store / ClubGG / PPPoker download flows
- Analytics dashboards

---

## 2. Locales and breakpoints (from mockup)

The mockup defines two canonical frames. Both must ship.

| Frame | Viewport | Locale | Active language chip |
| --- | --- | --- | --- |
| Desktop | ≥ 1280 px, full-bleed hero | `ru` | **RU** |
| Mobile | 375–430 px, full-height hero | `ua` | **UA** |

### 2.1 Language switcher

- Control in the header: `UA / RU`
- Active locale: emerald green, same family as the CTA
- Inactive locale: muted white/gray
- Separator `/` is muted and not clickable
- Switching language updates all UI copy immediately (no reload required)
- Persist choice in `localStorage` key `shiva.locale`
- Default when no stored choice:
  - `uk` / `uk-UA` browser languages → `ua`
  - everything else → `ru`
- `html lang` must follow locale: `ru` or `uk`

### 2.2 URL

- Optional query override: `?lang=ru` | `?lang=ua` (wins over stored and browser default)
- Paths stay the same; this is a one-page preland

---

## 3. Copy

All strings below are canonical. Do not invent extra marketing lines.

### 3.1 Russian (`ru`) — desktop mockup

| Key | Text |
| --- | --- |
| brand | SHIVA POKER |
| eyebrow | ЗАКРЫТЫЙ ПОКЕРНЫЙ КЛУБ |
| headline | Играете в покер?<br>Присоединяйтесь к нам. |
| subhead | Выбирайте формат игры и комфортный лимит |
| cta | Присоединиться к клубу |
| ctaHint | Откроется Telegram-бот |
| footerBrand | SHIVA POKER |

Headline is two lines. Desktop: question on line 1, invitation on line 2. Period at the end of the second line.

### 3.2 Ukrainian (`ua`) — mobile mockup

| Key | Text |
| --- | --- |
| brand | SHIVA POKER |
| eyebrow | ЗАКРИТИЙ ПОКЕРНИЙ КЛУБ |
| headline | Граєте в покер?<br>Приєднуйтеся до нас. |
| subhead | Обирайте формат гри та комфортний ліміт |
| cta | Приєднатися до клубу |
| ctaHint | Відкриється Telegram-бот |
| footerBrand | SHIVA POKER |

On mobile the subhead wraps to two lines as in the mockup:

```
Обирайте формат гри
та комфортний ліміт
```

Brand name is never translated.

CTA label and hint match the mockup. The previous channel URL was a stakeholder typo; destination is the bot (§7).

---

## 4. Page structure

Single viewport composition. No scroll on desktop at 1440×900. Mobile may allow a small overscroll but the hero must fill the first screen.

```
┌─────────────────────────────────────────────────────────┐
│ [logo + SHIVA POKER]                    [UA / RU]       │  header
│                                                         │
│              ЗАКРЫТЫЙ ПОКЕРНЫЙ КЛУБ                     │  eyebrow
│              Headline (2 lines)                         │
│              Subhead                                    │
│              [ CTA  → ]                                 │
│              hint                                       │
│                                                         │
│ SHIVA POKER                                             │  footer
└─────────────────────────────────────────────────────────┘
```

Background photography sits behind the whole frame (header, hero, footer). Do not put the photo only under the headline.

### 4.1 Header

- Left: full lockup from `docs/design/logo.svg` (source raster: `docs/design/logo.png`)
- Mark: outlined spade (two overlapping triangles + stem), stroke `#00E8B1` — mint, not the darker CTA emerald
- Wordmark: uppercase `SHIVA POKER`, tracking slightly open, near-white
- Prefer the SVG in the header; PNG is the pixel reference if the SVG mark needs a tighter trace
- Right: language switcher
- Header is transparent over the photo; no solid bar, no shadow
- Logo is not a second CTA; it may scroll to top / be inert

### 4.2 Hero (center column)

Vertically centered block, horizontally centered.

Order:

1. Eyebrow — small caps, wide letter-spacing, muted light gray
2. Headline — large white serif or high-contrast display sans (see typography), tight leading
3. Subhead — smaller, muted gray, regular weight
4. Primary button — emerald pill, white label, right arrow
5. Hint — smallest type, muted, under the button

Max content width on desktop ≈ 720–800 px so the two-line headline matches the mockup wrap.

### 4.3 Footer

- Bottom-left: `SHIVA POKER` in small muted caps
- No copyright year, no extra links in v1
- Safe-area padding on iOS (`env(safe-area-inset-*)`)

---

## 5. Visual design

### 5.1 Atmosphere

Dark green felt poker table, low key, cinematic. Chips and cards are photographic, not icons.

Foreground objects visible in the mockup (must remain in the crop):

- Stacks of dark chips with gold/cream edge markings, left and right
- Ace of spades and King of clubs, overlapping, lower-right of the composition
- Soft vignette so the center copy stays readable

The hero is **AI-generated for the mockup**, not stock photography. **Keep the mockup crop** (`docs/design/preland-mockup.jpg`) for v1. Do not swap in Unsplash or other stock. Do not relitigate licensing as if this were a photo shoot — treat the crop as the brand visual until a replacement is explicitly requested.

### 5.2 Color tokens (approximate, match mockup by eye)

| Token | Role | Value |
| --- | --- | --- |
| `--felt-deep` | page fallback / vignette | `#07140F` |
| `--felt-mid` | mid table | `#0E2A1C` |
| `--logo-mint` | logo mark stroke | `#00E8B1` |
| `--emerald` | CTA fill, active locale | `#1F7A4D` |
| `--emerald-hover` | CTA hover | `#25915C` |
| `--emerald-press` | CTA active | `#17633E` |
| `--text-primary` | headline, wordmark | `#FFFFFF` |
| `--text-muted` | eyebrow, subhead, hint, footer | `rgba(255,255,255,0.62)` |
| `--text-faint` | inactive locale | `rgba(255,255,255,0.45)` |
| `--cta-text` | button label | `#FFFFFF` |

CTA is a filled pill with a soft inner highlight / slight top-to-bottom green gradient, matching the mockup (not a flat Material button). Optional 1px inner rim.

### 5.3 Typography

- UI / body / button: geometric sans (e.g. Inter, Manrope, or SF Pro). Medium on button.
- Headline: high-contrast serif or neo-grotesk extra-bold. Mockup reads as a modern serif/display (not thin sans). Use one webfont pair only.
- Eyebrow: uppercase, letter-spacing ≈ `0.22–0.32em`, weight 500–600
- Headline desktop: ~52–64 px, line-height ~1.1, weight 600–700
- Headline mobile: ~28–34 px, same leading, still two lines
- Subhead desktop: ~16–18 px
- Subhead mobile: ~14–15 px
- Button: ~15–16 px, medium
- Hint: ~12–13 px

No underlines except focus rings.

### 5.4 CTA button

- Height ≈ 48 px desktop, 48 px mobile (touch target ≥ 44 px)
- Horizontal padding generous; pill radius fully rounded
- Label + arrow (`→` or 16 px stroke icon, 4–6 px gap)
- Hover: 4–8% brighter fill, cursor pointer
- Active: slight scale `0.98`
- Focus-visible: 2 px white/emerald offset ring
- Disabled state is not used in v1

### 5.5 Overlay for readability

A radial or linear dark-green scrim over the photo so white type meets WCAG AA against the table:

- Center slightly lighter so chips/cards still read
- Stronger darkening behind the type column
- Do not wash the photo to muddy gray

---

## 6. Responsive rules

| Breakpoint | Behavior |
| --- | --- |
| ≥ 1280 px | Desktop composition. Headline two long lines. Photo shows full chip/card scene. Header padding ~40–56 px. |
| 768–1279 px | Keep centered stack. Scale headline down. Photo may crop sides; keep cards in frame if possible. |
| ≤ 767 px | Mobile composition from mockup. Tighter header padding (~16–20 px). Headline still two lines. Subhead may wrap to two lines. CTA full width of content column (not full viewport edge-to-edge). Photo crop favors right-side cards. |

Mobile header still has logo left + `UA / RU` right. Do not collapse into a hamburger.

---

## 7. CTA behavior

Primary action: **open Telegram bot**. CTA copy stays exactly as in the mockup.

Verified destination (2026-10-05): `https://t.me/shivapoker_bot` — Telegram preview “Launch @shivapoker_bot” (bot).  
`https://t.me/shiva_poker_club` is a channel and is **not** the CTA.

```
TELEGRAM_URL=https://t.me/shivapoker_bot
```

Hardcode this URL (or the same value via env).

On click / Enter:

1. Open `TELEGRAM_URL` in a new tab on desktop (`target=_blank`, `rel=noopener noreferrer`)
2. On mobile, same-tab navigate is acceptable (Telegram app deep link)

The button is an `<a>` styled as a button (not a fake `<div>`), so it works without JS.

---

## 8. Assets

Required in the repo:

| Asset | Path | Use |
| --- | --- | --- |
| Hero (AI mockup crop) | `docs/design/preland-mockup.jpg` | Full-bleed background. Derive 2x WebP + JPEG from this crop; do not replace with stock |
| Logo lockup (raster source) | `docs/design/logo.png` | Pixel-true header reference (253×64, mint mark + white wordmark) |
| Logo lockup (SVG) | `docs/design/logo.svg` | Canonical header mark. Traced lockup, mint `#00E8B1`. No brand-kit SVG exists — do not replace |
| Favicon | derived from the mark | Mint spade on dark green |

---

## 9. Technical requirements

- Static or SSG page is enough (no backend required for v1)
- Semantic HTML: one `header`, one `main`, one `footer`
- `h1` is the two-line headline
- Images: `srcset` / `picture`, lazy is optional (hero should be eager + `fetchpriority=high`)
- Fonts: `font-display: swap`
- No cookie banner in v1 unless legally required by the deploy domain
- No third-party widgets except optional privacy-friendly analytics (plausible/umami) behind env flag
- Lighthouse (mobile, simulated): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90
- Keyboard: language switcher and CTA reachable; visible focus
- Reduced motion: disable hover scale / any entrance animation
- Support latest two versions of Chrome, Safari, Firefox, Edge; iOS 16+, Android Chrome

### 9.1 SEO / social (minimal)

- Title: `SHIVA POKER — закрытый покерный клуб` / UA equivalent
- Description: subhead text
- `og:image` = hero or branded card
- `robots`: index unless staging (`noindex` on preview)

### 9.2 Age / compliance note (implementation constraint)

This is a closed club funnel, not an open casino lobby. Do not add “play for real money”, deposit CTAs, or odds claims. Copy stays exactly as in §3.

---

## 10. Acceptance criteria

Must match `docs/design/preland-mockup.jpg` at a glance:

- [ ] Desktop 1440-wide screenshot matches RU frame: header, centered copy, emerald pill, chips, A♠/K♣, footer wordmark
- [ ] Mobile 390-wide screenshot matches UA frame: two-line headline, wrapped subhead, full-width-ish CTA, Telegram hint
- [ ] `UA / RU` toggles copy without layout jump (headline remains two lines in both locales)
- [ ] Active locale is emerald; inactive is muted
- [ ] CTA opens `https://t.me/shivapoker_bot`
- [ ] Hint under the button matches mockup: «Откроется Telegram-бот» / «Відкриється Telegram-бот»
- [ ] Type remains readable on the photo (AA for headline and button)
- [ ] No extra sections, nav items, or forms
- [ ] First paint is a complete hero (no unstyled flash of the photo)

---

## 11. Open items (need from stakeholder)

Resolved:

- Telegram destination: bot `https://t.me/shivapoker_bot` (channel URL was a typo)
- CTA copy: keep mockup (“Откроется Telegram-бот” / “Відкриється Telegram-бот”)
- Hero: keep AI mockup crop
- Logo: keep traced `docs/design/logo.svg`, mint `#00E8B1` (no original brand-kit SVG)

Still open:

1. Favicon / OG image
2. Production domain and whether `ru`/`ua` should also live on subpaths
3. Analytics ID (optional)
