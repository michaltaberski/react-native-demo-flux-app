var alt = require('../alt');

class CardActions {

  shuffleNextCard() {
    this.dispatch();
  }

  progressCurrentCard() {
    this.dispatch();
  }

  regressCurrentCard() {
    this.dispatch();
  }

  showCurrentCardResult() {
    this.dispatch();
  }

}

module.exports = alt.createActions(CardActions);
