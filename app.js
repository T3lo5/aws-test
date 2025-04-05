// Variáveis globais
let currentQuestions = [];
let currentQuestionIndex = 0;
let studyMode = true;
let selectedAnswers = {};

// Elementos do DOM
const studyModeElement = document.getElementById("study-mode");
const examModeElement = document.getElementById("exam-mode");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const showAnswerBtn = document.getElementById("show-answer-btn");
const answerContainer = document.getElementById("answer-container");
const answerText = document.getElementById("answer-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const examQuestionNumber = document.getElementById("exam-question-number");
const examQuestionText = document.getElementById("exam-question-text");
const optionLabels = {
  a: document.getElementById("option-a-text"),
  b: document.getElementById("option-b-text"),
  c: document.getElementById("option-c-text"),
  d: document.getElementById("option-d-text"),
};
const optionInputs = {
  a: document.getElementById("option-a"),
  b: document.getElementById("option-b"),
  c: document.getElementById("option-c"),
  d: document.getElementById("option-d"),
};
const optionContainers = document.querySelectorAll(".option");
const examResultContainer = document.getElementById("exam-result");
const resultText = document.getElementById("result-text");
const explanationText = document.getElementById("explanation");
const checkAnswerBtn = document.getElementById("check-answer-btn");
const examPrevBtn = document.getElementById("exam-prev-btn");
const examNextBtn = document.getElementById("exam-next-btn");
const progressBar = document.getElementById("progress");
const categoryFilter = document.getElementById("category-filter");
const shuffleButton = document.getElementById("shuffle-button");
const toggleModeButton = document.getElementById("toggle-mode");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Filtrar e embaralhar as perguntas iniciais
  filterAndShuffleQuestions();

  // Event listeners
  showAnswerBtn.addEventListener("click", showAnswer);
  prevBtn.addEventListener("click", showPreviousQuestion);
  nextBtn.addEventListener("click", showNextQuestion);
  examPrevBtn.addEventListener("click", showPreviousQuestion);
  examNextBtn.addEventListener("click", showNextQuestion);
  checkAnswerBtn.addEventListener("click", checkAnswer);
  categoryFilter.addEventListener("change", filterAndShuffleQuestions);
  shuffleButton.addEventListener("click", filterAndShuffleQuestions);
  toggleModeButton.addEventListener("click", toggleMode);

  // Adicionar event listeners para as opções
  optionContainers.forEach((option) => {
    option.addEventListener("click", () => {
      const optionValue = option.dataset.option;
      optionInputs[optionValue].checked = true;
      // Desmarcar visualmente todas as opções
      optionContainers.forEach((opt) => opt.classList.remove("selected"));
      // Marcar visualmente a opção selecionada
      option.classList.add("selected");
    });
  });

  // Carregue a primeira pergunta
  loadQuestion();
});

// Filtrar e embaralhar perguntas com base na categoria selecionada
function filterAndShuffleQuestions() {
  const selectedCategory = categoryFilter.value;

  if (selectedCategory === "all") {
    currentQuestions = [...questionsDB]; // Copiar todas as perguntas
  } else {
    currentQuestions = questionsDB.filter(
      (q) => q.category === selectedCategory
    );
  }

  // Embaralhar as perguntas
  shuffleArray(currentQuestions);

  // Resetar o índice e carregar a primeira pergunta
  currentQuestionIndex = 0;
  loadQuestion();

  // Limpar respostas selecionadas
  selectedAnswers = {};

  // Resetar progresso
  updateProgress();
}

