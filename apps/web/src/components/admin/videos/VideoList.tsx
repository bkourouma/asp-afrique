"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, VideoType, VideoStatus } from "@/types/video";
import { 
  Play, 
  Edit, 
  Trash2, 
  Clock, 
  Calendar,
  User,
  Tag,
  Eye
} from "lucide-react";

interface VideoListProps {
  videos: Video[];
  viewMode: 'grid' | 'list';
  onEdit: (video: Video) => void;
  onDelete: (videoId: string) => void;
  onView: (video: Video) => void;
  getVideoTypeIcon: (type: VideoType) => React.ReactNode;
  getStatusBadge: (status: VideoStatus) => React.ReactNode;
}

export function VideoList({
  videos,
  viewMode,
  onEdit,
  onDelete,
  onView,
  getVideoTypeIcon,
  getStatusBadge
}: VideoListProps) {
  if (videos.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Play className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune vidéo</h3>
          <p className="text-gray-500 text-center max-w-sm">
            Commencez par ajouter votre première vidéo à la bibliothèque.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="group hover:shadow-lg transition-all duration-200">
            <div className="relative">
              {video.thumbnail ? (
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <Play className="h-6 w-6 text-gray-800" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <Play className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
              <div className="absolute top-2 left-2">
                {getVideoTypeIcon(video.type)}
              </div>
              
              <div className="absolute top-2 right-2">
                {getStatusBadge(video.status)}
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </CardTitle>
              <CardDescription className="text-xs text-gray-500 line-clamp-2">
                {video.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration || 'N/A'}
                  </div>
                </div>

                {video.category && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Tag className="h-3 w-3" />
                    {video.category}
                  </div>
                )}

                {video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {video.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{video.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(video.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(video)}
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(video)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(video.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Vue liste
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vidéo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vues
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-12 w-20 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-20 bg-gray-100 rounded flex items-center justify-center">
                          <Play className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {getVideoTypeIcon(video.type)}
                      <span className="text-sm text-gray-900">
                        {video.type === VideoType.YOUTUBE ? 'YouTube' :
                         video.type === VideoType.UPLOAD ? 'Upload' : 'Externe'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-900">
                      {video.category || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <Clock className="h-3 w-3" />
                      {video.duration || 'N/A'}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(video.status)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <Calendar className="h-3 w-3" />
                      {new Date(video.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(video)}
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(video)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(video.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
