import { Panel } from './Panel.js';

export class PanelWithToggler extends Panel {
  constructor(panel, {
    panelSel,
    panelActiveClass,
    panelBtnCloseSel,
  }) {
    super(panel, {
      panelActiveClass,
      panelBtnCloseSel,
    });
    this._panelArr = [];
    this._panelSel = panelSel;
    this._panelBtnShow = panel;
    this._panelTarget = panel.getAttribute('data-target');
    this._panel = document.querySelector(this._panelTarget);
    this._panelBtnClose = this._panel.querySelector(panelBtnCloseSel);
  }

  _closeSiblings() {
    this._panelArr = Array.from(document.querySelectorAll(this._panelSel));
    const panelCurrentIndex = this._panelArr.indexOf(this._panel);
    this._panelArr.splice(panelCurrentIndex,1);
    for(let i = 0; i < this._panelArr.length; i++) {
      this._panelArr[i].classList.remove(this._panelActiveClass);
    }
  }

  _showPanel() {
    super._showPanel();
    this._closeSiblings();
  }
}
