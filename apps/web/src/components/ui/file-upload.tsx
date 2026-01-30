"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from 'next-auth/react';
import { Upload, X, FileImage, Loader2, AlertCircle } from "lucide-react";

interface FileUploadProps {
  onUploadSuccess?: (fileUrl: string, fileData: any) => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  currentFileUrl?: string;
  onRemove?: () => void;
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  accept = "image/*",
  maxSize = 5,
  label = "Télécharger une image",
  currentFileUrl,
  onRemove
}: FileUploadProps) {
  const { data: session, status } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAuthenticated = status === 'authenticated' && !!session;
  const user = session?.user as any;
  const isAdmin = isAuthenticated && user?.roles?.includes('ADMIN');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        onUploadError?.(`Le fichier est trop volumineux. Taille maximale: ${maxSize}MB`);
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        onUploadError?.('Seules les images sont autorisées');
        return;
      }

      await uploadFile(file);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la sélection du fichier';
      onUploadError?.(errorMessage);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Vérifier l'authentification avant de commencer l'upload
      if (!isAuthenticated) {
        throw new Error('Vous devez être connecté pour télécharger des fichiers. Veuillez vous connecter en tant qu\'administrateur.');
      }

      if (!isAdmin) {
        throw new Error('Accès refusé. Seuls les administrateurs peuvent télécharger des fichiers.');
      }

      const formData = new FormData();
      formData.append('file', file);

      // Récupérer le token d'accès depuis la session
      const accessToken = (session as any)?.accessToken;
      if (!accessToken) {
        throw new Error('Token d\'accès non disponible. Veuillez vous reconnecter.');
      }

      // Envoyer avec le token JWT pour l'authentification Fastify
      const response = await fetch('/api/v1/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        
        if (response.status === 401) {
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        } else if (response.status === 403) {
          throw new Error('Accès refusé. Seuls les administrateurs peuvent télécharger des fichiers.');
        } else {
          throw new Error(errorData.error || 'Erreur lors du téléchargement du fichier');
        }
      }

      const result = await response.json();

      if (result.success) {
        onUploadSuccess?.(result.url, result);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du téléchargement du fichier';
      console.error('Upload error:', errorMessage);
      onUploadError?.(errorMessage);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    onRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {!isAuthenticated ? (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <p className="text-sm text-yellow-800">
            Vous devez être connecté en tant qu'administrateur pour télécharger des fichiers.
          </p>
        </div>
      ) : currentFileUrl ? (
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex-shrink-0">
            <FileImage className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentFileUrl.split('/').pop()}
            </p>
            <p className="text-xs text-gray-500">Fichier téléchargé</p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                // Construire l'URL complète pour l'image
                const imageUrl = currentFileUrl.startsWith('http') 
                  ? currentFileUrl 
                  : `${typeof window !== 'undefined' ? window.location.origin : ''}${currentFileUrl}`;
                window.open(imageUrl, '_blank');
              }}
            >
              Voir
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={triggerFileSelect}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {isUploading ? 'Téléchargement...' : 'Choisir un fichier'}
            </Button>

            <div className="text-sm text-gray-500">
              Formats acceptés: JPG, PNG, GIF, WebP • Max: {maxSize}MB
            </div>
          </div>

          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}