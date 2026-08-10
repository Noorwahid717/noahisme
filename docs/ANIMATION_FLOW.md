# Scroll Animation Flow Diagram

## How ScrollReveal Works

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Scrolls Page                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Intersection Observer Detects                       │
│              Element Entering Viewport                           │
│              (threshold: 15% visible)                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
    ┌─────────────────┐   ┌─────────────────┐
    │  Reduced Motion │   │  Normal Motion  │
    │    Enabled?     │   │     Enabled     │
    └────────┬────────┘   └────────┬────────┘
             │                     │
             ▼                     ▼
    ┌─────────────────┐   ┌─────────────────┐
    │ Show Immediately│   │  Apply Delay    │
    │   No Animation  │   │  (if specified) │
    └─────────────────┘   └────────┬────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │ Add 'is-visible'│
                          │     Class       │
                          └────────┬────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │  CSS Transition │
                          │   - opacity: 1  │
                          │   - transform: 0│
                          │   - duration    │
                          └────────┬────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │    Element      │
                          │    Visible!     │
                          └─────────────────┘
```

## Animation Lifecycle

### 1. Initial State (Hidden)

```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px); /* or other variant */
}
```

### 2. Detection

```javascript
IntersectionObserver observes element
→ Checks if element intersects viewport
→ Threshold: 15% visibility
→ rootMargin: -50px (triggers slightly before entering)
```

### 3. Trigger

```javascript
if (entry.isIntersecting) {
  setTimeout(() => {
    element.classList.add("is-visible");
  }, delay);
}
```

### 4. Animation

```css
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: all 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Animation Variants Comparison

```
fade-up:     ↓→ (slides up from below)
fade-down:   ↑→ (slides down from above)
fade-left:   →← (slides from right to left)
fade-right:  ←→ (slides from left to right)
fade:        ◯  (just fades in, no movement)
zoom:        ⊕  (scales from 0.9 to 1)
slide-up:    ⇓→ (slides up from far below)
slide-down:  ⇑→ (slides down from far above)
```

## Staggered Animation Example

```
Time    Item 1      Item 2      Item 3      Item 4
────────────────────────────────────────────────────
0ms     trigger     ─           ─           ─
100ms   animating   trigger     ─           ─
200ms   done        animating   trigger     ─
300ms   ─           done        animating   trigger
400ms   ─           ─           done        animating
500ms   ─           ─           ─           done
```

## Viewport Trigger Points

```
┌─────────────────────────────────────────┐
│         Viewport (visible area)          │  ← Top of screen
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  rootMargin: -50px                 │ │  ← Trigger zone starts
│  │                                    │ │
│  │  Element enters here               │ │
│  │  ↓                                 │ │
│  │  [████████] ← 15% visible          │ │  ← Animation triggers!
│  │  [████████████████████]            │ │
│  │                                    │ │
│  └────────────────────────────────────┘ │
│                                          │
└─────────────────────────────────────────┘  ← Bottom of screen
```

## Performance Flow

```
Traditional Scroll Event Listener:
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Scroll  │ →  │ Calculate│ →  │ Apply CSS│
│  Event   │    │ Position │    │ Changes  │
└──────────┘    └──────────┘    └──────────┘
     ↑               ↑               ↑
     └───────────────┴───────────────┘
         Fires on EVERY scroll pixel
         (High CPU usage) ❌


Intersection Observer (Our Approach):
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Observe │ →  │ Threshold│ →  │ Callback │
│  Element │    │  Reached │    │  Once    │
└──────────┘    └──────────┘    └──────────┘
                     ↑
                Fires only when needed
                (Low CPU usage) ✅
```

## Code Structure

```
src/
├── components/
│   ├── ScrollReveal.astro  ← Main animation component
│   │   ├── Props interface
│   │   ├── CSS animations
│   │   └── Intersection Observer script
│   │
│   └── Section.astro       ← Uses ScrollReveal
│       └── Animated headers
│
├── pages/
│   └── index.astro         ← Implements animations
│       ├── Hero section (static)
│       ├── Collaboration section (animated)
│       ├── Impact section (animated)
│       ├── Projects section (animated)
│       ├── Process section (animated)
│       └── Testimonials section (animated)
│
└── docs/
    ├── SCROLL_ANIMATIONS.md          ← Full documentation
    ├── SCROLL_ANIMATIONS_EXAMPLES.md ← Usage examples
    └── ANIMATION_FLOW.md             ← This file
```

## Browser Compatibility Timeline

```
2016  2017  2018  2019  2020  2021  2022  2023  2024
  │     │     │     │     │     │     │     │     │
  ├─────┤ Chrome 51+ (Intersection Observer)
        ├─────┤ Firefox 55+
              ├─────────────┤ Safari 12.1+
        ├───┤ Edge 15+
  ├─────┤ Opera 38+
                            └──────────────────────→
                            Fully supported everywhere!
```

## State Machine

```
┌─────────────┐
│   Initial   │ opacity: 0, transform: Y(30px)
└──────┬──────┘
       │
       │ Observer detects entry
       ▼
┌─────────────┐
│   Waiting   │ Delay timer running
└──────┬──────┘
       │
       │ Delay complete
       ▼
┌─────────────┐
│  Animating  │ Transition in progress
└──────┬──────┘
       │
       │ Transition complete
       ▼
┌─────────────┐
│   Visible   │ opacity: 1, transform: 0
└─────────────┘
       │
       │ once: false (optional)
       │
       │ Element exits viewport
       ▼
┌─────────────┐
│   Hidden    │ Back to initial state
└─────────────┘
       │
       │ Re-enters viewport
       └─────────→ (cycle repeats)
```

## Memory Usage

```
Component Instance:
├── DOM Element Reference    ~ 8 bytes
├── Observer Instance        ~ 100 bytes
├── Callback Function        ~ 50 bytes
└── Data Attributes          ~ 20 bytes
                            ───────────
                    Total:  ~ 178 bytes per element

For 50 animated elements: ~8.9 KB total
                          (Very lightweight!) ✅
```
