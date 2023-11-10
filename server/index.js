const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { readUser, createUser, updateUser, deleteUser, createQuote, readQuote, updateQuote, deleteQuote, createFavorite, readFavorite, updateFavorite, deleteFavorite } = require("./database/script.js");
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

app.post("/api/update-user/:username", async function (req, res){
  //met à jour un utilisateur
  const username = req.params.username;
  const isAd = req.body.isAdmin;
  console.log(isAd);
  const user = await updateUser(username, isAd);
  console.log(user);
  res.json(user);
});

app.delete("/api/delete-user/:username", async function (req, res){
  //delete user
  const usern = req.params.username;
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

//======= Quote ======

app.get("/api/get-quote/:id", async function (req, res){
  //récupère une citation
  const idq = req.params.id;
  const quote = await readQuote(idq);
  console.log(quote);
  res.json(quote);

});

app.post("/api/create-quote", async function (req, res){
    //crée une citation
    const cont = req.body.content;
    const author = req.body.authorId;
    const quote = await createQuote(cont, author);
    console.log(quote);
    console.log(idq);
    console.log(cont);
    console.log(author);
    res.json(quote);
});

app.post("/api/update-quote/:id", async function(req, res){
  //mets à jour une citation
  const id = req.params.id
  const cont = req.body.content;
  const author = req.body.authorId;
  const quote = await updateQuote(id, cont, author);
  console.log(quote);
  res.json(quote);
});

app.delete("/api/delete-quote/:id", async function(req, res){
  //supprime une citation
  const idq = req.params.id;
  const response = {isDeleted : true};
  try{
    const quote = await deleteQuote(idq);
    response.message = "quote deleted with success ! "
    res.status(200).json(response);
    res.json(response);
  }catch(err){
    req.log.error(err);
    response.message = "Error during deleting quote   " + err;
    response.isDeleted = false;

    res.status(500).json(response);
  }
});

//Favorite Management

app.post("/api/create-favorite", async function (req, res){
  //creation of Favorite
  const quote = req.body.quoteId;
  const user = req.body.userId;
  const favorite = await createFavorite(quote, user);
  //phase de test (a suppr plus tard)
  console.log(favorite);
  console.log(idfav);
  console.log(quote);
  console.log(user);

  res.json(favorite);
}); 

app.get("/api/get-favorite/:id", async function(req, res){
  //read favorite
  const id = req.params.id;
  const favorite = await readFavorite(id);
  console.log(favorite);
  res.json(favorite);
});

app.post("/api/update-favorite/:id", async function(req, res){
  //update favorite
  const id = req.params.id;
  const quote = req.body.quoteId;
  const user = req.body.userId;
  const favorite = await updateFavorite(id, quote, user);
  console.log(favorite);
  res.json(favorite);
});

app.delete("/api/delete-favorite/:id", async function(req, res){
  //delete favorite
  const idfav = req.params.id;
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
