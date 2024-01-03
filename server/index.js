const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const {
  getAllUsers,
  readUser,
  createUser,
  updateUserToken,
  updateUser,
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
  getUserFavorites,
  findQuotesBySearchTerm,
  deleteUserToken,
} = require("./database/script.js");
const bot = require("./bot.js");
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
    "https://discord.com/api/oauth2/authorize?client_id=1172524572537532529&redirect_uri=" +
    process.env.DISCORD_REDIRECT_URI +
    "&response_type=code&scope=identify";
  res.redirect(url);
});

app.get("/auth/logout", async (req, res) => {
  res.clearCookie("projet_aaw_token");
  res.redirect(process.env.CLIENT_REDIRECT_URL);
});

app.get("/auth/discord/callback", async (req, res) => {
  if (!req.query.code) throw new Error("Code not provided.");

  const { code } = req.query;
  // console.log("code: " + code);
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

  const token = await sign({ sub: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  if (checkIfUserExists.length > 0) {
    const oldUsername = checkIfUserExists[0].username;
    const isAdmin = checkIfUserExists[0].isAdmin;
    await updateUserFromDiscordId(id, oldUsername, token, isAdmin, username);
  } else {
    try {
      await createUser(username, token, id, false);
    } catch (err) {
      console.log(err);
    }
  }

  var cookie = req.cookies.projet_aaw_token;
  if (cookie === undefined) {
    res.cookie("projet_aaw_token", token, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
    });
  } else {
    res.cookie("projet_aaw_token", token);
  }
  res.redirect(process.env.CLIENT_REDIRECT_URL);
});

app.get("/api/is-authenticated", async (req, res) => {
  const token = req.cookies.projet_aaw_token;
  if (token === undefined) {
    res.json({ isAuthenticated: false });
  } else {
    if (token == "") {
      res.json({ isAuthenticated: false });
    } else {
      try {
        const { sub, exp } = verify(token, process.env.JWT_SECRET);
        const user = await selectUserWhere({ discordId: sub });
        //verifier si l'utilisateur a le token en base de données
        if (user[0].token == "") {
          res.cookie("projet_aaw_token", "");
          res.json({
            isAuthenticated: false,
            user: {
              username: user[0].username,
              isAdmin: user[0].isAdmin,
            },
          });
          return;
        }
        let user_token_date = new Date(exp * 1000);
        let now = new Date();
        if (user_token_date.getTime() / 1000 > now.getTime() / 1000) {
          //si la date d'expiration du token est plus grand que la date actuelle
          // const new_token = sign({ sub: sub }, process.env.JWT_SECRET, {
          //   expiresIn: "7d",
          // });
          // //si le token n'est pas expiré
          // await updateUserToken(user.username, new_token);
          // console.log("updated token");
          res.json({
            isAuthenticated: true,
            user: {
              username: user[0].username,
              isAdmin: user[0].isAdmin,
            },
          });
        } else {
          //si le token est expiré il faut le supprimer de la base de données
          await deleteUserToken(user[0].username);
          res.cookie("projet_aaw_token", "");

          res.json({
            isAuthenticated: false,
            user: {
              username: user[0].username,
              isAdmin: user[0].isAdmin,
            },
          });
        }
      } catch (e) {
        console.log("error: " + e);
        res.json({ isAuthenticated: false });
      }
    }
  }
});

//======= User ======

app.get("/api/get-all-users", async function (req, res) {
  const users = await getAllUsers();
  res.json(users);
});

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
  const isAd = req.body.isAdmin;
  console.log("username: " + username);
  console.log("isAd: " + isAd);
  const user = await updateUser(username, isAd);
  console.log("updated: " + user);
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

app.get("/api/disconnect-user/:username", async function (req, res) {
  const usern = req.params.username;
  const user = await readUser(usern);
  await deleteUserToken(usern);
  res.json(user);
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
  // console.log(quotes);
  res.json(quotes);
});

app.get("/api/get-quotes/:search_term", async (req, res) => {
  const search_term = req.params.search_term;
  const quotes = await findQuotesBySearchTerm(search_term);
  res.json(quotes);
});

app.post("/api/create-quote", async function (req, res) {
  //crée une citation
  const cont = req.body.content;
  const author = req.body.authorId;
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
    console.log("success deleting quote: " + quote);
    response.message = "quote deleted with success ! ";
    res.status(200).json(response);
  } catch (err) {
    response.message = "Error during deleting quote   " + err;
    response.isDeleted = false;
    console.log("error deleting quote: " + err);
    res.status(500).json(response);
  }
});

//Favorite Management

app.post("/api/create-favorite", async function (req, res) {
  //creation of Favorite
  const quote = parseInt(req.body.quoteId);
  const user = req.body.userId;
  const favorite = await createFavorite(user, quote);
  res.json(favorite);
});

app.get("/api/get-favorites/:username", async function (req, res) {
  const username = req.params.username;
  const favorites = await getUserFavorites(username);
  res.json(favorites);
});

app.delete("/api/delete-favorite/:username/:quote", async function (req, res) {
  //delete favorite
  const username = req.params.username;
  const quoteId = parseInt(req.params.quote);
  const response = { isDeleted: true };
  try {
    const favorite = await deleteFavorite(username, quoteId);
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
