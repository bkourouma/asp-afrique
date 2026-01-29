# 🔐 Guide d'Authentification Git pour le VPS

## ⚠️ Problème

GitHub ne supporte plus l'authentification par mot de passe pour les opérations Git. Vous devez utiliser une des méthodes suivantes.

## 🎯 Solutions Disponibles

### Solution 1: Personal Access Token (PAT) - ⭐ Recommandé

C'est la méthode la plus simple et rapide.

#### Étape 1: Créer un Personal Access Token

1. Allez sur https://github.com/settings/tokens
2. Cliquez sur **"Generate new token (classic)"**
3. Donnez un nom au token (ex: "asp-afrique-vps-deployment")
4. Sélectionnez les permissions:
   - ✅ **`repo`** (Full control of private repositories)
     - Cela inclut: repo:status, repo_deployment, public_repo, repo:invite, security_events
5. Cliquez sur **"Generate token"**
6. **⚠️ IMPORTANT:** Copiez le token immédiatement - vous ne le verrez plus jamais!

#### Étape 2: Utiliser le token pour cloner

```bash
# Sur votre VPS
cd /var/www

# Cloner avec le token (remplacez YOUR_TOKEN par le token que vous avez copié)
git clone https://bkourouma:YOUR_TOKEN@github.com/bkourouma/asp-afrique.git asp-afrique

# OU utiliser seulement le token (sans username)
git clone https://YOUR_TOKEN@github.com/bkourouma/asp-afrique.git asp-afrique
```

**Exemple:**
```bash
git clone https://bkourouma:ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/bkourouma/asp-afrique.git asp-afrique
```

#### Étape 3: Configurer Git Credential Helper (Optionnel mais Recommandé)

Pour éviter d'entrer le token à chaque fois:

```bash
# Configurer git credential helper
git config --global credential.helper store

# La première fois, entrez:
# Username: bkourouma
# Password: YOUR_TOKEN
```

---

### Solution 2: SSH Keys - 🔒 Plus Sécurisé

C'est la méthode la plus sécurisée pour un usage à long terme.

#### Étape 1: Générer une clé SSH sur le VPS

```bash
# Générer une nouvelle clé SSH
ssh-keygen -t ed25519 -C "asp-afrique-vps" -f ~/.ssh/id_ed25519_asp

# Si vous voulez un nom différent, utilisez:
# ssh-keygen -t ed25519 -C "asp-afrique-vps"

# Quand demandé, vous pouvez:
# - Entrer un passphrase (recommandé pour la sécurité)
# - OU juste appuyer sur Enter (moins sécurisé mais plus simple)

# Afficher la clé publique
cat ~/.ssh/id_ed25519_asp.pub
```

#### Étape 2: Ajouter la clé SSH à GitHub

1. Copiez tout le contenu de `~/.ssh/id_ed25519_asp.pub`
2. Allez sur https://github.com/settings/keys
3. Cliquez sur **"New SSH key"**
4. Donnez un titre (ex: "VPS asp-afrique")
5. Collez la clé publique dans le champ "Key"
6. Cliquez **"Add SSH key"**

#### Étape 3: Configurer SSH config (Optionnel mais Recommandé)

```bash
# Créer/modifier le fichier SSH config
nano ~/.ssh/config

# Ajoutez ce contenu:
Host github-asp-afrique
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_asp
    IdentitiesOnly yes
```

#### Étape 4: Tester la connexion SSH

```bash
# Tester la connexion SSH
ssh -T git@github.com

# OU avec le config personnalisé:
ssh -T github-asp-afrique

# Vous devriez voir: "Hi bkourouma! You've successfully authenticated..."
```

#### Étape 5: Cloner avec SSH

```bash
# Sur votre VPS
cd /var/www

# Cloner avec SSH
git clone git@github.com:bkourouma/asp-afrique.git asp-afrique

# OU avec le config personnalisé:
git clone git@github-asp-afrique:bkourouma/asp-afrique.git asp-afrique
```

---

### Solution 3: Repository Public

Si votre repository est **public**, vous pouvez le cloner sans authentification:

```bash
# Sur votre VPS
cd /var/www

# Cloner directement (sans authentification)
git clone https://github.com/bkourouma/asp-afrique.git asp-afrique
```

**⚠️ Note:** Si le repository est public, n'importe qui peut le cloner. Assurez-vous que c'est ce que vous voulez.

---

## 🔧 Configuration Git Globale (Recommandé)

Après le clonage réussi, configurez Git pour votre VPS:

```bash
# Configurer votre nom et email Git
git config --global user.name "ASP Afrique VPS"
git config --global user.email "your-email@asp-afrique.com"

# Configurer credential helper pour HTTPS
git config --global credential.helper store

# Vérifier la configuration
git config --global --list
```

---

## 📝 Après le Clonage

Une fois que vous avez cloné avec succès:

```bash
cd /var/www/asp-afrique

# Checkout de la branche correcte
git checkout 004-tech-videotheque-system

# Vérifier la branche actuelle
git branch

# Voir les remotes configurés
git remote -v
```

---

## 🔄 Pour les Mises à Jour Futures

### Avec Personal Access Token (HTTPS)

```bash
cd /var/www/asp-afrique

# Récupérer les dernières modifications
git pull origin 004-tech-videotheque-system
```

Si vous avez configuré le credential helper, le token sera sauvegardé et réutilisé automatiquement.

### Avec SSH

```bash
cd /var/www/asp-afrique

# Récupérer les dernières modifications
git pull origin 004-tech-videotheque-system
```

Avec SSH, aucune authentification supplémentaire n'est nécessaire une fois la clé configurée.

---

## 🆘 Dépannage

### Erreur: "Authentication failed"

**Cause:** Le token est expiré ou invalide, ou la clé SSH n'est pas configurée correctement.

**Solution:**
- Vérifiez que le token est correct (pour PAT)
- Vérifiez que la clé SSH est ajoutée à GitHub (pour SSH)
- Testez la connexion SSH: `ssh -T git@github.com`

### Erreur: "Permission denied (publickey)"

**Cause:** La clé SSH n'est pas configurée ou n'est pas ajoutée à GitHub.

**Solution:**
```bash
# Vérifier que la clé existe
ls -la ~/.ssh/

# Vérifier la connexion SSH
ssh -T git@github.com

# Si ça ne marche pas, vérifiez que la clé est bien ajoutée sur GitHub
```

### Erreur: "Repository not found"

**Cause:** Le repository est privé et vous n'avez pas les permissions, ou l'URL est incorrecte.

**Solution:**
- Vérifiez que vous avez accès au repository
- Vérifiez que l'URL est correcte
- Utilisez un token avec les permissions `repo`

---

## ✅ Recommandations

1. **Pour un déploiement rapide:** Utilisez un Personal Access Token (PAT)
2. **Pour un usage à long terme:** Configurez SSH Keys (plus sécurisé)
3. **Pour un repository public:** Cloner directement sans authentification

**⚠️ Sécurité:**
- Ne partagez JAMAIS votre token ou clé privée
- Utilisez un token avec les permissions minimales nécessaires
- Ajoutez un passphrase à vos clés SSH si possible
- Régénérez les tokens régulièrement

---

**Date:** 2025-01-23  
**Repository:** https://github.com/bkourouma/asp-afrique.git

