export class CartFooter {
  constructor(cartFooter, {
    minprice,
    cartAlert,
    totalCaption,
    currencyCaption,
    counterCaption,
  }) {
    this._cartFooter = cartFooter;
    this._cartSummEl = null;
    this._cartCaptionEl = null;
    this._cartSummValueEl = null;
    this._minCartSumm = Number(minprice);
    this._cartAlert = cartAlert;
    this._totalCaption = totalCaption;
    this._currencyCaption = currencyCaption;
  }

  _createEl(tagName, className) {
    const el = document.createElement(tagName);
    el.classList.add(className);
    return el;
  }

  renderCartFooter() {
    this._cartSummEl = this._createEl('div', 'cart__summ');
    this._cartCaptionEl = this._createEl('span', 'cart__caption');
    this._cartSummValueEl = this._createEl('span', 'cart__summ-value');

    this._cartSummEl.append(this._cartCaptionEl);
    this._cartSummEl.append(this._cartSummValueEl);
    this._cartSummEl.append(this._currencyCaption);

    this._cartFooter.append(this._cartSummEl);
    return this._cartFooter;
  }

  setCartFooterData(value, className) {
    if(this._minCartSumm > Number(value)) {
      //this._cartSummEl.classList.add(className);
      this._cartFooter.classList.add(className);
      this._cartCaptionEl.textContent = this._cartAlert;
      this._cartSummValueEl.textContent = this._minCartSumm - Number(value);
    } else {
      //this._cartSummEl.classList.remove(className);
      this._cartFooter.classList.remove(className);
      this._cartCaptionEl.textContent = this._totalCaption;
      this._cartSummValueEl.textContent = Number(value);
    }
  }
}
