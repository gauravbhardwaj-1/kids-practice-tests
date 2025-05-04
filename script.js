
let currentQuestion = 0;
let totalQuestions = 0;
let correct = 0;
let incorrect = 0;
let questions = [];
let startTime;

function startQuiz() {
  const type = document.getElementById("quizType").value;
  totalQuestions = parseInt(document.getElementById("numQuestions").value);
  if (!totalQuestions || totalQuestions < 1) {
    alert("Enter a valid number of questions.");
    return;
  }

  questions = generateQuestions(type, totalQuestions);
  currentQuestion = 0;
  correct = 0;
  incorrect = 0;
  startTime = new Date();

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

function generateQuestions(type, count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    let a, b, q, aText;
    if (type === "basic") {
      a = rand(2, 9);
      b = rand(5, 15);
      q = a * b;
      aText = `${a} × ${b}`;
    } else if (type === "advanced") {
      a = rand(123, 999);
      b = rand(999, 99999);
      q = a * b;
      aText = `${a} × ${b}`;
    } else {
      b = rand(2, 9);
      const result = rand(100, 999);
      a = b * result;
      q = result;
      aText = `${a} ÷ ${b}`;
    }
    list.push({ question: aText, answer: q });
  }
  return list;
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionText").textContent = `Q${currentQuestion + 1}. ${q.question} = ?`;
  document.getElementById("answerInput").value = '';
  document.getElementById("answerInput").focus();
}

function submitAnswer() {
  const input = document.getElementById("answerInput").value.trim();
  if (input === "") return alert("Please enter an answer.");

  const userAns = parseInt(input);
  const correctAns = questions[currentQuestion].answer;

  if (userAns === correctAns) correct++;
  else incorrect++;

  currentQuestion++;
  if (currentQuestion < totalQuestions) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const timeTaken = ((new Date() - startTime) / 1000).toFixed(1);
  const percent = ((correct / totalQuestions) * 100).toFixed(2);

  const resultHtml = `
    <h2>Quiz Completed!</h2>
    <p>Correct Answers: ${correct}</p>
    <p>Incorrect Answers: ${incorrect}</p>
    <p>Score: ${percent}%</p>
    <p>Time Taken: ${timeTaken} seconds</p>
  `;

  document.getElementById("quiz").classList.add("hidden");
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = resultHtml;
  resultDiv.classList.remove("hidden");
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
