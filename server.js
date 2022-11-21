const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {quote: getRandomElement(quotes)}
    console.log(randomQuote)
    res.send(randomQuote)
})


