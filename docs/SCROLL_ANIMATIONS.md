# Scroll Animation System - Documentation

## Overview

This project now includes a native CSS and JavaScript scroll animation system that brings all landing page elements to life as users scroll. The system uses the **Intersection Observer API** for performance-optimized scroll detection and CSS transitions for smooth animations.

## Features

- ✅ **Native CSS & JavaScript** - No external animation libraries required
- ✅ **Performance Optimized** - Uses Intersection Observer API for efficient scroll detection
- ✅ **Accessibility First** - Respects `prefers-reduced-motion` preferences
- ✅ **Multiple Animation Types** - 8 different animation variants
- ✅ **Customizable** - Configurable delays, durations, and thresholds
- ✅ **Reusable Component** - One component for all scroll animations

## Animation Variants

The `ScrollReveal` component supports the following animation types:

1. **fade-up** - Fade in while sliding up (default)
2. **fade-down** - Fade in while sliding down
3. **fade-left** - Fade in while sliding from right to left
4. **fade-right** - Fade in while sliding from left to right
5. **fade** - Simple fade in without movement
6. **zoom** - Fade in with scale effect
7. **slide-up** - Slide up with larger distance
8. **slide-down** - Slide down with larger distance

## Usage

### Basic Usage

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";
---

<ScrollReveal animation="fade-up">
  <YourContent />
</ScrollReveal>
```

### With Custom Delay

```astro
<ScrollReveal animation="fade-up" delay={200}>
  <YourContent />
</ScrollReveal>
```

### With Custom Duration

```astro
<ScrollReveal animation="zoom" delay={100} duration={800}>
  <YourContent />
</ScrollReveal>
```

### Full Configuration

```astro
<ScrollReveal
  animation="fade-left"
  delay={300}
  duration={600}
  threshold={0.2}
  once={true}
  class="custom-class"
>
  <YourContent />
</ScrollReveal>
```

## Component Props

| Prop        | Type    | Default     | Description                                             |
| ----------- | ------- | ----------- | ------------------------------------------------------- |
| `animation` | string  | `"fade-up"` | Animation variant (see variants above)                  |
| `delay`     | number  | `0`         | Delay before animation starts (milliseconds)            |
| `duration`  | number  | `600`       | Animation duration (milliseconds)                       |
| `threshold` | number  | `0.15`      | Percentage of element visibility to trigger (0-1)       |
| `once`      | boolean | `true`      | Animate only once or every time element enters viewport |
| `class`     | string  | `""`        | Additional CSS classes                                  |

## Implementation Examples

### Staggered Cards Animation

```astro
{
  items.map((item, index) => (
    <ScrollReveal animation="fade-up" delay={100 + index * 100}>
      <Card {...item} />
    </ScrollReveal>
  ))
}
```

### Section Headers

```astro
<ScrollReveal animation="fade-up" delay={100}>
  <h2>Section Title</h2>
</ScrollReveal>

<ScrollReveal animation="fade-up" delay={200}>
  <p>Section description</p>
</ScrollReveal>
```

### Alternating Animations

```astro
{
  items.map((item, index) => (
    <ScrollReveal
      animation={index % 2 === 0 ? "fade-right" : "fade-left"}
      delay={100 + index * 150}
    >
      <Card {...item} />
    </ScrollReveal>
  ))
}
```

## Performance Considerations

### Intersection Observer

The component uses the Intersection Observer API which is:

- More performant than scroll event listeners
- Doesn't block the main thread
- Automatically handles visibility detection

### Optimization Settings

```javascript
{
  threshold: 0.15,              // Trigger at 15% visibility
  rootMargin: '0px 0px -50px 0px'  // Start 50px before entering viewport
}
```

### Reduced Motion

The system automatically respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

## Browser Support

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+
- ✅ Opera 38+

## Landing Page Implementation

The scroll animation system has been implemented across all major sections of the landing page:

### Hero Section (Static)

- Parallax background layers
- No scroll reveal (always visible)

### Collaboration & Work Section

```astro
<ScrollReveal animation="fade-up" delay={100}>
  <p class="eyebrow">Kolaborasi & karya</p>
