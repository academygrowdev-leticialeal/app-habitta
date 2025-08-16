export { formatDocument, formatPhone };

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
  const documentField = document.getElementById('documentField');
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