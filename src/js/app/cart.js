import { apiConfig, panelConfig, cartPanelConfig, cartItemConfig } from '../utils/constants.js';
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

function createEl(tagName, className) {
  const el = document.createElement(tagName);
  el.classList.add(className);
  return el;
}

function renderCartData() {
  Promise.all([api.getCartData(), api.getParamsData()])
  .then(([cartData, paramsData]) => {
    if(cartData.length) {
      const { minprice } = paramsData;
      const cartFooter =  new CartFooter(cartFooterEl, paramsData);
      console.log(cartFooter);
      cartFooterEl.replaceWith(cartFooter.renderCartFooter());
      const cart =  new Cart({
        cartItemTpl,
        cartItemConfig,
        cartWrapper: cartWrapperEl,
        data: cartData,
        getCartSumm: (data) => {
          const minSummValue = Number(minprice);
          const currSummValue = Object.values(data).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
          cartFooter.setCartFooterData(currSummValue, 'text-center');
          console.log(minSummValue, currSummValue);
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
