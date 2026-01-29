"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, VideoType } from "@/types/video";
import { getYouTubeEmbedUrl } from "@/lib/video-utils";
import { 
  Play, 
  Youtube, 
  Upload, 
  ExternalLink,
  Clock,
  Eye,
  User,
  Tag,
  Calendar,
  Globe
} from "lucide-react";

interface VideoPreviewProps {
  video?: Video | null;
}

export function VideoPreview({ video }: VideoPreviewProps) {
  if (!video) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Aperçu
          </CardTitle>
          <CardDescription>
            L'aperçu de votre vidéo apparaîtra ici
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Aucune vidéo sélectionnée</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getVideoTypeIcon = (type: VideoType) => {
    switch (type) {
      case VideoType.YOUTUBE:
        return <Youtube className="h-4 w-4 text-red-500" />;
      case VideoType.UPLOAD:
        return <Upload className="h-4 w-4 text-blue-500" />;
      case VideoType.EXTERNAL:
        return <ExternalLink className="h-4 w-4 text-green-500" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <Badge variant="default" className="bg-green-100 text-green-800">Publié</Badge>;
      case 'DRAFT':
        return <Badge variant="secondary">Brouillon</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const renderVideoPlayer = () => {
    if (video.type === VideoType.YOUTUBE && video.videoId) {
      return (
        <iframe
          src={getYouTubeEmbedUrl(video.videoId)}
          title="YouTube video player"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (video.type === VideoType.UPLOAD && video.videoFile) {
      return (
        <video
          src={video.videoFile}
          controls
          className="w-full h-full"
          poster={video.thumbnail || undefined}
        />
      );
    }

    if (video.type === VideoType.EXTERNAL && video.videoUrl) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Vidéo externe</p>
            <a
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Ouvrir dans un nouvel onglet
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Aucun contenu vidéo</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Aperçu de la vidéo
          </CardTitle>
          <CardDescription>
            Prévisualisation de votre vidéo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {renderVideoPlayer()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Informations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Type</span>
            <div className="flex items-center gap-2">
              {getVideoTypeIcon(video.type)}
              <span className="text-sm">
                {video.type === VideoType.YOUTUBE ? 'YouTube' :
                 video.type === VideoType.UPLOAD ? 'Upload' : 'Externe'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Statut</span>
            {getStatusBadge(video.status)}
          </div>

          {video.duration && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Durée</span>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-3 w-3" />
                {video.duration}
              </div>
            </div>
          )}


          {video.author && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Auteur</span>
              <div className="flex items-center gap-1 text-sm">
                <User className="h-3 w-3" />
                {video.author}
              </div>
            </div>
          )}


          {video.category && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Catégorie</span>
              <span className="text-sm">{video.category}</span>
            </div>
          )}

          {video.tags && video.tags.length > 0 && (
            <div>
              <span className="text-sm text-gray-500 block mb-2">Tags</span>
              <div className="flex flex-wrap gap-1">
                {video.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {video.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{video.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Créé le</span>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3" />
              {new Date(video.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Aperçu responsive</CardTitle>
          <CardDescription>
            Comment la vidéo apparaîtra sur différents appareils
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Desktop */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Desktop</p>
              <div className="w-full h-32 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">16:9</p>
                </div>
              </div>
            </div>

            {/* Tablet */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Tablet</p>
              <div className="w-3/4 h-24 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center mx-auto">
                <div className="text-center">
                  <Play className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">4:3</p>
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Mobile</p>
              <div className="w-1/2 h-20 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center mx-auto">
                <div className="text-center">
                  <Play className="h-3 w-3 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">9:16</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
