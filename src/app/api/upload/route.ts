// src/app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { google } from 'googleapis';
import {
    IMAGE_MIME_TYPES,
    MimeType,
    FileExtension,
    IMAGE_PROCESSING,
    GOOGLE_SHEETS_CONFIG,
    ProcessingStatus,
    FormField,
    EVENT_HEADERS,
    AnalyticsEvent,
} from '@/constants';

export const runtime = 'nodejs';

// --- Configuração Google Sheets ---
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;

const appendToSheet = async (row: any[]) => {
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEETS_ID) {
    console.warn('Google Sheets credentials not found. Skipping sheet append.');
    return;
  }
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: [GOOGLE_SHEETS_CONFIG.SCOPE],
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: GOOGLE_SHEETS_CONFIG.API_VERSION, auth: client as any });

    await googleSheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: GOOGLE_SHEETS_CONFIG.RANGE,
      valueInputOption: GOOGLE_SHEETS_CONFIG.VALUE_INPUT_OPTION,
      requestBody: {
        values: [row],
      },
    });
    console.log('Successfully appended row to Google Sheets.');
  } catch (err) {
    console.error('Error appending to Google Sheets:', err);
  }
};
// --- Fim Configuração Google Sheets ---

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get(FormField.FILE) as File;
    const name = formData.get(FormField.NAME) as string;
    const whatsapp = formData.get(FormField.WHATSAPP) as string;
    const email = formData.get(FormField.EMAIL) as string || '';
    const submissionId = formData.get(FormField.ID) as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    let finalBuffer = buffer;
    let finalContentType = file.type;
    let finalExtension = originalName.split('.').pop()?.toLowerCase() || FileExtension.BIN;

    const isImage = IMAGE_MIME_TYPES.includes(file.type as MimeType);

    if (isImage) {
      try {
        // @ts-ignore - Type mismatch between sharp Buffer and Next.js Buffer
        finalBuffer = await sharp(buffer)
          .resize({
            width: IMAGE_PROCESSING.MAX_WIDTH,
            withoutEnlargement: IMAGE_PROCESSING.RESIZE_WITHOUT_ENLARGEMENT
          })
          .webp({
            quality: IMAGE_PROCESSING.WEBP_QUALITY,
            effort: IMAGE_PROCESSING.WEBP_EFFORT
          })
          .toBuffer() as any as Buffer;

        finalContentType = MimeType.WEBP;
        finalExtension = FileExtension.WEBP;
      } catch (imgErr) {
        console.warn(`[SHARP] Falha ao processar imagem ${originalName}. Enviando original.`, imgErr);
      }
    }

    const safeBaseName = submissionId
      .replace(/[^a-z0-9_-]/gi, '_')
      .toLowerCase();
    const timestamp = Date.now();
    const cleanFileName = originalName
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9_-]/gi, '_')
      .toLowerCase();

    const uniqueName = `${safeBaseName}-${timestamp}-${cleanFileName}.${finalExtension}`;

    const blob = await put(uniqueName, finalBuffer, {
      access: 'public',
      addRandomSuffix: false,
      contentType: finalContentType,
      metadata: {
        uploaderName: name,
        uploaderWhatsapp: whatsapp,
        uploaderEmail: email,
        submissionId,
        originalFileName: originalName,
        processed: isImage ? ProcessingStatus.YES : ProcessingStatus.NO,
      },
    } as any);

    const sheetRow = [
      new Date().toISOString(),
      submissionId,
      name,
      whatsapp,
      email,
      blob.url,
      originalName,
      isImage ? ProcessingStatus.YES : ProcessingStatus.NO,
      finalContentType,
    ];
    await appendToSheet(sheetRow);

    const headers = new Headers();
    headers.append(EVENT_HEADERS.CLARITY, AnalyticsEvent.FORM_SUBMITTED);
    headers.append(EVENT_HEADERS.GA4, AnalyticsEvent.FORM_SUBMITTED);
    // O Yandex Metrica será chamado diretamente no frontend

    return NextResponse.json({
      url: blob.url,
      id: submissionId,
      fileType: finalContentType,
      processed: isImage ? true : false,
    }, { headers });

  } catch (error) {
    console.error('[UPLOAD ERROR]', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}