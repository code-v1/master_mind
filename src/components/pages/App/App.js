import React, {Component} from 'react';
import './App.css';
import GameBoard from '../../GameBoard/GameBoard';
import ColorPicker from '../../ColorPicker/ColorPicker'
import GameTimer from '../../GameTimer/GameTimer'
import NewGameButton from '../../NewGameButton/NewGameButton'
import { Route } from 'react-router-dom';

const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];


class App extends Component {
  constructor() {
    super();
    this.state = this.newGame();
  }

  newGame() {
   return {
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      code:this.genCode()
      
    };

  }


  getNewGuess() {
    return{
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  handleColorSelection = (colorIdx) => {
    this.setState({selColorIdx: colorIdx});
  };

  handleNewGameClick = () => {
    this.setState(this.newGame()); 
    console.log('working');
  }


  genCode() {
    return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }

  handlePegClick = (pegIdx) => {
    // getting the index of the last guess object 
    let currentGuessIdx = this.state.guesses.length - 1;

    // replace objects/arrays with New ones , not mutate older ones
    let guessesCopy = [...this.state.guesses];
    let guessCopy = {...guessesCopy[currentGuessIdx]};
    let codeCopy = [...guessCopy.code];

    // this will update the New array with currrently selected color
    codeCopy[pegIdx] = this.state.selColorIdx;

    // updating the NEW guess object
    guessCopy.code = codeCopy;

    // updating the NEW guesses array
    guessesCopy[currentGuessIdx] = guessCopy;

    //updating the state with NEW guesses array
    this.setState({
        guesses: guessesCopy
    });
  }

handleScoreClick = () => {
  // this is the index of the current guess object (last object in guesses array)
  let currentGuessIdx = this.state.guesses.length -1;

  // need to create working copies of the 'guessed' code the secret
  // code , allowings us to modify them as we compute the number of 
  // perfect and almost , this is done to not mutate the actual ones in state
let guessCodeCopy = [...this.state.guesses[currentGuessIdx].code];
let secretCodeCopy = [...this.state.code];

let perfect = 0, almost = 0;

// First passing in computes number of 'Perfect score'
guessCodeCopy.forEach((code, idx) => {
    if (secretCodeCopy[idx] === code) {
      perfect++;
      // by updating both elements in the 'working' arrays to null 
      // prevents same choice is not matched
      guessCodeCopy[idx] = secretCodeCopy[idx] = null;
    }
});
  
guessCodeCopy.forEach((code, idx) => {
  if ( code === null) return;
  let foundIdx = secretCodeCopy.indexOf(code);
  if (foundIdx > -1) {
    almost++;
    // making sure again choice isnt matched again
    secretCodeCopy[foundIdx] = null;
  }
});

// updating state with only NEW objects/arrays
// ALWAYS REPLACE OBJECTS/ARRAYS WITH 'NEW' ONES
let guessesCopy = [...this.state.guesses];
let guessCopy = {...guessesCopy[currentGuessIdx]};
let scoreCopy = {...guessCopy.score};

// set scores
scoreCopy.perfect = perfect;
scoreCopy.almost = almost;

// update NEW guess with NEW score object
guessCopy.score = scoreCopy;

// update the new guess with the NEW guess object
guessesCopy[currentGuessIdx] = guessCopy;

// add a new guess if not a winner
if (perfect !== 4) guessesCopy.push(this.getNewGuess());

// final update the state with the NEW guesses arreay
this.setState({
  guesses: guessesCopy
});
}


  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header className='App-header-footer'>R E A C T &nbsp;&nbsp;&nbsp;  M A S T E R M I N D</header>
        <Route path='/timer' render={(props) => (
          <GameTimer {...props}/>
        )}/>
        <div className="flex-h align-flex-end">
          <GameBoard
            colors={colors}
            guesses={this.state.guesses}
            handlePegClick={this.handlePegClick}
            handleScoreClick={this.handleScoreClick}
          />
          <div className='App-controls'>
            <ColorPicker
              colors={colors}
              selColorIdx={this.state.selColorIdx}
              handleColorSelection={this.handleColorSelection}
            />
            <GameTimer />
            <NewGameButton 
              handleNewGameClick={this.handleNewGameClick}
            />
          </div>
        </div>
        <footer className='App-header-footer'>
          {(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}
        </footer>
      </div>
    );
  }
}

export default App;
