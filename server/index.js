const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { readUser, createUser, deleteUser, createFavorite, readFavorite, updateFavorite, deleteFavorite } = require("./database/script.js");
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

app.delete("/api/delete-user/:username", async function (req, res){
  const usern = req.body.username;
  const response = {isDeleted : true};
  try {
    const user = await deleteUser(usern);
    response.message = "User deleted with success !"
    res.status(200).json(response);
    
    res.json(response);
  }catch (err){
    req.log.error(err);
    response.message = "Error during deleting user  \n" + err;
    response.isDeleted = false;

    res.status(500).json(response);
  }
});

//Favorite Management
app.post("/api/create-favorite", async function (req, res){
  //creation of Favorite
  const idfav = req.body.id;
  const quote = req.body.quoteId;
  const user = req.body.userId;
  const favorite = await createFavorite(idfav, quote, user);
  //phase de test (a suppr plus tard)
  console.log(favorite);
  console.log(idfav);
  console.log(quote);
  console.log(user);

  res.json(favorite);
}); 

app.get("/api/get-favorite/:id", async function(req, res){
  const idfav = req.body.id;
  const favorite = await readFavorite(idfav);
  console.log(favorite);
  res.json(favorite);
});

app.post("/api/update-favorite/:id", async function(req, res){
  const quote = req.body.quoteId;
  const user = req.body.userId;
  const favorite = await updateFavorite(id, quote, user);
  console.log(favorite);
  res.json(favorite);
});

app.delete("/api/delete-favorite/:id", async function(req, res){
  const idfav = req.body.id;
  const response = {isDeleted : true};
  try{
    const favorite = await deleteFavorite(idfav);
    response.message = "Succeed in deleting Favorite !";
    res.status(200).json(response);
  }catch (err){
    req.log(err);
    response.message = "Error delete Favorite   \n" + err;
    response.isDeleted = false;
    res.status(500).json(response);
  }
});

app.get("*", (req, res) => {
  res.sendFile(HTML_FILE, function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
