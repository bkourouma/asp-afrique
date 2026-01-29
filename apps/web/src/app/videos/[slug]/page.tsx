"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Play, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  Eye, 
  Globe, 
  Download, 
  ArrowRight, 
  Youtube, 
  Upload, 
  ExternalLink,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Video, VideoType, VideoLevel } from "@/types/video";
import { apiGet } from "@/lib/api-client";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function VideoDetailPage({ params }: PageProps) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { slug } = await params;
        const response = await apiGet(`/api/v1/videos/by-slug/${slug}`, { requireAuth: false });
        setVideo(response);
      } catch (error) {
        console.error('Error fetching video:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [params]);

  if (error) {
    notFound();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 text-lg">Chargement de la vidéo...</p>
        </motion.div>
      </div>
    );
  }

  if (!video) {
    notFound();
  }

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



  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <Header currentPath="/videos" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0A2540] to-[#1A3F5F] text-white py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#E55A2B]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav 
            className="text-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="text-white/80 hover:text-[#FF6B35] transition-colors">Accueil</Link>
            <span className="mx-2 text-white/60">/</span>
            <Link href="/videos" className="text-white/80 hover:text-[#FF6B35] transition-colors">Vidéos</Link>
            <span className="mx-2 text-white/60">/</span>
            <span className="text-[#FF6B35] font-semibold">{video.title}</span>
          </motion.nav>

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
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                {getVideoTypeIcon(video.type)}
                <span className="font-semibold">
                  {video.type === VideoType.YOUTUBE ? 'YouTube' :
                   video.type === VideoType.UPLOAD ? 'Upload Direct' : 'URL Externe'}
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: '#FF6B35' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {video.title}
            </motion.h1>


            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-semibold">{video.duration || 'N/A'}</span>
              </div>
              {video.category && (
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#FF6B35]" />
                  <span className="font-semibold">{video.category}</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-bg-secondary to-accent-1/10 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }, (_, i) => {
            const durations = [4.2, 4.5, 4.8, 4.1, 4.6, 4.3, 4.7, 4.4, 4.9, 4.0];
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#FF6B35]/20 rounded-full"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 23) % 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: durations[i % durations.length],
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Video Player */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
                  <VideoPlayer 
                    video={video} 
                    autoplay={false} 
                    controls={true}
                  />
                </div>
              </div>
            </motion.div>

            {/* Video Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                {video.description && (
                  <motion.div
                    className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold text-[#0A2540] mb-4">Description</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {video.description}
                    </p>
                  </motion.div>
                )}

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Video Information */}
                <motion.div
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-bold text-[#0A2540] mb-4">Informations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Durée:</span>
                      <span className="font-medium">{video.duration || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Publié:</span>
                      <span className="font-medium">
                        {new Date(video.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    {video.author && (
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Auteur:</span>
                        <span className="font-medium">{video.author}</span>
                      </div>
                    )}
                    
                    {/* Tags */}
                    {video.tags.length > 0 && (
                      <div className="pt-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {video.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-[#FF6B35]/10 to-[#E55A2B]/10 text-[#FF6B35] rounded-full text-xs font-medium border border-[#FF6B35]/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>


              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}