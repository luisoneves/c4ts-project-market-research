// src/app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import {
    IMAGE_MIME_TYPES,
    MimeType,
    FileExtension,
    IMAGE_PROCESSING,
    ProcessingStatus,
    FormField,
    EVENT_HEADERS,
    AnalyticsEvent,
} from '@/constants';

export const runtime = 'nodejs';

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

    // Convertendo para Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalName = file.name;

    // --- AQUI ESTÁ A CORREÇÃO (usando 'any' para evitar erro de ArrayBufferLike) ---
    let finalBuffer: any = buffer;

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

    const headers = new Headers();
    headers.append(EVENT_HEADERS.CLARITY, AnalyticsEvent.FORM_SUBMITTED);
    headers.append(EVENT_HEADERS.GA4, AnalyticsEvent.FORM_SUBMITTED);

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
