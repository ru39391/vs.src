import { helpers } from '../utils/constants';
const { createEl } = helpers;

export class Selecter {
  constructor(selectEl, {
    selecterTplSel,
    selecterWrapperSel,
    selecterTogglerSel,
    selecterTitleSel,
    selecterListClass,
    selecterOptionClass,
    selecterClassActive
  }) {
    this._selecter = null;
    this._selectEl = selectEl;
    this._selectHolder = selectEl.parentNode;
    this._optionsArr = Array.from(this._selectEl.querySelectorAll('option'));
    this._selecterTpl = document.querySelector(selecterTplSel).content;
    this._selecterWrapperSel = selecterWrapperSel;
    this._selecterWrapper = this._selecterTpl.querySelector(selecterWrapperSel);
    this._selecterTogglerSel = selecterTogglerSel;
    this._selecterTitleSel = selecterTitleSel;
    this._selecterListClass = selecterListClass;
    this._selecterOptionClass = selecterOptionClass;
    this._selecterClassActive = selecterClassActive;
  }

  _createEl(className, textContent = null) {
    const el = createEl('div', className);
    if(textContent) {
      el.textContent = textContent;
    }
    return el;
  }

  _setEventListeners(option, selecterOption, selecterTitle) {
    selecterOption.addEventListener('click', () => {
      option.selected = true;
      selecterTitle.textContent = option.textContent;
    });
  }

  _toggleOptions(toggler, selecter) {
    toggler.addEventListener('click', () => {
      selecter.classList.toggle(this._selecterClassActive);
    });
    document.addEventListener('click', e => {
      if(!e.target.closest(this._selecterWrapperSel)) {
        selecter.classList.remove(this._selecterClassActive);
      }
    });
  }

  _hideOptions(toggler, selecter) {
    toggler.addEventListener('click', () => {
      selecter.classList.remove(this._selecterClassActive);
    });
  }

  init() {
    this._selectEl.style.display = 'none';
    this._selecter = this._selecterWrapper.cloneNode(true);
    const selecterToggler = this._selecter.querySelector(this._selecterTogglerSel);
    const selecterTitle = this._selecter.querySelector(this._selecterTitleSel);
    const selecterList = this._createEl(this._selecterListClass);

    this._optionsArr.forEach((item, index, arr) => {
      if(item.disabled) {
        selecterTitle.textContent = item.textContent;
      } else {
        const selecterOption = this._createEl(this._selecterOptionClass, item.textContent);
        selecterList.append(selecterOption);
        this._hideOptions(selecterOption, this._selecter);
        this._setEventListeners(item, selecterOption, selecterTitle);
      }
    });
    this._selecter.append(selecterList);
    this._selectHolder.append(this._selecter);
    this._toggleOptions(selecterToggler, this._selecter);
  }
}
