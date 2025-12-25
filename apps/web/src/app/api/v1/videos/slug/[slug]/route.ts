import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const video = await prisma.video.findUnique({
      where: { 
        slug,
        status: 'PUBLISHED' // Seulement les vidéos publiées
      }
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
