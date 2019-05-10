import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* 9 маленьких квадратиков */
function Square(props) {
 /*constructor(props) {
  super(props);
  this.state = {
   value: null,
  };
 }*/
   return (
     <button 
      className="square" 
      onClick={props.onClick}
     >
      {props.value}
     </button>
   );
}

/*Доска из трех рядов */
class Board extends React.Component {
  //Placing the history state into the Game component lets us remove the squares state 
 /*
  constructor(props) {
  super(props);
  this.state = {
   squares: Array(9).fill(null),
   xIsNext: true,
  };
 }
*/
/*
 handleClick(i) {
  //we used slice() to create a new copy of the squares array after every move
  const squares = this.state.squares.slice();
  //ignoring a click if someone has won the game or if a Square is already filled
  if (calculateWinner(squares) || squares[i]) {
   return;
  }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
   squares: squares,
   xIsNext: !this.state.xIsNext,
  });
 }
*/
 renderSquare(i) {
   return (
    <Square 
     //value = {this.state.squares[i]} 
     //onClick={() => this.handleClick(i)}
     value = {this.props.squares[i]} 
     onClick={() => this.props.onClick(i)}
    />
   );
 }

 render() {
   /*const winner = calculateWinner(this.state.squares);
   let status;
   if (winner) {
    status = 'Winner: ' + winner;
   } else {
     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
   }
   */
   return (
     <div>
       {/* <div className="status">{status}</div>{/* Next player: X */}
       <div className="board-row">
         {this.renderSquare(0)}
         {this.renderSquare(1)}
         {this.renderSquare(2)}
       </div>
       <div className="board-row">
         {this.renderSquare(3)}
         {this.renderSquare(4)}
         {this.renderSquare(5)}
       </div>
       <div className="board-row">
         {this.renderSquare(6)}
         {this.renderSquare(7)}
         {this.renderSquare(8)}
       </div>
     </div>
   );
 }
}

//to display a list of past moves
class Game extends React.Component {
  //Placing the history state into the Game component lets us remove the squares state from its child Board component.
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.squares.slice();
    //ignoring a click if someone has won the game or if a Square is already filled
    if (calculateWinner(squares) || squares[i]) {
     return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      //concatenate new history entries onto history
     history: history.concat([{
       squares: squares,
     }]),
     xIsNext: !this.state.xIsNext,
    });
   }
 render() {
   const history = this.state.history;
   const current = history[history.length-1];
   const vinner = calculateWinner(current.squares);

   let status;
   if (winner) {
    status = 'Winner: ' + winner;
   } else {
     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
   }
   
   return (
     <div className="game">
       <div className="game-board">
         <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
         />
       </div>
       <div className="game-info">
         <div>{status}</div>
         <ol>{/* TODO */}</ol>
       </div>
     </div>
   );
 }
}

/*
class ShoppingList extends React.Component {
 render() {
  return (
   <div className="shopping-list">
    <h1>Shopping List for {this.props.name}</h1>
    <ul>
     <li>Instagram</li>
     <li>WhatsApp</li>
     <li>Oculus</li>
    </ul>
   </div>
  );
 }
}
*/

function calculateWinner(squares) {
 const lines = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
 ];
 for (let i = 0; i < lines.length; i++) {
   const [a, b, c] = lines[i];
   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
     return squares[a];
   }
 }
 return null;
}
// ========================================

ReactDOM.render(
 <Game />,
 document.getElementById('root')
);