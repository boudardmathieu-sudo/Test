<div align="center">

# 🍂 LuminaOS

### *Ton espace de contrôle personnel — sombre, rapide, offline-first.*

<br/>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/IA-100%25%20Locale-f43f5e?style=for-the-badge" />
</p>

<br/>

> **LuminaOS** est un dashboard personnel complet — pensé comme un vrai système d'exploitation personnel. Boot screen, login, modules, IA locale, contrôle domotique, monitoring serveur. Tout ça, en local, sans cloud, sans abonnement.

</div>

---

## 🚀 Démarrage rapide

```bash
# Cloner et installer
npm install

# Lancer le serveur (frontend + backend en un seul processus)
npm run dev
```

> 🌐 Accessible sur **[http://localhost:5000](http://localhost:5000)**

```bash
# Production
npm run build
```

---

## 🔐 Accès par défaut

| Champ | Valeur |
|-------|--------|
| 👤 Utilisateur | `Mat` |
| 🔑 Mot de passe | `211008` |
| 🛡️ Rôle | `admin` |

> Les comptes se gèrent directement depuis le module **Paramètres** — ajout, suppression, changement de mot de passe.

---

## 🧩 Modules

| Module | Icône | Description |
|--------|-------|-------------|
| **Dashboard** | 🏠 | Vue d'ensemble — horloge, météo, Google, actualités, Spotify, notes, todo |
| **Lumy** | 🤖 | IA personnelle 100% locale — zéro API externe, zéro cloud |
| **Maison** | 💡 | Contrôle des appareils Google Home |
| **Serveur** | 🖥️ | Monitoring ZimaOS — CPU, RAM, stockage, uptime, réseau |
| **Pomodoro** | ⏱️ | Timer de concentration avec compteur de sessions |
| **Habitudes** | ✅ | Suivi quotidien, streaks, progression visuelle |
| **Calculette** | 🧮 | Calculatrice rapide intégrée |
| **Outils** | 🔧 | Générateur de mots de passe, encodeur base64, convertisseurs |
| **Paramètres** | ⚙️ | Gestion des comptes, intégration Discord bot, Spotify OAuth |

---

## 🧠 Philosophie

> *"Tes données t'appartiennent."*

LuminaOS est né d'une conviction simple : un dashboard personnel ne devrait jamais dépendre d'un service tiers.

- 🔒 **Aucune donnée** envoyée vers un serveur externe
- 🌐 **Fonctionne hors-ligne** (sauf widgets météo/actualités)
- 🤖 **Lumy tourne en local** — sans clé API, sans abonnement
- 💾 **Stockage JSON local** uniquement — léger, portable, transparent
- ⚡ **Interface rapide** — dark mode natif, conçue pour un usage quotidien
- 📱 **Responsive** — optimisé mobile et desktop

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

## 🌍 Variables d'environnement

Copier `.env.example` vers `.env` et remplir selon les besoins :

```env
# IA Gemini (optionnel — Lumy fonctionne sans)
GEMINI_API_KEY=

# Spotify (pour le widget lecteur)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=http://localhost:5000/api/spotify/callback

# Google Home (pour la domotique)
VITE_GOOGLE_CLIENT_ID=
```

> 💡 **Aucune variable n'est obligatoire** — le dashboard démarre et fonctionne sans elles. Les widgets concernés affichent simplement un message de configuration.

---

## 📱 Navigation

**Desktop** — Sidebar fixe à gauche avec tous les modules.

**Mobile** — Barre de navigation en bas avec accès rapide aux 4 modules principaux (Dashboard, Lumy, Maison, Serveur) + bouton "Plus" pour accéder à tous les modules via le menu plein écran.

---

## 📂 Structure du projet

```
lumina-os/
├── 📄 server.ts              # Express + Vite — serveur unifié (port 5000)
├── 📄 lumina_db.json         # Base de données locale (auto-créée)
├── 📄 vite.config.ts         # Config Vite
├── src/
│   ├── 📄 App.tsx            # Racine — BootScreen → Login → Dashboard
│   ├── 📄 main.tsx           # Point d'entrée React
│   ├── 📄 index.css          # Styles globaux
│   └── components/
│       ├── 📄 BootScreen.tsx      # Animation de démarrage
│       ├── 📄 LoginScreen.tsx     # Écran de connexion
│       ├── 📄 Dashboard.tsx       # Shell principal du dashboard
│       ├── 📄 Sidebar.tsx         # Navigation desktop
│       ├── 📄 BottomNav.tsx       # Navigation mobile (barre du bas)
│       ├── 📄 FullScreenMenu.tsx  # Menu plein écran mobile
│       ├── ui/
│       │   ├── 📄 GlassCard.tsx   # Carte en verre réutilisable
│       │   ├── 📄 LeafLogo.tsx    # Logo feuille animée
│       │   └── 📄 PetalBg.tsx     # Fond animé
│       └── widgets/               # 16 widgets modulaires
│           ├── ClockWidget.tsx
│           ├── WeatherWidget.tsx
│           ├── SpotifyWidget.tsx
│           ├── FridayWidget.tsx   # Lumy IA
│           └── ...
```

---

## ✨ Fonctionnalités clés

- **🍂 Logo animé** — feuille qui tombe et se balance en permanence
- **🎬 Boot screen** — animation élégante au démarrage avec particules
- **🔐 Système de login** — multi-comptes avec rôles (admin/user)
- **📊 Dashboard** — widgets modulaires personnalisables
- **🤖 Lumy** — IA conversationnelle 100% locale avec mémoire persistante
- **🏠 Domotique** — contrôle Google Home intégré
- **🖥️ Monitoring** — stats temps réel ZimaOS (CPU, RAM, disque, réseau)
- **🎵 Spotify** — lecteur intégré avec OAuth
- **🤖 Discord** — statut du bot et commandes
- **📱 Mobile-first** — barre de navigation bottom, touch-friendly

---

<div align="center">

**🍂 Conçu avec intention, fait pour durer. 🍂**

*LuminaOS — v2.0.4-stable*

</div>
