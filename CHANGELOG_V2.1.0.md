# Changelog v2.1.0 - Neon Edition

**Date de sortie :** 18 Mars 2026

---

## Nouveautés Majeures

### Logo et Branding

- **Nouveau logo SVG néon** avec effet de contours verts brillants et intérieur transparent
- Utilisation de filtres SVG avancés (`feGaussianBlur`, `drop-shadow`) pour l'effet néon
- Animation de chute fluide au démarrage (1.5s)
- Animation de flottement permanente une fois chargé

**Fichiers créés :**
- `src/components/ui/NeonLeaf.tsx` - Composant React du logo néon
- `demo-boot.html` - Démo standalone de l'animation de boot

### Bot Discord Complet

- **Bot Discord.js v14** entièrement fonctionnel
- Système de commandes slash professionnelles
- Intégration avec la base de données du panel
- Statut en temps réel dans le widget Discord

**Commandes disponibles :**
- `/ping` - Latence du bot
- `/status` - Statistiques complètes
- `/help` - Documentation
- `/panel` - Lien vers le panel
- `/stats` - Stats serveur Discord
- `/userinfo` - Info utilisateur
- `/serverinfo` - Info serveur

**Fichiers créés :**
- `bot.js` - Bot Discord complet (600+ lignes commentées)
- `docs/DISCORD_BOT_SETUP.md` - Guide configuration complète

### Documentation Améliorée

- **README.md redesigné** avec badges, tableaux, et structure professionnelle
- Guide de démarrage rapide (5 minutes)
- Documentation Discord Bot détaillée
- Sections troubleshooting enrichies

**Fichiers créés/modifiés :**
- `README.md` - Refonte totale avec design Vibe Panel
- `docs/QUICK_START.md` - Démarrage express
- `docs/DISCORD_BOT_SETUP.md` - Configuration bot
- `.env.example` - Variables d'environnement commentées

---

## Améliorations

### Interface

- Renommage `LuminaOS` → `Vibe Panel`
- Nouvelle identité visuelle néon (vert `#00ff88`)
- Boot screen mis à jour avec le nouveau logo
- Widget Discord avec support Webhook amélioré

### Backend

- IP ZimaOS par défaut : `192.168.1.25`
- Support des webhooks Discord pour envoi de messages
- Configuration Discord bot intégrée au panel

### Configuration

- Nouveau fichier `.env.example` complet
- Variables pour Discord Bot Token et Webhook
- Documentation inline pour chaque variable

### Scripts NPM

Nouveaux scripts ajoutés :
```json
"bot": "node bot.js",
"start:all": "concurrently \"npm run dev\" \"npm run bot\""
```

---

## Dépendances Ajoutées

```json
{
  "discord.js": "^14.14.1",
  "concurrently": "^8.2.2"
}
```

---

## Architecture

### Nouveaux Fichiers

```
/
├── bot.js                           # Bot Discord complet
├── demo-boot.html                   # Démo animation standalone
├── .env.example                     # Template configuration
├── CHANGELOG_V2.1.0.md             # Ce fichier
├── docs/
│   ├── DISCORD_BOT_SETUP.md        # Guide bot Discord
│   └── QUICK_START.md              # Démarrage rapide
└── src/
    └── components/
        └── ui/
            └── NeonLeaf.tsx        # Logo néon
```

### Fichiers Modifiés

```
README.md                            # Refonte complète
package.json                         # Nouvelles dépendances
src/components/BootScreen.tsx       # Intégration logo néon
src/components/widgets/
├── SystemStatsWidget.tsx           # IP ZimaOS par défaut
└── DiscordBotWidget.tsx           # Branding Vibe Panel
```

---

## Migration depuis v2.0.4

### Étape 1 : Mise à jour des dépendances

```bash
npm install
```

### Étape 2 : Mettre à jour .env

Ajoute ces nouvelles variables (optionnelles) :

```env
DISCORD_BOT_TOKEN=
DISCORD_WEBHOOK_URL=
PANEL_URL=http://localhost:5000
```

### Étape 3 : Relancer le panel

```bash
npm run dev
```

Aucune autre action requise! La base de données et les utilisateurs existants sont préservés.

---

## Breaking Changes

Aucun breaking change. Migration 100% rétrocompatible.

---

## Bugs Corrigés

- Logo feuille maintenant avec effet néon cohérent
- Widget Discord avec avatar par défaut Vibe Panel
- IP ZimaOS pré-remplie pour faciliter la configuration

---

## Fonctionnalités Retirées

Aucune fonctionnalité retirée. Toutes les fonctionnalités v2.0.4 sont préservées.

---

## Performance

- Aucune régression de performance
- Bot Discord utilise ~30-50 MB de RAM
- Build size : 452 KB (identique à v2.0.4)

---

## Compatibilité

- **Node.js :** v18.0.0+
- **Navigateurs :** Chrome/Edge 90+, Firefox 88+, Safari 14+
- **Discord.js :** v14.14.1
- **Systèmes :** Windows, macOS, Linux

---

## Roadmap v2.2.0 (Prévu)

- [ ] Support multi-langues (EN/FR)
- [ ] Thèmes personnalisables
- [ ] Export/Import de configuration
- [ ] Widget Twitch
- [ ] Widget GitHub
- [ ] Mode sombre/clair (toggle)
- [ ] Notifications push navigateur

---

## Contributeurs

- **@boudardmathieu-sudo** - Développement principal
- **Claude AI** - Assistance développement

---

## Licence

MIT License - Voir [LICENSE](./LICENSE)

---

## Liens Utiles

- [GitHub Repository](https://github.com/boudardmathieu-sudo/Test)
- [Documentation](./README.md)
- [Quick Start](./docs/QUICK_START.md)
- [Discord Bot Setup](./docs/DISCORD_BOT_SETUP.md)

---

**Vibe Panel v2.1.0-neon** - Conçu avec passion. Fait pour durer.
