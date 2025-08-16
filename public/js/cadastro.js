import { formatDocument, formatPhone } from './utils.js';

const documentField = document.getElementById('documentField');
const phoneInput = document.getElementById('phoneInput');
const termsCheck = document.getElementById('termsCheck');
const form = document.getElementById('register-form');
const submitButton = form.elements['submit'];
const radioButtons = form.elements['type'];

function updateForm(radioButton) {
  if (radioButton.checked) {
    clearErrors();
    document.getElementById('register-form').reset();
    radioButton.checked = true;
    updateFields(radioButton);
  }
}

function updateFields(radioButton) {
  const nameInput = document.getElementById('nameInput');
  const isNaturalPerson = (radioButton.id === 'pessoaFisica');
  
  nameInput.placeholder = isNaturalPerson ? 'Nome completo' : 'Razão Social';
  documentField.placeholder = isNaturalPerson ? 'CPF' : 'CNPJ';
  documentField.maxLength = isNaturalPerson ? 14 : 18;
  documentField.pattern = isNaturalPerson ? '\\d{3}.\\d{3}.\\d{3}-\\d{2}' : '\\d{2}.\\d{3}.\\d{3}/\\d{4}-\\d{2}';
}

function resetForm() {
  form.querySelectorAll('input, button').forEach(element => element.disabled = false);
  submitButton.disabled = false;
  submitButton.lastElementChild.innerText = 'Cadastrar-se';
  submitButton.firstElementChild.classList.add('d-none');
  clearErrors();
}

function clearErrors() {
  document.querySelectorAll('.is-invalid').forEach(element => {
    element.classList.remove('is-invalid');
  });
  
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(element => {
    const tooltip = bootstrap.Tooltip.getInstance(element);
    if (tooltip) {
      tooltip.dispose();
    }
  });
}

window.addEventListener('load', () => form.reset());
phoneInput.addEventListener('input', formatPhone);
documentField.addEventListener('input', formatDocument);

radioButtons.forEach(radio => {
  radio.addEventListener('change', () => updateForm(radio));
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.document = data.document.replace(/\D+/g, '');
  data.acceptTerms = termsCheck.checked;

  form.querySelectorAll('input, button').forEach(element => element.disabled = true);
  submitButton.lastElementChild.innerText = 'Enviando...';
  submitButton.firstElementChild.classList.remove('d-none');
  clearErrors();

  const result = await registerUser(data);
  // const result = {
  //   details: [{type: 'field', field: 'name', description: 'Nome inválido'}, {type: 'field', field: 'document', description: 'Documento inválido'}],
  //   success: false
  // };

  form.querySelectorAll('input, button').forEach(element => element.disabled = false);
  submitButton.lastElementChild.innerText = 'Cadastrar-se';
  submitButton.firstElementChild.classList.add('d-none');
  
  if (result.success) {
    form.reset();
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    return;
  }

  if (result.details) {
    result.details.forEach(detail => {
      if (detail.type === 'field') {
        const field = form.elements[detail.field];
        // const div = document.createElement('div');
        // div.innerText = detail.description;
        // div.classList.add('invalid-feedback', 'd-block', 'ms-1');
        // field.after(div);
        field.classList.add('is-invalid');
        field.setAttribute('data-bs-toggle', 'tooltip');
        
        new bootstrap.Tooltip(field, {
          title: detail.description,
          placement: 'top',
          trigger: 'hover focus',
          customClass: 'custom-tooltip'
        });
      }
    });
  } else {
    const failModal = new bootstrap.Modal(document.getElementById('failModal'));
    failModal.show();
  }
});