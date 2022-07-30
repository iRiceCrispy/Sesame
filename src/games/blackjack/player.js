const BasePlayer = require('./basePlayer');

class Player extends BasePlayer {
  constructor(id) {
    super();
    this.id = id;
    this.stood = false;
    this.turnEnded = this.busted || this.stood;
  }

  stand() {
    this.stood = true;
  }
}

module.exports = Player;
