import { formatDocument, formatPhone, formatText, clearErrors } from './utils.js';

const documentField = document.getElementById('documentField');
const phoneInput = document.getElementById('phoneInput');
const termsCheck = document.getElementById('termsCheck');
const form = document.getElementById('register-form');
const submitButton = form.elements['submit'];
const radioButtons = form.elements['type'];
let error = false;

function updateForm() {
  const currentOption = form.querySelector('input[name="type"]:checked');
  clearErrors();
  form.reset();
  currentOption.checked = true;
  updateFields(currentOption);
}

function updateFields(currentOption) {
  const nameInput = document.getElementById('nameInput');
  const isNaturalPerson = (currentOption.id === 'pessoaFisica');
  
  nameInput.placeholder = isNaturalPerson ? 'Nome completo' : 'Razão Social';
  documentField.placeholder = isNaturalPerson ? 'CPF' : 'CNPJ';
  documentField.maxLength = isNaturalPerson ? 14 : 18;
  documentField.pattern = isNaturalPerson ? '\\d{3}.\\d{3}.\\d{3}-\\d{2}' : '\\d{2}.\\d{3}.\\d{3}/\\d{4}-\\d{2}';
}

function disableForm() {
  form.querySelectorAll('input, button').forEach(element => element.disabled = true);
  submitButton.lastElementChild.innerText = 'Enviando...';
  submitButton.firstElementChild.classList.remove('d-none');
  clearErrors();
}

function enableForm() {
  form.querySelectorAll('input, button').forEach(element => element.disabled = false);
  submitButton.lastElementChild.innerText = 'Cadastrar-se';
  submitButton.firstElementChild.classList.add('d-none');
}

window.addEventListener('load', () => form.reset());
phoneInput.addEventListener('input', formatPhone);
documentField.addEventListener('input', formatDocument);
radioButtons.forEach(radio => radio.addEventListener('change', updateForm));

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.document = data.document.replace(/\D+/g, '');
  data.acceptTerms = termsCheck.checked;

  disableForm();
  const result = await registerUser(data);
  enableForm();
  
  if (result.success) {
    updateForm();
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    return;
  }

  if (result.details) {
    result.details.forEach(detail => {
      const field = form.elements[detail.field];
      
      if (field) {
        field.classList.add('is-invalid');

        new bootstrap.Tooltip(field, {
          title: formatText(detail.description),
          placement: 'top',
          trigger: 'hover focus',
          customClass: 'custom-tooltip'
        });
      } else {
        error = true;
      }
    });
  } else {
    error = true;
  }

  if (error) {
    const failModal = new bootstrap.Modal(document.getElementById('failModal'));
    failModal.show();
  }
});