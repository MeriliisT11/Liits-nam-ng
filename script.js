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
});

function checkWords() {
  const words = document.querySelectorAll('.word');
  const word1 = words[0].innerText.toLowerCase();
  const word2 = words[1].innerText.toLowerCase();

  if ((word1.includes('käsi') && word2.includes('kell')) || (word1.includes('kell') && word2.includes('käsi'))) {
    document.getElementById('message').innerText = 'Õige! Edasi järgmisele tasemele!';
    points++;
    document.getElementById('points-counter').innerText = points;
    setTimeout(() => {
      document.getElementById('message').innerText = '';
      // Add logic to proceed to the next level here
    }, 2000);
  } else {
    document.getElementById('message').innerText = 'Vale! Proovi uuesti.';
  }
}
