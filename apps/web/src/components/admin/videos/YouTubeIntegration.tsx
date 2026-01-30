"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, CreateVideoData, YouTubeVideoInfo } from "@/types/video";
import { extractYouTubeId, isValidYouTubeUrl, getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/video-utils";
import { 
  Youtube, 
  ExternalLink, 
  Play, 
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

interface YouTubeIntegrationProps {
  video?: Video | null;
  onVideoDataUpdate: (data: Partial<CreateVideoData>) => void;
}

export function YouTubeIntegration({ video, onVideoDataUpdate }: YouTubeIntegrationProps) {
  const [youtubeUrl, setYoutubeUrl] = useState(video?.videoUrl || '');
  const [videoId, setVideoId] = useState(video?.videoId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<YouTubeVideoInfo | null>(null);

  useEffect(() => {
    if (video?.videoUrl && video?.videoId) {
      setYoutubeUrl(video.videoUrl);
      setVideoId(video.videoId);
      // Charger les informations de la vidéo existante
      loadVideoInfo(video.videoId);
    }
  }, [video]);

  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url);
    setError(null);
    
    if (url) {
      const id = extractYouTubeId(url);
      if (id) {
        setVideoId(id);
        loadVideoInfo(id);
      } else if (isValidYouTubeUrl(url)) {
        setError('URL YouTube invalide');
      }
    } else {
      setVideoId('');
      setVideoInfo(null);
    }
  };

  const loadVideoInfo = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // Utiliser directement les données de base sans appel API
      // L'ID YouTube et le thumbnail sont suffisants
      const thumbnail = getYouTubeThumbnail(id);

      onVideoDataUpdate({
        videoUrl: youtubeUrl,
        videoId: id,
        thumbnail: thumbnail
      });

      setVideoInfo({
        id,
        thumbnail,
        title: '',
        duration: '',
        durationSeconds: 0,
        author: ''
      });
    } catch (err) {
      console.error('Erreur lors du chargement des informations YouTube:', err);
      setError('Erreur lors du traitement de la vidéo YouTube');
    } finally {
      setLoading(false);
    }
  };

  const handleManualExtract = () => {
    if (youtubeUrl) {
      const id = extractYouTubeId(youtubeUrl);
      if (id) {
        setVideoId(id);
        loadVideoInfo(id);
      } else {
        setError('URL YouTube invalide');
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-500" />
            Intégration YouTube
          </CardTitle>
          <CardDescription>
            Ajoutez une vidéo YouTube en collant son URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">URL YouTube</Label>
            <div className="flex gap-2">
              <Input
                id="youtube-url"
                value={youtubeUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                className="flex-1"
              />
              <Button
                onClick={handleManualExtract}
                disabled={!youtubeUrl || loading}
                variant="outline"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Formats supportés : youtube.com/watch?v=, youtu.be/, youtube.com/embed/
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {videoId && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                ID YouTube détecté : {videoId}
              </div>

              {/* Aperçu de la vidéo */}
              <div className="space-y-2">
                <Label>Aperçu de la vidéo</Label>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={getYouTubeEmbedUrl(videoId)}
                    title="YouTube video player"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
