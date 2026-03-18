# Démarrage Rapide - Vibe Panel

Guide ultra-rapide pour démarrer avec Vibe Panel en 5 minutes.

---

## Installation Express

```bash
# 1. Cloner le projet
git clone https://github.com/boudardmathieu-sudo/Test.git
cd Test

# 2. Installer les dépendances
npm install

# 3. Copier la configuration
cp .env.example .env

# 4. Lancer le panel
npm run dev
```

Le panel sera accessible sur **[http://localhost:5000](http://localhost:5000)**

---

## Connexion par Défaut

| Champ | Valeur |
|-------|--------|
| Utilisateur | `Mat` |
| Mot de passe | `211008` |
| Rôle | `admin` |

---

## Configuration Minimale

Le panel fonctionne directement sans configuration!

**Optionnel :** Pour activer les fonctionnalités avancées, édite le fichier `.env` :

### Spotify (Musique)

```env
SPOTIFY_CLIENT_ID=ton_client_id
SPOTIFY_CLIENT_SECRET=ton_secret
```

[Créer une app Spotify](https://developer.spotify.com/dashboard)

### Discord Bot

```env
DISCORD_BOT_TOKEN=ton_token
DISCORD_WEBHOOK_URL=ton_webhook_url
```

[Guide complet](./DISCORD_BOT_SETUP.md)

### ZimaOS (Monitoring)

Par défaut : `192.168.1.25`

Modifiable directement dans l'interface du panel.

---

## Lancer le Bot Discord

```bash
# Séparément
npm run bot

# Avec le panel
npm run start:all
```

---

## Widgets Disponibles

### Dashboard Principal
- Horloge mondiale
- Météo en temps réel
- Recherche Google rapide
- Lecteur Spotify
- Notes rapides
- Liste de tâches
- Liens favoris
- Flux d'actualités

### Modules Spécialisés
- **Lumy** : IA personnelle 100% locale
- **Maison** : Contrôle domotique Google Home
- **Serveur** : Monitoring ZimaOS (CPU, RAM, stockage, réseau)
- **Pomodoro** : Timer de productivité
- **Habitudes** : Suivi de routines quotidiennes
- **Calculette** : Calculatrice avancée
- **Outils** : Générateur de mots de passe, Base64, convertisseurs

---

## Architecture

```
Port 5000 : Panel Web (React + Vite)
API REST  : Express.js
Base de données : lumina_db.json (auto-créée)
Bot Discord : bot.js (optionnel)
```

---

## Commandes Utiles

```bash
# Développement
npm run dev          # Lancer le panel
npm run bot          # Lancer le bot Discord
npm run start:all    # Lancer tout ensemble

# Production
npm run build        # Compiler le panel
npm run preview      # Prévisualiser la build

# Maintenance
npm run clean        # Nettoyer le cache
npm run lint         # Vérifier le code
```

---

## Premier Pas Recommandés

1. **Connecter Spotify** : Paramètres > Configuration Spotify > Connecter
2. **Configurer ZimaOS** : Serveur > Lier ZimaOS > Entrer IP
3. **Créer des habitudes** : Habitudes > Nouvelle habitude
4. **Tester Lumy** : Cliquer sur le bouton Lumy (IA locale)
5. **Ajouter un utilisateur** : Paramètres > Gestion des Utilisateurs

---

## Navigation

### Desktop
Sidebar fixe à gauche avec tous les modules

### Mobile
Barre de navigation en bas + Menu plein écran

---

## Dépannage Rapide

### Le panel ne démarre pas

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5000 déjà utilisé

Modifie le port dans `server.ts` :

```javascript
const PORT = 5001; // Ou autre port
```

### Base de données corrompue

Supprime `lumina_db.json`, il sera recréé automatiquement.

---

## Aller Plus Loin

- [README complet](../README.md)
- [Configuration Discord Bot](./DISCORD_BOT_SETUP.md)
- [Personnalisation](../README.md#-personnalisation)

---

**Besoin d'aide ?** Consulte le README ou ouvre une issue sur GitHub.

**Version :** v2.1.0-neon
