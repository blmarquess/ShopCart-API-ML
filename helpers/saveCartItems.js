const saveCartItems = () => {
  const $data = document.querySelector('.cart__items');
  localStorage.setItem('cesta', $data.innerHTML);
};

if (typeof module !== 'undefined') module.exports = saveCartItems;