const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const {
  readUser,
  createUser,
  deleteUser,
  createQuote,
  readQuote,
  readAllQuotes,
  updateQuote,
  deleteQuote,
  createFavorite,
  readFavorite,
  updateFavorite,
  deleteFavorite,
  selectUserWhere,
  updateUserFromDiscordId,
} = require("./database/script.js");
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

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(DIST_DIR));
app.use(express.static(PUBLIC_DIR));
app.use(cookieParser());

//=======Authentication=======
app.get("/auth/discord/login", async (req, res) => {
  const url =
    "https://discord.com/api/oauth2/authorize?client_id=1172524572537532529&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify";
  res.redirect(url);
});

app.get("/auth/discord/callback", async (req, res) => {
  if (!req.query.code) throw new Error("Code not provided.");

  const { code } = req.query;
  console.log("code: " + code);
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/x-www-form-urlencoded",
  };

  const response_raw = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: params,
    headers: headers,
  });
  const response = await response_raw.json();

  const user_response_raw = await fetch("https://discord.com/api/users/@me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${response.access_token}`,
      ...headers,
    },
  });
  const userResponse = await user_response_raw.json();

  const { id, username } = userResponse;

  const checkIfUserExists = await selectUserWhere({ discordId: id });

  if (checkIfUserExists.length > 0) {
    const oldUsername = checkIfUserExists[0].username;
    await updateUserFromDiscordId(id, oldUsername, (tok = ""), false, username);
  } else {
    try {
      await createUser(username, (tok = ""), id, false);
    } catch (err) {
      console.log(err);
    }
  }

  const token = await sign({ sub: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  var cookie = req.cookies.projet_aaw_token;
  if (cookie === undefined) {
    res.cookie("projet_aaw_token", token, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
    });
  } else {
    res.cookie("projet_aaw_token", token);
    console.log("cookie exists", cookie);
  }
  res.redirect(process.env.CLIENT_REDIRECT_URL);
});

app.get("/api/is-authenticated", async (req, res) => {
  const token = req.cookies.projet_aaw_token;

  if (token === undefined) {
    res.json({ isAuthenticated: false });
  } else {
    try {
      const { sub } = await verify(token, process.env.JWT_SECRET);
      const user = await selectUserWhere({ discordId: sub });
      res.json({
        isAuthenticated: true,
        user: {
          username: user[0].username,
          isAdmin: user[0].isAdmin,
        },
      });
    } catch (e) {
      console.log("error: " + e);
      res.json({ isAuthenticated: false });
    }
  }
});

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

app.post("/api/update-user/:username", async function (req, res) {
  //met à jour un utilisateur
  const username = req.params.username;
  const tok = req.body.token;
  const datetok = req.body.tokenCreation;
  const isAd = req.body.isAdmin;
  console.log(isAd);
  const user = await updateUser(username, tok, datetok, isAd);
  console.log(user);
  res.json(user);
});

app.delete("/api/delete-user/:username", async function (req, res) {
  //delete user
  const usern = req.params.username;
  const response = { isDeleted: true };
  try {
    const user = await deleteUser(usern);
    response.message = "User deleted with success !";
    res.status(200).json(response);
  } catch (err) {
    response.message = "Error during deleting user  \n" + err;
    response.isDeleted = false;

    res.status(500).json(response);
  }
});

//======= Quote ======

app.get("/api/get-quote/:id", async function (req, res) {
  //récupère une citation
  const idq = req.params.id;
  const quote = await readQuote(idq);
  console.log(quote);
  res.json(quote);
});

app.get("/api/get-quotes", async function (req, res) {
  //récupère toutes les citations
  const quotes = await readAllQuotes();
  console.log(quotes);
  res.json(quotes);
});

app.post("/api/create-quote", async function (req, res) {
  //crée une citation
  const cont = req.body.content;
  const author = req.body.authorId;
  console.log("author: " + author);
  console.log("cont: " + cont);
  const quote = await createQuote(cont, author);
  res.json(quote);
});

app.post("/api/update-quote/:id", async function (req, res) {
  //mets à jour une citation
  const id = req.params.id;
  const cont = req.body.content;
  const author = req.body.authorId;
  const quote = await updateQuote(id, cont, author);
  console.log(quote);
  res.json(quote);
});

app.delete("/api/delete-quote/:id", async function (req, res) {
  //supprime une citation
  console.log("delete quote");
  const idq = Number(req.params.id);
  const response = { isDeleted: true };
  try {
    const quote = await deleteQuote(idq);
    response.message = "quote deleted with success ! ";
    res.status(200).json(response);
  } catch (err) {
    response.message = "Error during deleting quote   " + err;
    response.isDeleted = false;
    res.status(500).json(response);
  }
});

//Favorite Management

app.post("/api/create-favorite", async function (req, res) {
  //creation of Favorite
  const quote = req.body.quoteId;
  const user = req.body.userId;
  const favorite = await createFavorite(quote, user);
  //phase de test (a suppr plus tard)
  console.log(favorite);
  //console.log(idfav);
  console.log(quote);
  console.log(user);

  res.json(favorite);
});

app.get("/api/get-favorite/:id", async function (req, res) {
  //read favorite
  const id = req.params.id;
  const favorite = await readFavorite(id);
  console.log(favorite);
  res.json(favorite);
});

app.post("/api/update-favorite/:id", async function (req, res) {
  //update favorite
  const id = req.params.id;
  const quote = req.body.quoteId;
  const user = req.body.userId;
  const favorite = await updateFavorite(id, quote, user);
  console.log(favorite);
  res.json(favorite);
});

app.delete("/api/delete-favorite/:id", async function (req, res) {
  //delete favorite
  const idfav = req.params.id;
  const response = { isDeleted: true };
  try {
    const favorite = await deleteFavorite(idfav);
    response.message = "Succeed in deleting Favorite !";
    res.status(200).json(response);
  } catch (err) {
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
