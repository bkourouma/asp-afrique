"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from 'next-auth/react';
import { Upload, X, FileImage, Loader2, AlertCircle } from "lucide-react";
import { API_URL } from '@/lib/api-client';

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session && (session as any)?.accessToken) {
        setIsAuthenticated(true);
        // Vérifier si l'utilisateur a le rôle admin
        // Note: Cette vérification devrait idéalement être faite côté serveur
        setIsAdmin(true); // Pour l'instant, on assume que si connecté, c'est un admin
      }
    };
    checkAuth();
  }, []);

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
      const formData = new FormData();
      formData.append('file', file);

      const session = await getSession();
      const token = (session as any)?.accessToken;

      if (!token) {
        throw new Error('Vous devez être connecté pour télécharger des fichiers. Veuillez vous connecter en tant qu\'administrateur.');
      }

      const response = await fetch(`${API_URL}/api/v1/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
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
              onClick={() => window.open(`${API_URL}${currentFileUrl}`, '_blank')}
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