</ScrollReveal>
```

### Impact Section

```astro
{
  impactHighlights.map((card, index) => (
    <ScrollReveal animation="fade-up" delay={300 + index * 100}>
      <TiltingCard {...card} />
    </ScrollReveal>
  ))
}
```

### Projects Section

```astro
{
  projects.map((project, index) => (
    <ScrollReveal
      animation={index % 2 === 0 ? "fade-right" : "fade-left"}
      delay={100 + index * 150}
    >
      <ProjectCard {...project} />
    </ScrollReveal>
  ))
}
```

### Process Section

```astro
{
  processSteps.map((step, index) => (
    <ScrollReveal animation="fade-up" delay={100 + index * 100}>
      <ProcessStepCard {...step} />
    </ScrollReveal>
  ))
}
```

### Testimonials Section

```astro
{
  testimonials.map((testimonial, index) => (
    <ScrollReveal
      animation={index % 2 === 0 ? "fade-right" : "fade-left"}
      delay={100 + index * 150}
    >
      <TestimonialCard {...testimonial} />
    </ScrollReveal>
  ))
}
```

## Section Component Update

The `Section.astro` component now includes built-in animations for headers:

```astro
<ScrollReveal animation="fade-up" delay={100}>
  <p class="eyebrow">{eyebrow}</p>
</ScrollReveal>

<ScrollReveal animation="fade-up" delay={200}>
  <h2>{title}</h2>
</ScrollReveal>

<ScrollReveal animation="fade-up" delay={300}>
  <p class="description">{description}</p>
</ScrollReveal>
```

## Customization Guide

### Creating New Animation Variants

Add new animations in `ScrollReveal.astro`:

```css
.scroll-reveal[data-animation="custom-animation"] {
  transform: translateY(50px) rotate(5deg);
  opacity: 0;
}
```

### Adjusting Timing

```astro
<!-- Faster animation -->
<ScrollReveal animation="fade-up" duration={400} delay={50}>
  <!-- Slower, dramatic animation -->
  <ScrollReveal animation="zoom" duration={1000} delay={500} /></ScrollReveal
>
```

### Trigger Earlier/Later

```astro
<!-- Trigger when 30% visible -->
<ScrollReveal threshold={0.3}>
  <!-- Trigger when 50% visible -->
  <ScrollReveal threshold={0.5} /></ScrollReveal
>
```

### Re-animate on Scroll

```astro
<!-- Animate every time element enters viewport -->
<ScrollReveal once={false}>
  <YourContent />
</ScrollReveal>
```

## Troubleshooting

### Animation Not Triggering

1. Check if element has enough viewport space
2. Adjust `threshold` value (lower = triggers earlier)
3. Check `rootMargin` settings
4. Ensure element is not `display: none`

### Animation Too Fast/Slow

Adjust the `duration` prop:

```astro
<!-- Too fast? Increase duration -->
<ScrollReveal duration={800}>
  <!-- Too slow? Decrease duration -->
  <ScrollReveal duration={400} /></ScrollReveal
>
```

### Elements Appear Before Animation

Ensure the component is properly wrapping the content and the `scroll-reveal` class is applied.

## Best Practices

1. **Stagger Delays** - Add incremental delays for multiple items (100-150ms intervals)
2. **Consistent Timing** - Use similar durations across the page for cohesion
3. **Don't Overdo It** - Not every element needs an animation
4. **Test on Mobile** - Verify animations work well on smaller viewports
5. **Respect Reduced Motion** - Always support accessibility preferences

## Files Modified

- `src/components/ScrollReveal.astro` (new)
- `src/pages/index.astro`
- `src/components/Section.astro`

## Next Steps

1. Add scroll animations to other pages (`about.astro`, `projects.astro`, etc.)
2. Create more animation variants for specific use cases
3. Add scroll-triggered number counters or progress bars
4. Implement parallax effects for images

## Support

For issues or questions about the scroll animation system, please refer to:

- Intersection Observer API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- CSS Transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions
