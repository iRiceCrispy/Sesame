class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.name = rank + suit;
  }
}

module.exports = Card;
