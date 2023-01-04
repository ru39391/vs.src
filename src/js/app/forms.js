import Inputmask from 'inputmask';
import { fieldsData, masksConfig, profileFormData } from '../utils/constants';

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
