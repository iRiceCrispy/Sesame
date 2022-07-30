const Dealer = require('./dealer');
const Player = require('./player');
const Deck = require('../util/deck');

class Blackjack {
  constructor(playerIds) {
    this.deck = new Deck();
    this.dealer = new Dealer();
    this.players = playerIds.map(id => new Player(id));
    this.naturals = [];
    this.winners = [];
    this.losers = [];
    this.ties = [];
    this.gameover = this.players.every(player => player.turnEnded);
  }

  start() {
    for (let i = 0; i < 2; i++) {
      this.players.forEach((player) => {
        player.draw(this.deck);
      });

      this.dealer.draw(this.deck);
    }
  }

  end() {
    while (this.dealer.score < 17) {
      this.dealer.draw(this.deck);
    }

    if (this.dealer.hasBlackjack) {
      this.players.forEach((player) => {
        if (player.hasBlackjack) {
          this.ties.push(player);
        }
        else this.losers.push(player);
      });
    }
    else if (this.dealer.busted) {
      this.players.forEach((player) => {
        if (player.hasBlackjack) {
          this.naturals.push(player);
        }
        else if (player.busted) {
          this.losers.push(player);
        }
        else this.winners.push(player);
      });
    }
    else {
      this.players.forEach((player) => {
        if (player.hasBlackjack) {
          this.naturals.push(player);
        }
        else if (player.busted || player.score < this.dealer.score) {
          this.losers.push(player);
        }
        else if (player.score === this.dealer.score) {
          this.ties.push(player);
        }
        else this.winners.push(player);
      });
    }
  }
}

module.exports = Blackjack;
