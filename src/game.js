"use strict";

class Game{

  constructor(opts={}){
    this.categories = ['Pop', 'Science', 'Sports', 'Rock'];
    this.categoryAnswers = {'Pop': 0, 'Science': 0, 'Sports': 0, 'Rock': 0};

    // TODO: Refactor players into class or object
    this.players = new Array();
    this.places = new Array(6);
    this.purses = new Array(6);
    this.inPenaltyBox = new Array(6);

    this.currentPlayer = 0;
    this.isGettingOutOfPenaltyBox = false;

    if(typeof(opts.people) != 'undefined'){
      for (let i = 0; i < opts.people.length; i++) {
        this.add(opts.people[i]);
      }
    }
  }

  didPlayerWin(){
    return !(this.purses[this.currentPlayer] === 6)
  }

  currentCategory(){
    return this.categories[this.places[this.currentPlayer] % 4];
  }

  getQuestion(category){
    // Returning and incrementing answer count
    return `${category} Question ${this.categoryAnswers[category]++}`;
  }

  add(playerName){
    this.players.push(playerName);

    let playerIndex = this.players.length - 1;
    this.places[playerIndex] = 0;
    this.purses[playerIndex] = 0;
    this.inPenaltyBox[playerIndex] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }


  askQuestion(){
    console.log(this.getQuestion(this.currentCategory()));
  }

  nextPlayer(){
    this.currentPlayer += 1;
    if (this.currentPlayer === this.players.length){
      this.currentPlayer = 0;
    }
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
    if (this.inPenaltyBox[this.currentPlayer] && !this.isGettingOutOfPenaltyBox) {
        this.nextPlayer();
        return true;
    } else {

      console.log("Answer was correct!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(this.players[this.currentPlayer] + " now has " +
          this.purses[this.currentPlayer] + " Gold Coins.");

      let winner = this.didPlayerWin();

      this.nextPlayer();

      return winner;
    }
  }

  wrongAnswer() {
    console.log('Question was incorrectly answered');
    console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.nextPlayer();
    return true;
  }
}

let notAWinner = false;

let game = new Game({
  people: ['Chet', 'Pat', 'Sue']
});

do {

  game.roll(Math.floor(Math.random() * 6) + 1);

  // Is this roll based on some winning condition of a real game?
  if (Math.floor(Math.random() * 10) === 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }

} while (notAWinner);

module.exports = Game;