import { Dropdown } from '../components/Dropdown';

const dropdownConfig = {
  dropdownClassActive: 'category_active',
  dropdownTogglerSel: '.category__placeholder',
  dropdownCaptionSel: '.category__title',
  dropdownItemSel: '.category__item',
};
const dropdownsArr = Array.from(document.querySelectorAll('.category'));
dropdownsArr.forEach((dropdownsArrEl) => {
  const dropdown = new Dropdown(dropdownsArrEl, dropdownConfig);
  dropdown.setEventListeners();
});
