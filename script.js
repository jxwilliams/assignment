(function () {
  'use strict';

  // Possible choices
  const choices = ['rock', 'paper', 'scissors'];

  // Image mapping for each throw
  const imgs = {
    rock: 'images/rock.png',
    paper: 'images/paper.png',
    scissors: 'images/scissors.png',
    question: 'images/question.svg'
  };

  // DOM elements
  const playerButtons = Array.from(document.querySelectorAll('.choice'));
  const computerImg = document.getElementById('computer-img');
  const thinkingEl = document.getElementById('thinking');
  const resultEl = document.getElementById('result');
  const winsEl = document.getElementById('wins');
  const lossesEl = document.getElementById('losses');
  const tiesEl = document.getElementById('ties');
  const resetBtn = document.getElementById('reset');

  // Score counters
  let wins = 0, losses = 0, ties = 0;

  // Timer for computer shuffling images
  let shuffleTimer = null;

  // Player clicks one of the buttons
  playerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove highlight from other buttons
      playerButtons.forEach(b => b.classList.remove('selected'));
      // Highlight the chosen button
      btn.classList.add('selected');

      // Start computer "thinking" animation, then decide outcome
      startComputerTurn((computerThrow) => {
        decideOutcome(btn.dataset.throw, computerThrow);
      });
    });
  });

  // Reset button clears the game
  resetBtn.addEventListener('click', resetGame);

  // Handles computer's turn
  function startComputerTurn(done) {
    thinkingEl.textContent = 'Computer is thinking…';

    // Cancel any previous shuffle
    if (shuffleTimer) clearInterval(shuffleTimer);

    // Cycle through choices quickly for effect
    let i = 0;
    shuffleTimer = setInterval(() => {
      i = (i + 1) % choices.length;
      computerImg.setAttribute('src', imgs[choices[i]]);
    }, 500);

    // After 3 seconds, computer locks in a random choice
    setTimeout(() => {
      clearInterval(shuffleTimer);
      const final = randomChoice();
      computerImg.setAttribute('src', imgs[final]);
      thinkingEl.textContent = 'Computer chose: ' + final.toUpperCase();
      done(final);
    }, 3000);
  }

  // Randomly pick rock/paper/scissors
  function randomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Decide winner and update score
  function decideOutcome(player, computer) {
    let msg = '';
    if (player === computer) {
      msg = 'Tie!';
      ties++; tiesEl.textContent = String(ties);
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      msg = 'You win!';
      wins++; winsEl.textContent = String(wins);
    } else {
      msg = 'Computer wins.';
      losses++; lossesEl.textContent = String(losses);
    }
    resultEl.textContent = msg;
  }

  // Reset everything back to start
  function resetGame() {
    playerButtons.forEach(b => b.classList.remove('selected'));
    computerImg.setAttribute('src', imgs.question);
    thinkingEl.textContent = 'Waiting for your choice…';
    resultEl.textContent = '—';
    wins = losses = ties = 0;
    winsEl.textContent = lossesEl.textContent = tiesEl.textContent = '0';
    if (shuffleTimer) clearInterval(shuffleTimer);
  }
})();
