# Instructions pour publier sur GitHub

## ✅ Étape 1 : Créer un dépôt sur GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite, puis sélectionnez **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `asp-afrique` (ou le nom de votre choix)
   - **Description** : `Application web complète pour l'Académie de la Sécurité Professionnelle de Côte d'Ivoire`
   - **Visibilité** : Choisissez Public ou Private selon vos préférences
   - **⚠️ NE COCHEZ PAS** "Add a README file", "Add .gitignore", ou "Choose a license" (le projet a déjà ces fichiers)
4. Cliquez sur **"Create repository"**

## ✅ Étape 2 : Connecter votre dépôt local à GitHub

Après avoir créé le dépôt, GitHub vous affichera des instructions. Utilisez la section **"push an existing repository from the command line"**.

Exécutez ces commandes dans PowerShell (remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub) :

```powershell
cd C:\APPLICATIONS\asp-afrique-main

# Ajouter le dépôt distant GitHub
git remote add origin https://github.com/VOTRE_USERNAME/asp-afrique.git

# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser le code vers GitHub
git push -u origin main
```

**Note** : Si vous utilisez l'authentification par token (recommandé) :
- GitHub vous demandera votre nom d'utilisateur et un **Personal Access Token** (PAT)
- Pour créer un PAT : GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
- Donnez-lui les permissions `repo`

## ✅ Étape 3 : Vérification

Une fois le push terminé, allez sur votre dépôt GitHub. Vous devriez voir tous vos fichiers.

## 🔐 Authentification GitHub

Si vous rencontrez des problèmes d'authentification :

### Option 1 : Personal Access Token (Recommandé)
1. Créez un token sur GitHub : Settings → Developer settings → Personal access tokens
2. Utilisez le token comme mot de passe lors du `git push`

### Option 2 : GitHub CLI
```powershell
# Installer GitHub CLI
winget install GitHub.cli

# Se connecter
gh auth login

# Pousser le code
git push -u origin main
```

### Option 3 : SSH (Pour usage fréquent)
1. Générez une clé SSH : `ssh-keygen -t ed25519 -C "votre_email@example.com"`
2. Ajoutez la clé publique à GitHub : Settings → SSH and GPG keys
3. Changez l'URL du remote : `git remote set-url origin git@github.com:VOTRE_USERNAME/asp-afrique.git`

## 📝 Commandes utiles

```powershell
# Vérifier le statut
git status

# Voir les remotes configurés
git remote -v

# Changer l'URL du remote (si nécessaire)
git remote set-url origin https://github.com/VOTRE_USERNAME/asp-afrique.git

# Pousser les changements futurs
git add .
git commit -m "Description des changements"
git push
```

## ✨ C'est fait !

Votre projet est maintenant sur GitHub et vous pouvez :
- Partager le lien avec d'autres développeurs
- Collaborer sur le projet
- Utiliser les fonctionnalités GitHub (Issues, Pull Requests, etc.)
- Configurer CI/CD si nécessaire

