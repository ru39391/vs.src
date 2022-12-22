/* styles */
import 'swiper/swiper.scss';
import '../scss/main.scss';

/* jumbotron */
const jumbotronGallery = new Swiper('.jumbotron__slides', {
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 1000,
  	autoplay: {
		delay: 7000,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.jumbotron__btn_next',
		prevEl: '.jumbotron__btn_prev',
	}
});

function setCaption(toggler, targetSel, className) {
    const target = document.querySelector(targetSel);
    if(toggler.classList.contains(className)) {
        target.textContent = toggler.textContent;
    }
}

document.body.addEventListener('click', (e) => {
    switch(e.target == document.querySelector('.header__toggler_nav')) {
        case true:
        e.preventDefault();
        document.querySelector('.header__col_nav').classList.toggle('active');
        break;

        case false:
        if (e.target == document.querySelector('.header__toggler_close') || !e.target.closest('.header__col_nav')) {
            document.querySelector('.header__col_nav').classList.remove('active');
        }
        break;
    }

    switch(e.target.getAttribute('data-toggle') == 'panel') {
        case true:
        e.preventDefault();
        document.querySelector(`${e.target.getAttribute('data-target')}`).classList.add('active');
        document.querySelector('#office-login-form-password').required = true;
        if (e.target.classList.contains('panel__toggler')) {
            e.target.closest('.panel').classList.remove('active');
        }
        break;

        case false:
        if(e.target.classList.contains('panel__btn_close') || !e.target.closest('.panel__wrapper')) {
			document.querySelectorAll('.panel').forEach(panel => {
				if(panel.classList.contains('active') && e.target.closest('.panel')) {
					e.target.closest('.panel').classList.remove('active');
				}
			});
        }
        break;
    }

    switch(e.target.classList.contains('category__placeholder')) {
        case true:
            e.target.closest('.category').classList.toggle('active');
            break;

        case false:
            //console.log(e.target, e.target.textContent);
            setCaption(e.target, '.category__title', 'toggler-title');
            if(document.querySelector('.category')) {
                document.querySelector('.category').classList.remove('active');
            }
        break;
    }
    //console.log(e.target);
});

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

/* selecter */
if(document.querySelector('.form__select_single')) {
    $('.form__select_single').dropdown({label: 'Выбрать'});
}

/* header */
window.addEventListener('scroll', () => {
    if(window.scrollY > document.querySelector('.header').scrollHeight) {
        document.querySelector('.header').classList.add('affix');
    } else {
        document.querySelector('.header').classList.remove('affix');
    }
});

/* forms */
import Inputmask from 'inputmask';

document.querySelectorAll('.input-email').forEach(field => {
	Inputmask({
		alias: 'email',
        showMaskOnHover: false,
	}).mask(field);
});

document.querySelectorAll('.input-phone').forEach(field => {
	Inputmask({
		mask: '+7 (999) 999-99-99',
        showMaskOnHover: false,
	}).mask(field);
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
