const BasePlayer = require('./basePlayer');

class Dealer extends BasePlayer {
  get faceupScore() {
    const { rank } = this.hand[0];

    switch (rank) {
      case 'A':
        return 11;
      case 'J': case 'Q': case 'K':
        return 10;
      default:
        return Number(rank);
    }
  }
}

module.exports = Dealer;
