# Configuration de l'API d'envoi d'emails

## 📧 Fonctionnalités implémentées

- ✅ Service d'envoi d'emails avec Nodemailer
- ✅ Modèle de validation personnalisé pour les données de contact
- ✅ Template HTML professionnel pour les emails
- ✅ Validation côté serveur des données
- ✅ Gestion d'erreurs robuste
- ✅ Route de test pour vérifier la connexion SMTP

## 🔧 Configuration requise

### 1. Variables d'environnement

Créez un fichier `.env` dans le dossier `apps/api/` avec les variables suivantes :

```env
# Configuration SMTP pour l'envoi d'emails
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=formations@allianceconsultants.net
SMTP_PASS=Formation@225
SMTP_FROM=formations@allianceconsultants.net

# Configuration API
API_PORT=3002
API_HOST=0.0.0.0
CORS_ORIGIN=http://localhost:3001

# Configuration JWT
NEXTAUTH_SECRET=your-secret-key-change-in-production

# Configuration Base de données
DATABASE_URL=postgresql://username:password@localhost:5432/aspci_web
```

### 2. Installation des dépendances

```bash
# Dans le dossier apps/api/
npm install nodemailer @types/nodemailer
```

## 🚀 Utilisation

### API Endpoints

#### 1. Test de connexion SMTP
```http
GET /api/v1/contact/test-email
```

#### 2. Envoi de message de contact
```http
POST /api/v1/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+225 07 59 81 48 64",
  "message": "Votre message ici..."
}
```

### Réponse de l'API

#### Succès (201)
```json
{
  "success": true,
  "message": "Message envoyé avec succès",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+225 07 59 81 48 64",
    "message": "Votre message ici...",
    "isRead": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Erreur de validation (400)
```json
{
  "success": false,
  "message": "Données de contact invalides",
  "errors": {
    "name": ["Le nom doit contenir au moins 2 caractères"],
    "email": ["Format d'email invalide"]
  }
}
```

## 🧪 Tests

### Script de test automatique

Exécutez le script de test pour vérifier le fonctionnement :

```bash
node test-email-api.js
```

Ce script teste :
- ✅ Connexion SMTP
- ✅ Validation des données
- ✅ Envoi de message

### Test manuel

1. **Test de connexion SMTP :**
   ```bash
   curl http://localhost:3002/api/v1/contact/test-email
   ```

2. **Test d'envoi de message :**
   ```bash
   curl -X POST http://localhost:3002/api/v1/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "phone": "+225 07 59 81 48 64",
       "message": "Message de test"
     }'
   ```

## 📁 Structure des fichiers

```
apps/api/src/
├── services/
│   └── emailService.ts          # Service d'envoi d'emails
├── models/
│   └── contactModel.ts          # Modèle de validation
├── routes/
│   └── contact.ts               # Routes API (modifiée)
└── index.ts                     # Point d'entrée (modifié)
```

## 🎨 Template d'email

Le service génère automatiquement un email HTML professionnel avec :
- ✅ Design responsive
- ✅ Informations du contact
- ✅ Message formaté
- ✅ Timestamp
- ✅ Branding de l'entreprise

## 📧 Destinataires par défaut

Les emails sont envoyés automatiquement à :
- devaccrocs@gmail.com
- mickael.andjui.21@gmail.com

## 🔒 Sécurité

- ✅ Validation stricte des données
- ✅ Sanitisation des entrées
- ✅ Gestion d'erreurs sécurisée
- ✅ Pas d'exposition des identifiants SMTP

## 🐛 Dépannage

### Problèmes courants

1. **Erreur de connexion SMTP :**
   - Vérifiez les identifiants dans `.env`
   - Vérifiez que le port 465 est ouvert
   - Testez avec `curl` ou le script de test

2. **Email non reçu :**
   - Vérifiez les dossiers spam
   - Vérifiez les logs du serveur
   - Testez avec un autre destinataire

3. **Erreur de validation :**
   - Vérifiez le format des données
   - Consultez les messages d'erreur détaillés

### Logs utiles

Les logs du serveur affichent :
- ✅ Connexions SMTP réussies/échouées
- ✅ Emails envoyés avec succès
- ✅ Erreurs détaillées

## 📞 Support

Pour toute question ou problème :
- Vérifiez d'abord les logs du serveur
- Utilisez le script de test pour diagnostiquer
- Consultez la documentation Nodemailer si nécessaire
