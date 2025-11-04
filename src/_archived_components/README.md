# Archived Components

This directory contains components that are no longer actively used but kept for reference.

## Hero Components (Archived 2025-01-04)

### HeroIntro.tsx

- **Status**: Not used in production
- **Reason**: Homepage uses `HeroStatic.astro` instead for better performance
- **Description**: React version of hero intro with framer-motion animations
- **Replaced by**: `HeroStatic.astro` (static/vanilla JS version)

### HeroVisual.tsx

- **Status**: Not used in production
- **Reason**: Homepage uses `HeroVisualStatic.astro` instead
- **Description**: React version of hero visual component
- **Replaced by**: `HeroVisualStatic.astro` (static version)

## Currently Active Hero Components

- ✅ `src/components/HeroStatic.astro` - Main hero intro (with Role Rotator animation)
- ✅ `src/components/HeroVisualStatic.astro` - Hero visual component

## Note

These archived files were kept for reference only. They are not imported or used anywhere in the codebase. If needed, they can be safely deleted in the future.
