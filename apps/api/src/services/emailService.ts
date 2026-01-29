import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  requireTLS?: boolean
  auth: {
    user: string
    pass: string
  }
}

interface ContactEmailData {
  consultingService?: string
  name: string
  email: string
  phone?: string
  message: string
}

class EmailService {
  private transporter: Transporter

  constructor() {
    const config: EmailConfig = {
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // Use TLS instead of SSL
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER || 'formations@allianceconsultants.net',
        pass: process.env.SMTP_PASS || 'Formation@225'
      }
    }

    this.transporter = nodemailer.createTransport(config)
  }

  async sendContactEmail(data: ContactEmailData): Promise<void> {
    const { consultingService, name, email, phone, message } = data
    
    // Email destinataires par défaut
    const recipients = [
      'stanislasyao92@gmail.com',
      'bahjulgues@gmail.com',
      'info@imhotepacademy.ci'
    ]

    const mailOptions = {
      from: process.env.SMTP_FROM || 'formations@allianceconsultants.net',
      to: recipients.join(', '),
      subject: `Nouveau message de contact - ${name}`,
      html: this.generateContactEmailHTML(data),
      replyTo: email
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log('✅ Email envoyé avec succès')
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error)
      throw new Error('Erreur lors de l\'envoi de l\'email')
    }
  }

  private generateContactEmailHTML(data: ContactEmailData): string {
    const { consultingService, name, email, phone, message } = data
    
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau message de contact</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #FF6B35, #E55A2B);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            margin: -30px -30px 30px -30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .info-section {
            margin-bottom: 25px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #FF6B35;
          }
          .info-section h3 {
            margin: 0 0 10px 0;
            color: #FF6B35;
            font-size: 18px;
          }
          .info-item {
            margin-bottom: 8px;
          }
          .info-label {
            font-weight: bold;
            color: #555;
          }
          .message-section {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-top: 20px;
          }
          .message-section h3 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 18px;
          }
          .message-content {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            white-space: pre-wrap;
            font-style: italic;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .timestamp {
            color: #999;
            font-size: 12px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nouveau message de contact</h1>
          </div>
          
          <div class="info-section">
            <h3>👤 Informations du contact</h3>
            ${consultingService ? `
            <div class="info-item">
              <span class="info-label">Service de consulting :</span> ${consultingService}
            </div>
            ` : ''}
            <div class="info-item">
              <span class="info-label">Nom :</span> ${name}
            </div>
            <div class="info-item">
              <span class="info-label">Email :</span> 
              <a href="mailto:${email}" style="color: #FF6B35; text-decoration: none;">${email}</a>
            </div>
            ${phone ? `
            <div class="info-item">
              <span class="info-label">Téléphone :</span> 
              <a href="tel:${phone}" style="color: #FF6B35; text-decoration: none;">${phone}</a>
            </div>
            ` : ''}
          </div>

          <div class="message-section">
            <h3>💬 Message</h3>
            <div class="message-content">${message}</div>
          </div>

          <div class="footer">
            <p>Ce message a été envoyé depuis le formulaire de contact du site web.</p>
            <div class="timestamp">
              Envoyé le ${new Date().toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      console.log('✅ Connexion SMTP vérifiée avec succès')
      return true
    } catch (error) {
      console.error('❌ Erreur de connexion SMTP:', error)
      return false
    }
  }
}

export default new EmailService()
