"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, VideoType, VideoStatus, VideoLevel } from "@/types/video";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { 
  Play, 
  Youtube, 
  Upload, 
  ExternalLink, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  Eye, 
  Globe,
  Download,
  X,
  Maximize2,
  Volume2,
  Settings
} from "lucide-react";

interface VideoDetailsModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoDetailsModal({ video, isOpen, onClose }: VideoDetailsModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!video) return null;

  const getVideoTypeIcon = (type: VideoType) => {
    switch (type) {
      case VideoType.YOUTUBE:
        return <Youtube className="h-5 w-5 text-red-500" />;
      case VideoType.UPLOAD:
        return <Upload className="h-5 w-5 text-blue-500" />;
      case VideoType.EXTERNAL:
        return <ExternalLink className="h-5 w-5 text-green-500" />;
      default:
        return <Play className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: VideoStatus) => {
    switch (status) {
      case VideoStatus.PUBLISHED:
        return <Badge variant="default" className="bg-green-100 text-green-800">Publié</Badge>;
      case VideoStatus.DRAFT:
        return <Badge variant="secondary">Brouillon</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getLevelBadge = (level?: VideoLevel) => {
    if (!level) return null;
    
    switch (level) {
      case VideoLevel.DEBUTANT:
        return <Badge variant="outline" className="text-green-600 border-green-600">Débutant</Badge>;
      case VideoLevel.INTERMEDIAIRE:
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Intermédiaire</Badge>;
      case VideoLevel.AVANCE:
        return <Badge variant="outline" className="text-red-600 border-red-600">Avancé</Badge>;
      default:
        return null;
    }
  };

  const handleExternalVideoClick = () => {
    if (video.videoUrl) {
      window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleYouTubeClick = () => {
    if (video.videoUrl) {
      window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const renderVideoPlayer = () => {
    switch (video.type) {
      case VideoType.UPLOAD:
        return (
          <div className="w-full">
            <VideoPlayer 
              video={video} 
              autoplay={false} 
              controls={true}
            />
          </div>
        );
      
      case VideoType.YOUTUBE:
        return (
          <div className="w-full">
            <VideoPlayer 
              video={video} 
              autoplay={false} 
              controls={true}
            />
          </div>
        );
      
      case VideoType.EXTERNAL:
        return (
          <div className="w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center p-8">
              <ExternalLink className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Vidéo externe</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Cette vidéo est hébergée sur une plateforme externe. 
                Cliquez sur le bouton ci-dessous pour l'ouvrir dans un nouvel onglet.
              </p>
              <Button 
                onClick={handleExternalVideoClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
              >
                <Globe className="h-4 w-4" />
                Ouvrir la vidéo
              </Button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Type de vidéo non supporté</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {getVideoTypeIcon(video.type)}
              {video.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {getStatusBadge(video.status)}
              {getLevelBadge(video.level)}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Player vidéo */}
          <Card>
            <CardContent className="p-0">
              {renderVideoPlayer()}
            </CardContent>
          </Card>

          {/* Informations détaillées */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              {video.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {video.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Métadonnées */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Durée:</span>
                      <span className="font-medium">{video.duration || 'N/A'}</span>
                    </div>
                    
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Créé le:</span>
                      <span className="font-medium">
                        {new Date(video.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    {video.author && (
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Auteur:</span>
                        <span className="font-medium">{video.author}</span>
                      </div>
                    )}
                    
                    
                    {video.publishedAt && (
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Publié le:</span>
                        <span className="font-medium">
                          {new Date(video.publishedAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              {video.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Type de vidéo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Type de vidéo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    {getVideoTypeIcon(video.type)}
                    <span className="font-medium">
                      {video.type === VideoType.YOUTUBE ? 'YouTube' :
                       video.type === VideoType.UPLOAD ? 'Upload Direct' : 'URL Externe'}
                    </span>
                  </div>
                  
                  {video.type === VideoType.YOUTUBE && video.videoUrl && (
                    <Button 
                      onClick={handleYouTubeClick}
                      variant="outline" 
                      className="w-full mt-3 text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Youtube className="h-4 w-4 mr-2" />
                      Ouvrir sur YouTube
                    </Button>
                  )}
                  
                  {video.type === VideoType.EXTERNAL && video.videoUrl && (
                    <Button 
                      onClick={handleExternalVideoClick}
                      variant="outline" 
                      className="w-full mt-3 text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ouvrir la vidéo
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Catégorie */}
              {video.category && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Catégorie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="text-sm">
                      {video.category}
                    </Badge>
                  </CardContent>
                </Card>
              )}

              {/* Niveau */}
              {video.level && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Niveau</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getLevelBadge(video.level)}
                  </CardContent>
                </Card>
              )}

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
