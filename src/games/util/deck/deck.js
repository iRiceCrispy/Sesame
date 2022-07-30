const Card = require('./card');

class Deck {
  constructor(size = 1) {
    this.size = size;
    this.cards = [];
    this.create(size);
    this.shuffle();
  }

  create(size) {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♦️', '♣️', '♥️', '♠️'];

    for (let i = 0; i < size; i++) {
      ranks.forEach((rank) => {
        suits.forEach((suit) => {
          this.cards.push(new Card(rank, suit));
        });
      });
    }

    return this;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[r]] = [this.cards[r], this.cards[i]];
    }

    return this;
  }

  deal(num = 1) {
    return this.cards.splice(this.cards.length - num, num);
  }
}

module.exports = Deck;
