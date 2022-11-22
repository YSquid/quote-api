const e = require("express");
const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement, getIndexById } = require("./utils");

const PORT = process.env.PORT || 4001;

//GET all quotes if no person, or get quotes matching person
app.get("/api/quotes", (req, res, next) => {
  //for some reason if(req.query == {}) does not work
  //use Object.keys instead to ensure length is 0
  if (Object.keys(req.query).length === 0) {
    const response = { quotes: quotes };
    res.send(response);
    console.log(quotes);
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
    person: req.query.person,
  };

  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
    res.send(quotes);
  } else {
    res.status(400).send();
  }
});

//PUT quote by ID
//Why is my check for quoteIndex !== -1 breaking things???
//I think my checks werent working because I was using strict compare = in the array the id's are number, but in the params they come as string
app.put("/api/quotes/:id", (req, res) => {
  const id = req.params.id;
  const quote = req.query.quote;
  const person = req.query.person;
  if (id && quote && person) {
    const quoteIndex = getIndexById(id, quotes)
    if (quoteIndex !== -1) {
      quotes[quoteIndex] = {
        id: id,
        quote: quote,
        person: person,
      };
      res.send({quote: quotes[quoteIndex]});
    } else {
      res.status(400).send('Quote index not found')
    }
  } else {
    res.status(400).send('Missing parameter in request');
  }
});

app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
