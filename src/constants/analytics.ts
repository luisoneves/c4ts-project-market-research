// src/constants/analytics.ts
/**
 * Analytics Configuration Constants
 * Centralizes all analytics-related IDs and event names
 */

// Analytics IDs (use environment variables in production)
export const ANALYTICS_IDS = {
  GA4: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-V3HNTBMVQE',
  GTM: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || 'GTM-KXCGXCNF',
  YANDEX: process.env.NEXT_PUBLIC_YANDEX_METRICA_ID
    ? parseInt(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID)
    : 105756046,
  CLARITY: process.env.NEXT_PUBLIC_CLARITY_ID || 'uix2492he4',
} as const;

// Event Names
export enum AnalyticsEvent {
  FORM_SUBMITTED = 'form_submitted',
  FORM_SUBMISSION = 'form_submission',
  FILE_UPLOADED = 'file_uploaded',
  PAGE_VIEW = 'page_view',
  LINK_CLICK = 'link_click',
}

// Event Categories
export enum EventCategory {
  FORM = 'form_submission',
  USER_INTERACTION = 'user_interaction',
  NAVIGATION = 'navigation',
  FILE = 'file_upload',
}

// Script Loading Strategies
export enum ScriptStrategy {
  AFTER_INTERACTIVE = 'afterInteractive',
  LAZY_ON_LOAD = 'lazyOnload',
  BEFORE_INTERACTIVE = 'beforeInteractive',
  WORKER = 'worker',
}

// Analytics Provider Names
export enum AnalyticsProvider {
  GA4 = 'ga4',
  GTM = 'gtm',
  YANDEX = 'yandex',
  CLARITY = 'clarity',
}

// Custom Event Headers
export const EVENT_HEADERS = {
  CLARITY: 'X-Clarity-Event',
  GA4: 'X-GA4-Event',
} as const;
