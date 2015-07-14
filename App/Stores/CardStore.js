var alt = require('../alt');
var fixtures = require('../fixtures');
var CardActions = require('../Actions/CardActions');
var engine = require('../Lib/engine');

class CardStore {

  constructor() {
    // mocking data
    this.cards = fixtures;
    engine.loadData(this.cards);

    this.setNewCurrentCard(engine.shuffleNextCard());

    this.bindListeners({
      onShuffleNextCar: CardActions.SHUFFLE_NEXT_CARD,
      onProgressCurrentCard: CardActions.PROGRESS_CURRENT_CARD,
      onRegressCurrentCard: CardActions.REGRESS_CURRENT_CARD,
      onShowCurrentCardResult: CardActions.SHOW_CURRENT_CARD_RESULT,
    });

  }

  setNewCurrentCard(currentCard) {
    this.currentCard = currentCard;
    this.showResult = false;
  }

  onShuffleNextCar() {
    this.setNewCurrentCard(engine.shuffleNextCard());
  }

  onProgressCurrentCard() {
    engine.progressCurrentCard()
  }

  onRegressCurrentCard() {
    engine.regressCurrentCard()
  }

  onShowCurrentCardResult() {
    this.showResult = true;
  }

}


module.exports = alt.createStore(CardStore, 'CardStore');
