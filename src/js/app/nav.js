import { Panel } from '../components/Panel';

const navEl = document.querySelector('.header__col_nav');
const navConfig = {
  panelClassActive: 'active',
  panelBtnShowSel: '.header__toggler_nav',
  panelBtnCloseSel: '.header__toggler_close'
};

const nav = new Panel(navEl, navConfig);
nav.setEventListeners();
