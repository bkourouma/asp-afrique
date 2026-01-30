import { VideoType, VideoLevel, VideoStatus } from '@/types/video'

/**
 * Génère un slug à partir du titre
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .trim()
}

/**
 * Extrait l'ID YouTube d'une URL
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

/**
 * Valide une URL YouTube
 */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null
}

/**
 * Génère l'URL d'embed YouTube
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`
}

/**
 * Génère l'URL de thumbnail YouTube
 * Note: mqdefault (medium) est plus fiable que highdefault car disponible pour toutes les vidéos
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'medium'): string {
  const qualityMap: Record<string, string> = {
    'default': 'default',
    'medium': 'mqdefault',
    'high': 'hqdefault',
    'standard': 'sddefault',
    'maxres': 'maxresdefault'
  }
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`
}

/**
 * Convertit une durée en secondes en format MM:SS ou HH:MM:SS
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Convertit une durée formatée en secondes
 */
export function parseDuration(duration: string): number {
  const parts = duration.split(':').map(Number)
  
  if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  
  return 0
}

/**
 * Valide un fichier vidéo
 */
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska']
  const maxSize = 500 * 1024 * 1024 // 500MB
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Format de fichier non supporté. Formats acceptés : MP4, WebM, MOV, AVI, MKV'
    }
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Fichier trop volumineux. Taille maximum : 500MB'
    }
  }
  
  return { valid: true }
}

/**
 * Génère un nom de fichier unique
 */
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
  const slug = generateSlug(nameWithoutExt)
  
  return `${slug}-${timestamp}-${random}.${extension}`
}

/**
 * Calcule la vitesse d'upload
 */
export function calculateUploadSpeed(loaded: number, total: number, startTime: number): number {
  const elapsed = (Date.now() - startTime) / 1000 // en secondes
  return loaded / elapsed // bytes par seconde
}

/**
 * Formate la vitesse d'upload
 */
export function formatUploadSpeed(bytesPerSecond: number): string {
  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s']
  let size = bytesPerSecond
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

/**
 * Génère des thumbnails à partir d'une vidéo
 */
export function generateVideoThumbnails(video: HTMLVideoElement, count = 5): Promise<string[]> {
  return new Promise((resolve) => {
    const thumbnails: string[] = []
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      resolve([])
      return
    }
    
    canvas.width = 320
    canvas.height = 180
    
    let currentTime = 0
    const duration = video.duration
    const interval = duration / count
    
    const captureFrame = () => {
      if (currentTime >= duration || thumbnails.length >= count) {
        resolve(thumbnails)
        return
      }
      
      video.currentTime = currentTime
      
      video.addEventListener('seeked', () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8)
        thumbnails.push(thumbnail)
        currentTime += interval
        captureFrame()
      }, { once: true })
    }
    
    captureFrame()
  })
}

/**
 * Obtient les métadonnées d'une vidéo
 */
export function getVideoMetadata(file: File): Promise<{ duration: number; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const url = URL.createObjectURL(file)
    
    video.addEventListener('loadedmetadata', () => {
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight
      })
      URL.revokeObjectURL(url)
    })
    
    video.addEventListener('error', () => {
      reject(new Error('Impossible de lire les métadonnées de la vidéo'))
      URL.revokeObjectURL(url)
    })
    
    video.src = url
  })
}

/**
 * Filtre les vidéos par critères
 */
export function filterVideos(videos: any[], filters: {
  category?: string
  status?: VideoStatus
  type?: VideoType
  level?: VideoLevel
  search?: string
}): any[] {
  return videos.filter(video => {
    if (filters.category && video.category !== filters.category) return false
    if (filters.status && video.status !== filters.status) return false
    if (filters.type && video.type !== filters.type) return false
    if (filters.level && video.level !== filters.level) return false
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        video.title.toLowerCase().includes(searchLower) ||
        video.description?.toLowerCase().includes(searchLower) ||
        video.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      )
    }
    return true
  })
}

/**
 * Trie les vidéos
 */
export function sortVideos(videos: any[], sortBy: string, sortOrder: 'asc' | 'desc' = 'desc'): any[] {
  return [...videos].sort((a, b) => {
    let aValue: any
    let bValue: any
    
    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case 'views':
        aValue = a.views || 0
        bValue = b.views || 0
        break
      case 'publishedAt':
        aValue = new Date(a.publishedAt || a.createdAt).getTime()
        bValue = new Date(b.publishedAt || b.createdAt).getTime()
        break
      case 'createdAt':
      default:
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
        break
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}
