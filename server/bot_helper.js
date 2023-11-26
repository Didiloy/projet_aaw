const { readAllQuotes, findQuotesByAuthor } = require("./database/script.js");

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

module.exports = { getAllQuotes, getQuotesByAuthor };
