"use strict";

class Game{

  constructor(opts={}){
    this.players = new Array();
    this.places = new Array(6);
    this.purses = new Array(6);
    this.inPenaltyBox = new Array(6);

    this.popQuestions = new Array();
    this.scienceQuestions = new Array();
    this.sportsQuestions = new Array();
    this.rockQuestions = new Array();

    this.currentPlayer = 0;
    this.isGettingOutOfPenaltyBox = false;

    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push("Rock Question " + i);
    }
  }

  didPlayerWin(){
    return !(this.purses[this.currentPlayer] == 6)
  }

  currentCategory(){
    switch(this.places[this.currentPlayer] % 4) {
      case 0:
        return 'Pop';
        break;
      case 1:
        return 'Science';
        break;
      case 2:
        return 'Sports';
        break;
      default:
        return 'Rock';
    }
  }

  isPlayable(howManyPlayers){
    return howManyPlayers >= 2;
  }

  add(playerName){
    this.players.push(playerName);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  howManyPlayers() {
    return this.players.length;
  }


  askQuestion(){
    if (this.currentCategory() == 'Pop')
      console.log(this.popQuestions.shift());
    if (this.currentCategory() == 'Science')
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == 'Sports')
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == 'Rock')
      console.log(this.rockQuestions.shift());
  }

  roll(roll) {
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
          this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {

      this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
      if (this.places[this.currentPlayer] > 11) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
      }

      console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
      console.log("The category is " + this.currentCategory());
      this.askQuestion();
    }
  }

  wasCorrectlyAnswered(){
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        this.purses[this.currentPlayer] += 1;
        console.log(this.players[this.currentPlayer] + " now has " +
            this.purses[this.currentPlayer] + " Gold Coins.");

        var winner = this.didPlayerWin();
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
          this.currentPlayer = 0;

        return winner;
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
          this.currentPlayer = 0;
        return true;
      }


    } else {

      console.log("Answer was correct!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(this.players[this.currentPlayer] + " now has " +
          this.purses[this.currentPlayer] + " Gold Coins.");

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length)
        this.currentPlayer = 0;

      return winner;
    }
  }

  wrongAnswer() {
    console.log('Question was incorrectly answered');
    console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length)
      this.currentPlayer = 0;
    return true;
  }
}

var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do {

  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) == 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }

} while (notAWinner);

module.exports = Game;