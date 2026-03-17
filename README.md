# LuminaOS

Tableau de bord personnel conçu pour centraliser votre vie numérique. Contrôle de la maison connectée, surveillance serveur, IA locale, productivité — tout en un seul endroit.

---

## Ce que fait LuminaOS

| Section | Description |
|---|---|
| **Dashboard** | Horloge, météo, Google, actualités, Spotify, notes, todo |
| **Lumy** | IA personnelle 100% locale — sans API, sans cloud |
| **Maison** | Contrôle des appareils connectés (Google Home) |
| **Serveur** | Monitoring ZimaOS en temps réel (CPU, RAM, stockage) |
| **Pomodoro** | Timer de concentration avec comptage de sessions |
| **Habitudes** | Suivi quotidien avec streaks |
| **Calculette** | Calculs rapides intégrés |
| **Outils** | Générateur de mot de passe, base64, convertisseur |
| **Paramètres** | Gestion des comptes, Discord bot, Spotify |

---

## Lancer l'application

```bash
npm install
npm run dev
```

Accessible sur **http://localhost:5000**

---

## Connexion par défaut

```
Utilisateur : Mat
Mot de passe : 211008
```

---

## Variables d'environnement (optionnelles)

Créez un fichier `.env` à la racine si vous voulez activer Spotify ou Gemini AI :

```env
SPOTIFY_CLIENT_ID=votre_client_id
SPOTIFY_CLIENT_SECRET=votre_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:5000/api/spotify/callback
GEMINI_API_KEY=votre_cle_api
```

---

## Stack

- **Frontend** — React 19 + TypeScript + Vite + Tailwind CSS v4
- **Backend** — Express.js + tsx
- **Animations** — Motion (Framer Motion)
- **Données** — JSON local (`lumina_db.json`), pas de base de données externe
- **IA (Lumy)** — Moteur de traitement local, zéro API externe
