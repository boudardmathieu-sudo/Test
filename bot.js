/**
 * ============================================
 * VIBE PANEL - Discord Bot
 * ============================================
 *
 * Bot Discord complet avec système de commandes slash
 * Intégration directe avec le LuminaOS
 *
 * Prérequis :
 * - discord.js v14+
 * - Token Discord configuré dans .env
 * - Intents activés dans le Developer Portal
 *
 * Utilisation :
 * - npm install discord.js
 * - node bot.js
 */

const { Client, GatewayIntentBits, REST, Routes, EmbedBuilder, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ============================
// CONFIGURATION
// ============================

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const PANEL_URL = process.env.PANEL_URL || 'http://localhost:5000';
const DB_PATH = path.join(__dirname, 'lumina_db.json');

if (!TOKEN) {
  console.error('ERREUR: DISCORD_BOT_TOKEN manquant dans le fichier .env');
  process.exit(1);
}

// ============================
// INITIALISATION DU CLIENT
// ============================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// ============================
// FONCTIONS UTILITAIRES
// ============================

/**
 * Lit la base de données locale
 */
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { users: [], config: {}, friday: { memory: [], facts: {}, reminders: [] } };
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (error) {
    console.error('Erreur lecture DB:', error);
    return { users: [], config: {}, friday: { memory: [], facts: {}, reminders: [] } };
  }
}

/**
 * Écrit dans la base de données locale
 */
function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erreur écriture DB:', error);
  }
}

/**
 * Crée un embed stylisé avec les couleurs LuminaOS
 */
