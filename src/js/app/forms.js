import Inputmask from 'inputmask';

const fieldsData = {
  email: Array.from(document.querySelectorAll('.input-email')),
  phone: Array.from(document.querySelectorAll('.input-phone')),
};
const masksConfig = {
  email: {
    alias: 'email',
    showMaskOnHover: false,
  },
  phone: {
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
  }
};
const profileFormData = {
  recoveryForm: document.forms.recoveryForm,
  loginForm: document.forms.loginForm,
};
const { recoveryForm, loginForm } = profileFormData;

function handleInputValidation(arr,config) {
  arr.forEach((item) => {
    Inputmask(config).mask(item);
  });
}

Object.keys(fieldsData).forEach((fieldsDataArr) => {
  handleInputValidation(fieldsData[fieldsDataArr], masksConfig[fieldsDataArr]);
});

if(recoveryForm) {
  const profileFieldsData = {
    recoveryUsername: recoveryForm.elements.username,
    loginUsername: loginForm.elements.username,
    loginPassword: loginForm.elements.password,
  };
  const { recoveryUsername, loginUsername, loginPassword } = profileFieldsData;

  recoveryUsername.addEventListener('keyup', (e) => {
    loginPassword.required = false;
    loginUsername.value = e.target.value;
  });
  recoveryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginForm.submit();
  });
}
