class pointer {
  static startGameButton = document.getElementById("startGameButton");
  static newGameButton = document.getElementById("newGameButton");
  static currentScore = document.getElementById("currentscore");
  static highScore = document.getElementById("highscore");
  static highScorer = document.getElementById("highscorer");
  static gameboard = document.querySelector(".gameboard");
}

class events {
  static cardObj1 = null;
  static cardObj2 = null;
  static isClickable = true;

  static newGame() {
    update.update();
    UserActions.newGameEnvironment();
    pointer.startGameButton.classList.add("hidden");
    pointer.newGameButton.classList.remove("hidden");
    events.generateCards();
    this.isClickable = true;
    events.deselectCards();
  }

  static generateCards() {
    pointer.gameboard.innerHTML = "";
    GameUtils.cards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.id = card.cardId;
      cardElement.addEventListener("click", () => {
        if (events.isClickable) {
          this.selectCard(GameUtils.cards[index]);
        }
      });
      pointer.gameboard.appendChild(cardElement);
    });
  }

  static selectCard(card) {
    if (!Cards.firstCardSelected) {
      events.cardObj1 = document.getElementById(`${card.cardId}`);
      events.cardObj1.textContent = card.emoji;
      Cards.selectCard(card);
    } else if (!Cards.secondCardSelected) {
      events.cardObj2 = document.getElementById(`${card.cardId}`);
      events.cardObj2.textContent = card.emoji;
      Cards.selectCard(card);
      events.isClickable = false;
      setTimeout(() => {
        events.cardObj1.textContent = "";
        events.cardObj2.textContent = "";
        events.isClickable = true;
      }, 400);
      if (this.cardObj1.textContent === this.cardObj2.textContent) {
        this.cardObj1.classList.add("hidden");
        this.cardObj2.classList.add("hidden");
      }
      this.deselectCards;
      update.update();
    }
  }

  static deselectCards() {
    events.cardObj1 = null;
    events.cardObj2 = null;
  }
}

class update {
  static update() {
    pointer.currentScore.textContent = Score.currentScore;
    pointer.highScore.textContent = Score.highScore;
    pointer.highScorer.textContent = Score.highscoreName;
  }
}

pointer.newGameButton.classList.add("hidden");
pointer.startGameButton.addEventListener("click", events.newGame);
pointer.newGameButton.addEventListener("click", events.newGame);
pointer.currentScore.textContent = Score.currentScore;
pointer.highScore.textContent = Score.highScore;
pointer.highScorer.textContent = Score.highscoreName;
