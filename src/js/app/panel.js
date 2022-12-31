import { PanelWithToggler } from '../components/PanelWithToggler';
import { panelConfig } from '../utils/constants.js';

const panelTogglersArr = Array.from(document.querySelectorAll('.panel-toggler'));
panelTogglersArr.forEach((panelTogglersArrEl) => {
  const panel = new PanelWithToggler(panelTogglersArrEl, panelConfig);
  panel.setEventListeners();
});
