// src/app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { google } from 'googleapis';

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
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    await googleSheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
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
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const email = formData.get('email') as string || '';
    const submissionId = formData.get('id') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    let finalBuffer = buffer;
    let finalContentType = file.type;
    let finalExtension = originalName.split('.').pop()?.toLowerCase() || 'bin';

    const isImage = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'].includes(file.type);

    if (isImage) {
      try {
        finalBuffer = await sharp(buffer)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 78, effort: 4 })
          .toBuffer();

        finalContentType = 'image/webp';
        finalExtension = 'webp';
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
        processed: isImage ? 'yes' : 'no',
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
      isImage ? 'yes' : 'no',
      finalContentType,
    ];
    await appendToSheet(sheetRow);

    const headers = new Headers();
    headers.append('X-Clarity-Event', 'form_submitted'); // Para Clarity
    headers.append('X-GA4-Event', 'form_submitted');     // Para GA4 via GTM
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