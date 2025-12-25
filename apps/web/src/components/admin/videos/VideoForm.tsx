"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label-simple";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Video, VideoType, VideoStatus, CreateVideoData } from "@/types/video";
import { VideoUpload } from "./VideoUpload";
import { YouTubeIntegration } from "./YouTubeIntegration";
import { ExternalVideoForm } from "./ExternalVideoForm";
import { generateSlug, formatDuration, parseDuration } from "@/lib/video-utils";
import { 
  Youtube, 
  Upload, 
  ExternalLink, 
  Save, 
  X, 
  Plus,
  Tag,
  Clock,
  User,
  Globe
} from "lucide-react";

interface VideoFormProps {
  video?: Video | null;
  onSave: (data: CreateVideoData) => void;
  onCancel: () => void;
}

export function VideoForm({ video, onSave, onCancel }: VideoFormProps) {
  const [formData, setFormData] = useState<CreateVideoData>({
    title: '',
    description: '',
    type: VideoType.UPLOAD,
    category: '',
    tags: [],
    author: '',
    status: VideoStatus.DRAFT
  });

  const [newTag, setNewTag] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title,
        description: video.description || '',
        type: video.type,
        videoUrl: video.videoUrl || '',
        videoId: video.videoId || '',
        videoFile: video.videoFile || '',
        thumbnail: video.thumbnail || '',
        duration: video.duration || '',
        durationSeconds: video.durationSeconds || 0,
        category: video.category || '',
        tags: video.tags || [],
        author: video.author || '',
        status: video.status,
        subtitles: video.subtitles || '',
        resources: video.resources || null
      });
    }
  }, [video]);

  const handleInputChange = (field: keyof CreateVideoData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-générer le slug à partir du titre
    if (field === 'title' && value) {
      const slug = generateSlug(value);
      // Note: Le slug sera géré côté serveur
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setFormData(prev => ({
        ...prev,
        category: newCategory.trim()
      }));
      setNewCategory('');
    }
  };

  const handleSelectCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category: category
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoDataUpdate = (data: Partial<CreateVideoData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
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
        return <Upload className="h-4 w-4" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getVideoTypeIcon(formData.type)}
            Informations générales
          </CardTitle>
          <CardDescription>
            Renseignez les informations de base de votre vidéo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Titre de la vidéo"
                required
                maxLength={100}
              />
              <p className="text-xs text-gray-500">
                {formData.title.length}/100 caractères
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Auteur/Intervenant</Label>
              <Input
                id="author"
                value={formData.author || ''}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Nom de l'auteur"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description de la vidéo"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Catégorie</Label>
            {formData.category && (
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  {formData.category}
                  <button
                    type="button"
                    onClick={() => handleInputChange('category', '')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Ajouter une catégorie"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
              />
              <Button type="button" onClick={handleAddCategory} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags techniques</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Ajouter un tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Contenu vidéo
          </CardTitle>
          <CardDescription>
            Choisissez le type de vidéo et configurez-la
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={VideoType.UPLOAD} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Direct
              </TabsTrigger>
              <TabsTrigger value={VideoType.YOUTUBE} className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                YouTube
              </TabsTrigger>
              <TabsTrigger value={VideoType.EXTERNAL} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                URL Externe
              </TabsTrigger>
            </TabsList>

            <TabsContent value={VideoType.UPLOAD} className="mt-4">
              <VideoUpload
                video={video}
                onVideoDataUpdate={handleVideoDataUpdate}
              />
            </TabsContent>

            <TabsContent value={VideoType.YOUTUBE} className="mt-4">
              <YouTubeIntegration
                video={video}
                onVideoDataUpdate={handleVideoDataUpdate}
              />
            </TabsContent>

            <TabsContent value={VideoType.EXTERNAL} className="mt-4">
              <ExternalVideoForm
                video={video}
                onVideoDataUpdate={handleVideoDataUpdate}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Publication
          </CardTitle>
          <CardDescription>
            Configurez le statut et les options de publication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={VideoStatus.DRAFT}>Brouillon</SelectItem>
                  <SelectItem value={VideoStatus.PUBLISHED}>Publié</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durée (MM:SS ou HH:MM:SS)</Label>
              <Input
                id="duration"
                value={formData.duration || ''}
                onChange={(e) => {
                  const duration = e.target.value;
                  const seconds = parseDuration(duration);
                  handleInputChange('duration', duration);
                  handleInputChange('durationSeconds', seconds);
                }}
                placeholder="00:00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting || !formData.title}>
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
}
