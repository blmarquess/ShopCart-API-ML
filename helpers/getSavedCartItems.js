const getSavedCartItems = () => {
  const $data = localStorage.getItem('cesta');
    document.querySelector('ol.cart__items').innerHTML = $data;
};

if (typeof module !== 'undefined') module.exports = getSavedCartItems;
