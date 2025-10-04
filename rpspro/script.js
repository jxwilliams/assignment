/* 
  Project: Rock Paper Scissors Game
  Description: JavaScript logic for handling gameplay, computer choices, and scoring.
  Author: [Your Name]
  Date: [MM/DD/YYYY]
  Slot: [Course/Section Info]
*/
(function(){
  'use strict';

  const choices = ['rock','paper','scissors'];
  const imgs = {
    rock: 'images/rock.png',
    paper: 'images/paper.png',
    scissors: 'images/scissors.png',
    question: 'images/question.svg'
  };

  const playerButtons = Array.from(document.querySelectorAll('.choice'));
  const computerImg = document.getElementById('computer-img');
  const thinkingEl = document.getElementById('thinking');
  const resultEl = document.getElementById('result');
  const winsEl = document.getElementById('wins');
  const lossesEl = document.getElementById('losses');
  const tiesEl = document.getElementById('ties');
  const resetBtn = document.getElementById('reset');

  let wins=0, losses=0, ties=0;
  let shuffleTimer = null;

  playerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      playerButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      startComputerTurn((computerThrow)=>{
        decideOutcome(btn.dataset.throw, computerThrow);
      });
    });
  });

  resetBtn.addEventListener('click', resetGame);

  function startComputerTurn(done){
    thinkingEl.textContent = 'Computer is thinking…';
    if(shuffleTimer) clearInterval(shuffleTimer);
    let i = 0;
    shuffleTimer = setInterval(()=>{
      i = (i+1) % choices.length;
      computerImg.setAttribute('src', imgs[choices[i]]);
    }, 500);

    setTimeout(()=>{
      clearInterval(shuffleTimer);
      const final = randomChoice();
      computerImg.setAttribute('src', imgs[final]);
      thinkingEl.textContent = 'Computer chose: ' + final.toUpperCase();
      done(final);
    }, 3000);
  }

  function randomChoice(){
    return choices[Math.floor(Math.random()*choices.length)];
  }

  function decideOutcome(player, computer){
    let msg = '';
    if(player === computer){
      msg = 'Tie!';
      ties++; tiesEl.textContent = String(ties);
    }else if(
      (player==='rock' && computer==='scissors') ||
      (player==='paper' && computer==='rock') ||
      (player==='scissors' && computer==='paper')
    ){
      msg = 'You win!';
      wins++; winsEl.textContent = String(wins);
    }else{
      msg = 'Computer wins.';
      losses++; lossesEl.textContent = String(losses);
    }
    resultEl.textContent = msg;
  }

  function resetGame(){
    playerButtons.forEach(b => b.classList.remove('selected'));
    computerImg.setAttribute('src', imgs.question);
    thinkingEl.textContent = 'Waiting for your choice…';
    resultEl.textContent = '—';
    wins = losses = ties = 0;
    winsEl.textContent = lossesEl.textContent = tiesEl.textContent = '0';
    if(shuffleTimer) clearInterval(shuffleTimer);
  }
})();