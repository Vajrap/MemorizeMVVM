class UserActions {
  static newGameEnvironment() {
    console.log("New Game");
    Score.currentScore = 0;
    Score.updateScore();
    GameUtils.cards = [];
    Cards.deselectCards();
    const numOfPairs = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    const numOfCards = numOfPairs * 2;
    console.log(
      `Number of cards and pairs randomed are ${numOfCards} and ${numOfPairs}`
    );

    const emojisCategory =
      Math.random() < 0.5 ? GameUtils.jobs : GameUtils.foods;

    const shuffledEmojis = [
      ...emojisCategory.slice(0, numOfPairs),
      ...emojisCategory.slice(0, numOfPairs),
    ].sort(() => Math.random() - 0.5);

    console.log(shuffledEmojis);

    for (let i = 0; i < numOfCards; i++) {
      const card = {
        emoji: shuffledEmojis[i],
        isFlipped: 0,
        isFaceUp: false,
        isMatched: false,
        cardId: i,
      };
      GameUtils.cards.push(card);
    }
  }
}

class GameUtils {
  static cards = [];
  static jobs = [
    "👮‍♂️",
    "🕵️‍♂️",
    "💂‍♂️",
    "🥷",
    "👷‍♂️",
    "👨‍⚕️",
    "👨‍🎓",
    "👩‍🏫",
    "👩‍⚖️",
    "👩‍🌾",
    "👨‍🍳",
    "👩‍🔧",
    "👨‍🚒",
    "🦹‍♀️",
    "🦸‍♂️",
    "🧙‍♂️",
    "🧛‍♂️",
    "🧕",
    "🧜‍♂️",
    "🧝‍♂️",
  ];
  static foods = [
    "🍕",
    "🍔",
    "🍟",
    "🌭",
    "🍿",
    "🥪",
    "🥙",
    "🧀",
    "🍖",
    "🍠",
    "🍱",
    "🍙",
    "🍣",
    "🍩",
    "🍭",
    "🍺",
    "🍉",
    "🍍",
    "🍌",
    "🍪",
  ];
}

class Score {
  static highScore = "-";
  static currentScore = 0;
  static highscoreName = "-";
  static updateScore() {
    console.log(`Score: ${this.currentScore}`);
  }

  static updateHighScore() {
    console.log(`High Score: ${this.highScore}`);
  }
}

class Cards {
  static firstCardSelected = null;
  static secondCardSelected = null;

  static selectCard(card) {
    if (card === this.firstCardSelected || card === this.secondCardSelected) {
      console.log(`A card is currently flipping up`);
      return;
    }
    if (card.isMatched) {
      console.log(`A card is already matched`);
      return;
    }
    if (!this.firstCardSelected) {
      this.firstCardSelected = card;
      this.flipCard(card);
    } else if (!this.secondCardSelected) {
      this.secondCardSelected = card;
      this.flipCard(card);
      this.checkMatched();
      this.unflipCard();
      this.deselectCards();
    }
  }

  static flipCard(card) {
    console.log(`flipping ${card.emoji}`);
    card.isFlipped++;
    card.isFaceUp = true;
  }

  static checkMatched() {
    if (this.firstCardSelected.emoji === this.secondCardSelected.emoji) {
      console.log(
        `${this.firstCardSelected.emoji} and ${this.secondCardSelected.emoji} Matched`
      );
      this.cardMatched();
      Score.currentScore += 2;
      Score.updateScore();
      GameState.checkGameEnd();
    } else {
      console.log(
        `${this.firstCardSelected.emoji} and ${this.secondCardSelected.emoji} UNmatched`
      );
      let deduceScore =
        (this.firstCardSelected.isFlipped > 1) +
        (this.secondCardSelected.isFlipped > 1);
      console.log(`deducing ${deduceScore} point(s)`);
      Score.currentScore -= deduceScore;
      Score.updateScore();
      deduceScore = 0;
    }
  }

  static deselectCards() {
    this.firstCardSelected = null;
    this.secondCardSelected = null;
  }

  static unflipCard() {
    this.firstCardSelected.isFaceUp = false;
    this.secondCardSelected.isFaceUp = false;
  }

  static cardMatched() {
    this.firstCardSelected.isMatched = true;
    this.secondCardSelected.isMatched = true;
  }
}

class GameState {
  static checkGameEnd() {
    console.log(`check game end`);
    console.log(GameUtils.cards.map((card) => card.isMatched));
    const allMatched = GameUtils.cards.every((card) => card.isMatched);
    if (allMatched) {
      console.log(`All Matched, Game End`);
      GameState.gameEnd();
    } else {
      console.log(`Not all matched. game continue`);
    }
  }

  static gameEnd() {
    setTimeout(() => {
      if (Score.highScore === "-") {
        Score.highscoreName = prompt(
          "First game won! Set the highscore with your name (Up to 8 characters)."
        );
        while (Score.highscoreName.length > 8) {
          Score.highscoreName = prompt(
            "Please enter a name with 8 characters or fewers"
          );
        }
        Score.highScore = Score.currentScore;
        Score.updateHighScore();
      } else if (Score.currentScore > Score.highScore) {
        Score.highscoreName = prompt(
          "Congrat! you win the high score, please input a name within 8 characters length"
        );
        while (Score.highscoreName.length > 8) {
          Score.highscoreName = prompt(
            "Please enter a name with 8 characters or fewers"
          );
        }
        Score.highScore = Score.currentScore;
        Score.updateHighScore();
      } else {
        alert("Game Ended! Unlucky, you're not good enough!");
      }
    }, 200);
  }
}
