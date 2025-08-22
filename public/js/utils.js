export { formatDocument, formatPhone, formatText, clearErrors };

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

function formatText(text) {
  text = text.trim();
  text = text[0].toUpperCase() + text.slice(1);
  text = text.endsWith('.') ? text : `${text}.`;
  return text;
}

function clearErrors() {  
  document.querySelectorAll('.is-invalid').forEach(element => {
    const tooltip = bootstrap.Tooltip.getInstance(element);
    if (tooltip) {
      tooltip.dispose();
      tooltip._activeTrigger = {};
      tooltip._element = document.createElement('noscript');
    }
    element.classList.remove('is-invalid');
  });
}