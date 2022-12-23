export class Tablist {
  constructor(tabList, {
    tabTogglerSel,
    tabPaneSel,
    tabPaneClassActive,
  }) {
    this._tabList = tabList;
    this._tabToggler = this._tabList.querySelector(tabTogglerSel);
    this._tabPanesArr = Array.from(this._tabList.querySelectorAll(tabPaneSel));
    this._tabPaneClassActive = tabPaneClassActive;
  }

  _isTabActive(item) {
    return item.classList.contains(this._tabPaneClassActive);
  }

  _showTab(item) {
    item.classList.add(this._tabPaneClassActive);
  }

  _closeTab(item) {
    item.classList.remove(this._tabPaneClassActive);
  }

  _toggleTab(item) {
    if(this._isTabActive(item)) {
      this._closeTab(item);
    } else {
      this._showTab(item);
    }
  }

  setEventListeners() {
    this._tabToggler.addEventListener('click', () => {
      this._tabPanesArr.forEach((tabPanesArrEl) => {
        this._toggleTab(tabPanesArrEl);
      });
    });
  }
}
