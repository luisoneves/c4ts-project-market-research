// src/constants/fileTypes.ts
/**
 * File Type Constants
 * Centralizes all MIME types and file-related configurations
 */

// MIME Types
export enum MimeType {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  WEBP = 'image/webp',
  GIF = 'image/gif',
  PDF = 'application/pdf',
}

// Image MIME Types Array (for validation)
export const IMAGE_MIME_TYPES: readonly MimeType[] = [
  MimeType.JPEG,
  MimeType.JPG,
  MimeType.PNG,
  MimeType.WEBP,
  MimeType.GIF,
] as const;

// Allowed Upload MIME Types
export const ALLOWED_UPLOAD_TYPES: readonly MimeType[] = [
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.SVG,
  MimeType.WEBP,
  MimeType.PDF,
] as const;

// File Extensions
export enum FileExtension {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  SVG = 'svg',
  WEBP = 'webp',
  GIF = 'gif',
  PDF = 'pdf',
  BIN = 'bin',
}

// File Size Limits (in bytes)
export const FILE_SIZE_LIMITS = {
  MAX_UPLOAD_SIZE: 200 * 1024 * 1024, // 200MB
  MAX_IMAGE_SIZE: 10 * 1024 * 1024,   // 10MB
  MAX_PDF_SIZE: 50 * 1024 * 1024,     // 50MB
} as const;

// Image Processing Configuration
export const IMAGE_PROCESSING = {
  MAX_WIDTH: 1600,
  WEBP_QUALITY: 78,
  WEBP_EFFORT: 4,
  RESIZE_WITHOUT_ENLARGEMENT: true,
} as const;

// File Accept Attributes (for input elements)
export const FILE_ACCEPT = {
  IMAGES: '.jpg,.jpeg,.png,.svg,.webp',
  DOCUMENTS: '.pdf',
  ALL_ALLOWED: '.jpg,.jpeg,.png,.svg,.webp,.pdf',
} as const;
