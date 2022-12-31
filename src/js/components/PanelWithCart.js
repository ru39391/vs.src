import { PanelWithToggler } from './PanelWithToggler.js';

export class PanelWithCart extends PanelWithToggler {
  constructor(panel, {
    panelSel,
    panelClassActive,
    panelBtnCloseSel,
  }) {
    super(panel, {
      panelSel,
      panelClassActive,
      panelBtnCloseSel,
    });
  }

  renderData(handler) {
    this._renderData = handler;
  }

  _showPanel() {
    super._showPanel();
    this._renderData();
  }
}
