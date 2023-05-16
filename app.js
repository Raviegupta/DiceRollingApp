'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let scores, currentScore, activePlayer, playing;

// Starting conditions
function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0]; // keeep the scores of player
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  current0El.textContent = 0;
  current1El.textContent = 0;
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// console.log(score0El.textContent, score1El.textContent);

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    // 2. display the rolled dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1:
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;

      // display the current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current Score to Active Player Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // console.log(scores[activePlayer])

    // 2. Check if palyer's score is >= 100 =>
    if (scores[activePlayer] >= 20) {
      // Finish the Game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);