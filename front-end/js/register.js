// eslint-disable-next-line import/extensions
import { fetchData, registerRolesUrl } from './modules/helper.js';

console.log('register.js file was loaded');

const els = {
  nameEl: document.getElementById('name'),
  passEl: document.getElementById('password'),
  rePassEl: document.getElementById('repasword'),
  radioDiv: document.getElementById('radio-input-block'),
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
    createRadioInput(role, index);
    console.log('role ===', role);
  });
});

function createRadioInput(option, index) {
  const roleInput = document.createElement('input');
  roleInput.setAttribute('type', 'radio');
  roleInput.setAttribute('id', `role-${index}`);
  roleInput.setAttribute('name', 'userRole');
  roleInput.setAttribute('value', option);

  const label = document.createElement('label');
  label.setAttribute('for', `role-${index}`);
  label.textContent = option;

  document.body.append(roleInput);
  document.body.append(label);
}
