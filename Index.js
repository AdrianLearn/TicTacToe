/** Index.js
* Independant project to mimic a game of Tic-Tac-Toe
* Authors: Adrian Leung
* Date: September 15, 2019
*/
// Array to represent the blank board
let board = [
['','',''],
['','',''],
['','',''],
];

let players = ['O','X']; //Array to represent players O and X
let currentPlayer; // Variable to keep track of whose turn it is
let open = []; // Variable to determine if a spot is used or not
/**
* Method to setup the board, called when started by p5.js
*/
function setup(){
  createCanvas(500,500);
  currentPlayer = floor(random(players.length));
  for (let i = 0; i < 3; i++) {
    for(let c = 0; c < 3; c++) {
      open.push([i,c]);
    }
  }
}
/**
* Method to iterate to the next turn
*/
function nextTurn() {
  let index = floor(random(open.length));
  let spot = open.splice(index,1)[0];
  let i = spot[0];
  let c = spot[1];
  board[i][c]=players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}
/**
* Method to determine if a, b and c are equal and not blank.
* @param abc to be compared
* @return boolean which is true if the three are equal, false if they are not.
*/
function threequals(a,b,c){
  return(a == b && b == c && a != '');
}
/**
* Method to move to the next turn when the mouse is clicked.
*/
function mousePressed() {
  nextTurn();
}
/**
* Method to check if someone has won the game, using the threequals method.
* @return true if there is a winner and end the game, false and the game continues
*/
function checkWinner() {
  let winner = null;
  for (let i = 0; i < 3; i++) {
    if(threequals(board[i][0],board[i][1],board[i][2])){
      winner = board[i][0];
    }
  }
    for (let i = 0; i < 3; i++) {
    if(threequals(board[0][i],board[1][i],board[2][i])){
      winner = board[0][i];
    }
  }
  if(threequals(board[0][0],board[1][1],board[2][2])){
    winner = board[0][0];
  }
  if(threequals(board[2][0],board[1][1],board[0][2])){
    winner = board[2][0];
  }
  if(winner == null && open.length == 0) {
    return 'tie';
  }else {
    return winner;
  }
}
/**
* Method to draw the board, X's and O's, called 60 times a second by p5.js.
*/
function draw() {
  textSize(32);
  background(220);
  strokeWeight(4);
  const h = height/3;
  const w = width/3;
  line(w,0,w,height);
  line(w*2,0,w*2,height);
  line(0,h,width,h);
  line(0,h*2,width,h*2);
  for(let c = 0; c < 3; c++) {
    for(let i = 0; i < 3; i++) {
    let x = w * i + w/2;
    let y = h * c + h/2;
    let place = board[i][c];
    if (place == players[0]) {
      noFill();
      ellipse(x,y,w/2);
    } else if (place == players[1]){
      let xSize = w/4;
      line(x-xSize,y-xSize,x+xSize,y+xSize);
      line(x+xSize,y-xSize,x-xSize,y+xSize);
      }
    }
  }
  
  let result = checkWinner();
  if (result != null) {
    noLoop();
    console.log(result);
    createP(result).style('color', '#000').style('font-size','32pt');
    console.log(result);
  }else {
    nextTurn();
  }

}
