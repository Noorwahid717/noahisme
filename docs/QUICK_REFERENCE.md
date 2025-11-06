# ScrollReveal - Quick Reference Guide

## 🚀 Installation

Component is already installed at: `src/components/ScrollReveal.astro`

## 📝 Basic Usage

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";
---

<ScrollReveal animation="fade-up">
  <YourContent />
</ScrollReveal>
```

## 🎨 Animation Types

| Animation    | Direction | Distance |
| ------------ | --------- | -------- |
| `fade-up`    | ↑ Up      | 30px     |
| `fade-down`  | ↓ Down    | 30px     |
| `fade-left`  | ← Left    | 30px     |
| `fade-right` | → Right   | 30px     |
| `fade`       | -         | 0px      |
| `zoom`       | ⊕ Scale   | 0.9→1.0  |
| `slide-up`   | ↑↑ Up     | 60px     |
| `slide-down` | ↓↓ Down   | 60px     |

## ⚙️ Props Reference

```typescript
animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'zoom' | 'slide-up' | 'slide-down'
delay?: number        // milliseconds (default: 0)
duration?: number     // milliseconds (default: 600)
threshold?: number    // 0-1 (default: 0.15)
once?: boolean        // animate once or repeat (default: true)
class?: string        // additional CSS classes
```

## 💡 Common Patterns

### 1. Staggered List

```astro
{
  items.map((item, i) => (
    <ScrollReveal animation="fade-up" delay={i * 100}>
      <Card {...item} />
    </ScrollReveal>
  ))
}
```

### 2. Alternating Direction

```astro
{
  items.map((item, i) => (
    <ScrollReveal animation={i % 2 === 0 ? "fade-right" : "fade-left"}>
      <Card {...item} />
    </ScrollReveal>
  ))
}
```

### 3. Section Header

```astro
<ScrollReveal animation="fade-up" delay={100}>
  <h2>Title</h2>
</ScrollReveal>
<ScrollReveal animation="fade-up" delay={200}>
  <p>Description</p>
</ScrollReveal>
```

### 4. Hero Elements

```astro
<ScrollReveal animation="fade-up" delay={100} duration={800}>
  <h1>Welcome</h1>
</ScrollReveal>
<ScrollReveal animation="fade-up" delay={300} duration={800}>
  <p>Subtitle</p>
</ScrollReveal>
<ScrollReveal animation="fade-up" delay={500} duration={800}>
  <button>CTA</button>
</ScrollReveal>
```

### 5. Image Gallery

```astro
{
  images.map((img, i) => (
    <ScrollReveal animation="zoom" delay={i * 80}>
      <img src={img} alt="" />
    </ScrollReveal>
  ))
}
```

## ⏱️ Timing Guidelines

| Element Type | Delay          | Duration  |
| ------------ | -------------- | --------- |
| Headers      | 100-200ms      | 600-800ms |
| Paragraphs   | 200-300ms      | 600ms     |
| Cards        | 100ms + i\*100 | 600ms     |
| Images       | 100ms + i\*80  | 600ms     |
| Buttons      | 300-500ms      | 600ms     |

## 🎯 Best Practices

### ✅ DO:

- Use staggered delays (100-150ms apart)
- Keep duration consistent (600-800ms)
- Respect reduced motion preferences
- Test on mobile devices
- Use appropriate animation for content type

### ❌ DON'T:

- Don't animate everything
- Don't use delays > 1000ms
- Don't use threshold > 0.5 (might not trigger)
- Don't animate above-the-fold content
- Don't mix too many animation types

## 🔍 Troubleshooting

### Animation not triggering?

```astro
<!-- Lower threshold to trigger earlier -->
<ScrollReveal threshold={0.1}>
  <!-- Check if element is visible -->
  <!-- Remove transforms or display: none --></ScrollReveal
>
```

### Animation too slow?

```astro
<!-- Decrease duration -->
<ScrollReveal duration={400} />
```

### Animation too fast?

```astro
<!-- Increase duration -->
<ScrollReveal duration={1000} />
```

### Need to re-animate?

```astro
<!-- Set once to false -->
<ScrollReveal once={false} />
```

## 📱 Mobile Considerations

```astro
<!-- Reduce delay on mobile for faster feel -->
<ScrollReveal delay={window.innerWidth < 768 ? 50 : 200} />
```

## 🎨 Combining with Tailwind

```astro
<ScrollReveal animation="fade-up" class="w-full max-w-4xl mx-auto">
  <div class="p-6 bg-white rounded-lg shadow-lg">Content</div>
</ScrollReveal>
```

## 🧪 Testing Checklist

- [ ] Animation triggers at right scroll position
- [ ] Delay feels natural (not too long)
- [ ] Duration is smooth (not jarring)
- [ ] Works on mobile devices
- [ ] Respects reduced motion
- [ ] No layout shift
- [ ] Performance is good (no lag)

## 📊 Performance Tips

1. **Limit animations per viewport**: Max 10-15 at once
2. **Use CSS transforms**: Already optimized in component
3. **Avoid animating layout properties**: Stick to opacity & transform
4. **Test on low-end devices**: Ensure smooth 60fps

## 🔗 Related Documentation

- Full docs: `docs/SCROLL_ANIMATIONS.md`
- Examples: `docs/SCROLL_ANIMATIONS_EXAMPLES.md`
- Flow diagrams: `docs/ANIMATION_FLOW.md`
- Summary: `SCROLL_ANIMATIONS_SUMMARY.md`

## 🆘 Common Use Cases

```astro
<!-- Text blocks -->
<ScrollReveal animation="fade-up">
  <p>Text content</p>
</ScrollReveal>

<!-- Cards in grid -->
<ScrollReveal animation="fade-up" delay={index * 100}>
  <Card />
</ScrollReveal>

<!-- Images -->
<ScrollReveal animation="zoom">
  <img />
</ScrollReveal>

<!-- Testimonials (alternating) -->
<ScrollReveal animation={index % 2 ? "fade-left" : "fade-right"}>
  <Testimonial />
</ScrollReveal>

<!-- CTA buttons -->
<ScrollReveal animation="fade-up" delay={500}>
  <button>Click me</button>
</ScrollReveal>

<!-- Sections -->
<ScrollReveal animation="fade">
  <section>Full section</section>
</ScrollReveal>
```

---

**Pro Tip:** Start with `fade-up` and `delay={100 + index * 100}` for most cases. Adjust from there based on feel.
