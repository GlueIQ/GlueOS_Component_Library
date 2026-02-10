/**
 * Design Tokens for GlueIQ Design System
 * These tokens are used throughout the application for consistent styling
 */

export const colors = {
  // Neutrals
  background: 'hsl(0 0% 100%)',
  foreground: 'hsl(0 0% 3.6%)',
  card: 'hsl(0 0% 100%)',
  'card-foreground': 'hsl(0 0% 3.6%)',
  popover: 'hsl(0 0% 100%)',
  'popover-foreground': 'hsl(0 0% 3.6%)',
  muted: 'hsl(0 0% 96.1%)',
  'muted-foreground': 'hsl(0 0% 45.1%)',
  accent: 'hsl(0 0% 9.0%)',
  'accent-foreground': 'hsl(0 0% 100%)',
  
  // Semantic
  destructive: 'hsl(0 84.2% 60.2%)',
  'destructive-foreground': 'hsl(0 0% 100%)',
  border: 'hsl(0 0% 89.8%)',
  input: 'hsl(0 0% 89.8%)',
  ring: 'hsl(0 0% 3.6%)',
  
  // Dark mode
  dark: {
    background: 'hsl(0 0% 3.6%)',
    foreground: 'hsl(0 0% 98%)',
    card: 'hsl(0 0% 10%)',
    'card-foreground': 'hsl(0 0% 98%)',
    popover: 'hsl(0 0% 10%)',
    'popover-foreground': 'hsl(0 0% 98%)',
    muted: 'hsl(0 0% 14.9%)',
    'muted-foreground': 'hsl(0 0% 63.9%)',
    accent: 'hsl(0 0% 98%)',
    'accent-foreground': 'hsl(0 0% 9%)',
    destructive: 'hsl(0 72.2% 50.6%)',
    'destructive-foreground': 'hsl(0 0% 10%)',
    border: 'hsl(0 0% 14.9%)',
    input: 'hsl(0 0% 14.9%)',
    ring: 'hsl(0 0% 83.1%)',
  },
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
  '4xl': '3.5rem',  // 56px
  '5xl': '4rem',    // 64px
};

export const typography = {
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },
  fontSize: {
    xs: { size: '0.75rem', lineHeight: '1rem' },        // 12px
    sm: { size: '0.875rem', lineHeight: '1.25rem' },    // 14px
    base: { size: '1rem', lineHeight: '1.5rem' },       // 16px
    lg: { size: '1.125rem', lineHeight: '1.75rem' },    // 18px
    xl: { size: '1.25rem', lineHeight: '1.75rem' },     // 20px
    '2xl': { size: '1.5rem', lineHeight: '2rem' },      // 24px
    '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px
    '4xl': { size: '2.25rem', lineHeight: '2.5rem' },   // 36px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
};

export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  'modal-backdrop': 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
};

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const transitions = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
};

export const designTokens = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  zIndex,
  breakpoints,
  transitions,
};
