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

  const data = {
    email: els.emailEl.value,
    password: els.passwordEl.value,
  };

  const [response, error] = await fetchData(loginUrl, 'POST', data);
  // issiaiskinti kaip padaryti su klaidom
  if (error) {
    console.log('Login error:', error);
    if (error.response.status === 401 && error.response) {
      console.log('Incorrect email or password');
    }
  } else {
    console.log('response ===', response);
  }
  if (response.msg === 'Login success') {
    // Store user information in local storage
    localStorage.setItem('loggedInUser', JSON.stringify({ email: data.email }));
    console.log('User data stored in local storage');
  }
}

// reikia kad jei isjungi browser issitrintu local storage
