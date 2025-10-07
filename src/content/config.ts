import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    role: z.string(),
    problem: z.string(),
    process: z.string(),
    result: z.string(),
    impact: z.string().optional(),
    kpi: z.array(z.string()).optional(),
    cover: z.string(),
    featured: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  schema: z.object({
    name: z.string(),
    role: z.string(),
    quote: z.string(),
    avatar: z.string().optional(),
  }),
});

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  }),
});

export const collections = { projects, testimonials, services };
