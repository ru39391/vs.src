export class Dropdown {
  constructor(dropdown, {
    dropdownClassActive,
    dropdownTogglerSel,
    dropdownCaptionSel,
    dropdownItemSel,
  }) {
    this._dropdown = dropdown;
    this._dropdownClassActive = dropdownClassActive;
    this._dropdownToggler = this._dropdown.querySelector(dropdownTogglerSel);
    this._dropdownCaption = this._dropdown.querySelector(dropdownCaptionSel);
    this._dropdownItemsArr = Array.from(this._dropdown.querySelectorAll(dropdownItemSel));
  }

  _isDropdownActive() {
    return this._dropdown.classList.contains(this._dropdownClassActive);
  }

  _showDropdown() {
    this._dropdown.classList.add(this._dropdownClassActive);
  }

  _closeDropdown() {
    this._dropdown.classList.remove(this._dropdownClassActive);
  }

  _toggleDropdown() {
    if(this._isDropdownActive()) {
      this._closeDropdown();
    } else {
      this._showDropdown();
    }
  }

  setEventListeners() {
    this._dropdownToggler.addEventListener('click', () => {
      this._toggleDropdown();
    });

    this._dropdownItemsArr.forEach((dropdownItemsArr) => {
      dropdownItemsArr.addEventListener('click', (e) => {
        this._dropdownCaption.textContent = e.currentTarget.textContent.trim();
      });
    });

    document.addEventListener('click', (e) => {
      if (e.target !== this._dropdownToggler) {
        this._closeDropdown();
      }
    });
  }
}
