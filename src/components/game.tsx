import { useState } from 'react';
import './game.css';
import Timer from './timer';
import Cell from './cell';

function Game(){

    function isFull(){
        return !cellValues.includes('');
    }

    function winner(): string {
        // Check rows
        for (let i = 0; i < 9; i += 3) {
          if (cellValues[i] !== '' && cellValues[i] === cellValues[i + 1] && cellValues[i] === cellValues[i + 2]) {
            return cellValues[i]; 
          }
        }
      
        // Check columns
        for (let i = 0; i < 3; i++) {
          if (cellValues[i] !== '' && cellValues[i] === cellValues[i + 3] && cellValues[i] === cellValues[i + 6]) {
            return cellValues[i]; 
          }
        }
      
        // Check diagonals
        if (cellValues[0] !== '' && cellValues[0] === cellValues[4] && cellValues[0] === cellValues[8]) {
          return cellValues[0];
        }
      
        if (cellValues[2] !== '' && cellValues[2] === cellValues[4] && cellValues[2] === cellValues[6]) {
          return cellValues[2]; 
        }
      
        return '';
      }

      function isTie(){
        return isFull() && winner() === '';
    }

    function changeCellValue(cellNumber: number){
        if(cellNumber >= 0 && cellNumber < 9 && !gameOver){
            console.log("the winner is " + winner() + "you can't change the board now with your click");
            if(winner() !== '' || isTie()){
                endGame();
                return;
            }
            switchTurn()
            updateCellValues(cellNumber, currentPlayer);
        }
    }

    function switchTurn(){
        console.log("we are here my friend");
        setCurrentPlayer(currentPlayer === "x"? "o" : "x");
        console.log("its time for " + currentPlayer + " to play");
    }

    function endGame(){
        setGameOver(true);
        console.log("now the game is over and no one can play");
    }

    function rePlay(){
        setCellValues(['', '', '', '', '', '', '', '', '']);
        setCurrentPlayer("x");
        setGameOver(false)
    }

    function gameText(){
        var gameText = "Player " + (currentPlayer === "x" ? "X" : "O") + "'s turn";
        var winnerPlayer = winner();
        if(winnerPlayer !== ''){
            gameText = "Player " + (winnerPlayer === "x" ? "X" : "O") + " won!";
        }
        else if(isTie()){
            gameText = "Tie!";
        }
        return gameText;
    }

    function updateCellValues(cellNumber: number, value: string){
        var cellCurrentValues = cellValues.slice();
        cellCurrentValues[cellNumber] = value;
        setCellValues(cellCurrentValues);
    }

    var [cellValues ,setCellValues] = useState(["", "", "", "", "", "", "", "", ""])
    var [currentPlayer, setCurrentPlayer] = useState("x")
    const [gameOver, setGameOver] = useState(false);
    var cells = [];

    for(let i = 0; i < 9; i++){
        cells.push(<Cell cellNumber={i} handleCellClick={changeCellValue} clickedBy={cellValues[i]} ></Cell>);
    }

    return <div className="game">
                <div className="xo-image"></div>
                <div className="reset-btn" onClick={rePlay}></div>
                <Timer></Timer>
                <div className="turn">{gameText()}</div>
                <div className="board">
                    {cells}
                </div>
            </div>
    
}

export default Game;