<div align="center">

# 🍃 Vibe Panel

### *Ton espace de contrôle personnel — moderne, rapide, intuitif.*

<br/>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Discord.js-14-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
</p>

<br/>

> **Vibe Panel** est un dashboard personnel ultra-moderne, pensé pour centraliser tous tes services en un seul endroit. Contrôle ta musique Spotify, gère ton bot Discord, monitore ton serveur ZimaOS, et bien plus encore.

</div>

---

## 🚀 Présentation de Vibe Panel

Vibe Panel est bien plus qu'un simple dashboard — c'est ton centre de commande personnel. Conçu avec une architecture moderne et une interface élégante en Glassmorphism/Néon, il combine puissance et esthétique.

**Pourquoi Vibe Panel ?**
- Interface moderne avec effets visuels néon et glassmorphism
- Animation de démarrage fluide avec logo SVG animé
- Intégration complète de tes services favoris
- Architecture modulaire et extensible
- 100% open-source et personnalisable

---

## 🔐 Accès par défaut

| Champ | Valeur |
|-------|--------|
| 👤 Utilisateur | `Mat` |
| 🔑 Mot de passe | `211008` |
| 🛡️ Rôle | `admin` |

> Les comptes se gèrent directement depuis le module **Paramètres** — ajout, suppression, changement de mot de passe.

---

## ✨ Fonctionnalités

### 🎵 Widget Spotify
Affiche en temps réel la musique que tu écoutes. Contrôle ta lecture directement depuis le panel.

| Fonctionnalité | Description |
|----------------|-------------|
| 🎧 Lecture en cours | Affiche le titre, l'artiste et la pochette |
| ⏯️ Contrôles | Play, Pause, Suivant, Précédent |
| 🔗 Intégration API | Connexion via OAuth Spotify |

### 💬 Widget Discord
Envoie des messages directement depuis le panel via Webhook Discord. Le bot Discord inclus offre des commandes personnalisées.

| Fonctionnalité | Description |
|----------------|-------------|
| 📤 Envoi de messages | Webhook Discord intégré |
| 🤖 Bot Discord | Système de commandes complet |
| 📊 Statistiques | Nombre de serveurs, statut du bot |

### 🖥️ Widget ZimaOS
Monitore ton serveur ZimaOS en temps réel avec des graphiques dynamiques.

| Métrique | Description |
|----------|-------------|
| 📈 CPU | Utilisation du processeur en temps réel |
| 💾 RAM | Mémoire vive utilisée/disponible |
| 💿 Stockage | Espace disque utilisé/total |
| 🌐 Réseau | Statistiques réseau |

### 🛠️ Widgets Utilitaires

- **⏰ Horloge Dynamique** : Heure locale avec fuseaux horaires multiples
- **📝 Bloc-notes Rapide** : Prise de notes instantanée avec sauvegarde auto
- **🔗 Liens Rapides** : Accès direct à tes services favoris
- **📰 Flux d'Actualités** : Dernières news en temps réel
- **✅ Liste de Tâches** : Gestionnaire de tâches intégré
- **🌐 Moniteur Réseau** : Ping, vitesse de téléchargement/upload

---

## ⚙️ Prérequis

Avant de commencer, assure-toi d'avoir installé :

