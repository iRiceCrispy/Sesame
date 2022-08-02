class BasePlayer {
  constructor() {
    this.hand = [];
  }

  get score() {
    let score = 0;
    let aces = 0;

    this.hand.forEach((card) => {
      switch (card.rank) {
        case 'A':
          aces += 1;
          score += 11;
          break;
        case 'J': case 'Q': case 'K':
          score += 10;
          break;
        default:
          score += Number(card.rank);
          break;
      }
    });

    while (aces > 0 && score > 21) {
      aces -= 1;
      score -= 10;
    }

    return score;
  }

  get busted() {
    return this.score > 21;
  }

  get hasBlackjack() {
    const card1 = this.hand[0].rank;
    const card2 = this.hand[1].rank;

    return (card1 === 'A' && ['10', 'J', 'Q', 'K'].includes(card2)) || (card2 === 'A' && ['10', 'J', 'Q', 'K'].includes(card1));
  }

  draw(deck, num = 1) {
    this.hand.push(...deck.deal(num));

    return this;
  }
}

module.exports = BasePlayer;
