const {
  readAllQuotes,
  findQuotesByAuthor,
  getUserFavorites,
} = require("./database/script.js");

const getAllQuotes = async () => {
  const all_quotes_in_json = await readAllQuotes();
  let all_quotes_string = "";
  all_quotes_in_json.forEach((quote) => {
    all_quotes_string += "**" + quote.authorId + "**: " + quote.content + "\n";
  });
  return all_quotes_string;
};

const getQuotesByAuthor = async (author) => {
  const all_quotes_in_json = await findQuotesByAuthor(author);
  let all_quotes_string = "";
  all_quotes_in_json.forEach((quote) => {
    all_quotes_string += "**" + quote.authorId + "**: " + quote.content + "\n";
  });
  return all_quotes_string;
};

const getFavoritesQuotes = async (username) => {
  console.log("username: " + username);
  let response_quotes_string = "";
  const favorites_quotes_in_json = await getUserFavorites(username);
  const all_quotes_in_json = await readAllQuotes();
  let favorites_quotes_id = [];
  favorites_quotes_in_json.forEach((quote) => {
    favorites_quotes_id.push(quote.quoteId);
  });

  all_quotes_in_json.map((citation) => {
    if (favorites_quotes_id.includes(citation.id)) {
      response_quotes_string +=
        "**" + citation.authorId + "**: " + citation.content + "\n";
    }
  });
  return response_quotes_string;
};

module.exports = { getAllQuotes, getQuotesByAuthor, getFavoritesQuotes };
