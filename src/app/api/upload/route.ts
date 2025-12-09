import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const name = formData.get('name') as string;
        const whatsapp = formData.get('whatsapp') as string;
        const email = formData.get('email') as string || '';
        const submissionId = formData.get('id') as string;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // 👇 Aqui fica o nome único CERTO 👇
        const uniqueName = `${submissionId}-${Date.now()}-${file.name}`;

        const blob = await put(uniqueName, file, {
            access: 'public',
            addRandomSuffix: false, // já estamos gerando nome único
            metadata: {
                uploaderName: name,
                uploaderWhatsapp: whatsapp,
                uploaderEmail: email,
                submissionId,
            }
        } as any);

        return NextResponse.json({
            url: blob.url,
            id: submissionId
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
