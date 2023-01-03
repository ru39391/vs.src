import {
  apiConfig,
  panelConfig,
  cartPanelConfig,
  cartFooterConfig,
  cartItemConfig
} from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { Cart } from '../components/Cart.js';
import { CartFooter } from '../components/CartFooter.js';
import { PanelWithCart } from '../components/PanelWithCart.js';

const api = new Api(apiConfig);
const {
  cartTogglerSel,
  cartEmptySel,
  cartFullSel,
  inactiveClassName,
  cartWrapperSel,
  cartFooterSel
} = cartPanelConfig;
const cartTogglerEl = document.querySelector(cartTogglerSel);
const cartItemTpl = document.querySelector(cartItemConfig.tplSel);
const cartEmptyEl = document.querySelector(cartEmptySel);
const cartFullEl = document.querySelector(cartFullSel);

const cartWrapperEl = cartFullEl.querySelector(cartWrapperSel);
const cartFooterEl = cartFullEl.querySelector(cartFooterSel);

function renderCartData() {
  Promise.all([api.getCartData(), api.getParamsData()])
  .then(([cartData, paramsData]) => {
    if(cartData.length) {
      const cartFooter =  new CartFooter(cartFooterEl, cartFooterConfig, paramsData);
      cartFooterEl.replaceWith(cartFooter.renderCartFooter());

      const cart =  new Cart({
        cartItemTpl,
        cartItemConfig,
        cartWrapper: cartWrapperEl,
        data: cartData,
        getCartSumm: (data) => {
          const currSummValue = Object.values(data).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
          cartFooter.setCartFooterData(currSummValue);
        }
      });
      cart.renderCartItems();
      cartEmptyEl.classList.add(inactiveClassName);
      cartFullEl.classList.remove(inactiveClassName);
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
