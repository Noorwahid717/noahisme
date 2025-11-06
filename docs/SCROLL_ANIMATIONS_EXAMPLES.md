# Scroll Animation Examples

This file contains practical examples of how to use the ScrollReveal component across different scenarios.

## Example 1: Simple Card Grid with Staggered Animation

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";
import Card from "~/components/Card.astro";

const items = [
  { title: "Item 1", description: "Description 1" },
  { title: "Item 2", description: "Description 2" },
  { title: "Item 3", description: "Description 3" },
  { title: "Item 4", description: "Description 4" },
];
---

<div class="grid grid-cols-2 gap-6">
  {
    items.map((item, index) => (
      <ScrollReveal animation="fade-up" delay={100 + index * 100}>
        <Card {...item} />
      </ScrollReveal>
    ))
  }
</div>
```

## Example 2: Section with Animated Header and Content

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";
---

<section class="py-24">
  <div class="max-w-6xl mx-auto px-6">
    <!-- Eyebrow -->
    <ScrollReveal animation="fade-up" delay={100}>
      <p class="text-xs uppercase tracking-wider text-accent">Featured Work</p>
    </ScrollReveal>

    <!-- Title -->
    <ScrollReveal animation="fade-up" delay={200}>
      <h2 class="text-4xl font-bold mt-2">Our Latest Projects</h2>
    </ScrollReveal>

    <!-- Description -->
    <ScrollReveal animation="fade-up" delay={300}>
      <p class="text-lg text-gray-600 mt-4 max-w-2xl">
        Explore our portfolio of innovative solutions that have helped businesses grow.
      </p>
    </ScrollReveal>

    <!-- Content Grid -->
    <div class="grid md:grid-cols-3 gap-8 mt-12">
      {
        [1, 2, 3].map((i) => (
          <ScrollReveal animation="fade-up" delay={400 + i * 100}>
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3>Project {i}</h3>
              <p>Project description here</p>
            </div>
          </ScrollReveal>
        ))
      }
    </div>
  </div>
</section>
```

## Example 3: Alternating Left-Right Animation

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";

const features = [
  { title: "Fast Performance", icon: "⚡" },
  { title: "Secure", icon: "🔒" },
  { title: "Scalable", icon: "📈" },
  { title: "User Friendly", icon: "😊" },
];
---

<div class="space-y-8">
  {
    features.map((feature, index) => (
      <ScrollReveal
        animation={index % 2 === 0 ? "fade-right" : "fade-left"}
        delay={100 + index * 150}
      >
        <div class="flex items-center gap-4 p-6 bg-surface rounded-lg">
          <span class="text-4xl">{feature.icon}</span>
          <h3 class="text-xl font-semibold">{feature.title}</h3>
        </div>
      </ScrollReveal>
    ))
  }
</div>
```

## Example 4: Hero Section with Multiple Elements

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";
---

<section class="min-h-screen flex items-center justify-center">
  <div class="text-center max-w-4xl px-6">
    <!-- Main Heading -->
    <ScrollReveal animation="fade-up" delay={100} duration={800}>
      <h1 class="text-6xl font-bold">Welcome to Our Platform</h1>
    </ScrollReveal>

    <!-- Subtitle -->
    <ScrollReveal animation="fade-up" delay={300} duration={800}>
      <p class="text-xl text-gray-600 mt-6">Building the future, one line of code at a time</p>
    </ScrollReveal>

    <!-- CTA Buttons -->
    <ScrollReveal animation="fade-up" delay={500} duration={800}>
      <div class="flex gap-4 justify-center mt-8">
        <button class="btn-primary">Get Started</button>
        <button class="btn-secondary">Learn More</button>
      </div>
    </ScrollReveal>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-8 mt-16">
      {
        [
          { label: "Users", value: "10K+" },
          { label: "Projects", value: "500+" },
          { label: "Countries", value: "50+" },
        ].map((stat, i) => (
          <ScrollReveal animation="zoom" delay={700 + i * 100}>
            <div class="text-center">
              <div class="text-4xl font-bold text-accent">{stat.value}</div>
              <div class="text-sm text-gray-600 mt-2">{stat.label}</div>
            </div>
          </ScrollReveal>
        ))
      }
    </div>
  </div>
</section>
```

## Example 5: Image Gallery with Zoom Effect

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";

const images = [
  "/img/gallery-1.jpg",
  "/img/gallery-2.jpg",
  "/img/gallery-3.jpg",
  "/img/gallery-4.jpg",
  "/img/gallery-5.jpg",
  "/img/gallery-6.jpg",
];
---

<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  {
    images.map((img, index) => (
      <ScrollReveal animation="zoom" delay={100 + index * 80} duration={600}>
        <div class="aspect-square overflow-hidden rounded-lg">
          <img
            src={img}
            alt={`Gallery image ${index + 1}`}
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      </ScrollReveal>
    ))
  }
