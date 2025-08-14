const BASE_URL = 'https://api-habitta.onrender.com';

async function registerUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(userData)
    });
    const result = await response.json();
    console.log(result);

  } catch (error) {
    console.error(error);
  }
}