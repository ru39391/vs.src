export class Panel {
  constructor(panel, {
    panelActiveClass,
    panelBtnShowSel,
    panelBtnCloseSel,
  }) {
    this._panel = panel;
    this._panelActiveClass = panelActiveClass;
    this._panelBtnShow = document.querySelector(panelBtnShowSel);
    this._panelBtnClose = this._panel.querySelector(panelBtnCloseSel);
  }

  _showPanel() {
    this._panel.classList.add(this._panelActiveClass);
    document.body.style.overflow = 'hidden';
  }

  _closePanel() {
    this._panel.classList.remove(this._panelActiveClass);
    document.body.style = null;
  }

  setEventListeners() {
    this._panelBtnShow.addEventListener('click', () => {
      this._showPanel();
    });

    this._panelBtnClose.addEventListener('click', () => {
      this._closePanel();
    });

    this._panel.addEventListener('click', e => {
      if (e.target == e.currentTarget) {
        this._closePanel();
      }
    });
  }
}
