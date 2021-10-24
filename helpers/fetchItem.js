const base = 'https://api.mercadolibre.com/items/';
const fetchItem = (objQuery) => fetch(`${base}${objQuery}`)
  .then((response) => response.json())
    .then((product) => product)
      .catch((error) => console.log(error));

if (typeof module !== 'undefined') module.exports = fetchItem;
