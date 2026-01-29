import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/config';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification avec getServerSession
    // Note: Dans Next.js 13+ App Router, getServerSession devrait fonctionner automatiquement
    const session = await getServerSession(authOptions);
    
    // Log pour debug
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('next-auth.session-token') || cookieStore.get('__Secure-next-auth.session-token');
    
    console.log('🔍 Upload route - Debug:', {
      hasSession: !!session,
      hasSessionToken: !!sessionToken,
      sessionTokenName: sessionToken?.name,
      user: session?.user,
      accessToken: (session as any)?.accessToken ? 'present' : 'absent'
    });
    
    if (!session) {
      console.error('❌ No session found in upload route');
      return NextResponse.json(
        { error: 'Non authentifié. Veuillez vous reconnecter.' },
        { status: 401 }
      );
    }

    const user = session.user as any;
    if (!user?.roles?.includes('ADMIN')) {
      return NextResponse.json(
        { error: 'Accès refusé. Seuls les administrateurs peuvent télécharger des fichiers.' },
        { status: 403 }
      );
    }

    // Récupérer le token d'accès
    const token = (session as any).accessToken;
    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'accès non disponible' },
        { status: 401 }
      );
    }

    // Récupérer le fichier depuis la requête
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Valider le type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Seules les images sont autorisées' },
        { status: 400 }
      );
    }

    // Valider la taille (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximale: 5MB' },
        { status: 400 }
      );
    }

    // Créer un nouveau FormData pour l'API Fastify
    const apiFormData = new FormData();
    apiFormData.append('file', file);

    // Obtenir l'URL de l'API (même logique que auth/config.ts)
    // En production, utiliser 127.0.0.1:3004 (Fastify API port)
    // En développement, utiliser 127.0.0.1:3004
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'http://127.0.0.1:3004' 
      : 'http://127.0.0.1:3004';
    const uploadUrl = `${apiUrl}/api/v1/upload`;

    // Faire la requête à l'API Fastify
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: apiFormData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      return NextResponse.json(
        { error: errorData.error || 'Erreur lors de l\'upload' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    );
  }
}
