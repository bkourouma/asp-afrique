"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, CreateVideoData } from "@/types/video";
import { 
  ExternalLink, 
  Clock,
  AlertCircle
} from "lucide-react";

interface ExternalVideoFormProps {
  video?: Video | null;
  onVideoDataUpdate: (data: Partial<CreateVideoData>) => void;
}

export function ExternalVideoForm({ video, onVideoDataUpdate }: ExternalVideoFormProps) {
  const [externalUrl, setExternalUrl] = useState(video?.videoUrl || '');
  const [duration, setDuration] = useState(video?.duration || '');
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (url: string) => {
    setExternalUrl(url);
    setError(null);
    onVideoDataUpdate({ videoUrl: url });
  };

  const handleDurationChange = (duration: string) => {
    setDuration(duration);
    
    // Convertir en secondes pour le stockage
    const parts = duration.split(':');
    let seconds = 0;
    
    if (parts.length === 2) {
      // MM:SS
      seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      // HH:MM:SS
      seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    
    onVideoDataUpdate({ 
      duration,
      durationSeconds: seconds
    });
  };

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  };

  const handleUrlValidation = () => {
    if (externalUrl && !validateUrl(externalUrl)) {
      setError('URL invalide');
    } else {
      setError(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-green-500" />
            Vidéo externe
          </CardTitle>
          <CardDescription>
            Ajoutez une vidéo depuis une URL externe (Vimeo, Dailymotion, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="external-url">URL de la vidéo</Label>
            <Input
              id="external-url"
              value={externalUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              onBlur={handleUrlValidation}
              placeholder="https://vimeo.com/123456789 ou https://dailymotion.com/video/xyz"
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <p className="text-xs text-gray-500">
              Formats supportés : Vimeo, Dailymotion, ou toute URL de vidéo valide
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Durée de la vidéo</Label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <Input
                id="duration"
                value={duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                placeholder="MM:SS ou HH:MM:SS"
                className="w-32"
              />
            </div>
            <p className="text-xs text-gray-500">
              Format : MM:SS (ex: 05:30) ou HH:MM:SS (ex: 1:05:30)
            </p>
          </div>
        </CardContent>
      </Card>


      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>URL de la vidéo :</strong> Collez l'URL complète de votre vidéo</p>
            <p><strong>Durée :</strong> Indiquez la durée au format MM:SS ou HH:MM:SS</p>
            <p><strong>Formats supportés :</strong> Vimeo, Dailymotion, et autres plateformes vidéo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
