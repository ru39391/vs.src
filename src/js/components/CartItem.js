export class CartItem {
  constructor(cartItemTpl, {
    cartItemConfig,
    cartItemId,
    cartItemTitle,
    cartItemUrl,
    cartItemPrice,
    cartItemPic,
    cartItemRemains,
    cartItemKey,
    cartItemCount,
    cartItemCost,
    cartItemOptions,
  }) {
    this._cartItemConfig = cartItemConfig;
    this._cartItemTpl = null;//cartItemTpl.content.querySelector(this._cartItemConfig.rowSel);
    this._cartItemId = cartItemId;
    this._cartItemTitle = cartItemTitle;
    this._cartItemUrl = cartItemUrl;
    this._cartItemPrice = cartItemPrice;
    this._cartItemPic = cartItemPic;
    this._cartItemRemains = cartItemRemains;
    this._cartItemKey = cartItemKey;
    this._cartItemCount = cartItemCount;
    this._cartItemCost = cartItemCost;
    this._cartItemOptions = cartItemOptions;
  }

  _removeEl(el) {
    el.remove();
    el = null;
  }

  _decreaseItemCounter() {

  }

  _increaseItemCounter() {
  }

  _setCartItemCost() {

  }

  _setEventListeners() {

  }

  _setEventListeners() {

  }

  removeCartItem() {
  }

  createCartItem() {
    console.log(`${this._cartItemTitle} стоит ${this._cartItemPrice} руб.`);
  }
}
