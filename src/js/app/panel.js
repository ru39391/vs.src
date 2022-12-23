import { PanelWithToggler } from '../components/PanelWithToggler';

const panelConfig = {
  panelSel: '.panel',
  panelClassActive: 'active',
  panelBtnCloseSel: '.panel__btn_close',
};
const panelTogglersArr = Array.from(document.querySelectorAll('.panel-toggler'));
panelTogglersArr.forEach((panelTogglersArrEl) => {
  //const panel = new PanelWithToggler(panelTogglersArrEl, panelConfig);
  //panel.setEventListeners();
});
