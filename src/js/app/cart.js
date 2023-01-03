import { apiConfig, panelConfig, cartPanelConfig, cartItemConfig } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { Cart } from '../components/Cart.js';
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

const cartWrapper = cartFullEl.querySelector(cartWrapperSel);
const cartFooter = cartFullEl.querySelector(cartFooterSel);

function renderCartData() {
  Promise.all([api.getCartData(), api.getParamsData()])
  .then(([cartData, paramsData]) => {
    if(cartData.length) {
      //console.log(cartData, paramsData);
      cartEmptyEl.classList.add(inactiveClassName);
      cartFullEl.classList.remove(inactiveClassName);
      const cart =  new Cart({
        cartItemTpl,
        cartItemConfig,
        cartWrapper,
        data: cartData,
        params: paramsData,
        getCartSumm: (data) => {
          const minSummValue = Number(paramsData.minprice);
          const currSummValue = Object.values(data).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
          console.log(minSummValue, currSummValue);
          if(minSummValue > currSummValue) {
            cartFooter.textContent = `${paramsData.cartAlert} ${minSummValue - currSummValue} ${paramsData.currencyCaption}`;
          } else {
            cartFooter.textContent = '';
          }
        }
      });
      cart.renderCartItems();
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
