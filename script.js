let dragged;
let points = 0;

document.addEventListener("dragstart", function(event) {
  dragged = event.target;
  event.target.style.opacity = .5;
});

document.addEventListener("dragend", function(event) {
  event.target.style.opacity = "";
});

document.addEventListener("dragover", function(event) {
  event.preventDefault();
});

document.addEventListener("drop", function(event) {
  event.preventDefault();
  if (event.target.className === "word" && !event.target.innerHTML) {
    event.target.appendChild(dragged);
    checkWords();
  }
  if (event.target.id === "word2" && dragged.id === "word1") {
    event.target.appendChild(dragged);
    const käsiWord = document.getElementById("word1");
    const kellWord = document.getElementById("word2");
    const käsiText = käsiWord.innerText;
    const kellText = kellWord.innerText;
    const combinedText = käsiText + kellText;
    const käekellButton = document.createElement("div");
    käekellButton.className = "word";
    käekellButton.innerText = combinedText;
    käekellButton.draggable = true;
    käekellButton.ondragstart = drag;
    event.target.appendChild(käekellButton);
    käsiWord.style.display = "none";
    kellWord.style.display = "none";
    points++;
    document.getElementById('points-counter').innerText = points;
    generateNewWords();
    checkWords();
  }
});

function checkWords() {
  const words = document.querySelectorAll('.word');
  let combinedWord = '';
  words.forEach(word => {
    combinedWord += word.innerText.toLowerCase();
  });

  if (combinedWord === 'käekell') {
    nextLevel();
  } else {
    document.getElementById('message').innerText = 'Vale! Proovi uuesti.';
  }
}

function generateNewWords() {
  const wordContainer = document.querySelector('.word-container');
  const newWords = ['pann', 'pliit', 'kook', 'pott'];
  newWords.forEach(word => {
    const newWordButton = document.createElement("div");
    newWordButton.className = "word";
    newWordButton.innerText = word.toUpperCase();
    newWordButton.draggable = true;
    newWordButton.ondragstart = drag;
    wordContainer.appendChild(newWordButton);
  });
}

function resetGame() {
  points = 0;
  document.getElementById('points-counter').innerText = points;
  document.getElementById('message').innerText = '';
  const wordContainers = document.querySelectorAll('.word-container .word');
  wordContainers.forEach(word => {
    word.innerHTML = '';
    word.style.display = "block";
  });
}

function nextLevel() {
  document.getElementById('message').innerText = 'Õige! Edasi järgmisele tasemele!';
  setTimeout(() => {
    resetGame();
  }, 2000);
}

function drag(event) {
  dragged = event.target;
  event.target.style.opacity = .5;
}
