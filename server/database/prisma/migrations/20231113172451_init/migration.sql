-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "discordId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "tokenCreation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Quote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "quoteId" INTEGER NOT NULL,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorite_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
