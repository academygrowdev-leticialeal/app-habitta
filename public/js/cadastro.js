import { formatDocument, formatPhone, updateForm } from './utils.js';

const pessoaFisicaRadio = document.getElementById('pessoaFisica');
const pessoaJuridicaRadio = document.getElementById('pessoaJuridica');
const meiRadio = document.getElementById('mei');
const documentField = document.getElementById('documentField');
const phoneInput = document.getElementById('phoneInput');
const termsCheck = document.getElementById('termsCheck');
const form = document.getElementById('register-form');

window.addEventListener('load', () => form.reset());

phoneInput.addEventListener('input', formatPhone);
documentField.addEventListener('input', formatDocument);

pessoaJuridicaRadio.addEventListener('change', () => updateForm(pessoaJuridicaRadio));
pessoaFisicaRadio.addEventListener('change', () => updateForm(pessoaFisicaRadio));
if (meiRadio) meiRadio.addEventListener('change', () => updateForm(meiRadio));

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.document = data.document.replace(/\D+/g, '');
  data.acceptTerms = termsCheck.checked;

  await registerUser(data);
});