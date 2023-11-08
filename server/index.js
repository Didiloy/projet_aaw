const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
import { readUser, createUser } from "./database/script";
const port = process.env.PORT || 3000;

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

//======= User ======

/*
app.get('/api/get-users', function(req, res){ //donne tous les utilisateurs 
});
*/

app.get("/api/get-user/:username", function (req, res) {
  //donne un utilisateur
  const usern = String(req.params.username);
  const user = readUser(usern);
  res.json(user);
});
/*
app.post('/api/create-user', function(req, res){

} )

*/

app.get("*", (req, res) => {
  res.sendFile(HTML_FILE, function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
