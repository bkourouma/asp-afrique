import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('id');

    if (!videoId) {
      return NextResponse.json(
        { error: 'ID vidéo requis' },
        { status: 400 }
      );
    }

    // En production, vous devriez utiliser l'API YouTube Data v3
    // Pour le développement, on simule la récupération des données
    const mockData = {
      id: videoId,
      title: `Vidéo YouTube ${videoId}`,
      description: 'Description de la vidéo YouTube récupérée automatiquement',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      duration: '10:30',
      durationSeconds: 630,
      author: 'Auteur YouTube'
    };

    // TODO: Implémenter l'API YouTube Data v3
    // const apiKey = process.env.YOUTUBE_API_KEY;
    // if (apiKey) {
    //   const response = await fetch(
    //     `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${apiKey}`
    //   );
    //   const data = await response.json();
    //   
    //   if (data.items && data.items.length > 0) {
    //     const video = data.items[0];
    //     const snippet = video.snippet;
    //     const contentDetails = video.contentDetails;
    //     
    //     return NextResponse.json({
    //       id: videoId,
    //       title: snippet.title,
    //       description: snippet.description,
    //       thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
    //       duration: contentDetails.duration, // Format ISO 8601
    //       durationSeconds: parseISO8601Duration(contentDetails.duration),
    //       author: snippet.channelTitle
    //     });
    //   }
    // }

    return NextResponse.json(mockData);

  } catch (error) {
    console.error('Erreur lors de la récupération des informations YouTube:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des informations YouTube' },
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour parser la durée ISO 8601
function parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  return hours * 3600 + minutes * 60 + seconds;
}
