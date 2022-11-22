const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getIndexById = (id, arr) => {
  return arr.findIndex((quote) => {
    // return the index if the there is a match 
    return quote.id == id;
  });
}

module.exports = {
  getRandomElement,
  getIndexById
};
