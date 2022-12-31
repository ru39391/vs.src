export class CartItem {
  constructor(cartItemTpl, {
    cartItemConfig,
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
    this._cartItemTpl = cartItemTpl.content.querySelector(this._cartItemConfig.rowSel);
    this._cartItemTitle = cartItemTitle;
    this._cartItemUrl = cartItemUrl;
    this._cartItemPrice = cartItemPrice;
    this._cartItemPic = cartItemPic;
    this._cartItemRemains = Number(cartItemRemains);
    this._cartItemKey = cartItemKey;
    this._cartItemCount = Number(cartItemCount);
    this._cartItemCost = cartItemCost;
    this._cartItemOptions = cartItemOptions;
    this._cartItemEl = null;
    this._keyFieldEl = null;
    this._linkEl = null;
    this._pictureEl = null;
    this._titleEl = null;
    this._counterEl = null;
    this._counterFieldEl = null;
    this._decreaseBtnEl = null;
    this._increaseBtnEl = null;
    this._changeBtnEl = null;
    this._costEl = null;
    this._cartFormRemove = null;
  }

  _getEl(parentEl, sel) {
    return parentEl.querySelector(sel);
  }

  _removeCartItem(el) {
    el.remove();
    el = null;
  }

  _setCartItemCost(value) {
    const cartItemPrice = Number(this._cartItemPrice.replace(/\s/gi, ''));
    return cartItemPrice*value;
  }

  _handleItemCounter(value, targetBtn, siblingBtn, condition) {
    this._counterFieldEl.value = value;
    this._counterEl.textContent = value;
    this._costEl.textContent = this._setCartItemCost(value);
    siblingBtn.disabled = false;
    targetBtn.disabled = Boolean(condition);
    this._changeBtnEl.dispatchEvent(new MouseEvent('click'));
  }

  _decreaseItemCounter(value) {
    this._handleItemCounter(value, this._decreaseBtnEl, this._increaseBtnEl, value === 1);
  }

  _increaseItemCounter(value) {
    this._handleItemCounter(value, this._increaseBtnEl, this._decreaseBtnEl, value === this._cartItemRemains);
  }

  _setEventListeners() {
    this._decreaseBtnEl.addEventListener('click', () => {
      const value = Number(this._counterFieldEl.value) - 1;
      this._decreaseItemCounter(value);
    });

    this._increaseBtnEl.addEventListener('click', () => {
      const value = Number(this._counterFieldEl.value) + 1;
      this._increaseItemCounter(value);
    });

    this._cartFormRemove.addEventListener('submit', () => {
      this._removeCartItem(this._cartItemEl);
    });
  }

  createCartItem() {
    const {
      keyFieldSel,
      linkSel,
      pictureSel,
      titleSel,
      counterSel,
      counterFieldSel,
      decreaseBtnSel,
      increaseBtnSel,
      changeBtnSel,
      costSel,
      formRemoveSel,
    } = this._cartItemConfig;
    this._cartItemEl = this._cartItemTpl.cloneNode(true);
    this._cartItemEl.id = this._cartItemKey;

    this._keyFieldEl = Array.from(this._cartItemEl.querySelectorAll(keyFieldSel));
    for(let i = 0; i < this._keyFieldEl.length; i++) {
      this._keyFieldEl[i].value = this._cartItemKey;
    }

    this._linkEl = this._getEl(this._cartItemEl, linkSel);
    this._linkEl.href = this._cartItemUrl;
    this._linkEl.title = this._cartItemTitle;

    this._titleEl = this._getEl(this._cartItemEl, titleSel);
    this._titleEl.textContent = this._cartItemTitle;

    this._counterEl = this._getEl(this._cartItemEl, counterSel);
    this._counterEl.textContent = this._cartItemCount;

    this._counterFieldEl = this._getEl(this._cartItemEl, counterFieldSel);
    this._counterFieldEl.value = this._cartItemCount;

    this._costEl = this._getEl(this._cartItemEl, costSel);
    this._costEl.textContent = this._cartItemCost;

    this._decreaseBtnEl = this._getEl(this._cartItemEl, decreaseBtnSel);
    this._decreaseBtnEl.disabled = Boolean(this._cartItemCount === 1);

    this._increaseBtnEl = this._getEl(this._cartItemEl, increaseBtnSel);
    this._increaseBtnEl.disabled = Boolean(this._cartItemCount === this._cartItemRemains);

    this._pictureEl = document.createElement('img');
    this._pictureEl.src = this._cartItemPic;
    this._pictureEl.alt = this._cartItemTitle;
    this._pictureEl.classList.add(pictureSel);
    this._linkEl.append(this._pictureEl);

    this._changeBtnEl = this._getEl(this._cartItemEl, changeBtnSel);
    this._cartFormRemove = this._getEl(this._cartItemEl, formRemoveSel);

    this._setEventListeners();
    return this._cartItemEl;
  }
}
