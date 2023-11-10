const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { readUser, createUser } = require("./database/script.js");
const port = process.env.PORT || 3000;
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`le bot a démarrer`); // On affiche un message de log dans la console (ligne de commande), lorsque le bot est démarré
});

client.on('error', console.error); // Afficher les erreurs

client.login(BOT_TOKEN);

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

const DIST_DIR = path.join(__dirname, "..", "client", "dist");
const PUBLIC_DIR = path.join(__dirname, "..", "client", "public");
const HTML_FILE = path.join(
  process.env.ENVIRONMENT == "dev" ? PUBLIC_DIR : DIST_DIR,
  "index.html"
);

app.use(cors());
app.use(express.json());
app.use(express.static(DIST_DIR));
app.use(express.static(PUBLIC_DIR));


app.connect(port,async function(req,res){
  
})



//======= User ======

/*
app.get('/api/get-users', function(req, res){ //donne tous les utilisateurs 
});
*/

app.get("/api/get-user/:username", async function (req, res) {
  //donne un utilisateur
  const usern = req.params.username;
  const user = await readUser(usern);
  console.log(user);
  res.json(user);
});

app.post("/api/create-user", async function (req, res) {
  //crée un utilisateur
  const usern = req.body.username;
  const token = req.body.token;
  const user = await createUser(usern, token);
  console.log(user);
  console.log(token);
  console.log(usern);
  res.json(user);
});

app.get("*", (req, res) => {
  res.sendFile(HTML_FILE, function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

