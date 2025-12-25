import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { VideoFilters, VideoType, VideoStatus, VideoLevel } from '@/types/video';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Récupérer les paramètres de filtrage
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const status = searchParams.get('status') as VideoStatus;
    const type = searchParams.get('type') as VideoType;
    const level = searchParams.get('level') as VideoLevel;
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Construire les filtres
    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (level) {
      where.level = level;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ];
    }

    // Construire l'ordre de tri
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Récupérer les vidéos avec pagination
    const [videos, total] = await Promise.all([
      prisma.video.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.video.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      videos,
      total,
      page,
      limit,
      totalPages
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des vidéos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Générer le slug à partir du titre
    const slug = data.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Vérifier si le slug existe déjà
    const existingVideo = await prisma.video.findUnique({
      where: { slug }
    });

    let finalSlug = slug;
    if (existingVideo) {
      let counter = 1;
      do {
        finalSlug = `${slug}-${counter}`;
        counter++;
      } while (await prisma.video.findUnique({ where: { slug: finalSlug } }));
    }

    // Créer la vidéo
    const video = await prisma.video.create({
      data: {
        ...data,
        slug: finalSlug,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null
      }
    });

    return NextResponse.json(video, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de la vidéo:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la vidéo' },
      { status: 500 }
    );
  }
}
