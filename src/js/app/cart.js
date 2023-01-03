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

const cartFooter =  new CartFooter(cartFooterEl, cartFooterConfig);
const cart =  new Cart({
  cartItemTpl,
  cartItemConfig,
  cartWrapper: cartWrapperEl,
  getCartSumm: (data) => {
    const currSummValue = Object.values(data).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    cartFooter.setCartFooterData(currSummValue);
  }
});

api.getParamsData()
.then((res) => {
  cartFooterEl.replaceWith(cartFooter.renderCartFooter(res));
})
.catch((err) => {
  console.log(err);
});

function renderCartData() {
  api.getCartData()
  .then((res) => {
    if(res.length) {
      cart.renderCartItems(res);
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
