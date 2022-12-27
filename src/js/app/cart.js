import { apiConfig, cartItemConfig } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { CartItem } from '../components/CartItem.js';

const { baseUrl } = apiConfig;
const api = new Api({ baseUrl });
const cartItemTpl = document.body;

Promise.all([api.getCartData(), api.getParamsData()])
.then(([cartData, paramsData]) => {
  //console.log(cartData, paramsData);
  cartData.forEach(cartDataItem => {
    const { key, id, uri, thumb, pagetitle, options, price, count, cost, remains } = cartDataItem;
    const cartItem = new CartItem(cartItemTpl, {
      cartItemConfig,
      cartItemId: id,
      cartItemTitle: pagetitle,
      cartItemUrl: uri,
      cartItemPrice: price,
      cartItemPic: thumb,
      cartItemRemains: remains,
      cartItemKey: key,
      cartItemCount: count,
      cartItemCost: cost,
      cartItemOptions: options,
    });
    cartItem.createCartItem();
  });
})
.catch((err) => {
  console.log(err);
});
