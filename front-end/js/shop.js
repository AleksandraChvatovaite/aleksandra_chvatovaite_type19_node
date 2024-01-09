// eslint-disable-next-line quotes
import { getDataFetch } from "./modules/helper.js";

const shopItemsUrl = 'http://localhost:3000/v1/api/shop_items';

console.log('shop.js file was loaded');

const els = {
  shopItemsList: document.getElementById('shop-items'),
};

const [shopItemsArr, shopErr] = await getDataFetch(shopItemsUrl);

console.log('shopItemsArr ===', shopItemsArr);
if (Array.isArray(shopItemsArr)) {
  renderItemCard(shopItemsArr);
}

function renderItemCard(arr) {
  els.shopItemsList.innerHTML = '';
  // pagaminti html elementus
  arr.map(makeOneShopItem).forEach((htmlEl) => {
    console.log('htmlEl ===', htmlEl);
    els.shopItemsList.append(htmlEl);
  });
}
function makeOneShopItem(itemObj) {
  console.log('itemObj ===', itemObj);
  const liEl = document.createElement('li');
  liEl.className = 'shop-item';
  liEl.dataset.itemId = itemObj.shop_item_id;
  liEl.innerHTML = `
  <img src="${itemObj.image}" style="width:100%">
        <h3>${itemObj.shop_item_name}</h3>
        <p class="price">${itemObj.price}</p>
        <div class="btn-wrap">
          <button class="btn-shop">Add to Cart</button>
          <button id="delete" class="btn-shop">Delete</button>
        </div>
  `;
  // const btnEl = liEl.querySelector('button');
  // btnEl.addEventListener('click', deleteShopItem);

  return liEl;
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