// Função para embaralhar array (algoritmo Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Carregar a pergunta atual
function loadQuestion() {
  if (currentQuestions.length === 0) {
    questionText.textContent =
      "Nenhuma pergunta disponível para a categoria selecionada.";
    examQuestionText.textContent =
      "Nenhuma pergunta disponível para a categoria selecionada.";
    return;
  }

  const question = currentQuestions[currentQuestionIndex];

  // Atualizar indicador de número da pergunta
  questionNumber.textContent = `Questão ${currentQuestionIndex + 1} de ${
    currentQuestions.length
  }`;
  examQuestionNumber.textContent = `Questão ${currentQuestionIndex + 1} de ${
    currentQuestions.length
  }`;

  // Atualizar texto da pergunta
  questionText.textContent = question.question;
  examQuestionText.textContent = question.question;

  // Atualizar opções (para o modo exame)
  if (question.options) {
    for (const [key, value] of Object.entries(question.options)) {
      if (optionLabels[key]) {
        optionLabels[key].textContent = value;
      }
    }
  }

  // Desmarcar todas as opções
  for (const key in optionInputs) {
    optionInputs[key].checked = false;
  }

  // Recarregar resposta selecionada anteriormente (se houver)
  if (selectedAnswers[question.id]) {
    optionInputs[selectedAnswers[question.id]].checked = true;
  }

  // Remover classes de destaque das opções
  optionContainers.forEach((option) => {
    option.classList.remove("selected", "correct", "incorrect");
    if (selectedAnswers[question.id] === option.dataset.option) {
      option.classList.add("selected");
    }
  });

  // Esconder a resposta e o resultado
  answerContainer.classList.add("hidden");
  examResultContainer.classList.add("hidden");

  // Atualizar estado dos botões de navegação
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === currentQuestions.length - 1;
  examPrevBtn.disabled = currentQuestionIndex === 0;
  examNextBtn.disabled = currentQuestionIndex === currentQuestions.length - 1;
  checkAnswerBtn.disabled = false;

  // Atualizar barra de progresso
  updateProgress();
}

// Mostrar a resposta (modo estudo)
function showAnswer() {
  const question = currentQuestions[currentQuestionIndex];

  // Exibir container de resposta
  answerContainer.classList.remove("hidden");

  // Construir texto da resposta
  let answerContent = `<p><strong>Resposta correta: ${question.correctAnswer.toUpperCase()}</strong></p>`;

  // Adicionar opção correta
  if (question.options && question.correctAnswer) {
    answerContent += `<p>${question.options[question.correctAnswer]}</p>`;
  }

  // Adicionar explicação
  if (question.explanation) {
    answerContent += `<div class="explanation"><h4>Explicação:</h4><p>${question.explanation}</p></div>`;
  }

  // Atualizar o conteúdo da resposta
  answerText.innerHTML = answerContent;
}

// Verificar resposta (modo exame)
function checkAnswer() {
  const question = currentQuestions[currentQuestionIndex];
  let selectedOption = null;

  // Encontrar opção selecionada
  for (const [key, input] of Object.entries(optionInputs)) {
    if (input.checked) {
      selectedOption = key;
      break;
    }
  }

  // Se nenhuma opção for selecionada, mostrar alerta
  if (!selectedOption) {
    alert("Por favor, selecione uma opção.");
    return;
  }

  // Salvar resposta selecionada
  selectedAnswers[question.id] = selectedOption;

  // Exibir resultado
  examResultContainer.classList.remove("hidden");

  // Destacar opção correta e incorreta
  optionContainers.forEach((option) => {
    const optionValue = option.dataset.option;

    if (optionValue === question.correctAnswer) {
      option.classList.add("correct");
    } else if (optionValue === selectedOption) {
      option.classList.add("incorrect");
    }
  });

  // Mostrar mensagem de resultado
  if (selectedOption === question.correctAnswer) {
    resultText.textContent = "Correto! ✓";
    resultText.style.color = "#4caf50";
  } else {
    resultText.textContent = `Incorreto! ✗ A resposta correta é ${question.correctAnswer.toUpperCase()}.`;
    resultText.style.color = "#f44336";
  }

  // Adicionar explicação
  explanationText.innerHTML = `<h4>Explicação:</h4><p>${question.explanation}</p>`;

  // Desabilitar botão de verificação
  checkAnswerBtn.disabled = true;

  // Habilitar botão de próxima pergunta
  examNextBtn.disabled = currentQuestionIndex === currentQuestions.length - 1;
}

// Mostrar pergunta anterior
function showPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

// Mostrar próxima pergunta
function showNextQuestion() {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
}

function updateProgress() {
  if (currentQuestions.length > 0) {
    const progressPercentage =
      ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  } else {
    progressBar.style.width = "0%";
  }
}

function toggleMode() {
  studyMode = !studyMode;

  if (studyMode) {
    studyModeElement.classList.add("active");
    studyModeElement.classList.remove("hidden");
    examModeElement.classList.add("hidden");
    examModeElement.classList.remove("active");
    toggleModeButton.textContent = "Mudar para Modo Exame";
  } else {
    studyModeElement.classList.remove("active");
    studyModeElement.classList.add("hidden");
    examModeElement.classList.remove("hidden");
    examModeElement.classList.add("active");
    toggleModeButton.textContent = "Mudar para Modo Estudo";
  }

  loadQuestion();
}
