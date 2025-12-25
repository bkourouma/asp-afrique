"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiGet } from "@/lib/api-client";
import { Play, Clock, Eye, Filter, Search, Grid, List, ChevronDown, Star, Users, Award } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Video {
  id: string;
  title: string;
  slug: string;
  description?: string;
  type: 'YOUTUBE' | 'UPLOAD' | 'EXTERNAL';
  videoUrl?: string;
  videoId?: string;
  videoFile?: string;
  thumbnail?: string;
  duration?: string;
  durationSeconds?: number;
  category?: string;
  tags: string[];
  author?: string;
  language: string;
  level?: 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE';
  status: 'DRAFT' | 'PUBLISHED';
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface VideoFilters {
  page: number;
  limit: number;
  status?: string;
  category?: string;
  type?: string;
  level?: string;
  search?: string;
  sortBy: string;
  sortOrder: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<VideoFilters>({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Icon and color mapping for video categories
  const categoryIcons = {
    'Sécurité': { icon: Award, color: '#FF6B35', bgColor: 'rgba(255, 107, 53, 0.1)' },
    'Formation': { icon: Users, color: '#00D9FF', bgColor: 'rgba(0, 217, 255, 0.1)' },
    'Technique': { icon: Star, color: '#FFD23F', bgColor: 'rgba(255, 210, 63, 0.1)' },
    'Légal': { icon: Award, color: '#9D4EDD', bgColor: 'rgba(157, 78, 221, 0.1)' },
    'Pratique': { icon: Play, color: '#06FFA5', bgColor: 'rgba(6, 255, 165, 0.1)' },
  };

  const levelColors = {
    'DEBUTANT': { color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' },
    'INTERMEDIAIRE': { color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.1)' },
    'AVANCE': { color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)' },
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await apiGet('/api/v1/videos', filters);
        // L'API retourne un objet avec une propriété data contenant les vidéos
        setVideos(response?.data || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const getThumbnailUrl = (video: Video) => {
    if (video.thumbnail) return video.thumbnail;
    if (video.type === 'YOUTUBE' && video.videoId) {
      return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
    }
    return '/placeholder-video.jpg';
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getVideoUrl = (video: Video) => {
    // Toutes les vidéos utilisent la page de détail locale
    return `/videos/${video.slug}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des vidéos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header currentPath="/videos" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-[#1A3F5F] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <Play className="w-12 h-12 mx-auto text-white mb-4" />
            </motion.div>

            <motion.h1
              className="text-5xl font-bold mb-4 text-accent-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Bibliothèque Vidéo Technique
            </motion.h1>

            <motion.p
              className="text-xl text-center text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Découvrez notre collection de vidéos techniques et formations
              pour développer vos compétences en sécurité professionnelle.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher des vidéos..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-1 focus:border-transparent"
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>

            {/* Filters Toggle */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-5 h-5" />
              <span>Filtres</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* View Mode Toggle */}
            <div className="flex bg-white border border-gray-300 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-accent-1 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-accent-1 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <motion.div
            className={`mt-4 transition-all duration-300 ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-gray-200">
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-1"
              >
                <option value="">Toutes les catégories</option>
                <option value="Sécurité">Sécurité</option>
                <option value="Formation">Formation</option>
                <option value="Technique">Technique</option>
                <option value="Légal">Légal</option>
                <option value="Pratique">Pratique</option>
              </select>

              <select
                value={filters.level || ''}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-1"
              >
                <option value="">Tous les niveaux</option>
                <option value="DEBUTANT">Débutant</option>
                <option value="INTERMEDIAIRE">Intermédiaire</option>
                <option value="AVANCE">Avancé</option>
              </select>

              <select
                value={filters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-1"
              >
                <option value="">Tous les types</option>
                <option value="YOUTUBE">YouTube</option>
                <option value="UPLOAD">Upload</option>
                <option value="EXTERNAL">Externe</option>
              </select>

              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters(prev => ({ ...prev, sortBy, sortOrder }));
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-1"
              >
                <option value="createdAt-desc">Plus récent</option>
                <option value="createdAt-asc">Plus ancien</option>
                <option value="views-desc">Plus vues</option>
                <option value="title-asc">Titre A-Z</option>
                <option value="title-desc">Titre Z-A</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white/50 to-accent-1/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent-1/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-1/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-1/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {videos.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Play className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucune vidéo trouvée</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Aucune vidéo ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Results Header */}
              <motion.div
                className="flex justify-between items-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    {videos.length} vidéo{videos.length > 1 ? 's' : ''} trouvée{videos.length > 1 ? 's' : ''}
                  </h2>
                  <p className="text-gray-600">Découvrez notre collection de vidéos techniques</p>
                </div>
              </motion.div>

              {/* Videos Grid/List */}
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6"
              }>
                {videos.map((video, index) => {
                  const categoryData = categoryIcons[video.category as keyof typeof categoryIcons];
                  const levelData = levelColors[video.level as keyof typeof levelColors];
                  const IconComponent = categoryData?.icon || Play;

                  const videoCard = (
                    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-accent-1/30 relative overflow-hidden transform-gpu ${
                      viewMode === 'grid' ? 'h-full' : 'flex-1'
                    }`}>
                          {/* Video Thumbnail */}
                          <div className={`relative ${viewMode === 'grid' ? 'aspect-video' : 'w-48 h-32 flex-shrink-0'}`}>
                            <img
                              src={getThumbnailUrl(video)}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-video.jpg';
                              }}
                            />
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <motion.div
                                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Play className="w-8 h-8 text-accent-1 ml-1" fill="currentColor" />
                              </motion.div>
                            </div>

                            {/* Duration Badge */}
                            {video.durationSeconds && (
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                                {formatDuration(video.durationSeconds)}
                              </div>
                            )}

                            {/* Level Badge */}
                            {video.level && (
                              <div 
                                className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white"
                                style={{ backgroundColor: levelData?.color }}
                              >
                                {video.level === 'DEBUTANT' ? 'Débutant' : 
                                 video.level === 'INTERMEDIAIRE' ? 'Intermédiaire' : 'Avancé'}
                              </div>
                            )}
                          </div>

                          {/* Video Content */}
                          <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                            {/* Category Icon */}
                            <div className="flex items-center gap-2 mb-3">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: categoryData?.bgColor || 'rgba(255, 107, 53, 0.1)' }}
                              >
                                <IconComponent 
                                  size={16} 
                                  color={categoryData?.color || '#FF6B35'} 
                                />
                              </div>
                              <span className="text-sm text-gray-600 font-medium">
                                {video.category || 'Général'}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2 group-hover:text-accent-1 transition-colors">
                              {video.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {video.description || 'Aucune description disponible.'}
                            </p>

                            {/* Tags */}
                            {video.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-4">
                                {video.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {video.tags.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{video.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Video Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                {video.author && (
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>{video.author}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(video.createdAt).toLocaleDateString('fr-FR')}</span>
                              </div>
                            </div>
                          </div>
                    </div>
                  );

                  return (
                    <motion.div
                      key={video.id}
                      className={`group ${viewMode === 'grid' ? 'perspective-1000' : 'flex gap-4'}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={viewMode === 'grid' ? { y: -8, scale: 1.02 } : {}}
                    >
                      <Link href={getVideoUrl(video)} className="block">
                        {videoCard}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}