// src/app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export const runtime = 'nodejs';

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
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

    // Google Sheets removido para evitar erros de tipagem e build,
    // já que as credenciais não estão configuradas no .env.local.
    
    const headers = new Headers();
    headers.append('X-Clarity-Event', 'form_submitted');
    headers.append('X-GA4-Event', 'form_submitted');

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
