"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, CreateVideoData } from "@/types/video";
import { 
  ExternalLink, 
  Upload, 
  Image as ImageIcon,
  Clock,
  AlertCircle
} from "lucide-react";

interface ExternalVideoFormProps {
  video?: Video | null;
  onVideoDataUpdate: (data: Partial<CreateVideoData>) => void;
}

export function ExternalVideoForm({ video, onVideoDataUpdate }: ExternalVideoFormProps) {
  const [externalUrl, setExternalUrl] = useState(video?.videoUrl || '');
  const [customThumbnail, setCustomThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(video?.thumbnail || null);
  const [duration, setDuration] = useState(video?.duration || '');
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (url: string) => {
    setExternalUrl(url);
    setError(null);
    onVideoDataUpdate({ videoUrl: url });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomThumbnail(file);
      
      // Créer l'URL de prévisualisation
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      onVideoDataUpdate({ thumbnail: url });
    }
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Miniature personnalisée
          </CardTitle>
          <CardDescription>
            Ajoutez une miniature pour représenter votre vidéo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {thumbnailPreview ? (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setCustomThumbnail(null);
                      setThumbnailPreview(null);
                      onVideoDataUpdate({ thumbnail: undefined });
                    }}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Aucune miniature
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Ajoutez une miniature pour améliorer l'apparence de votre vidéo
              </p>
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail-upload"
              />
              <Label
                htmlFor="thumbnail-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Sélectionner une image
              </Label>
            </div>
          )}

          {!thumbnailPreview && (
            <div className="text-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail-upload-alt"
              />
              <Label
                htmlFor="thumbnail-upload-alt"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choisir une miniature
              </Label>
            </div>
          )}
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
            <p><strong>Miniature :</strong> Ajoutez une image représentative (recommandé)</p>
            <p><strong>Formats supportés :</strong> Vimeo, Dailymotion, et autres plateformes vidéo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