function createEmbed(title, description, color = 0x00ff88) {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp()
    .setFooter({ text: 'LuminaOS v2.1.0', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
}

// ============================
// COMMANDES SLASH
// ============================

const commands = [
  {
    name: 'ping',
    description: 'Vérifie la latence du bot',
  },
  {
    name: 'status',
    description: 'Affiche les statistiques du bot et du panel',
  },
  {
    name: 'help',
    description: 'Liste toutes les commandes disponibles',
  },
  {
    name: 'panel',
    description: 'Affiche le lien vers le LuminaOS',
  },
  {
    name: 'stats',
    description: 'Statistiques détaillées du serveur',
  },
  {
    name: 'userinfo',
    description: 'Informations sur un utilisateur',
    options: [
      {
        name: 'utilisateur',
        type: 6, // USER type
        description: 'Utilisateur à analyser',
        required: false,
      },
    ],
  },
  {
    name: 'serverinfo',
    description: 'Informations détaillées sur le serveur',
  },
];

// ============================
// GESTIONNAIRES D'ÉVÉNEMENTS
// ============================

/**
 * Événement: Bot prêt
 */
client.once('ready', async () => {
  console.log('');
  console.log('┌─────────────────────────────────────────┐');
  console.log('│                                         │');
  console.log('│       LuminaOS Discord Bot            │');
  console.log('│       v2.1.0 - Neon Edition            │');
  console.log('│                                         │');
  console.log('└─────────────────────────────────────────┘');
  console.log('');
  console.log(`Connecté en tant que: ${client.user.tag}`);
  console.log(`ID du bot: ${client.user.id}`);
  console.log(`Serveurs actifs: ${client.guilds.cache.size}`);
  console.log(`Utilisateurs accessibles: ${client.users.cache.size}`);
  console.log('');

  // Enregistrer les commandes slash
  const rest = new REST({ version: '10' }).setToken(TOKEN);

  try {
    console.log('Enregistrement des commandes slash...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('Commandes slash enregistrées avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des commandes:', error);
  }

  // Définir le statut du bot
  client.user.setPresence({
    activities: [{
      name: 'LuminaOS',
      type: ActivityType.Watching,
      url: PANEL_URL
    }],
    status: 'online',
  });

  console.log('');
  console.log('Bot opérationnel!');
  console.log('─────────────────────────────────────────');
  console.log('');
});

/**
 * Événement: Interaction (commandes slash)
 */
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, user, guild } = interaction;

  try {
    switch (commandName) {
      // ───────────────────────────────────
      // COMMANDE: /ping
      // ───────────────────────────────────
      case 'ping': {
        const sent = await interaction.reply({
          content: 'Calcul de la latence...',
          fetchReply: true,
        });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);

        const embed = createEmbed(
          'Pong!',
          `**Latence du bot:** ${latency}ms\n**Latence API:** ${apiLatency}ms`,
          latency < 100 ? 0x00ff88 : latency < 200 ? 0xfbbf24 : 0xf43f5e
        );

        await interaction.editReply({ content: null, embeds: [embed] });
        break;
      }

      // ───────────────────────────────────
      // COMMANDE: /status
      // ───────────────────────────────────
      case 'status': {
        const db = readDB();
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const embed = createEmbed(
          'Statut du Bot & Panel',
          `
**Bot Discord**
Serveurs: ${client.guilds.cache.size}
Utilisateurs: ${client.users.cache.size}
Uptime: ${hours}h ${minutes}m ${seconds}s

**LuminaOS**
Utilisateurs enregistrés: ${db.users?.length || 0}
URL: [${PANEL_URL}](${PANEL_URL})
Version: v2.1.0-neon

**Système**
Mémoire: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
Node.js: ${process.version}
          `.trim(),
          0x00d4ff
        );

        await interaction.reply({ embeds: [embed] });
        break;
      }

      // ───────────────────────────────────
      // COMMANDE: /help
      // ───────────────────────────────────
      case 'help': {
        const embed = createEmbed(
          'Commandes Disponibles',
          `
**/ping** - Vérifie la latence du bot
**/status** - Affiche les statistiques complètes
**/help** - Affiche cette aide
**/panel** - Lien vers le LuminaOS
**/stats** - Statistiques du serveur Discord
**/userinfo** - Informations sur un utilisateur
**/serverinfo** - Informations sur le serveur

**À propos**
LuminaOS est un dashboard personnel moderne avec intégration Discord, Spotify, monitoring serveur et bien plus.

**Support**
GitHub: [github.com/boudardmathieu-sudo/Test](https://github.com/boudardmathieu-sudo/Test)
          `.trim(),
          0xa855f7
        );

        await interaction.reply({ embeds: [embed] });
        break;
      }

      // ───────────────────────────────────
      // COMMANDE: /panel
      // ───────────────────────────────────
      case 'panel': {
        const embed = createEmbed(
          'LuminaOS',
          `
**Accès au Panel**
${PANEL_URL}

**Fonctionnalités**
- Dashboard moderne avec glassmorphism
- Contrôle Spotify intégré
- Monitoring serveur ZimaOS
- Gestion Discord (ce bot!)
- Widgets utilitaires

**Version actuelle**
v2.1.0-neon
          `.trim(),
          0x00ff88
        );

        await interaction.reply({ embeds: [embed] });
        break;
      }

      // ───────────────────────────────────
      // COMMANDE: /stats
      // ───────────────────────────────────
      case 'stats': {
        if (!guild) {
          await interaction.reply({
            content: 'Cette commande ne peut être utilisée qu\'dans un serveur.',
            ephemeral: true,
          });
          return;
        }

        const embed = createEmbed(
          `Statistiques - ${guild.name}`,
          `
**Membres**
Total: ${guild.memberCount}
En ligne: ${guild.members.cache.filter(m => m.presence?.status !== 'offline').size}

**Canaux**
Texte: ${guild.channels.cache.filter(c => c.type === 0).size}
Vocal: ${guild.channels.cache.filter(c => c.type === 2).size}
Catégories: ${guild.channels.cache.filter(c => c.type === 4).size}

**Serveur**
Créé le: <t:${Math.floor(guild.createdTimestamp / 1000)}:D>
Propriétaire: <@${guild.ownerId}>
Niveau de boost: ${guild.premiumTier}
Boosts: ${guild.premiumSubscriptionCount || 0}
          `.trim(),
          0xfbbf24
        );

        embed.setThumbnail(guild.iconURL({ dynamic: true }));
        await interaction.reply({ embeds: [embed] });
        break;
      }

      // ───────────────────────────────────
      // COMMANDE: /userinfo
      // ───────────────────────────────────
      case 'userinfo': {
        const targetUser = interaction.options.getUser('utilisateur') || user;
        const member = guild?.members.cache.get(targetUser.id);

        const roles = member?.roles.cache
          .filter(r => r.id !== guild.id)
          .map(r => r.toString())
          .slice(0, 10)
          .join(', ') || 'Aucun';

        const embed = createEmbed(
          `Informations - ${targetUser.username}`,
          `
**Utilisateur**
ID: ${targetUser.id}
Tag: ${targetUser.tag}
Créé le: <t:${Math.floor(targetUser.createdTimestamp / 1000)}:D>
Bot: ${targetUser.bot ? 'Oui' : 'Non'}

${member ? `
**Membre du serveur**
Surnom: ${member.nickname || 'Aucun'}
Rejoint le: <t:${Math.floor(member.joinedTimestamp / 1000)}:D>
Rôles: ${roles}
` : ''}
          `.trim(),
          0x60a5fa
        );

        embed.setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 256 }));
        await interaction.reply({ embeds: [embed] });
        break;
      }

      // ───────────────────────────────────
      // COMMANDE: /serverinfo
      // ───────────────────────────────────
      case 'serverinfo': {
        if (!guild) {
          await interaction.reply({
            content: 'Cette commande ne peut être utilisée qu\'dans un serveur.',
            ephemeral: true,
          });
          return;
        }

        const embed = createEmbed(
          guild.name,
          `
**Informations Générales**
ID: ${guild.id}
Propriétaire: <@${guild.ownerId}>
Créé le: <t:${Math.floor(guild.createdTimestamp / 1000)}:F>
Région: ${guild.preferredLocale}

**Statistiques**
Membres: ${guild.memberCount}
Rôles: ${guild.roles.cache.size}
Canaux: ${guild.channels.cache.size}
Emojis: ${guild.emojis.cache.size}

**Boost**
Niveau: ${guild.premiumTier}
Boosts: ${guild.premiumSubscriptionCount || 0}
Boosters: ${guild.premiumSubscriptionCount || 0}

**Sécurité**
Niveau de vérification: ${guild.verificationLevel}
Filtre de contenu: ${guild.explicitContentFilter}
          `.trim(),
          0x00ff88
        );

        if (guild.iconURL()) {
          embed.setThumbnail(guild.iconURL({ dynamic: true, size: 256 }));
        }

        if (guild.bannerURL()) {
          embed.setImage(guild.bannerURL({ size: 1024 }));
        }

        await interaction.reply({ embeds: [embed] });
        break;
      }

      default:
        await interaction.reply({
          content: 'Commande non reconnue.',
          ephemeral: true,
        });
    }
  } catch (error) {
    console.error(`Erreur lors de l'exécution de /${commandName}:`, error);

    const errorMessage = {
      content: 'Une erreur est survenue lors de l\'exécution de cette commande.',
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

/**
 * Événement: Nouveau membre
 */
client.on('guildMemberAdd', (member) => {
  console.log(`Nouveau membre: ${member.user.tag} sur ${member.guild.name}`);
});

/**
 * Événement: Membre parti
 */
client.on('guildMemberRemove', (member) => {
  console.log(`Membre parti: ${member.user.tag} sur ${member.guild.name}`);
});

/**
 * Événement: Erreur
 */
client.on('error', (error) => {
  console.error('Erreur du client Discord:', error);
});

/**
 * Événement: Warning
 */
client.on('warn', (warning) => {
  console.warn('Avertissement Discord:', warning);
});

// ============================
// CONNEXION DU BOT
// ============================

client.login(TOKEN).catch((error) => {
  console.error('');
  console.error('ERREUR DE CONNEXION AU BOT DISCORD');
  console.error('──────────────────────────────────────');
  console.error('');
  console.error('Vérifiez que :');
  console.error('1. Le token DISCORD_BOT_TOKEN est correct dans le .env');
  console.error('2. Le bot est bien créé sur discord.com/developers');
  console.error('3. Les intents sont activés dans le Developer Portal');
  console.error('');
  console.error('Erreur détaillée:', error.message);
  console.error('');
  process.exit(1);
});

// ============================
// GESTION DE L'ARRÊT PROPRE
// ============================

process.on('SIGINT', () => {
  console.log('');
  console.log('Arrêt du bot...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('');
  console.log('Arrêt du bot (SIGTERM)...');
  client.destroy();
  process.exit(0);
});
