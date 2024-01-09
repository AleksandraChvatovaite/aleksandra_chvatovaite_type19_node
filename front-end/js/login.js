// eslint-disable-next-line import/extensions
import { fetchData, loginUrl } from './modules/helper.js';

console.log('login.js file was loaded 123');

const els = {
  formEl: document.querySelector('form'),
  emailEl: document.getElementById('email'),
  passwordEl: document.getElementById('password'),
  errorEl: document.getElementById('error'),
};

els.formEl.addEventListener('submit', loginToServer);

// window.addEventListener('beforeunload', () => {
//   localStorage.removeItem('loggedInUser');
// });

async function loginToServer(event) {
  event.preventDefault();

  const data = {
    email: els.emailEl.value,
    password: els.passwordEl.value,
  };

  const [response, error] = await fetchData(loginUrl, 'POST', data);
  // issiaiskinti kaip padaryti su klaidom
  console.log('message is:', response);
  if (error) {
    console.log('Login error:', error);
    if (error.status === 401 && error) {
      els.errorEl.textContent = 'Incorrect email or password';
    }
  } else {
    console.log('response ===', response);
  }
  if (response.msg === 'Login success') {
    // Store user information in local storage
    // localStorage.setItem('loggedInUser',
    // JSON.stringify({ email: data.email, role: response.userRole }));
    localStorage.setItem('loggedInUserEmail', data.email);
    localStorage.setItem('loggedInUserRole', response.userRole);
    console.log('User data stored in local storage');
    window.location = 'shop.html';
  }
}

// reikia kad jei isjungi browser issitrintu local storage
