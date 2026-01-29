import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Incrémenter le compteur de vues
    const video = await prisma.video.update({
      where: { id },
      data: {
        views: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ views: video.views });

  } catch (error) {
    console.error('Erreur lors de l\'incrémentation des vues:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'incrémentation des vues' },
      { status: 500 }
    );
  }
}
