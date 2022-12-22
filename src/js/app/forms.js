import Inputmask from 'inputmask';

const emailFieldsArr = Array.from(document.querySelectorAll('.input-email'));
const phoneFieldsArr = Array.from(document.querySelectorAll('.input-phone'));

emailFieldsArr.forEach((emailFieldsArrEl) => {
  Inputmask({
    alias: 'email',
    showMaskOnHover: false,
  }).mask(emailFieldsArrEl);
});

phoneFieldsArr.forEach((phoneFieldsArrEl) => {
  Inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
  }).mask(phoneFieldsArrEl);
});
