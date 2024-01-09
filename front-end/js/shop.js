// eslint-disable-next-line import/extensions
import { getDataFetch, renderUserNavigation, conditionallyRenderAddItem } from './modules/helper.js';

const shopItemsUrl = 'http://localhost:3000/v1/api/shop_items';

console.log('shop.js file was loaded');

const els = {
  shopItemsList: document.getElementById('shop-items'),
};

const [shopItemsArr, shopErr] = await getDataFetch(shopItemsUrl);

console.log('shopItemsArr ===', shopItemsArr);
if (Array.isArray(shopItemsArr)) {
  renderItemCards(shopItemsArr);
}

renderUserNavigation();
conditionallyRenderAddItem();

function renderItemCards(arr) {
  els.shopItemsList.innerHTML = '';
  const isUserAdmin = localStorage.getItem('loggedInUserRole') === 'admin';
  // pagaminti html elementus
  arr.map((e) => makeOneShopItem(e, isUserAdmin)).forEach((htmlEl) => {
    console.log('htmlEl ===', htmlEl);
    els.shopItemsList.append(htmlEl);
  });
}
function makeOneShopItem(itemObj, isUserAdmin) {
  const liEl = document.createElement('li');
  liEl.className = 'shop-item';
  liEl.dataset.itemId = itemObj.shop_item_id;

  const img = document.createElement('img');
  img.setAttribute('src', itemObj.image);
  img.setAttribute('style', 'width: 100%');
  liEl.append(img);

  const h3 = document.createElement('h3');
  h3.textContent = itemObj.shop_item_name;
  liEl.append(h3);

  const p = document.createElement('p');
  p.setAttribute('class', 'price');
  p.textContent = itemObj.price;
  liEl.append(p);

  const div = document.createElement('div');
  div.setAttribute('class', 'btn-wrap');
  liEl.append(div);

  const addButton = document.createElement('button');
  addButton.setAttribute('class', 'btn-shop');
  addButton.textContent = 'Add to cart';
  div.append(addButton);
  addButton.addEventListener('click', () => addToCart(itemObj));

  if (isUserAdmin) {
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn-shop');
    deleteButton.textContent = 'Delete';
    div.append(deleteButton);

    deleteButton.addEventListener('click', () => deleteItem(itemObj));
  }

  return liEl;
}

function addToCart(item) {
  console.log('tu pridedi itema: ', item);
}

function deleteItem(item) {
  console.log('tu deletini itema: ', item);
}



const shopItem = {
  description: 'Gold bracelet with a diamond',
  image: 'https://auksomeistrai.lt/image/cache/catalog/APYRANKES/balto-aukso-apyranke-grandinele-su-briliantu-0,03-600x600.jpg',
  is_archived: '0',
  item_type_id: '1',
  price: '259.00',
  shop_item_id: '1',
  shop_item_name: 'Bracelet',
};

console.log('shopErr ===', shopErr);
