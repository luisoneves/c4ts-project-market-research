// src/constants/googleSheets.ts
/**
 * Google Sheets Constants
 * Centralizes all Google Sheets API-related values
 */

// Google Sheets Configuration
export const GOOGLE_SHEETS_CONFIG = {
  RANGE: 'Sheet1!A1',
  VALUE_INPUT_OPTION: 'USER_ENTERED',
  SCOPE: 'https://www.googleapis.com/auth/spreadsheets',
  API_VERSION: 'v4',
} as const;

// Sheet Column Mapping (for better maintainability)
export enum SheetColumn {
  TIMESTAMP = 0,
  SUBMISSION_ID = 1,
  NAME = 2,
  WHATSAPP = 3,
  EMAIL = 4,
  FILE_URL = 5,
  ORIGINAL_FILENAME = 6,
  PROCESSED = 7,
  CONTENT_TYPE = 8,
}

// Processing Status
export enum ProcessingStatus {
  YES = 'yes',
  NO = 'no',
}
