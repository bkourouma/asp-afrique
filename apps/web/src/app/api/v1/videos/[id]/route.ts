import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const video = await prisma.video.findUnique({
      where: { id }
    });

    if (!video) {
      return NextResponse.json(
        { error: 'Vidéo non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(video);

  } catch (error) {
    console.error('Erreur lors de la récupération de la vidéo:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la vidéo' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Vérifier si la vidéo existe
    const existingVideo = await prisma.video.findUnique({
      where: { id }
    });

    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Vidéo non trouvée' },
        { status: 404 }
      );
    }

    // Mettre à jour le slug si le titre a changé
    let slug = existingVideo.slug;
    if (data.title && data.title !== existingVideo.title) {
      slug = data.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Vérifier si le nouveau slug existe déjà
      const slugExists = await prisma.video.findUnique({
        where: { slug }
      });

      if (slugExists && slugExists.id !== id) {
        let counter = 1;
        let finalSlug = slug;
        do {
          finalSlug = `${slug}-${counter}`;
          counter++;
        } while (await prisma.video.findUnique({ where: { slug: finalSlug } }));
        slug = finalSlug;
      }
    }

    // Mettre à jour la vidéo
    const video = await prisma.video.update({
      where: { id },
      data: {
        ...data,
        slug,
        publishedAt: data.status === 'PUBLISHED' && existingVideo.status !== 'PUBLISHED' 
          ? new Date() 
          : existingVideo.publishedAt
      }
    });

    return NextResponse.json(video);

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la vidéo:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la vidéo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Vérifier si la vidéo existe
    const existingVideo = await prisma.video.findUnique({
      where: { id }
    });

    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Vidéo non trouvée' },
        { status: 404 }
      );
    }

    // Supprimer les fichiers associés si c'est un upload
    if (existingVideo.type === 'UPLOAD') {
      // TODO: Supprimer les fichiers du système de fichiers
      // const fs = require('fs');
      // const path = require('path');
      // 
      // if (existingVideo.videoFile) {
      //   const videoPath = path.join(process.cwd(), 'public', existingVideo.videoFile);
      //   if (fs.existsSync(videoPath)) {
      //     fs.unlinkSync(videoPath);
      //   }
      // }
      // 
      // if (existingVideo.thumbnail && !existingVideo.thumbnail.startsWith('http')) {
      //   const thumbnailPath = path.join(process.cwd(), 'public', existingVideo.thumbnail);
      //   if (fs.existsSync(thumbnailPath)) {
      //     fs.unlinkSync(thumbnailPath);
      //   }
      // }
    }

    // Supprimer la vidéo de la base de données
    await prisma.video.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Vidéo supprimée avec succès' });

  } catch (error) {
    console.error('Erreur lors de la suppression de la vidéo:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la vidéo' },
      { status: 500 }
    );
  }
}
