// Verifica se há algum usuário logado
function getCurrentStorage() {
  if (localStorage.getItem('token')) {
    return localStorage;
  } else if (sessionStorage.getItem('token')) {
    return sessionStorage;
  } else {
    window.location.href = './login.html';
  }
}

// Encerra sessão
function logOut() {
  currentStorage.removeItem('token');
  currentStorage.removeItem('userData');
  window.location.href = './login.html';
}

// Consulta tipo de cadastro
function getUserType() {
  return userData[userData.role.toLowerCase()].type;
}

// Gera lista de steps de acordo com o tipo de cadastro
function getStepsByType() {
  const userType = getUserType();
  switch (userType) {
    case 'B2B':
      return ['#company', '#personal', '#address'];
    case 'B2C': 
      return ['#personal', '#address'];
    case 'PF': 
      return ['#personal', '#address', '#documents', '#services', '#bank'];
    case 'PJ':
    case 'MEI':
      return ['#company', '#personal', '#address', '#documents', '#services', '#bank'];
  }
}

const currentStorage = getCurrentStorage();
let userData = JSON.parse(currentStorage.getItem('userData'));
const steps = getStepsByType();
console.log(userData);
console.log(steps);

document.getElementById('logout-button').addEventListener('click', logOut);

// const progressBar = document.getElementById('progressBar');
// const steps = document.querySelectorAll('.step');
// let currentStep = 1;
// const totalSteps = steps.length;

// // Exemplo: avançar manualmente (apenas para teste)
// function nextStep() {
//   if (currentStep < totalSteps) {
//     currentStep++;
//     updateProgressBar();
//   }
// }

// function prevStep() {
//   if (currentStep > 1) {
//     currentStep--;
//     updateProgressBar();
//   }
// }

// // Função para atualizar a barra de progresso
// function updateProgressBar() {
//   progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
// }

// updateProgressBar();