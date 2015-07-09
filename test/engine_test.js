'use strict';
var assert = require("assert");
var should = require("chai").should();
var _ = require("lodash");

var engine = require('../App/Lib/engine');

var fixtures = [
  {"question": "posterity", "answer": "potomkowie"},
  {"question": "obsolete", "answer": "przestarzały"},
  {"question": "desire", "answer": "pragnienie"},
];

describe('Engine', () => {

  beforeEach(() => {
    // reload data, so it reset engine state
    engine.loadData(fixtures);
  });

  it('should load data', () => {
    engine.data.length.should.be.equal(fixtures.length);
  });

  it('should add ids, and score for each record', () => {
    _.each(engine.data, (record, index) => {
      record.id.should.be.equal(index);
      record.score.should.be.equal(0);
    });
  });

  it('should decrease weakGroup length if record is progressed', () => {
    engine.getWeakGroup().length.should.be.equal(3);
    engine.shuffleNextCard();
    engine.progressCurrentCard();
    engine.getWeakGroup().length.should.be.equal(2);
  });

  it('should not change weakGroup length if record is regressed', () => {
    engine.getWeakGroup().length.should.be.equal(3);
    engine.shuffleNextCard();
    engine.regressCurrentCard();
    engine.getWeakGroup().length.should.be.equal(3);
  });

  it('next record should never be the sames as the previous one', () => {
    engine.shuffleNextCard();
    var currentCardId = engine.currentCard.id;
    _.times(10, () => {
      var nextCard = engine.shuffleNextCard();
      engine.currentCard.id.should.not.be.equal(currentCardId);
      currentCardId = engine.currentCard.id;
    });
  });

  it('weak group should always have more then one card', () => {
    _.times(fixtures.length, () => {
      engine.shuffleNextCard();
      engine.progressCurrentCard();
    });

    engine.shuffleNextCard()
    engine.regressCurrentCard();
    engine.getWeakGroup().length.should.be.above(1);

    engine.shuffleNextCard()
    engine.regressCurrentCard();
    engine.getWeakGroup().length.should.be.above(1);
  });

});
