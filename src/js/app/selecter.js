import {Selecter} from '../components/Selecter';

const formSelectsArr = Array.from(document.querySelectorAll('.form__select_single'));
const formSelectConfig = {
  selecterTplSel: '.selecter-template',
  selecterWrapperSel: '.category',
  selecterTogglerSel: '.category__placeholder',
  selecterTitleSel: '.category__title',
  selecterListClass: 'category__list',
  selecterOptionClass: 'category__item',
  selecterClassActive: 'category_active'
};
formSelectsArr.forEach(formSelectsArrEl => {
  const selecter = new Selecter(formSelectsArrEl, formSelectConfig);
  selecter.init();
});
