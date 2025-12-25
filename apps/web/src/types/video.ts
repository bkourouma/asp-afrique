export enum VideoType {
  YOUTUBE = 'YOUTUBE',
  UPLOAD = 'UPLOAD',
  EXTERNAL = 'EXTERNAL'
}

export enum VideoLevel {
  DEBUTANT = 'DEBUTANT',
  INTERMEDIAIRE = 'INTERMEDIAIRE',
  AVANCE = 'AVANCE'
}

export enum VideoStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

export interface Video {
  id: string
  title: string
  slug: string
  description?: string
  type: VideoType
  videoUrl?: string
  videoId?: string
  videoFile?: string
  thumbnail?: string
  duration?: string
  durationSeconds?: number
  category?: string
  tags: string[]
  author?: string
  status: VideoStatus
  level?: VideoLevel
  views: number
  subtitles?: string
  resources?: any
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateVideoData {
  title: string
  description?: string
  type: VideoType
  videoUrl?: string
  videoId?: string
  videoFile?: string
  thumbnail?: string
  duration?: string
  durationSeconds?: number
  category?: string
  tags: string[]
  author?: string
  status?: VideoStatus
  subtitles?: string
  resources?: any
}

export interface UpdateVideoData extends Partial<CreateVideoData> {
  id: string
}

export interface VideoFilters {
  category?: string
  status?: VideoStatus
  type?: VideoType
  search?: string
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'title' | 'views' | 'publishedAt'
  sortOrder?: 'asc' | 'desc'
}

export interface VideoListResponse {
  videos: Video[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface YouTubeVideoInfo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  durationSeconds: number
  author?: string
}

export interface VideoUploadProgress {
  loaded: number
  total: number
  percentage: number
  speed: number
}

export interface VideoThumbnail {
  url: string
  width: number
  height: number
  time: number // Timestamp en secondes
}

export const VIDEO_CATEGORIES = [
  'Tutoriels & Formations',
  'Cybersécurité',
  'Cloud Computing',
  'Intelligence Artificielle',
  'Réseaux & Infrastructure',
  'Développement Web',
  'Applications Mobiles',
  'Bases de Données',
  'Linux & Open Source',
  'Conférences & Webinaires',
  'DevOps & CI/CD',
  'Data Science & Analytics',
  'Démonstrations Produits',
  'Interviews Experts'
] as const

export const VIDEO_TAGS = [
  'cybersécurité',
  'IA',
  'réseau',
  'cloud',
  'devops',
  'programmation',
  'base de données',
  'linux',
  'docker',
  'kubernetes',
  'react',
  'nodejs',
  'python',
  'javascript',
  'typescript',
  'vue',
  'angular',
  'php',
  'java',
  'c#',
  'aws',
  'azure',
  'gcp',
  'terraform',
  'ansible',
  'jenkins',
  'git',
  'api',
  'microservices',
  'blockchain',
  'machine learning',
  'data science',
  'analytics',
  'mobile',
  'web',
  'frontend',
  'backend',
  'fullstack'
] as const