</div>
```

## Example 6: Testimonials with Slide Animation

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";

const testimonials = [
  { name: "John Doe", quote: "Amazing service!", role: "CEO, Company A" },
  { name: "Jane Smith", quote: "Highly recommended!", role: "CTO, Company B" },
];
---

<div class="space-y-12">
  {
    testimonials.map((testimonial, index) => (
      <ScrollReveal
        animation={index % 2 === 0 ? "fade-right" : "fade-left"}
        delay={200}
        duration={700}
      >
        <blockquote class="bg-white p-8 rounded-2xl shadow-lg">
          <p class="text-lg italic">"{testimonial.quote}"</p>
          <footer class="mt-4">
            <strong>{testimonial.name}</strong>
            <span class="text-gray-600"> — {testimonial.role}</span>
          </footer>
        </blockquote>
      </ScrollReveal>
    ))
  }
</div>
```

## Example 7: Process Steps with Sequential Animation

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";

const steps = [
  { number: "01", title: "Discovery", description: "Understanding your needs" },
  { number: "02", title: "Design", description: "Creating the blueprint" },
  { number: "03", title: "Development", description: "Building the solution" },
  { number: "04", title: "Deployment", description: "Launching your product" },
];
---

<div class="relative">
  <!-- Connection Line -->
  <div class="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>

  <div class="space-y-16">
    {
      steps.map((step, index) => (
        <ScrollReveal animation="fade-up" delay={100 + index * 200}>
          <div class={`flex items-center gap-8 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
            <div class="flex-1 text-right">
              <div class="inline-block bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold">{step.title}</h3>
              <p class="text-gray-600 mt-2">{step.description}</p>
            </div>
          </div>
        </ScrollReveal>
      ))
    }
  </div>
</div>
```

## Example 8: Pricing Cards with Delayed Zoom

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";

const plans = [
  { name: "Basic", price: "$9", features: ["Feature 1", "Feature 2"] },
  { name: "Pro", price: "$29", features: ["All Basic", "Feature 3", "Feature 4"], featured: true },
  { name: "Enterprise", price: "$99", features: ["All Pro", "Feature 5", "Feature 6"] },
];
---

<div class="grid md:grid-cols-3 gap-8">
  {
    plans.map((plan, index) => (
      <ScrollReveal animation="zoom" delay={200 + index * 150} duration={600}>
        <div
          class={`
        p-8 rounded-2xl border-2 
        ${plan.featured ? "border-accent bg-accent/5 scale-105" : "border-gray-200"}
      `}
        >
          <h3 class="text-2xl font-bold">{plan.name}</h3>
          <div class="text-4xl font-bold text-accent mt-4">{plan.price}</div>
          <ul class="mt-6 space-y-3">
            {plan.features.map((feature) => (
              <li class="flex items-center gap-2">
                <span class="text-accent">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <button class="w-full mt-8 btn-primary">Choose Plan</button>
        </div>
      </ScrollReveal>
    ))
  }
</div>
```

## Example 9: FAQ Section with Accordion-style Animation

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";

const faqs = [
  { q: "What is your refund policy?", a: "30-day money-back guarantee" },
  { q: "Do you offer support?", a: "24/7 customer support available" },
  { q: "Can I upgrade later?", a: "Yes, upgrade anytime" },
];
---

<div class="max-w-3xl mx-auto space-y-4">
  {
    faqs.map((faq, index) => (
      <ScrollReveal animation="fade-up" delay={100 + index * 100}>
        <details class="bg-white p-6 rounded-lg shadow">
          <summary class="font-semibold cursor-pointer">{faq.q}</summary>
          <p class="mt-4 text-gray-600">{faq.a}</p>
        </details>
      </ScrollReveal>
    ))
  }
</div>
```

## Example 10: Footer with Multiple Sections

```astro
---
import ScrollReveal from "~/components/ScrollReveal.astro";
---

<footer class="bg-gray-900 text-white py-20">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid md:grid-cols-4 gap-8">
      <!-- Company Info -->
      <ScrollReveal animation="fade-up" delay={100}>
        <div>
          <h3 class="text-xl font-bold mb-4">Company</h3>
          <p class="text-gray-400">Building amazing products since 2024</p>
        </div>
      </ScrollReveal>

      <!-- Links Columns -->
      {
        ["Products", "Resources", "Legal"].map((title, index) => (
          <ScrollReveal animation="fade-up" delay={200 + index * 100}>
            <div>
              <h4 class="font-semibold mb-4">{title}</h4>
              <ul class="space-y-2 text-gray-400">
                <li>
                  <a href="#">Link 1</a>
                </li>
                <li>
                  <a href="#">Link 2</a>
                </li>
                <li>
                  <a href="#">Link 3</a>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        ))
      }
    </div>

    <!-- Copyright -->
    <ScrollReveal animation="fade" delay={500}>
      <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        © 2024 Your Company. All rights reserved.
      </div>
    </ScrollReveal>
  </div>
</footer>
```

## Tips for Best Results

1. **Stagger Delays**: Use incremental delays (100-150ms) for sequential items
2. **Consistent Duration**: Keep animations around 600-800ms for cohesion
3. **Appropriate Animation**: Match animation type to content (zoom for images, fade-up for text)
4. **Threshold Adjustment**: Lower threshold (0.1-0.15) for earlier triggers
5. **Mobile Consideration**: Test on smaller screens, may need different delays
6. **Performance**: Avoid animating too many elements simultaneously
