import { PrismaClient, Quote, User } from '@prisma/client'

const prisma = new PrismaClient()

//=========crud User==========

export async function createUser(usern: string, tok: string, isAd=false){
  await prisma.user.create({
    data: {
        username: usern,
        token: tok,
        isAdmin: isAd
    },
  })
}

export async function readUser(usern: string){
  return await prisma.user.findUnique({
    where: {
      username: usern
    }
  })
}

export async function updateUser(usern: string, isAd: boolean){
  await prisma.user.update({
    where: {
      username: usern
    },
    data: {
      isAdmin: isAd
    },
  })
}

export async function deleteUser(usern: string){
  await prisma.user.delete({
    where: {
      username: usern
    }
  })
}

//=========crud Quote ============

export async function createQuote(idq: number, cont: string, author: User ){
  await prisma.quote.create({
    data: {
        id: idq,
        content: cont,
        authorId: author.username     
    },
  })
}

export async function readQuote(idq: number){
  return await prisma.quote.findUnique({
    where: {
      id: idq
    }
  })
}

export async function updateQuote(idq: number, cont: string, author: User ){
  await prisma.quote.update({
    where: {
      id: idq
    },
    data: {
      content: cont,
      authorId:author.username
    },
  })
}

export async function deleteQuote(idq: number){
  await prisma.quote.delete({
    where: {
      id: idq
    }
  })
}

//========= crud Favorite =============

export async function createFavorite(idf: number, quote: Quote, user: User ){
  await prisma.favorite.create({
    data: {
      id: idf,
      userId: user.username,
      quoteId: quote.id
    },
  })
}

export async function readFavorite(idf: number){
  return await prisma.favorite.findUnique({
    where: {
      id: idf
    }
  })
}

export async function updateFavorite(idf: number, quote: Quote, user: User  ){
  await prisma.favorite.update({
    where: {
      id: idf
    },
    data: {
      userId: user.username,
      quoteId: quote.id
    },
  })
}

export async function deleteFavorite(idf: number){
  await prisma.favorite.delete({
    where: {
      id: idf
    }
  })
}
