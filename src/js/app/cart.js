import {
  apiConfig,
  panelConfig,
  cartPanelConfig,
  cartFooterConfig,
  cartItemConfig,
  helpers
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
const { getEl } = helpers;

const cartTogglerEl = getEl(cartTogglerSel);
const cartEmptyEl = getEl(cartEmptySel);
const cartFullEl = getEl(cartFullSel);
const cartFooterEl = getEl(cartFooterSel, cartFullEl);

const cartFooter =  new CartFooter(cartFooterEl, cartFooterConfig);
const cart = new Cart({
  cartItemTpl: getEl(cartItemConfig.tplSel),
  cartItemConfig,
  cartWrapper: getEl(cartWrapperSel, cartFullEl),
  getCartSumm: (data) => {
    const currSummValue = Object.values(data).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    cartFooter.setCartFooterData(currSummValue);
  }
});

function togglePanels(hiddenPanel, visiblePanel, className) {
  if(hiddenPanel && visiblePanel) {
    hiddenPanel.classList.add(className);
    visiblePanel.classList.remove(className);
  }
}

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
      togglePanels(cartEmptyEl, cartFullEl, inactiveClassName);
    } else {
      togglePanels(cartFullEl, cartEmptyEl, inactiveClassName);
    };
  })
  .catch((err) => {
    console.log(err);
  });
}

if(cartTogglerEl) {
  const cartPanel = new PanelWithCart(cartTogglerEl, panelConfig);
  cartPanel.setEventListeners();
  cartPanel.renderData(() => {
    renderCartData();
  });

  miniShop2.Callbacks.add('Cart.add.response.success', 'cartAddSuccess', () => {
    cartPanel.showPanel();
  });
} else {
  renderCartData();
}
