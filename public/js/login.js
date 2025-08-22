import { formatText } from './utils.js';

const form = document.getElementById('login-form');
const submitButton = form.elements['submit'];
const rememberCheck = document.getElementById('rememberCheck');

function disableForm() {
  form.querySelectorAll('input, button').forEach(element => element.disabled = true);
  submitButton.lastElementChild.innerText = 'Enviando...';
  submitButton.firstElementChild.classList.remove('d-none');
}

function enableForm() {
  form.querySelectorAll('input, button').forEach(element => element.disabled = false);
  submitButton.lastElementChild.innerText = 'Entrar';
  submitButton.firstElementChild.classList.add('d-none');
}

function checkLogged() {
  if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
    window.location.href = './home.html';
  }
}

checkLogged();

window.addEventListener('load', () => form.reset());

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  let errorMessage;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  disableForm();
  const result = await userLogin(data);
  enableForm();

  if (result.success) {
    const storage = rememberCheck.checked ? localStorage : sessionStorage;
    storage.setItem('token', result.data.token);
    storage.setItem('userData', JSON.stringify(result.data.user));
    window.location.href = './home.html';
    return;
  }
  
  if (result.details) {
    result.details.forEach(detail => {
      const field = form.elements[detail.field];
      if (field) errorMessage = formatText(detail.description);
    });
  }
  
  const failModal = new bootstrap.Modal(document.getElementById('failModal'));
  document.getElementById('error-message').innerText = errorMessage ?? 'Email ou senha incorretos.';
  failModal.show();  
});