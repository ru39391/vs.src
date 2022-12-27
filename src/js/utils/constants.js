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

export const cartItemConfig = {
  rowSel: '.pos',
  keyFieldSel: '.pos__product-key',
  linkSel: '.pos__picture',
  pictureSel: '.img-fluid',
  titleSel: '.pos__title',
  counterSel: '.recalculate__value',
  counterFieldSel: '.recalculate__field',
  decreaseBtnSel: '.recalculate__btn_remove',
  increaseBtnSel: '.recalculate__btn_add',
  costSel: '.pos__cost',
}

export const apiConfig = {
  baseUrl: 'http://o-batat.local/api',
}
