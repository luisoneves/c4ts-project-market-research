// src/constants/forms.ts
/**
 * Form Constants
 * Centralizes all form-related values
 */

// Form Field Names
export enum FormField {
  FILE = 'file',
  NAME = 'name',
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  ID = 'id',
  FILE_URL = 'file_url',
}

// Form Input Types
export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  TEL = 'tel',
  FILE = 'file',
  SELECT = 'select',
  TEXTAREA = 'textarea',
}

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: 'Por favor, preencha todos os campos obrigatórios.',
  FILE_TOO_LARGE: 'O arquivo é muito grande. O limite máximo é 200MB.',
  INVALID_FILE_TYPE: 'Tipo de arquivo não permitido. Apenas JPEG, PNG, SVG, WEBP e PDF são aceitos.',
  UPLOAD_FAILED: 'Falha no upload do arquivo.',
  SUBMISSION_ERROR: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
  SUCCESS: 'Formulário enviado com sucesso!',
  PROCESSING: 'Sua solicitação está sendo processada.',
} as const;

// Form States
export enum FormState {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error',
}

// ID Generation Configuration
export const ID_GENERATION = {
  RANDOM_SLICE_START: 2,
  RANDOM_SLICE_END: 8,
  TIMESTAMP_RADIX: 36,
  TIMESTAMP_SUBSTRING_START: 2,
  TIMESTAMP_SUBSTRING_END: 9,
} as const;