| Outil | Version Minimum | Installation |
|-------|-----------------|--------------|
| **Node.js** | v18.0.0 | [Télécharger](https://nodejs.org) |
| **npm** | v9.0.0 | Inclus avec Node.js |
| **Git** | Latest | [Télécharger](https://git-scm.com) |

### Configuration Réseau

- **IP ZimaOS** : `192.168.1.25` (modifiable dans les paramètres)
- **Port du Panel** : `5000` (par défaut)

### Comptes Requis (Optionnels)

- Compte Spotify Developer pour l'intégration musicale
- Application Discord pour le bot
- Webhook Discord pour l'envoi de messages

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Navigateur                     │
│   React 19 · TypeScript · Tailwind v4 · Vite 6  │
│   Framer Motion · Lucide Icons · HMR             │
└─────────────────────┬───────────────────────────┘
                      │  HTTP / REST API
┌─────────────────────▼───────────────────────────┐
│              Express.js + tsx                    │
│  /api/lumy    /api/spotify   /api/zimaos         │
│  /api/users   /api/config    /api/discord        │
│  /api/weather /api/news      /api/network        │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│              lumina_db.json                      │
│   Utilisateurs · Config · Mémoire Lumy           │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Stack technique

| Couche | Technologies |
|--------|-------------|
| **Frontend** | React 19 + TypeScript + Vite 6 + Tailwind CSS v4 |
| **Backend** | Express.js 4 + tsx (Node.js) — serveur unifié |
| **Animations** | Framer Motion (motion/react) |
| **Icônes** | Lucide React |
| **Stockage** | `lumina_db.json` — léger, local, portable |
| **IA (Lumy)** | Moteur local — 0 API externe |

---

## 🛠️ Installation & Lancement

### 1️⃣ Cloner le Projet

```bash
git clone https://github.com/boudardmathieu-sudo/Test.git
cd Test
```

### 2️⃣ Installer les Dépendances

```bash
npm install
```

### 3️⃣ Configuration de l'Environnement

Copie le fichier `.env.example` vers `.env` et remplis les variables :

```env
# Spotify (Optionnel)
SPOTIFY_CLIENT_ID=ton_client_id_spotify
SPOTIFY_CLIENT_SECRET=ton_client_secret_spotify
SPOTIFY_REDIRECT_URI=http://localhost:5000/api/spotify/callback

# Google Home (Optionnel)
VITE_GOOGLE_CLIENT_ID=ton_google_client_id

# Discord Bot
DISCORD_BOT_TOKEN=ton_token_discord
DISCORD_WEBHOOK_URL=ton_webhook_url
```

### 4️⃣ Lancer le Panel

```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

Le panel sera accessible sur **[http://localhost:5000](http://localhost:5000)**

---

## 🤖 Configuration du Bot Discord

### Création de l'Application Discord

1. Visite le [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique sur **"New Application"**
3. Donne un nom à ton bot (ex: "Vibe Bot")
4. Va dans l'onglet **"Bot"** et clique sur **"Add Bot"**
5. Active les **Privileged Gateway Intents** :
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent
6. Copie le **Token** et ajoute-le dans `.env`

### Invitation du Bot

Génère le lien d'invitation avec les permissions requises :

```
https://discord.com/api/oauth2/authorize?client_id=TON_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

Remplace `TON_CLIENT_ID` par l'ID de ton application.

### Lancement du Bot

Le bot se lance automatiquement avec le panel, mais tu peux aussi le lancer séparément :

```bash
node bot.js
```

### Commandes Disponibles

| Commande | Description | Exemple |
|----------|-------------|---------|
| `/ping` | Vérifie la latence du bot | `/ping` |
| `/status` | Affiche les statistiques | `/status` |
| `/help` | Liste toutes les commandes | `/help` |
| `/panel` | Affiche le lien du panel | `/panel` |

---

## 📁 Structure du Projet

```
vibe-panel/
├── 📄 server.ts              # Serveur Express + Vite unifié
├── 📄 bot.js                 # Bot Discord complet
├── 📄 lumina_db.json         # Base de données locale
├── 📄 vite.config.ts         # Configuration Vite
├── src/
│   ├── 📄 App.tsx            # Composant principal
│   ├── 📄 main.tsx           # Point d'entrée React
│   ├── 📄 index.css          # Styles globaux
│   └── components/
│       ├── 📄 BootScreen.tsx      # Animation de démarrage
│       ├── 📄 LoginScreen.tsx     # Écran de connexion
│       ├── 📄 Dashboard.tsx       # Dashboard principal
│       ├── ui/
│       │   ├── 📄 GlassCard.tsx   # Composant carte glassmorphism
│       │   ├── 📄 NeonLeaf.tsx    # Logo feuille néon
│       │   └── 📄 PetalBg.tsx     # Fond animé
│       └── widgets/               # Tous les widgets
│           ├── SpotifyWidget.tsx
│           ├── DiscordWidget.tsx
│           ├── ZimaOSWidget.tsx
│           └── ...
└── package.json
```

---

## 🎨 Personnalisation

### Thème et Couleurs

Modifie les couleurs dans `src/index.css` :

```css
:root {
  --neon-green: #00ff88;
  --neon-blue: #00d4ff;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

### Widgets Personnalisés

Crée un nouveau widget dans `src/components/widgets/` :

```typescript
import { GlassCard } from '../ui/GlassCard';

export const MonWidget = () => {
  return (
    <GlassCard>
      {/* Ton contenu ici */}
    </GlassCard>
  );
};
```

---

## 🐛 Dépannage

### Le panel ne démarre pas

```bash
# Nettoie le cache et réinstalle
rm -rf node_modules package-lock.json
npm install
```

### Le bot Discord ne se connecte pas

- Vérifie que le token est correct dans `.env`
- Assure-toi que les intents sont activés
- Vérifie les logs avec `node bot.js`

### ZimaOS injoignable

- Vérifie que l'IP `192.168.1.25` est correcte
- Assure-toi d'être sur le même réseau
- Teste la connexion : `ping 192.168.1.25`

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit tes changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🌟 Remerciements

- **React Team** pour le framework
- **Discord.js** pour la bibliothèque Discord
- **Spotify** pour l'API musicale
- **Communauté Open Source** pour l'inspiration

---

<div align="center">

**🍃 Conçu avec passion. Fait pour durer. 🍃**

*Vibe Panel — v2.1.0-neon*

<br/>

[⬆ Retour en haut](#-vibe-panel)

</div>
