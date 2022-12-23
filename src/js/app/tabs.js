import { Tablist } from '../components/Tablist';

const tabListConfig = {
  tabTogglerSel: '.tab-toggler',
  tabPaneSel: '.tab-pane',
  tabPaneClassActive: 'active',
};
const tabListsArr = Array.from(document.querySelectorAll('.tab-list'));
tabListsArr.forEach((tabListsArrEl) => {
  const tablist = new Tablist(tabListsArrEl, tabListConfig);
  tablist.setEventListeners();
});
