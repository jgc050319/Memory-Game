let clickedCard = null;
let preventClick = false;
let combosFound = 0;

const colors = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

const cards = [...document.querySelectorAll('.card')];
for (let color of colors) {
  const cardAIndex = parseInt(Math.random() * cards.length);
  const cardA = cards[cardAIndex];
  cards.splice(cardAIndex, 1);
  cardA.className += ` ${color}`;
  cardA.setAttribute('data-color', color);

  const cardBIndex = parseInt(Math.random() * cards.length);
  const cardB = cards[cardBIndex];
  cards.splice(cardBIndex, 1);
  cardB.className += ` ${color}`;
  cardB.setAttribute('data-color', color);
}

function onCardClicked(e) {
  const target = e.currentTarget;

  if (
    preventClick ||
    target === clickedCard ||
    target.className.includes('done')
  ) {
    return;
  }

  target.className = target.className
    .replace('color-hidden', '')
    .trim();
  target.className += ' done';

  if (!clickedCard) {
    // if we haven't clicked a card, keep track of the card, display it's color
    clickedCard = target;
  } else if (clickedCard) {
    // if we have already clicked a card, check if the new card matches the old card color
    if (
      clickedCard.getAttribute('data-color') !==
      target.getAttribute('data-color')
    ) {
      preventClick = true;
      setTimeout(() => {
        clickedCard.className =
          clickedCard.className.replace('done', '').trim() +
          ' color-hidden';
        target.className =
          target.className.replace('done', '').trim() +
          ' color-hidden';
        clickedCard = null;
        preventClick = false;
      }, 500);
    } else {
      combosFound++;
      clickedCard = null;
      if (combosFound === 5) {
        alert('YOU WIN');
        location.reload("");
      }
    }
  }
}
function startGame(){
    let startDiv = document.getElementById("start");
    let gameCanvas = document.getElementById("canvas");
    let gameOver = document.getElementById("game-over");
    startDiv.style.display = "none";
    gameCanvas.style.display = "block";
    gameOver.style.display = "none";
    start();
}
function gameOver(){
    let startDiv = document.getElementById("start");
    let gameCanvas = document.getElementById("canvas");
    let gameOver = document.getElementById("game-over");
    startDiv.style.display = "none";
    gameCanvas.style.display = "none";
    gameOver.style.display = "block";
    game.reset();
    clearInterval(loop);
}
