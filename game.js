const cards = document.querySelectorAll(".card");  //creating variable cards connected to HTML
const scoreDisplay = document.querySelector(".scoreboard"); //creating variable name scoreDisplay connected to HTML

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let score = 0; // starting score

 function flipCard(e) 
   {
     let clickedCard = e.target;
     if (clickedCard !== cardOne && !disableDeck) 
        {
          clickedCard.classList.add("flip");
         if (!cardOne) 
            {
             return cardOne = clickedCard;
            }
          cardTwo = clickedCard;
          disableDeck = true;
          let cardOneImg = cardOne.querySelector(".back-view img").src,
          cardTwoImg = cardTwo.querySelector(".back-view img").src;
          matchCards(cardOneImg, cardTwoImg);
        }
   }

 function matchCards(Img1, Img2) {
    if (Img1 === Img2) {
        matchedCard++;
        score = score + 10;
        updateScore();
        if (matchedCard === 8) {
            setTimeout(() => {
                alert(`Congratulations! Your final score is ${score}`);
                return shuffleCards();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        score = score - 5; 
        updateScore();
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);
        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
    }
}

function shuffleCards() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    score = 0; // Reset score when reshuffling
    updateScore();

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let ImgTag = card.querySelector(".back-view img");
        ImgTag.src = `gameimg/pokemon-${arr[index]}.jpg`;
        card.addEventListener("click", flipCard);
    });
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

shuffleCards();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
