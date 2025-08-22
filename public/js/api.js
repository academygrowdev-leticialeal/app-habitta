const BASE_URL = 'https://api-habitta.onrender.com';

async function registerUser(userData) {
  return await postRequest('auth/register', userData);
}

async function userLogin(userData) {
  return await postRequest('auth/login', userData);
}

async function postRequest(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data)
    });
    return await response.json();

  } catch (error) {
    console.error(error);
  }
}