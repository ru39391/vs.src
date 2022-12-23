import '../scss/main.scss';

import './app/slides';
import './app/nav';
import './app/tabs';
import './app/panel';
import './app/forms';
import './app/header';
import './app/dropdown';
import './app/selecter';

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
