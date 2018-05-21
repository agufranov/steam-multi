const express = require('express');
const cors = require('cors');
const SteamAPI = require('./SteamAPI');
const Bridge = require('./Bridge');

const app = express();
app.use(cors());

const steamApi = new SteamAPI('7D5F2FA02FF09ACA687DE979BE355B30', 'https://api.steampowered.com/');
const bridge = new Bridge(steamApi);

app.get('/getSteamId', (req, res) => {
  bridge.getSteamId(req.query.username).then(res.json.bind(res));
});

app.get('/getPlayerInfo', (req, res) => {
  bridge.getPlayerInfo(req.query.steamid).then(res.json.bind(res));
});

app.get('/getPlayerGames', (req, res) => {
  bridge.getPlayerGames(req.query.steamid).then(res.json.bind(res));
});

app.listen(3000);
