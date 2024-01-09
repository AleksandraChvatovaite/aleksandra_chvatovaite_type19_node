export const baseUrl = 'http://localhost:3000/v1/api';
export const loginUrl = `${baseUrl}/auth/login`;
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
