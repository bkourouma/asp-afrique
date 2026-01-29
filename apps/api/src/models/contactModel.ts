// Interface pour les données de contact
export interface ContactFormData {
  consultingService?: string
  name: string
  email: string
  phone?: string
  message: string
}

// Interface pour les erreurs de validation
export interface ValidationError {
  field: string
  message: string
}

// Fonctions de validation
export const validateContactForm = (data: Partial<ContactFormData>): { success: boolean; errors?: ValidationError[] } => {
  const errors: ValidationError[] = []

  // Validation du nom
  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Le nom doit contenir au moins 2 caractères' })
  } else if (data.name.length > 100) {
    errors.push({ field: 'name', message: 'Le nom ne peut pas dépasser 100 caractères' })
  } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(data.name)) {
    errors.push({ field: 'name', message: 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets' })
  }

  // Validation de l'email
  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'L\'email est requis' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: 'email', message: 'Format d\'email invalide' })
  } else if (data.email.length > 255) {
    errors.push({ field: 'email', message: 'L\'email ne peut pas dépasser 255 caractères' })
  }

  // Validation du téléphone (optionnel) - plus flexible
  if (data.phone && data.phone.trim().length > 0) {
    const cleanPhone = data.phone.replace(/\s/g, '')
    const phoneRegex = /^(\+225|0)[0-9]{8,12}$/
    if (!phoneRegex.test(cleanPhone)) {
      errors.push({ field: 'phone', message: 'Format de téléphone invalide (ex: +225 XX XX XX ou 0X XX XX XX)' })
    }
  }

  // Validation du message
  if (!data.message || data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Le message doit contenir au moins 10 caractères' })
  } else if (data.message.length > 1000) {
    errors.push({ field: 'message', message: 'Le message ne peut pas dépasser 1000 caractères' })
  }

  return {
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  }
}

// Interface pour la réponse de l'API
export interface ContactApiResponse {
  success: boolean
  message: string
  data?: {
    id: string
    name: string
    email: string
    phone?: string | null
    message: string
    isRead: boolean
    createdAt: string
  }
  errors?: Record<string, string[]>
}

// Classe pour gérer les données de contact
export class ContactModel {
  private data: ContactFormData

  constructor(data: Partial<ContactFormData>) {
    this.data = data as ContactFormData
  }

  // Valider les données
  validate(): { success: boolean; errors?: ValidationError[] } {
    return validateContactForm(this.data)
  }

  // Nettoyer les données
  sanitize(): ContactFormData {
    return {
      consultingService: this.data.consultingService?.trim() || undefined,
      name: this.data.name?.trim() || '',
      email: this.data.email?.trim().toLowerCase() || '',
      phone: this.data.phone?.trim().replace(/\s/g, '') || undefined,
      message: this.data.message?.trim() || ''
    }
  }

  // Obtenir les données validées et nettoyées
  getValidatedData(): { success: boolean; data?: ContactFormData; errors?: ValidationError[] } {
    const sanitized = this.sanitize()
    const validation = this.validate()
    
    if (validation.success) {
      return { success: true, data: sanitized }
    } else {
      return { success: false, errors: validation.errors }
    }
  }

  // Formater pour l'affichage
  formatForDisplay(): string {
    return `
Nom: ${this.data.name}
Email: ${this.data.email}
${this.data.phone ? `Téléphone: ${this.data.phone}` : ''}
Message: ${this.data.message}
    `.trim()
  }

  // Formater pour l'email
  formatForEmail(): string {
    return `
Nouveau message de contact reçu:

${this.data.consultingService ? `Service de consulting: ${this.data.consultingService}` : ''}
Nom: ${this.data.name}
Email: ${this.data.email}
${this.data.phone ? `Téléphone: ${this.data.phone}` : ''}

Message:
${this.data.message}

---
Envoyé le ${new Date().toLocaleString('fr-FR')}
    `.trim()
  }
}

// Fonction utilitaire pour créer une instance du modèle
export function createContactModel(data: Partial<ContactFormData>): ContactModel {
  return new ContactModel(data)
}

// Fonction utilitaire pour valider rapidement
export function validateContactData(data: Partial<ContactFormData>): { success: boolean; errors?: ValidationError[] } {
  const model = createContactModel(data)
  return model.validate()
}