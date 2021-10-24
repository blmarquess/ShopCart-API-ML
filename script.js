function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const imgCartIten = (imgSrc) => {
  img = document.createElement('img');
  img.className = 'item__image_cart';
  img.src = imgSrc;
  return img;
};

const totalCartIten = () => {
  const valueItems = [];
  const total = document.querySelector('.price_itens');
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => valueItems.push(item.innerText.split('$')[1]));
  valueItems.map((item) => Number(item));
  const newTotal = valueItems.reduce((acc, crv) => Number(acc) + Number(crv), 0);
  total.innerText = `Total price: $ ${newTotal}`;
};

const refresh = () => {
  saveCartItems();
  return totalCartIten();
};

const $cartItens = document.querySelector('.cart__items');
$cartItens.addEventListener('click', (event) => {
  const $item = event.target;
  if ($item.tagName === 'LI') { $item.remove(); return refresh(); }
  if ($item.tagName === 'P') { $item.parentNode.remove(); return refresh(); }
  if ($item.tagName === 'IMG') { $item.parentNode.remove(); return refresh(); }
  if ($item.tagName === 'path') {
    $item.parentNode.previousSibling.parentNode.parentNode.remove();
    return refresh();
  }
});

function createCartItemElement({ id: sku, title: name, price: pice, thumbnail: imG }) {
  const $li = document.createElement('li');
  const $xX = '<i class="fas fa-times"></i>';
  $li.className = 'cart__item';
  $li.setAttribute('sku', `${sku}`);
  $li.innerHTML = `<p class="item_desc">SKU: ${sku} | NAME: ${name} | PRICE: $${pice}${$xX}`;
  $li.appendChild(imgCartIten(imG));
  return $li;
}

async function getSkuFromProductItem(event) {
  const $rest = await fetchItem(event.target.parentNode.querySelector('span.item__sku').innerText);
  document.querySelector('ol.cart__items').appendChild(createCartItemElement($rest));
  refresh();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price: pice }) {
  const $section = document.createElement('section');
  $section.className = 'item';
  $section.addEventListener('click', getSkuFromProductItem);
  $section.appendChild(createCustomElement('span', 'item__sku', sku));
  $section.appendChild(createCustomElement('span', 'item__title', name));
  $section.appendChild(createProductImageElement(image));
  $section.appendChild(createCustomElement('span', 'item__price', `R$: ${pice}`));
  $section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return $section;
}

const $btnClrCart = document.querySelector('.empty-cart');
$btnClrCart.addEventListener('click', () => {
  document.querySelector('ol.cart__items').innerHTML = '';
  return saveCartItems();
});

const loadStart = () => {
  document.querySelector('.items').innerHTML = '';
  document.querySelector('.items').style.display = 'none';
  const $load = document.querySelector('.loading');
  $load.innerText = 'carregando...';
};

const loadStop = () => {
  document.querySelector('.items').style.display = 'flex';
  const $loadText = document.querySelector('#loadtext');
  $loadText.innerHTML = '';
  document.querySelector('.load').style.display = 'none';
};

const sharload = () => {
  document.querySelector('.items').innerHTML = '';
  document.querySelector('.items').style.display = 'none';
  document.querySelector('.load').style.display = 'flex';
};

const search = async (item = 'computador') => {
  sharload();
  await fetchProducts(item).then((inventory) => {
    inventory.results.forEach((product) => document.querySelector('.items')
      .appendChild(createProductItemElement(product)));
  }); loadStop();
  getSavedCartItems(); totalCartIten();
};

const toEnter = (e) => {
  const { value } = e.target;
  const key = e.keyCode;
  if (key === 13) search(value);
};

const $search = document.querySelector('.searchI');
$search.addEventListener('keydown', toEnter);
$search.addEventListener('blur', () => {
  search($search.value);
});

window.onload = () => {
  loadStart();
  search();
};