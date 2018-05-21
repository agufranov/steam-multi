const express = require('express');
const cors = require('cors');
const SteamAPI = require('./SteamAPI');
const Bridge = require('./Bridge');

const app = express();
app.use(cors());

const steamApi = new SteamAPI('7D5F2FA02FF09ACA687DE979BE355B30', 'https://api.steampowered.com/ISteamUser/');
const bridge = new Bridge(steamApi);

const request = (method, params) => {
  const paramsStr = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  const url = `${baseUrl}${method}?key=${apiKey}&${paramsStr}`;
  console.log(url);
  return fetch(url)
    .then(res => res.json())
}


app.get('/getUserId', (req, res) => {
  bridge.getUserId(req.query.username).then(res.json.bind(res));
});

app.listen(3000);
