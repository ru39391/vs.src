export const fieldsData = {
  email: Array.from(document.querySelectorAll('.input-email')),
  phone: Array.from(document.querySelectorAll('.input-phone')),
};

export const masksConfig = {
  email: {
    alias: 'email',
    showMaskOnHover: false,
  },
  phone: {
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
  }
};

export const profileFormData = {
  recoveryForm: document.forms.recoveryForm,
  loginForm: document.forms.loginForm,
};

export const panelConfig = {
  panelSel: '.panel',
  panelClassActive: 'active',
  panelBtnCloseSel: '.panel__btn_close',
};

export const cartPanelConfig = {
  cartTogglerSel: '.header__toggler_cart',
  cartEmptySel: '.cart_type_empty',
  cartFullSel: '.cart_type_full',
  inactiveClassName: 'd-none'
}

export const cartItemConfig = {
  tplSel: '.cart-item',
  rowSel: '.pos',
  keyFieldSel: '.pos__product-key',
  linkSel: '.pos__picture',
  pictureSel: '.img-fluid',
  titleSel: '.pos__title',
  counterSel: '.recalculate__value',
  counterFieldSel: '.recalculate__field',
  decreaseBtnSel: '.recalculate__btn_remove',
  increaseBtnSel: '.recalculate__btn_add',
  changeBtnSel: '.recalculate__handler',
  costSel: '.pos__cost',
  formRemoveSel: '[name="cart_item_remove"]',
}

export const apiConfig = {
  baseUrl: `${window.location.origin}/api`,
}
