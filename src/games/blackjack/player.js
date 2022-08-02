const BasePlayer = require('./basePlayer');

class Player extends BasePlayer {
  constructor(id) {
    super();
    this.id = id;
    this.standing = false;
    this.hasHit = false;
  }

  get turnEnded() {
    return this.busted || this.standing;
  }

  stand() {
    this.standing = true;
  }

  hit() {
    this.hasHit = true;
  }
}

module.exports = Player;
