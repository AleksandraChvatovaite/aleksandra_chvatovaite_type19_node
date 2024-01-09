// eslint-disable-next-line import/extensions
import { fetchData, registerRolesUrl, registerUrl } from './modules/helper.js';

console.log('register.js file was loaded');

const els = {
  nameEl: document.getElementById('name'),
  emailEl: document.getElementById('email'),
  passEl: document.getElementById('password'),
  rePassEl: document.getElementById('repasword'),
  radioDiv: document.getElementById('radio-input-block'),
  btnEl: document.getElementById('register'),
  errorEl: document.getElementById('error'),
};

async function getUserRoles() {
  const [response, error] = await fetchData(registerRolesUrl, 'GET');
  if (error) {
    console.log('Register error:', error);
    if (error.status === 401 && error) {
      els.errorEl.textContent = 'Could not retrieve data';
    }
  } else {
    return response;
  }
  return [];
}

// let userRoles;

getUserRoles().then((response) => {
  const userRolesArr = response;
  userRolesArr.forEach((roleObj, index) => {
    const role = roleObj.user_roles_name;
    const roleValue = roleObj.user_roles_id;
    createRadioInput(role, roleValue, index);
  });
});

function createRadioInput(optionName, optionValue, index) {
  const inputBlock = document.createElement('div');
  inputBlock.classList.add('input-block');

  const roleInput = document.createElement('input');
  roleInput.setAttribute('type', 'radio');
  roleInput.setAttribute('id', `role-${index}`);
  roleInput.setAttribute('name', 'userRole');
  roleInput.setAttribute('value', optionValue);

  const label = document.createElement('label');
  label.setAttribute('for', `role-${index}`);
  label.textContent = optionName;

  inputBlock.append(roleInput);
  inputBlock.append(label);

  els.radioDiv.append(inputBlock);
}

els.btnEl.addEventListener('click', registerPerson);

async function registerPerson(event) {
  event.preventDefault();

  const data = {
    name: els.nameEl.value,
    email: els.emailEl.value,
    password: els.passEl.value,
    roleId: els.radioDiv.querySelector('input[type = radio]:checked')?.value,
  };

  const [response, error] = await fetchData(registerUrl, 'POST', data);
  if (error) {
    console.log('Register error', error);
  } else {
    console.log('response ===', response);
  }
  if (response.msg === 'Success') {
    console.log('daryt kazka');
  }
}

//  gauti statusa kai 400 ir zinute kai email jau toks yra
