# Hero Animation Changes - Role Rotator Implementation

## Summary

Implemented Role Rotator animation on the hero section, replacing the old tagline typing animation with a more focused, subtle animation on the role text in the main heading.

## File Cleanup (2025-01-04)

**Removed Redundant Files:**

- ❌ `src/components/HeroIntro.tsx` → Moved to `src/_archived_components/`
- ❌ `src/components/HeroVisual.tsx` → Moved to `src/_archived_components/`

**Why?** These React components were not being used. The homepage uses the static Astro versions for better performance.

**Active Components:**

- ✅ `src/components/HeroStatic.astro` - Main hero with Role Rotator animation
- ✅ `src/components/HeroVisualStatic.astro` - Hero visual component

## Changes Made

### 1. HeroStatic.astro (`src/components/HeroStatic.astro`) - PRIMARY FILE

**NOTE**: The homepage uses `HeroStatic.astro` (not `HeroIntro.tsx`), so this is the main file that was updated.

#### Removed:

- Old subtitle typing animation that cycled through 4 different taglines
- Separate `hero-subtitle` element below the main heading
- Complex multi-string typing effect
- Layout shift issue during typing animation ✅ FIXED

#### Added:

- **Role Rotator** animation integrated directly into the main heading
- **Fixed-width container** to prevent layout shift (responsive: 11.5em → 10em → 9.5em)
- Typing animation on the blue accent text (`<span id="role-text">`)
- Three role variants that rotate:
  1. "Backend Engineer"
  2. "Frontend Specialist"
  3. "System Designer"
- Smooth cursor blink animation with `animate-cursor-blink` class
- Responsive width adjustment on window resize

#### Layout Shift Fix (2025-01-04):

Container width is now fixed based on the longest text ("Frontend Specialist" = 20 chars):

```html
<span id="role-container" style="width: 11.5em; min-width: 11.5em; text-align: left;">
  <span id="role-text">Backend Engineer</span>
  <span id="role-cursor">|</span>
</span>
```

This prevents the subheadline from shifting during typing/erasing animation.

#### Animation Parameters (in vanilla JavaScript):

```javascript
const typeSpeed = 50; // 50ms per character
const eraseSpeed = 35; // 35ms per character (faster erase)
const delayBetween = 1000; // 1s pause between role changes
const maxLoops = 4; // Loop 4 times then stop
```

#### HTML Structure:

```html
<h1>
  Full-Stack Web Developer —
  <span id="role-container" style="width: 11.5em; ...">
    <span id="role-text" class="text-accent...">Backend Engineer</span>
    <span id="role-cursor" class="...animate-cursor-blink"></span>
  </span>
  , fokus pada efisiensi dan arsitektur bersih.
</h1>
```

**Key Feature**: Fixed-width container ensures no layout shift during animation.

### 2. HeroIntro.tsx (`src/components/HeroIntro.tsx`) - ARCHIVED

This React component was not being used in production (homepage uses `HeroStatic.astro`), so it has been moved to `src/_archived_components/` for reference only.

### 3. Tailwind Config (`tailwind.config.cjs`)

Added cursor blink animation:

```javascript
keyframes: {
  "cursor-blink": {
    "0%, 49%": { opacity: "1" },
    "50%, 100%": { opacity: "0" }
  }
},
animation: {
  "cursor-blink": "cursor-blink 600ms step-end infinite"
}
```

## Benefits

1. **Focal Point Optimization**: Animation is now exactly where the user's eye naturally lands (on the role description in the heading)

2. **Non-disruptive**:
   - Doesn't cause layout shift ✅ FIXED with fixed-width container
   - Stops after a few loops to avoid distraction
   - Maintains readability throughout
   - Subheadline stays in fixed position

3. **Performance**:
   - Lightweight implementation using setTimeout
   - Respects `prefers-reduced-motion`
   - No heavy animation libraries needed
   - Responsive width adjustment on resize

4. **Accessibility**:
   - Uses `aria-live="polite"` for screen readers
   - Cursor marked with `aria-hidden="true"`
   - Static fallback for users with reduced motion preferences

5. **Visual Polish**:
   - Smooth cursor blink at 600ms
   - Fast erase (35ms) vs slower type (50ms) creates dynamic feel
   - Text remains in accent color throughout
   - No jumping or shifting elements ✅

## Testing & Verification

Build completed successfully:

```bash
pnpm build
✓ Built in 7.48s
15 page(s) built successfully
```

Preview server tested: ✅

- Running on: http://localhost:4322/
- HTML verified: role-text and role-cursor elements present
- Script verified: initRoleRotator function included
- CSS verified: cursor-blink animation included

## How to Test

1. **Build the project**:

   ```bash
   pnpm build
   ```

2. **Preview the build**:

   ```bash
   pnpm preview
   ```

3. **Or run dev server**:

   ```bash
   pnpm dev
   ```

4. **Open the homepage** and you should see:
   - Initial text loads: "Backend Engineer" with blinking cursor
   - After 800ms, typing animation starts
   - Text types out at 50ms/char
   - Pauses 1s when complete
   - Erases at 35ms/char (faster)
   - Cycles: Backend Engineer → Frontend Specialist → System Designer
   - After 4 complete loops, stops at "Backend Engineer" and cursor disappears

5. **Clear browser cache** if needed:
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or clear cache manually in DevTools

## Troubleshooting

If animation doesn't appear:

1. ✅ Clear browser cache completely
2. ✅ Hard refresh (Ctrl+Shift+R)
3. ✅ Check DevTools Console for errors
4. ✅ Verify JavaScript is enabled
5. ✅ Check if `prefers-reduced-motion` is enabled (animation respects this)

## Recommendations for Future Enhancements

If you want to implement the alternative options mentioned:

### Option 2: Terminal micro-typing in "Spesialisasi" cards

- Add a small terminal-style text above the bullet points
- Single-run animation on load
- Example: `$ starting services… linked Redis ✓`
- Keep text size 12-14px

### Option 3: One-shot typing on subheadline

- Apply typing effect to "Saya membangun aplikasi web end-to-end..."
- Run once, no loop
- Good for storytelling but may be slower to read

## Current State

✅ Old tagline animation: DISABLED
✅ Role Rotator: ACTIVE
✅ Animation stops after 4 loops
✅ Respects reduced motion preferences
✅ Build passing
✅ Dev server running
