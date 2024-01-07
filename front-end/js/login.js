// eslint-disable-next-line import/extensions
import { fetchData, loginUrl } from './modules/helper.js';

console.log('login.js file was loaded');

const els = {
  formEl: document.querySelector('form'),
  emailEl: document.getElementById('email'),
  passwordEl: document.getElementById('password'),
};

els.formEl.addEventListener('submit', loginToServer);

async function loginToServer(event) {
  event.preventDefault();

  const email = els.emailEl.value;
  const password = els.passwordEl.value;

  console.log('Email:', email); // Check the value of email
  console.log('Password:', password); // Check the value of password

  const data = {
    email,
    password,
  };

  const [response, error] = await fetchData(loginUrl, 'POST', data);

  if (error) {
    console.log('Login error:', error);
  } else {
    console.log('Login response:', response);
  }
}
