import { Tablist } from '../components/Tablist';
import { TablistWithForm } from '../components/TablistWithForm';

const tabListConfig = {
  tabTogglerSel: '.section__tab-toggler',
  tabPaneSel: '.section__tab',
  tabPaneClassActive: 'section__tab_active',
};
const tabListsArr = Array.from(document.querySelectorAll('.section__tablist'));
tabListsArr.forEach((tabListsArrEl) => {
  const tablist = new Tablist(tabListsArrEl, tabListConfig);
  tablist.setEventListeners();
});

const formTabListConfig = {
  tabTogglerSel: '.product-tablist__toggler',
  tabPaneSel: '.product-tablist__pane',
  tabPaneClassActive: 'product-tablist__pane_active',
};
const formTabListsArr = Array.from(document.querySelectorAll('.section__tablist'));
formTabListsArr.forEach((formTabListsArrEl) => {
  const tablist = new TablistWithForm(formTabListsArrEl, formTabListConfig);
  tablist.init();
  tablist.setEventListeners();
});
