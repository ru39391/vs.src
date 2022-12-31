import { apiConfig, panelConfig, cartPanelConfig, cartItemConfig } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { CartItem } from '../components/CartItem.js';
import { PanelWithCart } from '../components/PanelWithCart.js';

const api = new Api(apiConfig);
const { cartTogglerSel, cartEmptySel, cartFullSel, inactiveClassName } = cartPanelConfig;
const cartTogglerEl = document.querySelector(cartTogglerSel);
const cartItemTpl = document.querySelector(cartItemConfig.tplSel);
const cartEmptyEl = document.querySelector(cartEmptySel);
const cartFullEl = document.querySelector(cartFullSel);

function renderCartData() {
  Promise.all([api.getCartData(), api.getParamsData()])
  .then(([cartData, paramsData]) => {
    if(cartData.length) {
      //console.log(cartData, paramsData);
      cartEmptyEl.classList.add(inactiveClassName);
      cartFullEl.classList.remove(inactiveClassName);
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
        console.log(cartItem.createCartItem());
      });
    } else {
      cartEmptyEl.classList.remove(inactiveClassName);
      cartFullEl.classList.add(inactiveClassName);
    };
  })
  .catch((err) => {
    console.log(err);
  });
}

const cartPanel = new PanelWithCart(cartTogglerEl, panelConfig);
cartPanel.setEventListeners();
cartPanel.renderData(() => {
  renderCartData();
});
