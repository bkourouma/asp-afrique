import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { generateUniqueFileName } from '@/lib/video-utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('video') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Validation du fichier
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format de fichier non supporté' },
        { status: 400 }
      );
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 500MB)' },
        { status: 400 }
      );
    }

    // Générer un nom de fichier unique
    const fileName = generateUniqueFileName(file.name);
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'videos');
    const filePath = join(uploadDir, fileName);

    // Créer le dossier s'il n'existe pas
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Le dossier existe déjà
    }

    // Convertir le fichier en buffer et l'écrire
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Retourner le chemin relatif
    const relativePath = `/uploads/videos/${fileName}`;

    return NextResponse.json({
      filePath: relativePath,
      fileName,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    );
  }
}
