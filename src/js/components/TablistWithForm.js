import { Tablist } from './Tablist';

export class TablistWithForm extends Tablist {
  constructor(tabList, {
    tabTogglerSel,
    tabPaneSel,
    tabPaneClassActive,
  }) {
    super(tabList, {
      tabTogglerSel,
      tabPaneSel,
      tabPaneClassActive,
    });
    this._tabPanesArr = [];
    this._tabPaneSel = tabPaneSel;
    this._tabTogglersArr = Array.from(this._tabList.querySelectorAll(tabTogglerSel));
  }

  _toggleTab(item) {
    const tabPaneActive = this._tabList.querySelector(`#${item.value}`);
    this._tabPanesArr = Array.from(this._tabList.querySelectorAll(this._tabPaneSel));
    this._showTab(tabPaneActive);
    this._tabPanesArr.splice(this._tabPanesArr.indexOf(tabPaneActive), 1);
    this._tabPanesArr.forEach((tabPanesArrEl) => {
      this._closeTab(tabPanesArrEl);
    });
  }

  init() {
    this._tabTogglersArr.forEach((tabTogglersArrEl) => {
      if(tabTogglersArrEl.checked) {
        this._toggleTab(tabTogglersArrEl);
      };
    });
  }

  setEventListeners() {
    this._tabTogglersArr.forEach((tabTogglersArrEl) => {
      tabTogglersArrEl.addEventListener('change', (e) => {
        this._toggleTab(e.target);
      });
    });
  }
}
