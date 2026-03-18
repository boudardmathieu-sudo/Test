# Configuration du Bot Discord - Vibe Panel

Ce guide détaille la configuration complète du bot Discord pour Vibe Panel.

---

## Prérequis

- Compte Discord
- Node.js v18 ou supérieur
- Vibe Panel installé et fonctionnel

---

## Étape 1 : Créer l'Application Discord

### 1.1 Accéder au Developer Portal

Visite [discord.com/developers/applications](https://discord.com/developers/applications)

### 1.2 Créer une Nouvelle Application

1. Clique sur **"New Application"**
2. Nom suggéré : `Vibe Panel Bot`
3. Accepte les conditions et clique sur **"Create"**

### 1.3 Configurer l'Application

1. Ajoute une icône (optionnel)
2. Ajoute une description :
   ```
   Bot Discord officiel du Vibe Panel - Dashboard personnel moderne
   ```

---

## Étape 2 : Créer le Bot

### 2.1 Section Bot

1. Va dans l'onglet **"Bot"** (menu de gauche)
2. Clique sur **"Add Bot"**
3. Confirme en cliquant **"Yes, do it!"**

### 2.2 Configurer le Token

1. Clique sur **"Reset Token"**
2. Copie le token qui apparaît
3. Ajoute-le dans ton fichier `.env` :
   ```env
   DISCORD_BOT_TOKEN=ton_token_ici
   ```

**IMPORTANT:** Ne partage JAMAIS ce token publiquement!

### 2.3 Activer les Intents

Dans la section **Privileged Gateway Intents**, active :

- **Presence Intent**
- **Server Members Intent**
- **Message Content Intent**

Clique sur **"Save Changes"**

---

## Étape 3 : Inviter le Bot sur ton Serveur

### 3.1 Générer le Lien d'Invitation

1. Va dans l'onglet **"OAuth2"** > **"URL Generator"**
2. Coche les **SCOPES** :
   - `bot`
   - `applications.commands`

3. Sélectionne les **PERMISSIONS** :
   - Administrator (recommandé pour faciliter)

   **OU** pour des permissions minimales :
   - Send Messages
   - Embed Links
   - Attach Files
   - Read Message History
   - Use Slash Commands

4. Copie l'URL générée en bas

### 3.2 Inviter le Bot

1. Ouvre l'URL dans ton navigateur
2. Sélectionne ton serveur
3. Clique sur **"Authorize"**
4. Complète le captcha

Le bot devrait maintenant apparaître dans ton serveur!

---

## Étape 4 : Configurer le Webhook (Optionnel)

Pour envoyer des messages depuis le panel :

### 4.1 Créer un Webhook

1. Dans ton serveur Discord, va dans un canal
2. Clique sur l'engrenage (Modifier le canal)
3. Va dans **"Intégrations"** > **"Webhooks"**
4. Clique sur **"Nouveau Webhook"**
5. Personnalise le nom : `Vibe Panel`
6. Copie l'URL du Webhook

### 4.2 Configurer dans le Panel

1. Ouvre le Vibe Panel
2. Va dans **"Paramètres"**
3. Section **"Configuration Discord"**
4. Colle l'URL du Webhook
5. Clique sur **"Sauvegarder"**

---

## Étape 5 : Lancer le Bot

### 5.1 Via le Script npm

```bash
npm run bot
```

### 5.2 Lancer Bot + Panel ensemble

```bash
npm run start:all
```

### 5.3 Vérifier le Statut

Tu devrais voir dans la console :

```
┌─────────────────────────────────────────┐
│                                         │
│       Vibe Panel Discord Bot            │
│       v2.1.0 - Neon Edition            │
│                                         │
└─────────────────────────────────────────┘

Connecté en tant que: Vibe Panel Bot#1234
ID du bot: 123456789012345678
Serveurs actifs: 1
Utilisateurs accessibles: 50

Bot opérationnel!
```

---

## Commandes Disponibles

Une fois le bot en ligne, teste les commandes :

| Commande | Description | Exemple |
|----------|-------------|---------|
| `/ping` | Vérifie la latence | `/ping` |
| `/status` | Stats du bot et panel | `/status` |
| `/help` | Liste des commandes | `/help` |
| `/panel` | Lien vers le panel | `/panel` |
| `/stats` | Stats du serveur Discord | `/stats` |
| `/userinfo` | Info sur un utilisateur | `/userinfo @user` |
| `/serverinfo` | Info sur le serveur | `/serverinfo` |

---

## Dépannage

### Le bot ne se connecte pas

**Problème :** Token invalide

**Solution :**
1. Vérifie que le token dans `.env` est correct
2. Assure-toi qu'il n'y a pas d'espaces avant/après
3. Régénère le token si nécessaire

---

### Les commandes ne s'affichent pas

**Problème :** Commandes slash non enregistrées

**Solution :**
1. Redémarre le bot
2. Attends 1-2 minutes
3. Les commandes peuvent prendre du temps à se synchroniser

---

### Erreur "Missing Intents"

**Problème :** Intents non activés

**Solution :**
1. Va dans le Developer Portal
2. Onglet **"Bot"**
3. Active tous les **Privileged Gateway Intents**
4. Clique sur **"Save Changes"**
5. Redémarre le bot

---

### Le bot est en ligne mais ne répond pas

**Problème :** Permissions insuffisantes

**Solution :**
1. Vérifie les permissions du bot dans ton serveur
2. Le rôle du bot doit être au-dessus des rôles qu'il doit gérer
3. Active la permission **"Use Slash Commands"**

---

## Configuration Avancée

### Personnaliser le Statut

Modifie dans `bot.js` :

```javascript
client.user.setPresence({
  activities: [{
    name: 'Ton message personnalisé',
    type: ActivityType.Watching,
  }],
  status: 'online',
});
```

Types disponibles :
- `Playing`
- `Streaming`
- `Listening`
- `Watching`
- `Competing`

---

### Ajouter des Commandes Personnalisées

Dans `bot.js`, ajoute dans le tableau `commands` :

```javascript
{
  name: 'macommande',
  description: 'Description de ma commande',
  options: [
    {
      name: 'parametre',
      type: 3, // STRING
      description: 'Description du paramètre',
      required: true,
    },
  ],
}
```

Puis ajoute le gestionnaire dans le switch :

```javascript
case 'macommande': {
  const param = interaction.options.getString('parametre');
  // Ton code ici
  await interaction.reply({ content: `Tu as dit: ${param}` });
  break;
}
```

---

## Production

### Héberger le Bot

Pour un bot 24/7, héberge-le sur :

- **Heroku** (gratuit avec limitations)
- **Railway** (crédit gratuit)
- **DigitalOcean** (VPS à partir de 5$/mois)
- **Raspberry Pi** (chez toi)

### Configuration PM2 (Recommandé)

```bash
# Installer PM2
npm install -g pm2

# Lancer le bot avec PM2
pm2 start bot.js --name vibe-bot

# Démarrage automatique au boot
pm2 startup
pm2 save
```

---

## Support

### Ressources

- [Documentation Discord.js](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers)
- [Guide Discord.js](https://discordjs.guide/)

### Aide

En cas de problème :
1. Vérifie les logs du bot
2. Consulte la section Dépannage ci-dessus
3. Ouvre une issue sur GitHub

---

**Dernière mise à jour :** 2025-03-18
**Version du bot :** v2.1.0-neon
