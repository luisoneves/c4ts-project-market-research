// src/constants/ui.ts
/**
 * UI Constants
 * Centralizes all UI-related values
 */

// Icon Names (for mapping)
export enum SocialIcon {
  GITHUB = 'GitHub',
  LINKEDIN = 'LinkedIn',
  TELEGRAM = 'Telegram',
}

// Navigation Sections
export enum NavSection {
  STUDIO = '#studio',
  SERVICES = '#services',
  PROJECTS = '#projects',
  QUESTIONS = '#questions',
  CONNECT = '#connect',
}

// Button States
export const BUTTON_TEXT = {
  SUBMIT: {
    idle: 'Enviar',
    submitting: 'Enviando...',
    success: 'Enviado!',
  },
  CLOSE: 'Close',
} as const;

// Animation Classes
export const ANIMATION_CLASSES = {
  FADE_IN_DOWN: 'animate-fade-in-down',
  FADE_IN_UP: 'animate-fade-in-up',
  SLIDE_IN: 'animate-slide-in',
} as const;

// Z-Index Layers
export const Z_INDEX = {
  SIDEBAR: 50,
  TOAST: 50,
  MODAL: 100,
  DROPDOWN: 40,
} as const;
