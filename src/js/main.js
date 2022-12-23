import '../scss/main.scss';

import './app/slides';
import './app/nav';
import './app/tabs';
import './app/panel';
import './app/forms';
import './app/header';
import './app/dropdown';
import './app/selecter';

let boxArr = [];
document.querySelectorAll('.ms2_product[id*="size"]').forEach(boxElem => {
    boxArr.push(boxElem);
});
document.querySelectorAll('.form__toggler[name="size"]').forEach(sizeToggler => {
    sizeToggler.addEventListener('change', (e) => {
        boxArr.forEach(boxArrElem => {
            boxArrElem.classList.add('d-none');
        });
        switch(e.target.checked) {
            case true:
            if(document.querySelector(`.ms2_product[id="${ e.target.getAttribute('value') }"]`).classList.contains('d-none')) {
                document.querySelector(`.ms2_product[id="${ e.target.getAttribute('value') }"]`).classList.remove('d-none');
            }
            break;

            case false:
            if(document.querySelector(`.ms2_product[id="${ e.target.getAttribute('value') }"]`).classList.contains('d-none')) {
                document.querySelector(`.ms2_product[id="${ e.target.getAttribute('value') }"]`).classList.add('d-none');
            }
            break;
        }
    })
});

/* auth */
if(document.querySelector('#office-auth-recovery-username')) {
    document.querySelector('#office-auth-recovery-username').addEventListener('keyup', (e) => {
        document.querySelector('#office-login-form-password').required = false;
        document.querySelector('#office-auth-login-username').value = e.target.value;
    });
    document.querySelector('#office-auth-recovery-submit').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#office-auth-login-submit').click();
    });
}
