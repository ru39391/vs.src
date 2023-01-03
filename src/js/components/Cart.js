export class Cart {
  constructor({
    cartItemTpl,
    cartItemConfig,
    cartWrapper,
    data,
    params,
    getCartSumm
  }) {
    this._cartItemConfig = cartItemConfig;
    this._cartItemTpl = cartItemTpl.content.querySelector(this._cartItemConfig.rowSel);
    this._cartWrapper = cartWrapper;
    this._cartWrapperChildNodesArr = Array.from(cartWrapper.childNodes);
    this._cartItemsArr = data;
    this._cartParams = params;
    this._cartData = {};
    this._getCartSumm = getCartSumm;
  }

  _getEl(parentEl, sel) {
    return parentEl.querySelector(sel);
  }

  _createEl({tagName, className, parentEl}) {
    const el = document.createElement(tagName);
    el.classList.add(className);
    parentEl.append(el);
    return el;
  }

  _removeEl(el) {
    el.remove();
    el = null;
  }

  _setCartItemCost({
    value,
    price
  }) {
    const cartItemPrice = Number(price.replace(/\s/gi, ''));
    return cartItemPrice*value;
  }

  _setCartSumm(key, value) {
    this._cartData[key] = value;
    this._getCartSumm(this._cartData);
  }

  _handleItemCounter(targetBtn, siblingBtn, condition, elems, valuesData) {
    const {
      changeBtnEl,
      counterFieldEl,
      counterEl,
      costEl
    } = elems;
    const {
      key,
      value
    } = valuesData;
    const cartItemCost = this._setCartItemCost(valuesData);

    siblingBtn.disabled = false;
    targetBtn.disabled = Boolean(condition);

    counterFieldEl.value = value;
    counterEl.textContent = value;
    costEl.textContent = cartItemCost;

    changeBtnEl.dispatchEvent(new MouseEvent('click'));
    this._setCartSumm(key, cartItemCost);
  }

  _setBtnEventListeners(data) {
    const {
      values,
      btns,
      elems,
    } = data;
    const {
      key,
      price,
      remainsValue,
    } = values;
    const {
      decreaseBtnEl,
      increaseBtnEl
    } = btns;
    const { counterFieldEl } = elems;

    decreaseBtnEl.addEventListener('click', (e) => {
      const value = Number(counterFieldEl.value) - 1;
      this._handleItemCounter(e.target, increaseBtnEl, value === 1, elems, { key, value, price });
    });

    increaseBtnEl.addEventListener('click', (e) => {
      const value = Number(counterFieldEl.value) + 1;
      this._handleItemCounter(e.target, decreaseBtnEl, value === remainsValue, elems, { key, value, price });
    });
  }

  _setFormEventListeners(key, el, form) {
    form.addEventListener('submit', () => {
      this._removeEl(el);
      this._setCartSumm(key, 0);
    });
  }

  _createCartItem(item) {
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
    const {
      keyFieldSel,
      linkSel,
      titleSel,
      counterSel,
      counterFieldSel,
      decreaseBtnSel,
      increaseBtnSel,
      changeBtnSel,
      costSel,
      formRemoveSel,
      pictureClassName
    } = this._cartItemConfig;
    const countValue = Number(count);
    const remainsValue = Number(remains);
    const cartItemEl = this._cartItemTpl.cloneNode(true);
    cartItemEl.id = key;

    const keyFieldsArr = Array.from(cartItemEl.querySelectorAll(keyFieldSel));
    for(let i = 0; i < keyFieldsArr.length; i++) {
      keyFieldsArr[i].value = key;
    }

    const linkEl = this._getEl(cartItemEl, linkSel);
    linkEl.href = uri;
    linkEl.title = pagetitle;

    const titleEl = this._getEl(cartItemEl, titleSel);
    titleEl.textContent = pagetitle;

    const pictureEl = this._createEl({
      tagName: 'img',
      className: pictureClassName,
      parentEl: linkEl
    });
    pictureEl.src = thumb;
    pictureEl.alt = pagetitle;

    const counterEl = this._getEl(cartItemEl, counterSel);
    counterEl.textContent = countValue;

    const counterFieldEl = this._getEl(cartItemEl, counterFieldSel);
    counterFieldEl.value = countValue;

    const costEl = this._getEl(cartItemEl, costSel);
    costEl.textContent = cost;

    const decreaseBtnEl = this._getEl(cartItemEl, decreaseBtnSel);
    decreaseBtnEl.disabled = Boolean(countValue === 1);

    const increaseBtnEl = this._getEl(cartItemEl, increaseBtnSel);
    increaseBtnEl.disabled = Boolean(countValue === remainsValue);

    const changeBtnEl = this._getEl(cartItemEl, changeBtnSel);
    const cartFormRemove = this._getEl(cartItemEl, formRemoveSel);

    this._cartData[key] = this._setCartItemCost({
      value: countValue,
      price
    });

    this._setBtnEventListeners({
      values: {
        key,
        price,
        remainsValue,
      },
      btns: {
        decreaseBtnEl,
        increaseBtnEl,
      },
      elems: {
        changeBtnEl,
        counterFieldEl,
        counterEl,
        costEl
      }
    });
    this._setFormEventListeners(key, cartItemEl, cartFormRemove);

    return cartItemEl;
  }

  renderCartItems() {
    this._cartWrapperChildNodesArr.forEach((cartWrapperChildNodesArrEl) => {
      this._removeEl(cartWrapperChildNodesArrEl);
    });
    this._cartItemsArr.forEach((cartItemsArrEl) => {
      const cartItem = this._createCartItem(cartItemsArrEl);
      this._cartWrapper.append(cartItem);
    });
    this._getCartSumm(this._cartData);
  }
}
