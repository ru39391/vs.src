import { apiConfig, cartItemConfig } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { CartItem } from '../components/CartItem.js';

const api = new Api(apiConfig);
const cartItemTpl = document.querySelector(cartItemConfig.tplSel);

Promise.all([api.getCartData(), api.getParamsData()])
.then(([cartData, paramsData]) => {
  //console.log(cartData, paramsData);
  cartData.forEach(cartDataItem => {
    const { key, uri, thumb, pagetitle, options, price, count, cost, remains } = cartDataItem;
    const cartItem = new CartItem(cartItemTpl, {
      cartItemConfig,
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
