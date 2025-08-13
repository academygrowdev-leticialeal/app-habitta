 // Script para alternar CPF/CNPJ e Nome/Razão Social
const pessoaFisicaRadio = document.getElementById('pessoaFisica');
const pessoaJuridicaRadio = document.getElementById('pessoaJuridica');
const documentField = document.getElementById('documentField');
const nameInput = document.getElementById('nameInput');
const termsCheck = document.getElementById('termsCheck');

pessoaFisicaRadio.addEventListener('change', () => {
  nameInput.placeholder = 'Nome completo';
  documentField.placeholder = 'CPF';
});

pessoaJuridicaRadio.addEventListener('change', () => {
  nameInput.placeholder = 'Razão Social';
  documentField.placeholder = 'CNPJ';
});

const form = document.getElementById('register-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.acceptTerms = termsCheck.checked;

  console.log(data);
});