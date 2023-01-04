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

const { getEl } = helpers;
const {
  cartTogglerSel,
  cartEmptySel,
  cartFullSel,
  inactiveClassName,
  cartWrapperSel,
  cartFooterSel
} = cartPanelConfig;

const cartTogglerEl = getEl(cartTogglerSel);
const cartEmptyEl = getEl(cartEmptySel);
const cartFullEl = getEl(cartFullSel);
const cartFooterEl = getEl(cartFooterSel, cartFullEl);
const orderBtnEl = getEl(cartFooterConfig.orderBtnSel);

const api = new Api(apiConfig);
const cartFooter =  new CartFooter(cartFooterEl, orderBtnEl, cartFooterConfig);
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
  if(cartFooterEl) {
    cartFooterEl.replaceWith(cartFooter.renderCartFooter(res));
  }
})
.catch((err) => {
  console.log(err);
});

function renderCartData() {
  Promise.all([api.getCartData(), api.getPromoKeysData()])
  .then(([cartData, promoKeysData]) => {
    const cartDataArr = cartData.map((item) => {
      const {
        key,
        uri,
        thumb,
        pagetitle,
        options,
        price,
        count,
        cost,
        remains
      } = item;
      return {
        key,
        uri,
        thumb,
        pagetitle,
        options,
        price,
        count,
        cost,
        remains,
        pcode: promoKeysData.find((item) => {
          if(item.key == key) {
            return item;
          }
        })
      }
    });
    if(cartDataArr.length) {
      cart.renderCartItems(cartDataArr);
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

$(document).on('mspc2_set', (e, response) => {
  const { data } = response;
  cart.getDiscountAmount(data.discount_amount);
});

$(document).on('mspc2_unset', (e, response) => {
  const { data } = response;
  cart.getDiscountAmount(data.discount_amount);
});
