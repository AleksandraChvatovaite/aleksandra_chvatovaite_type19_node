export const baseUrl = 'http://localhost:3000/v1/api';
export const loginUrl = `${baseUrl}/auth/login`;
export const registerUrl = `${baseUrl}/auth/register`;
export const registerRolesUrl = `${baseUrl}/user_roles`;
export const shopItemsUrl = `${baseUrl}/shop_items`;

export async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: resp.status,
        message: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}

export async function fetchData(url, method, data = null) {
  try {
    const requestOptions = {
      method,
      // body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    if (method === 'POST') {
      requestOptions.body = JSON.stringify(data);
    }
    const resp = await fetch(url, requestOptions);
    if (resp.ok === false) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: resp.status,
        message: resp.statusText,
      };
    }
    const responseData = await resp.json();
    return [responseData, null];
  } catch (error) {
    console.log('error fetchData ===', error);
    return [null, error];
  }
}

export function conditionallyRenderAddItem() {
  const isUserAdmin = localStorage.getItem('loggedInUserRole') === 'admin';
  if (isUserAdmin) {
    const navLinks = document.getElementsByClassName('nav-links')[0];
    const addItemLi = document.createElement('li');

    const addItem = document.createElement('a');
    addItem.setAttribute('href', 'add-item.html');
    addItem.textContent = 'Add item';
    addItemLi.append(addItem);

    navLinks.append(addItemLi);
  }
}

export function renderUserNavigation() {
  const userRole = localStorage.getItem('loggedInUserRole');
  const isUserLoggedIn = userRole === 'admin' || userRole === 'user';
  const mainNav = document.getElementsByClassName('main-nav')[0];
  const existingLogNav = document.getElementsByClassName('log-unlog-nav');
  if (existingLogNav.length > 0) {
    mainNav.removeChild(existingLogNav[0]);
  }
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'log-unlog-nav');
  mainNav.append(ul);
  if (isUserLoggedIn) {
    const li = document.createElement('li');
    li.addEventListener('click', () => logOut());
    const a = document.createElement('a');
    a.setAttribute('href', 'login.html');
    a.textContent = 'Log out';
    li.append(a);
    ul.append(li);
  } else {
    const liLogIn = document.createElement('li');
    const aLogIn = document.createElement('a');
    aLogIn.setAttribute('href', 'login.html');
    aLogIn.textContent = 'Login';
    liLogIn.append(aLogIn);
    ul.append(liLogIn);

    const liRegister = document.createElement('li');
    const aRegister = document.createElement('a');
    aRegister.setAttribute('href', 'register.html');
    aRegister.textContent = 'Register';
    liRegister.append(aRegister);
    ul.append(liRegister);
  }
}

export function logOut() {
  localStorage.clear();
  renderUserNavigation();
}
