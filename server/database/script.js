const { PrismaClient, Quote, User } = require("@prisma/client");

const prisma = new PrismaClient();

//=========crud User==========

async function createUser(usern, tok, isAd = false) {
  return await prisma.user.create({
    data: {
      username: usern,
      token: tok,
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

async function deleteUser(usern) {
  return await prisma.user.delete({
    where: {
      username: usern,
    },
  });
}

//=========crud Quote ============

async function createQuote(idq, cont, author) {
  return await prisma.quote.create({
    data: {
      id: idq,
      content: cont,
      authorId: author.username,
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

async function readAllQuotes() {
  return await prisma.quote.findMany();
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

async function createFavorite(idf, quote, user) {
  return await prisma.favorite.create({
    data: {
      id: idf,
      userId: user.username,
      quoteId: quote.id,
    },
  });
}

async function readFavorite(idf) {
  return await prisma.favorite.findUnique({
    where: {
      id: idf,
    },
  });
}

async function updateFavorite(idf, quote, user) {
  return await prisma.favorite.update({
    where: {
      id: idf,
    },
    data: {
      userId: user.username,
      quoteId: quote.id,
    },
  });
}

async function deleteFavorite(idf) {
  return await prisma.favorite.delete({
    where: {
      id: idf,
    },
  });
}

module.exports = {
  createUser,
  readUser,
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
};
