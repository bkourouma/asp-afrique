"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiGet } from "@/lib/api-client";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { useAdminCache } from "@/hooks/useAdminCache";
import {
  Users,
  FileText,
  Briefcase,
  Handshake,
  Calendar,
  DollarSign,
  Play,
  Eye
} from "lucide-react";

interface DashboardStats {
  formations: {
    total: number;
    active: number;
  };
  consulting: {
    total: number;
    active: number;
  };
  partners: {
    total: number;
    active: number;
  };
  videos: {
    total: number;
    published: number;
    draft: number;
    totalViews: number;
  };
}

interface RecentFormation {
  id: string;
  title: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentFormations, setRecentFormations] = useState<RecentFormation[]>([]);

  const { fetchWithCache, isLoading } = useAdminCache();

  const fetchDashboardData = useCallback(async () => {
    try {
      const data = await fetchWithCache(
        'dashboard-stats',
        async () => {
          // Fetch stats from multiple endpoints
          const results = await Promise.allSettled([
            apiGet("/api/v1/formations"),
            apiGet("/api/v1/consulting"),
            apiGet("/api/v1/partners"),
            apiGet("/api/v1/videos")
          ]);

          // Extract values safely
          const getResultValue = (result: PromiseSettledResult<any>) => {
            if (result.status === 'fulfilled') {
              return result.value;
            }
            if (result.status === 'rejected') {
              console.warn('API call failed:', result.reason?.message || 'Unknown error');
            }
            return null;
          };

          const [formationsRes, consultingRes, partnersRes, videosRes] = results.map(getResultValue);

          // Ensure we have arrays
          const formations = Array.isArray(formationsRes) ? formationsRes : [];
          const consulting = Array.isArray(consultingRes) ? consultingRes : [];
          const partners = Array.isArray(partnersRes) ? partnersRes : [];
          const videos = (videosRes && typeof videosRes === 'object' && videosRes.videos) ? videosRes.videos : [];

          const stats: DashboardStats = {
            formations: {
              total: formations.length,
              active: formations.filter((f: any) => f.isActive).length
            },
            consulting: {
              total: consulting.length,
              active: consulting.filter((c: any) => c.isActive).length
            },
            partners: {
              total: partners.length,
              active: partners.filter((p: any) => p.isActive).length
            },
            videos: {
              total: videos.length,
              published: videos.filter((v: any) => v.status === 'PUBLISHED').length,
              draft: videos.filter((v: any) => v.status === 'DRAFT').length,
              totalViews: videos.reduce((sum: number, v: any) => sum + (v.views || 0), 0)
            }
          };

          // Get recent formations (last 5)
          const recentForms = formations
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);

          return { stats, recentFormations: recentForms };
        }
      );

      setStats(data.stats);
      setRecentFormations(data.recentFormations);

    } catch (error) {
      console.warn("Failed to fetch dashboard data:", error instanceof Error ? error.message : 'Unknown error');
    }
  }, [fetchWithCache]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <AdminLoading message="Chargement du tableau de bord..." />;
  }

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-base text-gray-600 mt-2">Vue d'ensemble de votre site ASPCI</p>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats?.formations.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.formations.active || 0} actives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Consulting</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats?.consulting.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.consulting.active || 0} actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partenaires</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats?.partners.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.partners.active || 0} actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vidéos</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats?.videos.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.videos.published || 0} publiées, {stats?.videos.draft || 0} brouillons
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              {stats?.videos.totalViews || 0} vues totales
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        {/* Recent Formations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Formations récentes
            </CardTitle>
            <CardDescription>
              Dernières formations ajoutées ou modifiées
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentFormations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune formation</p>
            ) : (
              <div className="space-y-4">
                {recentFormations.map((formation) => (
                  <div key={formation.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">{formation.title}</p>
                        <Badge variant={formation.isActive ? "default" : "secondary"} className="text-xs">
                          {formation.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400">
                        Créé le {new Date(formation.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Accès rapide aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/admin/formations"
              className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">Gérer formations</span>
            </a>
            <a
              href="/admin/consulting"
              className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Briefcase className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Services consulting</span>
            </a>
            <a
              href="/admin/videos"
              className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Play className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Gérer vidéos</span>
            </a>
          </div>
        </CardContent>
      </Card>
      </div>
    </AuthGuard>
  );
}