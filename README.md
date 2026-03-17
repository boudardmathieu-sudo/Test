# LuminaOS

**LuminaOS** est votre tableau de bord personnel tout-en-un — conçu pour centraliser votre vie numérique, piloter votre maison connectée, surveiller votre serveur et vous assister avec **Lumy**, votre intelligence artificielle 100% locale.

---

## Fonctionnalités

### Lumy — IA Personnelle
- Assistante conversationnelle entièrement **hors ligne**, sans API externe, sans cloud
- Mémorise vos faits personnels, vos rappels et vos habitudes
- Fournit un bilan en temps réel de votre journée
- Comprend les commandes en langage naturel (navigation, timer, conseils…)

### Dashboard Principal
- Horloge, météo, recherche Google intégrée
- Todo list, bloc-notes, liens rapides personnalisables
- Lecture Spotify (contrôle de la lecture en cours)
- Flux d'actualités

### Serveur & Infrastructure
- Monitoring en temps réel de votre ZimaOS / CasaOS (CPU, RAM, stockage)
- Proxy intégré pour contourner les restrictions CORS
- Moniteur réseau

### Productivité
- **Pomodoro** — Timer focus avec comptage de sessions
- **Habitudes** — Suivi journalier avec streaks
- **Calculette** — Calculs rapides
- **Boîte à outils** — Utilitaires pratiques (générateur de mot de passe, encodage base64, convertisseur…)

### Maison Connectée
- Contrôle de vos appareils Google Home
- Interface simple et réactive

### Gestion des utilisateurs
- Multi-comptes avec rôles (admin / utilisateur)
- Intégration Discord Bot (admin uniquement)
- Spotify par utilisateur

---

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application tourne sur le port **5000** par défaut.

---

## Variables d'environnement

Créez un fichier `.env` à la racine :

```env
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REDIRECT_URI=...
GEMINI_API_KEY=...
```

---

## Identifiants par défaut

| Champ       | Valeur    |
|-------------|-----------|
| Utilisateur | `Mat`     |
| Mot de passe | `211008` |
| Rôle        | Admin     |

---

## Stack technique

| Couche     | Technologie                        |
|------------|------------------------------------|
| Frontend   | React 19 + TypeScript + Vite       |
| Animations | Motion (Framer Motion)             |
| Style      | Tailwind CSS v4                    |
| Backend    | Express.js + tsx                   |
| Base de données | JSON local (`lumina_db.json`) |
| IA         | Moteur local LUMY (sans API)       |

---

## Architecture

```
src/
├── components/
│   ├── widgets/        # Tous les widgets fonctionnels
│   ├── BootScreen.tsx  # Animation de démarrage
│   ├── Dashboard.tsx   # Layout principal
│   ├── Sidebar.tsx     # Navigation desktop
│   └── FullScreenMenu.tsx # Menu mobile
├── hooks/
│   └── useDeviceDetect.ts
└── assets/
    └── logo.png        # Logo LuminaOS
server.ts               # API Express + Lumy Engine
```

---

*LuminaOS — Votre espace, vos données, votre contrôle.*
