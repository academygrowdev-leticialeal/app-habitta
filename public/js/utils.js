export { formatDocument, formatPhone, updateForm };

const documentField = document.getElementById('documentField');

function getFieldNumber(field) {
  return field.value.replace(/\D+/g, '');
}

function formatCPF(cpf) {
  cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/.(\d{3})(\d)/, '.$1.$2');
  cpf = cpf.replace(/.(\d{3})(\d)/, '.$1-$2');
  return cpf;
}

function formatCNPJ(cnpj) {
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/.(\d{3})(\d)/, '.$1.$2');
  cnpj = cnpj.replace(/.(\d{3})(\d)/, '.$1/$2');
  cnpj = cnpj.replace(/\/(\d{4})(\d)/, '/$1-$2');
  return cnpj;
}

function formatDocument() {
  const documentNumber = getFieldNumber(documentField);
  const format = (documentField.placeholder === 'CPF') ? formatCPF : formatCNPJ;
  documentField.value = format(documentNumber);
}

function formatPhone() {
  const phoneInput = document.getElementById('phoneInput');
  let phoneNumber = getFieldNumber(phoneInput);

  phoneNumber = phoneNumber.replace(/^(\d)/, '($1');
  phoneNumber = phoneNumber.replace(/\((\d{2})(\d)/, '($1) $2');
  phoneNumber = phoneNumber.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  phoneInput.value = phoneNumber;
}

function updateForm(radioButton) {
  if (radioButton.checked) {
    document.getElementById('register-form').reset();
    radioButton.checked = true;
    updateFields(radioButton);
  }
}

function updateFields(radioButton) {
  const nameInput = document.getElementById('nameInput');
  const isPessoaFisica = (radioButton.id === 'pessoaFisica');
  
  nameInput.placeholder = isPessoaFisica ? 'Nome completo' : 'Razão Social';
  documentField.placeholder = isPessoaFisica ? 'CPF' : 'CNPJ';
  documentField.maxLength = isPessoaFisica ? 14 : 18;
  documentField.pattern = isPessoaFisica ? '\\d{3}.\\d{3}.\\d{3}-\\d{2}' : '\\d{2}.\\d{3}.\\d{3}/\\d{4}-\\d{2}';
}