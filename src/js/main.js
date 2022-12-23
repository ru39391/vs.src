import '../scss/main.scss';

import './app/slides';
import './app/nav';
import './app/panel';
import './app/forms';
import './app/header';
import './app/dropdown';
//import './app/selecter';

/* tabs */
let sectionTabArr = [];
document.querySelectorAll('.section__tab').forEach(sectionTab => {
    sectionTabArr.push(sectionTab);
});
if(document.querySelector('.tab-toggler')){
    document.querySelector('.tab-toggler').addEventListener('click', (e) => {
        e.target.classList.toggle('active');
        sectionTabArr.forEach(sectionTabArrElem => {
            if(sectionTabArrElem.classList.contains('active')) {
                sectionTabArrElem.classList.remove('active');
            } else {
                sectionTabArrElem.classList.add('active');
            }
        });
    });
}

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

/* selecter
if(document.querySelector('.form__select_single')) {
    $('.form__select_single').dropdown({label: 'Выбрать'});
} */

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
