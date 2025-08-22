const progressBar = document.getElementById('progressBar');
const steps = document.querySelectorAll('.step');
let currentStep = 1;
const totalSteps = steps.length;

// Exemplo: avançar manualmente (apenas para teste)
function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    updateProgressBar();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateProgressBar();
  }
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
  progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
}

// Inicializa a barra
updateProgressBar();