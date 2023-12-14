const { PrismaClient, Quote, User } = require("@prisma/client");

const prisma = new PrismaClient();

//=========crud User==========

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function createUser(usern, tok, discordId, isAd = false) {
  return await prisma.user.create({
    data: {
      username: usern,
      token: tok,
      discordId: discordId,
      isAdmin: isAd,
    },
  });
}

async function readUser(usern) {
  return await prisma.user.findUnique({
    where: {
      username: usern,
    },
  });
}

async function selectUserWhere(whereObject) {
  return await prisma.user.findMany({
    where: whereObject,
  });
}

async function updateUserFromDiscordId(
  discordId,
  usern,
  tok,
  isAd,
  newUsername = ""
) {
  return await prisma.user.update({
    where: {
      discordId: discordId,
      username: usern,
    },
    data: {
      username: newUsername || usern,
      isAdmin: isAd,
      token: tok,
    },
  });
}

async function updateUser(usern, isAd) {
  return await prisma.user.update({
    where: {
      username: usern,
    },
    data: {
      isAdmin: isAd,
    },
  });
}

async function updateUserToken(usern, token) {
  return await prisma.user.update({
    where: {
      username: usern,
    },
    data: {
      token: token,
    },
  });
}

async function deleteUser(usern) {
  return await prisma.user.delete({
    where: {
      username: usern,
    },
  });
}

async function deleteUserToken(usern) {
  return await prisma.user.update({
    where: {
      username: usern,
    },
    data: {
      token: "",
    },
  });
}

//=========crud Quote ============

async function createQuote(cont, author) {
  return await prisma.quote.create({
    data: {
      content: cont,
      authorId: author,
    },
  });
}

async function readQuote(idq) {
  return await prisma.quote.findUnique({
    where: {
      id: idq,
    },
  });
}

async function findQuotesByAuthor(author) {
  return await prisma.quote.findMany({
    where: {
      authorId: author,
    },
  });
}

async function readAllQuotes() {
  return await prisma.quote.findMany();
}

async function findQuotesBySearchTerm(query) {
  return await prisma.quote.findMany({
    where: {
      OR: [
        {
          content: {
            contains: query,
          },
        },
        {
          authorId: {
            contains: query,
          },
        },
      ],
    },
  });
}

async function updateQuote(idq, cont, author) {
  return await prisma.quote.update({
    where: {
      id: idq,
    },
    data: {
      content: cont,
      authorId: author.username,
    },
  });
}

async function deleteQuote(idq) {
  return await prisma.quote.delete({
    where: {
      id: idq,
    },
  });
}

//========= crud Favorite =============

async function createFavorite(user, quote) {
  return await prisma.favorite.create({
    data: {
      userId: user,
      quoteId: quote,
    },
  });
}

async function getUserFavorites(username) {
  return await prisma.favorite.findMany({
    where: {
      userId: username,
    },
  });
}

async function deleteFavorite(username, quote) {
  return await prisma.favorite.delete({
    where: {
      userId_quoteId: {
        userId: username,
        quoteId: quote,
      },
    },
  });
}

module.exports = {
  getAllUsers,
  createUser,
  readUser,
  updateUser,
  updateUserToken,
  deleteUser,
  createQuote,
  readQuote,
  readAllQuotes,
  updateQuote,
  deleteQuote,
  findQuotesByAuthor,
  createFavorite,
  getUserFavorites,
  deleteFavorite,
  selectUserWhere,
  updateUserFromDiscordId,
  findQuotesBySearchTerm,
  deleteUserToken,
};
