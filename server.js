const e = require("express");
const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

//GET all quotes if no person, or get quotes matching person
app.get("/api/quotes", (req, res, next) => {
  //for some reason if(req.query == {}) does not work
  //use Object.keys instead to ensure length is 0
  if (Object.keys(req.query).length === 0) {
    const response = { quotes: quotes };
    res.send(response);
    console.log(quotes)
  } else {
    const person = req.query.person;
    const filteredQutoes = quotes.filter((quote) => quote.person === person);
    const filteredResponse = { quotes: filteredQutoes };
    res.send(filteredResponse);
  }
});

//GET random quote
app.get("/api/quotes/random", (req, res) => {
  const randomQuote = { quote: getRandomElement(quotes) };
  console.log(randomQuote);
  res.send(randomQuote);
});

//POST new quote
app.post("/api/quotes", (req, res) => {
  const newQuote = {
    id: quotes.length,
    quote: req.query.quote,
    person: req.query.person
  };

  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
    res.send(quotes)
  } else {
    res.status(400).send();
  }
});

app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
