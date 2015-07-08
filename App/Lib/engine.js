var fixtures = require('../fixtures');
var _ = require('lodash')

class Engine {

  constructor() {
    this.loadData(fixtures);
    var id = 0;
    _.each(this.data, (card) => {
      card.score = 0;
      card.id = id;
      id++;
    });
  }

  loadData(data) {
    this.data = data;
  }

  getNextCard() {
    var groupedData = _.values(
      _.groupBy(this.data, 'score')
    );

    // pick the grup with the lower results
    var weakGroup = groupedData[0];
    // exclude current card from weak grup
    if (this.currentCard) {
      weakGroup = _.filter(weakGroup, (cardData) => cardData.id !== this.currentCard.id);
    }

    console.log('Weak group:', weakGroup);
    this.currentCard = _.sample(weakGroup);
    return this.currentCard;
  }

  progressCurrentCard() {
    this.currentCard.score += 1;
  }

  regressCurrentCard() {
    if (this.currentCard.score > 0) this.currentCard.score -= 1;
  }

}

module.exports = new Engine;
