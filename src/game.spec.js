const Should = require('should');
const Game = require('./game.js');

describe("The test environment", function () {
  it("should pass", function () {
    (true).should.equal(true);
  });

  it("should access game", function () {
    Should(Game).not.equal(undefined);
  });
});

describe("The game", function () {
  let game = new Game({people: ['one', 'two']});
  it("should switch players", function () {
    let firstPlayer = game.currentPlayer;
    game.nextPlayer();
    Should(firstPlayer).not.equal(game.currentPlayer);
  });
});
