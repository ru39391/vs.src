import { helpers } from '../utils/constants';
const { createEl, removeEl } = helpers;

export class CartFooter {
  constructor(cartFooter, orderBtn, config) {
    this._cartFooter = cartFooter;
    this._cartFooterChildNodesArr = Boolean(this._cartFooter) ? Array.from(this._cartFooter.childNodes) : [];
    this._cartFooterConfig = config;
    this._cartBtn = null;
    this._cartSummEl = null;
    this._cartCaptionEl = null;
    this._cartSummValueEl = null;
    this._orderBtn = orderBtn;
    this._minCartSumm = 0;
    this._cartUrl = '';
    this._cartAlert = '';
    this._totalCaption = '';
    this._currencyCaption = '';
    this._btnCaption = '';
  }

  _removeEl(el) {
    removeEl(el);
  }

  _createEl(tagName, className) {
    return createEl(tagName, className);
  }

  renderCartFooter(data) {
    const {
      minprice,
      cartUrl,
      cartAlert,
      totalCaption,
      currencyCaption,
      btnCaption
    } = data;
    const { cartSummClassName, cartCaptionClassName, cartSummValueClassName } = this._cartFooterConfig;

    this._minCartSumm = Number(minprice);
    this._cartUrl = cartUrl;
    this._cartAlert = cartAlert;
    this._totalCaption = totalCaption;
    this._currencyCaption = currencyCaption;
    this._btnCaption = btnCaption;

    this._cartFooterChildNodesArr.forEach((cartFooterChildNodesArrEl) => {
      this._removeEl(cartFooterChildNodesArrEl);
    });

    this._cartSummEl = this._createEl('div', cartSummClassName);
    this._cartCaptionEl = this._createEl('span', cartCaptionClassName);
    this._cartSummValueEl = this._createEl('span', cartSummValueClassName);

    this._cartSummEl.append(this._cartCaptionEl);
    this._cartSummEl.append(this._cartSummValueEl);
    this._cartSummEl.append(this._currencyCaption);

    this._cartFooter.append(this._cartSummEl);
    return this._cartFooter;
  }

  _setBtnEventListeners() {
    if(this._orderBtn) {
      this._cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this._orderBtn.dispatchEvent(new MouseEvent('click'));
      });
    }
  }

  _hideBtnOrder(value, { cartSummMod, cartFooterClassName }) {
    this._cartSummEl.classList.remove(cartSummMod);
    this._cartFooter.classList.add(cartFooterClassName);
    this._cartCaptionEl.textContent = this._cartAlert;
    this._cartSummValueEl.removeAttribute('id');
    this._cartSummValueEl.textContent = this._minCartSumm - Number(value);

    if(this._cartBtn) {
      this._cartBtn.remove();
      this._cartBtn = null;
    }
  }

  _showBtnOrder(value, { cartSummMod, cartFooterClassName, cartBtnId, cartBtnClassNameArr }) {
    this._cartSummEl.classList.add(cartSummMod);
    this._cartFooter.classList.remove(cartFooterClassName);
    this._cartCaptionEl.textContent = this._totalCaption;
    this._cartSummValueEl.id = cartBtnId;
    this._cartSummValueEl.textContent = Number(value);

    if(!this._cartBtn) {
      this._cartBtn = this._createEl('a', cartBtnClassNameArr[0]);
      this._cartBtn.classList.add(cartBtnClassNameArr[1]);
      this._cartBtn.href = this._cartUrl;
      this._cartBtn.textContent = this._btnCaption;
      this._cartFooter.append(this._cartBtn);
      this._setBtnEventListeners();
    }
  }

  setCartFooterData(value) {
    const {
      cartSummMod,
      cartFooterClassName,
      cartBtnId,
      cartBtnClassNameArr
    } = this._cartFooterConfig;

    if(this._minCartSumm > Number(value)) {
      this._hideBtnOrder(value, {
        cartSummMod,
        cartFooterClassName
      });
    } else {
      this._showBtnOrder(value, {
        cartSummMod,
        cartFooterClassName,
        cartBtnId,
        cartBtnClassNameArr,
      });
    }
  }
}
