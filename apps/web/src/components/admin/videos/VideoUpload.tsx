"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Video, CreateVideoData, VideoUploadProgress } from "@/types/video";
import { validateVideoFile, generateUniqueFileName, formatUploadSpeed, getVideoMetadata, generateVideoThumbnails } from "@/lib/video-utils";
import { 
  Upload, 
  FileVideo, 
  X, 
  Play, 
  Image as ImageIcon,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface VideoUploadProps {
  video?: Video | null;
  onVideoDataUpdate: (data: Partial<CreateVideoData>) => void;
}

export function VideoUpload({ video, onVideoDataUpdate }: VideoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<VideoUploadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0,
    speed: 0
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = async (file: File) => {
    setError(null);
    
    // Validation du fichier
    const validation = validateVideoFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Erreur de validation');
      return;
    }

    setSelectedFile(file);
    
    // Créer l'URL de prévisualisation
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      // Obtenir les métadonnées de la vidéo
      const metadata = await getVideoMetadata(file);
      
      // Mettre à jour les données du formulaire
      onVideoDataUpdate({
        duration: `${Math.floor(metadata.duration / 60)}:${Math.floor(metadata.duration % 60).toString().padStart(2, '0')}`,
        durationSeconds: Math.floor(metadata.duration)
      });

      // Générer des thumbnails
      const videoElement = document.createElement('video');
      videoElement.src = url;
      videoElement.crossOrigin = 'anonymous';
      
      videoElement.addEventListener('loadedmetadata', async () => {
        try {
          const generatedThumbnails = await generateVideoThumbnails(videoElement, 5);
          setThumbnails(generatedThumbnails);
          if (generatedThumbnails.length > 0) {
            setSelectedThumbnail(generatedThumbnails[0]);
            onVideoDataUpdate({ thumbnail: generatedThumbnails[0] });
          }
        } catch (err) {
          console.error('Erreur lors de la génération des thumbnails:', err);
        }
      });

    } catch (err) {
      console.error('Erreur lors du traitement du fichier:', err);
      setError('Erreur lors du traitement du fichier vidéo');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      const fileName = generateUniqueFileName(selectedFile.name);
      formData.append('video', selectedFile, fileName);

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const loaded = e.loaded;
          const total = e.total;
          const percentage = Math.round((loaded / total) * 100);
          const speed = loaded / ((Date.now() - startTime) / 1000);
          
          setUploadProgress({
            loaded,
            total,
            percentage,
            speed
          });
        }
      });

      const startTime = Date.now();

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          onVideoDataUpdate({
            videoFile: response.filePath,
            thumbnail: selectedThumbnail || response.thumbnail
          });
          setUploading(false);
        } else {
          setError('Erreur lors de l\'upload');
          setUploading(false);
        }
      });

      xhr.addEventListener('error', () => {
        setError('Erreur lors de l\'upload');
        setUploading(false);
      });

      xhr.open('POST', '/api/v1/videos/upload');
      xhr.send(formData);

    } catch (err) {
      setError('Erreur lors de l\'upload');
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setThumbnails([]);
    setSelectedThumbnail(null);
    setError(null);
    onVideoDataUpdate({
      videoFile: undefined,
      thumbnail: undefined,
      duration: undefined,
      durationSeconds: undefined
    });
  };

  const handleThumbnailSelect = (thumbnail: string) => {
    setSelectedThumbnail(thumbnail);
    onVideoDataUpdate({ thumbnail });
  };

  return (
    <div className="space-y-6">
      {/* Zone d'upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload de fichier vidéo
          </CardTitle>
          <CardDescription>
            Glissez-déposez votre fichier vidéo ou cliquez pour sélectionner
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Glissez votre vidéo ici
              </p>
              <p className="text-sm text-gray-500 mb-4">
                ou cliquez pour sélectionner un fichier
              </p>
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="video-upload"
              />
              <Label
                htmlFor="video-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FileVideo className="h-4 w-4 mr-2" />
                Sélectionner un fichier
              </Label>
              <p className="text-xs text-gray-400 mt-2">
                Formats supportés: MP4, WebM, MOV, AVI, MKV (max 500MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileVideo className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {previewUrl && (
                <div className="relative">
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Upload en cours...</span>
                    <span>{uploadProgress.percentage}%</span>
                  </div>
                  <Progress value={uploadProgress.percentage} className="w-full" />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {formatUploadSpeed(uploadProgress.speed)}
                    </span>
                    <span>
                      {Math.round(uploadProgress.loaded / (1024 * 1024))} MB / {Math.round(uploadProgress.total / (1024 * 1024))} MB
                    </span>
                  </div>
                </div>
              )}

              {!uploading && selectedFile && (
                <Button onClick={handleUpload} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Uploader la vidéo
                </Button>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sélection de thumbnail */}
      {thumbnails.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Sélectionner une miniature
            </CardTitle>
            <CardDescription>
              Choisissez la miniature qui représentera votre vidéo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {thumbnails.map((thumbnail, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedThumbnail === thumbnail
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleThumbnailSelect(thumbnail)}
                >
                  <img
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                  {selectedThumbnail === thumbnail && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
