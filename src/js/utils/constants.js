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
  cartWrapperSel: '.cart__wrapper',
  cartFooterSel: '.cart__footer',
  inactiveClassName: 'd-none'
};

export const cartFooterConfig = {
  cartSummClassName: 'cart__summ',
  cartSummMod: 'cart__summ_mb_none',
  cartCaptionClassName: 'cart__caption',
  cartSummValueClassName: 'cart__summ-value',
  cartBtnClassNameArr: ['btn', 'btn_md'],
  cartFooterClassName: 'text-center',
};

export const cartItemConfig = {
  tplSel: '.cart-item',
  rowSel: '.pos',
  keyFieldSel: '.pos__product-key',
  linkSel: '.pos__picture',
  titleSel: '.pos__title',
  counterSel: '.recalculate__value',
  counterFieldSel: '.recalculate__field',
  decreaseBtnSel: '.recalculate__btn_remove',
  increaseBtnSel: '.recalculate__btn_add',
  changeBtnSel: '.recalculate__handler',
  costSel: '.pos__cost',
  formRemoveSel: '[name="cart_item_remove"]',
  pictureClassName: 'img-fluid',
};

export const apiConfig = {
  baseUrl: `${window.location.origin}/api`,
};
