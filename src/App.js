import React, {Component} from 'react';
import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker'
import GameTimer from './components/GameTimer/GameTimer'
import NewGameButton from './components/NewGameButton/NewGameButton'

const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];


class App extends Component {
  constructor() {
    super();
    this.state={
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


  genCode() {
    return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }
  


  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header className='App-header-footer'>R E A C T &nbsp;&nbsp;&nbsp;  M A S T E R M I N D</header>
        <div className="flex-h align-flex-end">
          <GameBoard
            colors={colors}
            guesses={this.state.guesses}
          />
          <div className='App-controls'>
            <ColorPicker
              colors={colors}
              selColorIdx={this.state.selColorIdx}
              handleC                        olorSelection={this.handleColorSelection}
            />
            <GameTimer />
            <NewGameButton />
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
