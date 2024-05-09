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
    const käekellButton = document.createElement("div");
    käekellButton.className = "word";
    käekellButton.innerText = "KÄEKELL";
    käekellButton.draggable = true;
    käekellButton.ondragstart = drag;
    kellWord.innerHTML = "";
    käsiWord.innerHTML = "";
    event.target.appendChild(käekellButton);
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

function resetGame() {
  points = 0;
  document.getElementById('points-counter').innerText = points;
  document.getElementById('message').innerText = '';
  const wordContainers = document.querySelectorAll('.word-container .word');
  wordContainers.forEach(word => {
    word.innerHTML = '';
  });
}

function nextLevel() {
  document.getElementById('message').innerText = 'Õige! Edasi järgmisele tasemele!';
  points++;
  document.getElementById('points-counter').innerText = points;
  setTimeout(() => {
    resetGame();
  }, 2000);
}

function drag(event) {
  dragged = event.target;
  event.target.style.opacity = .5;
}
