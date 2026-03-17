import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'lumina_db.json');

// Initialize DB
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({
    users: [{ username: "Mat", password: "211008", role: "admin" }],
    config: { googleHomeConnected: false, zimaIp: "" }
  }));
}

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDB = (data: any) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

async function startServer() {
  const app = express();
  app.use(express.json());

  // API: Users
  app.get('/api/users', (req, res) => {
    res.json(readDB().users);
  });
  
  app.post('/api/users', (req, res) => {
    const db = readDB();
    db.users.push(req.body);
    writeDB(db);
    res.json({ success: true });
  });
  
  app.delete('/api/users/:username', (req, res) => {
    const db = readDB();
    db.users = db.users.filter((u: any) => u.username !== req.params.username);
    writeDB(db);
    res.json({ success: true });
  });

  // API: Config (Google Home, ZimaOS IP, Discord Token)
  app.get('/api/config', (req, res) => {
    res.json(readDB().config);
  });
  
  app.post('/api/config', (req, res) => {
    const db = readDB();
    db.config = { ...db.config, ...req.body };
    writeDB(db);
    res.json({ success: true });
  });

  // API: Discord Bot Status
  app.get('/api/discord/status', async (req, res) => {
    try {
      const token = readDB().config.discordBotToken;
      if (!token) return res.json({ connected: false });

      const userRes = await fetch('https://discord.com/api/v10/users/@me', {
        headers: { Authorization: `Bot ${token}` }
      });
      
      if (!userRes.ok) {
        return res.json({ connected: false, error: 'Token invalide' });
      }
      
      const userData = await userRes.json();
      
      const guildsRes = await fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: { Authorization: `Bot ${token}` }
      });
      const guildsData = await guildsRes.ok ? await guildsRes.json() : [];

      res.json({
        connected: true,
        username: userData.username,
        avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : null,
        serverCount: guildsData.length
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- SPOTIFY INTEGRATION ---
  const getRedirectUri = (req: any) => {
    if (process.env.SPOTIFY_REDIRECT_URI) {
      return process.env.SPOTIFY_REDIRECT_URI;
    }
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    return `${protocol}://${host}/api/spotify/callback`;
  };

  async function getValidSpotifyToken(username: string, req: any) {
    const db = readDB();
    const user = db.users.find((u: any) => u.username === username);
    if (!user || !user.spotify) return null;

    if (Date.now() > user.spotify.expiresAt) {
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: user.spotify.refreshToken
      });
      const authHeader = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
      try {
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authHeader}`
          },
          body: params.toString()
        });
        const data = await tokenRes.json();
        if (data.access_token) {
          user.spotify.accessToken = data.access_token;
          if (data.refresh_token) user.spotify.refreshToken = data.refresh_token;
          user.spotify.expiresAt = Date.now() + (data.expires_in - 60) * 1000;
          writeDB(db);
          return data.access_token;
        }
      } catch (e) {
        return null;
      }
      return null;
    }
    return user.spotify.accessToken;
  }

  app.get('/api/spotify/auth-url', (req, res) => {
    if (!process.env.SPOTIFY_CLIENT_ID) {
      return res.status(200).json({ error: "SPOTIFY_CLIENT_ID manquant dans le fichier .env" });
    }
    const username = req.query.username as string;
    const scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing';
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope,
      redirect_uri: getRedirectUri(req),
      state: username
    });
    res.json({ url: `https://accounts.spotify.com/authorize?${params.toString()}` });
  });

  app.get('/api/spotify/callback', async (req, res) => {
    const code = req.query.code as string;
    const username = req.query.state as string;
    
    if (!code || !username) return res.send('Erreur: Paramètres manquants');

    try {
      const params = new URLSearchParams({
        code,
        redirect_uri: getRedirectUri(req),
        grant_type: 'authorization_code'
      });

      const authHeader = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
      const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${authHeader}`
        },
        body: params.toString()
      });

      const data = await tokenRes.json();
      if (data.access_token) {
        const db = readDB();
        const userIndex = db.users.findIndex((u: any) => u.username === username);
        if (userIndex !== -1) {
          db.users[userIndex].spotify = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: Date.now() + (data.expires_in - 60) * 1000
          };
          writeDB(db);
        }
      }

      res.send(`
        <html><body><script>
          if (window.opener) {
            window.opener.postMessage({ type: 'SPOTIFY_AUTH_SUCCESS' }, '*');
            window.close();
          } else {
            window.location.href = '/';
          }
        </script></body></html>
      `);
    } catch (e) {
      res.send('Erreur lors de l\'authentification Spotify');
    }
  });

  app.get('/api/spotify/player', async (req, res) => {
    const username = req.query.username as string;
    const token = await getValidSpotifyToken(username, req);
    if (!token) return res.json({ connected: false });

    try {
      const playerRes = await fetch('https://api.spotify.com/v1/me/player', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (playerRes.status === 204) return res.json({ connected: true, is_playing: false, item: null });
      if (!playerRes.ok) return res.json({ connected: true, error: 'Erreur API Spotify' });

      const data = await playerRes.json();
      res.json({ connected: true, data });
    } catch (e) {
      res.json({ connected: true, error: 'Erreur réseau' });
    }
  });

  app.post('/api/spotify/player/control', async (req, res) => {
    const { username, action } = req.body;
    const token = await getValidSpotifyToken(username, req);
    if (!token) return res.status(401).json({ error: 'Not connected' });

    let url = `https://api.spotify.com/v1/me/player/${action}`;
    let method = action === 'next' || action === 'previous' ? 'POST' : 'PUT';

    try {
      await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Erreur contrôle' });
    }
  });
  // --- END SPOTIFY INTEGRATION ---

  // API: ZimaOS Proxy (Bypass CORS)
  app.get('/api/zimaos', async (req, res) => {
    try {
      const ip = req.query.ip as string;
      if (!ip) return res.status(400).json({ error: 'IP required' });
      
      const protocol = ip.startsWith('http') ? '' : 'http://';
      const url = `${protocol}${ip}/v1/sys/info`;
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erreur ${response.status}: ${text.substring(0, 50)}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (e: any) {
      console.error("ZimaOS Proxy Error:", e.message);
      res.status(500).json({ error: e.message.includes('abort') ? 'Délai d\'attente dépassé (Timeout)' : e.message });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
