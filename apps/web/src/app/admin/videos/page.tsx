"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { VideoForm } from "@/components/admin/videos/VideoForm";
import { VideoList } from "@/components/admin/videos/VideoList";
import { VideoPreview } from "@/components/admin/videos/VideoPreview";
import { VideoDetailsModal } from "@/components/admin/videos/VideoDetailsModal";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { useAdminCache } from "@/hooks/useAdminCache";
import { Video, VideoFilters, VideoType, VideoStatus, VideoLevel } from "@/types/video";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-client";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Play,
  Youtube,
  Upload,
  ExternalLink,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<VideoFilters>({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const { fetchWithCache, invalidateCache, isLoading } = useAdminCache();

  const fetchVideos = useCallback(async () => {
    const cacheKey = `videos-${JSON.stringify(filters)}`;
    
    try {
      const data = await fetchWithCache(
        cacheKey,
        async () => {
          const response = await apiGet('/api/v1/videos', filters);
          return response.data || [];
        }
      );
      setVideos(data);
    } catch (error) {
      console.warn('Erreur lors du chargement des videos:', error instanceof Error ? error.message : 'Unknown error');
    }
  }, [filters, fetchWithCache]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleCreateVideo = () => {
    setSelectedVideo(null);
    setShowForm(true);
  };

  const handleEditVideo = (video: Video) => {
    setSelectedVideo(video);
    setShowForm(true);
  };

  const handleViewVideo = (video: Video) => {
    setSelectedVideo(video);
    setShowDetailsModal(true);
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm('Etes-vous sur de vouloir supprimer cette video ?')) return;

    try {
      await apiDelete(`/api/v1/videos/${videoId}`);
      // Mise à jour immédiate de l'état local pour un feedback instantané
      setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
      // Invalider le cache et recharger les données
      invalidateCache();
      await fetchVideos();
    } catch (error) {
      console.warn('Erreur lors de la suppression:', error instanceof Error ? error.message : 'Unknown error');
      // En cas d'erreur, recharger les données pour restaurer l'état correct
      await fetchVideos();
    }
  };

  const handleSaveVideo = async (videoData: any) => {
    try {
      if (selectedVideo) {
        await apiPut(`/api/v1/videos/${selectedVideo.id}`, videoData);
      } else {
        await apiPost('/api/v1/videos', videoData);
      }
      setShowForm(false);
      setSelectedVideo(null);
      invalidateCache();
      await fetchVideos();
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

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

  const getStatusBadge = (status: VideoStatus) => {
    switch (status) {
      case VideoStatus.PUBLISHED:
        return <Badge variant="default" className="bg-green-100 text-green-800">Publie</Badge>;
      case VideoStatus.DRAFT:
        return <Badge variant="secondary">Brouillon</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  if (showForm) {
    return (
      <AuthGuard requiredRole="ADMIN">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedVideo ? 'Modifier la video' : 'Nouvelle video'}
              </h1>
              <p className="text-base text-gray-600 mt-2">
                {selectedVideo ? 'Modifiez les informations de la video' : 'Ajoutez une nouvelle video a la bibliotheque'}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setSelectedVideo(null);
              }}
            >
              Retour a la liste
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <VideoForm
                video={selectedVideo}
                onSave={handleSaveVideo}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedVideo(null);
                }}
              />
            </div>
            <div className="lg:col-span-1">
              <VideoPreview video={selectedVideo} />
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des videos</h1>
            <p className="text-base text-gray-600 mt-2">
              Gerer votre bibliotheque de videos techniques
            </p>
          </div>
          <Button onClick={handleCreateVideo} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle video
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres et recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={filters.search || ''}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                  className="pl-10"
                />
              </div>
              
              <Select
                value={filters.category || 'all'}
                onValueChange={(value) => setFilters({ ...filters, category: value === 'all' ? undefined : value, page: 1 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les categories</SelectItem>
                  <SelectItem value="Tutoriels & Formations">Tutoriels & Formations</SelectItem>
                  <SelectItem value="Cybersecurite">Cybersecurite</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  <SelectItem value="Intelligence Artificielle">Intelligence Artificielle</SelectItem>
                  <SelectItem value="Reseaux & Infrastructure">Reseaux & Infrastructure</SelectItem>
                  <SelectItem value="Developpement Web">Developpement Web</SelectItem>
                  <SelectItem value="Applications Mobiles">Applications Mobiles</SelectItem>
                  <SelectItem value="Bases de Donnees">Bases de Donnees</SelectItem>
                  <SelectItem value="Linux & Open Source">Linux & Open Source</SelectItem>
                  <SelectItem value="Conferences & Webinaires">Conferences & Webinaires</SelectItem>
                  <SelectItem value="DevOps & CI/CD">DevOps & CI/CD</SelectItem>
                  <SelectItem value="Data Science & Analytics">Data Science & Analytics</SelectItem>
                  <SelectItem value="Demonstrations Produits">Demonstrations Produits</SelectItem>
                  <SelectItem value="Interviews Experts">Interviews Experts</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? undefined : (value as VideoStatus), page: 1 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value={VideoStatus.PUBLISHED}>Publie</SelectItem>
                  <SelectItem value={VideoStatus.DRAFT}>Brouillon</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.type || 'all'}
                onValueChange={(value) => setFilters({ ...filters, type: value === 'all' ? undefined : (value as VideoType), page: 1 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value={VideoType.YOUTUBE}>YouTube</SelectItem>
                  <SelectItem value={VideoType.UPLOAD}>Upload</SelectItem>
                  <SelectItem value={VideoType.EXTERNAL}>Externe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              {videos.length} video{videos.length > 1 ? 's' : ''}
            </span>
          </div>

          <Select
            value={filters.sortBy || 'createdAt'}
            onValueChange={(value) => setFilters({ ...filters, sortBy: value as any })}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Plus recent</SelectItem>
              <SelectItem value="title">Titre A-Z</SelectItem>
              <SelectItem value="views">Plus vues</SelectItem>
              <SelectItem value="publishedAt">Date de publication</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <AdminLoading message="Chargement des videos..." />
        ) : (
          <VideoList
            videos={videos}
            viewMode={viewMode}
            onEdit={handleEditVideo}
            onDelete={handleDeleteVideo}
            onView={handleViewVideo}
            getVideoTypeIcon={getVideoTypeIcon}
            getStatusBadge={getStatusBadge}
          />
        )}

        <VideoDetailsModal
          video={selectedVideo}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedVideo(null);
          }}
        />
      </div>
    </AuthGuard>
  );
}
