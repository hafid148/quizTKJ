const quiz = [
  {
    question: "suara apa yang kamu dengar?",
    answer: ["RAM", "Harddisk", "Motheboard", "CPU"],
  },
  {
    question: "gambar apa ini?",
    answer: ["Motherboard", "Ram", "processor", "casing"],
  },
  {
    question: "Komponen yang di sebut otak komputer adalah?",
    answer: ["processor", "motherboard", "RAM", "harddisk"],
  },
  {
    question: "kepanjangan PC adalah?",
    answer: ["Pemain Curang", "Paling Casing", "Personal Computer", "gak tau"],
  },
  {
    question: "Gambar apa ini?",
    answer: ["Ram", "mouse", "keyboard", "processor"],
  },
];
const correct_answer = [1, 0, 0, 2, 3];

document.addEventListener("DOMContentLoaded", function (event) {
  setupQuestions();
});

function playSound(audioId) {
  var audio = document.getElementById(audioId);
  audio.play();
}

function start() {
  document.getElementById("start").style.display = `none`;
  document.getElementById("mulai").play();
  document.getElementById("container").style.display = `flex`;
  document.getElementById("top").style.display = `flex`;
}
let current_q = 0;
let saved_answer = [];
let totalScore = 0;
let nilai = 0;

function setupQuestions() {
  document.getElementById("loader").style.width =
    Math.min((current_q + 1) * 20, 100) + "%";
  document.getElementById("form").innerText =
    Math.min(current_q + 1, 5) + " dari " + quiz.length + " soal";

  document.getElementById("questions").innerText = quiz[current_q]["question"];
  document.getElementById("pilihText0").innerText =
    quiz[current_q]["answer"][0];
  document.getElementById("pilihText1").innerText =
    quiz[current_q]["answer"][1];
  document.getElementById("pilihText2").innerText =
    quiz[current_q]["answer"][2];
  document.getElementById("pilihText3").innerText =
    quiz[current_q]["answer"][3];

  if (current_q == 0) {
    document.getElementById("audioHarddisk").style.display = `block`;
  } else {
    document.getElementById("audioHarddisk").style.display = `none`;
  }
  if (current_q == 1) {
    document.getElementById("motherboard").style.display = `block`;
  } else {
    document.getElementById("motherboard").style.display = `none`;
  }
  if (current_q == 4) {
    document.getElementById("processor").style.display = `block`;
  } else {
    document.getElementById("processor").style.display = `none`;
  }
}

function nextQuestions() {
  if (saveAnswer() == false) {
    document.getElementById("alert").innerText = "partanyaan harus di isi";
    document.getElementById("alert").style.display = `block`;
    var audio = document.getElementById("error");
    audio.play();
    return;
  } else {
    document.getElementById("alert").style.display = `none`;
  }
  document.getElementById("next").play();
  current_q++;
  if (current_q > quiz.length - 1) stopQuiz();
  setupQuestions();
  resetState();
}
function resetState() {
  document.querySelector('input[name="pilih"]:checked').checked = false;
}

function stopQuiz() {
  document.getElementById("container").style.display = `none`;
  document.getElementById("top").style.display = `none`;
  document.getElementById("hasil").style.display = `flex`;
  checkScore();
  document.getElementById("success").play();
  document.getElementById("benar").innerText =
    "anda benar  " + totalScore + " dari 5 soal";
  document.getElementById("nilai").innerText = "nilai anda adalah : " + nilai;
  localStorage.setItem("nilai", nilai);
  return;
}
function saveAnswer() {
  const answer = document.querySelector('input[name="pilih"]:checked');
  if (answer != null) {
    saved_answer.push(parseInt(answer.getAttribute("data-id")));
    console.log(saved_answer);
    return true;
  } else {
    return false;
  }
}
function checkScore() {
  for (i = 0; i < saved_answer.length; i++) {
    if (saved_answer[i] == correct_answer[i]) {
      nilai += 100;
      totalScore += 1;
    }
  }
}

let nilaiLast = localStorage.getItem("nilai");
document.getElementById("lastScore").innerText = nilaiLast
  ? "nila terakhir anda adalah:" + nilaiLast
  : "";

console.log(localStorage.getItem("nilai"));
