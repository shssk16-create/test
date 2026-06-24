---
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated. Real design systems when applicable, audit-first on redesigns, strict pre-flight check.
---

# tasteskill: Anti-Slop Frontend Skill

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is **contextual**. None of it fires automatically. First read the brief, then pull only what fits.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or tweaking dials, **infer what the user actually wants**. Most LLM design output is bad because the model jumps to a default aesthetic instead of reading the room.

### 0.A Read these signals first
1. **Page kind** - landing (SaaS / consumer / agency / event), portfolio (dev / designer / creative studio), redesign (preserve vs overhaul), editorial / blog.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "serious B2B", "editorial", "agency-y", "glassy", "dark tech".
3. **Reference signals** - URLs they linked, screenshots they pasted, products they named, brands they're competing with.
4. **Audience** - B2B procurement panel vs. design-conscious consumer vs. recruiter scanning a portfolio. The audience picks the aesthetic, not your taste.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns, these are starting material, not optional input (see Section 11).
6. **Quiet constraints** - accessibility-first audiences, public-sector, regulated industries, trust-first commerce, kids' products. These constraints OVERRIDE aesthetic preference.

### 0.B Output a one-line "Design Read" before generating
Before any code, state in one line: **"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."**

### 0.C If the brief is ambiguous, ask one question, do not guess
Ask exactly **one** clarifying question - never a multi-question dump - and only when the design read genuinely diverges. Example: *"Should this feel closer to Linear-clean or Awwwards-experimental?"*

If you can confidently infer from context, **do not ask**. Just declare the design read and proceed.

### 0.D Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900. These are the LLM defaults. Reach past them deliberately based on the design read.

---

## 1. THE THREE DIALS (Core Configuration)

After the design read, set three dials. Every layout, motion, and density decision below is gated by these.

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Baseline:** `8 / 6 / 4`. Use these unless the design read overrides them. Do not ask the user to edit this file - overrides happen conversationally.

---

## 2. BRIEF -> DESIGN SYSTEM MAP

Once you have the design read (Section 0) and dials (Section 1), pick the right foundation. Do not invent CSS for things that have an official package. Do not pretend an aesthetic trend is an official system.

### 2.A When to reach for a real design system
- Modern SaaS where you own the components: shadcn/ui
- Tailwind-based modern SaaS / AI marketing: Tailwind v4 utilities + `dark:` variant
- Modern accessible React foundation: `@radix-ui/themes`

### 2.B When the brief is an aesthetic, not a system
- Glassmorphism: `backdrop-filter`, layered borders, highlight overlays.
- Bento (Apple-style tile grids): CSS Grid with mixed cell sizes.
- Editorial: Serif type (restricted), asymmetric grids, generous whitespace.
- Dark tech / hacker: Monospace + accent neon, terminal motifs.

---

## 3. DEFAULT ARCHITECTURE & CONVENTIONS

### 3.A Stack
- **Styling**: Tailwind v4 (default). Tailwind v3 only if the existing project demands it.
- **Animation**: Motion (formerly Framer Motion). Import from `framer-motion` or `motion/react`.
- **Viewport Stability**: NEVER use `h-screen` for full-height Hero sections. ALWAYS use `min-h-[100dvh]` to prevent layout jumping on mobile.
- **Grid over Flex-Math**: NEVER use complex flexbox percentage math. ALWAYS use CSS Grid.

---

## 4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

### 4.1 Typography
- Pairs to know: `Alexandria` (Arabic) / `Geist` or `Satoshi` (English).
- Display: `text-4xl md:text-6xl tracking-tighter leading-none`.
- Body: `text-base text-gray-600 leading-relaxed max-w-[65ch]`.
- Italic Descender Clearance: When italic is used in display type, ensure descenders (`y g j p q`) are not clipped.

### 4.2 Color Calibration
- Max 1 accent color per site. Saturation < 80% by default.
- Banned hex backgrounds: Cream paper/beige (`#f5f1ea`, etc.) unless explicitly named in the brief. Rotate palettes.
- Color Consistency Lock: Once an accent color is chosen for a page, use it on the whole page consistently.

### 4.3 Layout Diversification
- **Anti-Center Bias**: Centered heroes are avoided when `DESIGN_VARIANCE > 4`. Force split screen or asymmetric alignments.
- **Bento Cell Count Rule**: A bento grid has EXACTLY as many cells as you have content for. No empty cells.
- **Bento Background Diversity**: Bento cells cannot be plain identical white cards. Vary the background with images, radial gradients, or custom tints.
- **Section Layout Repetition Ban**: Avoid using the same layout pattern twice on the same page.
- **Navigation height cap**: 80px max desktop.
- **Eyebrow Restraint**: Max 1 eyebrow per 3 sections.
- **Split-Header Ban**: Stack headline and explainer text vertically rather than split columns.

### 4.4 Interactive UI States
- **Tactile Feedback**: On `:active`, use `scale-[0.98] -translate-y-[1px]` to simulate a physical push.
- **Button Contrast Check**: Verify high contrast of button labels against background color.
- **CTA Button Wrap Ban**: Button text must fit on one line at desktop.
- **No Duplicate CTA Intent**: Use one label per CTA intent on the page.

### 4.5 Content Density
- **Copy Self-Audit**: Re-read all strings to ensure they do not sound like AI hallucinations or cute placeholder text.
