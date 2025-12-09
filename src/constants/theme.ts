// src/constants/theme.ts
/**
 * Theme Constants
 * Centralizes all theme-related values
 */

// Theme Modes
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

// LocalStorage Keys
export enum LocalStorageKey {
  THEME = 'theme',
  USER_PREFERENCES = 'userPreferences',
}

// CSS Class Names
export const THEME_CLASSES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

// Theme Colors (for programmatic access)
export const THEME_COLORS = {
  PRIMARY: {
    light: '#3b82f6',  // blue-600
    dark: '#60a5fa',   // blue-500
  },
  SECONDARY: {
    light: '#10b981',  // green-600
    dark: '#34d399',   // green-500
  },
  BACKGROUND: {
    light: '#f9fafb',  // gray-50
    dark: '#111827',   // gray-900
  },
} as const;
