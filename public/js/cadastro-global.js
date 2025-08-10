 // Script para alternar CPF/CNPJ e Nome/Razão Social
  const pessoaFisicaRadio = document.getElementById('pessoaFisica');
  const pessoaJuridicaRadio = document.getElementById('pessoaJuridica');
  const documentField = document.getElementById('documentField');
  const nomeInput = document.getElementById('nomeInput');

  pessoaFisicaRadio.addEventListener('change', () => {
    nomeInput.placeholder = 'Nome completo';
    documentField.placeholder = 'CPF';
  });

  pessoaJuridicaRadio.addEventListener('change', () => {
    nomeInput.placeholder = 'Razão Social';
    documentField.placeholder = 'CNPJ';
  });

const form = document.getElementById('form-profissional');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log(data);
});