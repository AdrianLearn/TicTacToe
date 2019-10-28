/**index.js
* Independant project to mimic a game of Tic-Tac-Toe
* Author: Adrian Leung
* Date: September 15, 2019
*/
// Array to represent the blank board
let board;
const FBT = 500/3; // Stands for firstBoardThird, represents the first third of the board
const SBT = 1000/3; // Stands for secondBoardThird, represents the second third of the board
const dim = 500; // Stands for dimension, represents the dimensions of the board
let players = ['O','X']; //Array to represent players O and X
const result = document.getElementById("currentPlayer"); // To display to the user whose turn it is
const previousWinner = document.getElementById("previousWinner"); // To display to the user who the previous winner was
const xTotal = document.getElementById("xTotal"); // To display the number of wins player X has
const oTotal = document.getElementById("oTotal"); // To display the number of wins player Y has
let xScore = 0; // Variable to keep track of how many wins player X has
let oScore = 0; // Variable to keep track of how many wins player Y has
let currentPlayer; // Variable to keep track of whose turn it is
let moveCounter = 0; // Variable to count the number of moves in a game


/**
* Method to setup the board, called when started by p5.js
*/
function setup(){
  board = [
  ['','',''],
  ['','',''],
  ['','',''],
  ];
  moveCounter = 0;
  createCanvas(500,500);
  console.log("setup");
  currentPlayer = floor(random(players.length));
}

/**
* Method to iterate to the next turn
*/
function nextTurn() {
  switch(checkQuadrant()) {
  case "quad1":
    if(board[0][0] == ''){
      board[0][0] = players[currentPlayer];
      currentPlayer = (currentPlayer + 1) % players.length;
      moveCounter++;
    }
    break;
  case "quad2":
    if(board[1][0] == ''){
      board[1][0] = players[currentPlayer];
      currentPlayer = (currentPlayer + 1) % players.length;
      moveCounter++;
    }
    break;
  case "quad3":
  if(board[2][0] == ''){
    board[2][0] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
    moveCounter++;
  }
    break;
  case "quad4":
  if(board[0][1] == ''){
    board[0][1] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
    moveCounter++;
  }
    break;
  case "quad5":
  if(board[1][1] == ''){
    board[1][1] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
    moveCounter++;
  }
    break;
  case "quad6":
  if(board[2][1] == ''){
    board[2][1] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
    moveCounter++;
  }
    break;
  case "quad7":
  if(board[0][2] == ''){
    board[0][2] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
    moveCounter++;
  }
    break;
  case "quad8":
  if(board[1][2] == ''){
    board[1][2] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
    moveCounter++;
  }
    break;
  case "quad9":
  if(board[2][2] == ''){
    board[2][2] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
    moveCounter++;
  }
    break;
  default:
    console.log("outside canvas");
  }
  result.textContent = players[currentPlayer];
}

/**
* Method to determine if a, b and c are equal and not blank.
* @param a value to be compared
* @param b value to be compared
* @param c value to be compared
* @return boolean which is true if the three are equal, false if they are not.
*/
function threequals(a,b,c){
  return(a == b && b == c && a != '');
}

/**
* Method to move to the next turn when the mouse is clicked.
*/
function mousePressed() {
  if(mouseX > 0 && mouseX < dim && mouseY > 0 && mouseY < dim){
    nextTurn();
  }
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
  if(winner == null && moveCounter == 9) {
    return 'tie';
  }else {
    return winner;
  }
}

/**
*This terrible display of logic to determine what position the mouse is currently in to place a character at the location
**/
function checkQuadrant(){
  if(mouseX > 0 && mouseX < FBT && mouseY > 0 && mouseY < FBT){
    return "quad1";
  }
  if(mouseX > FBT && mouseX < SBT && mouseY > 0 && mouseY < FBT){
    return "quad2";
  }
  if(mouseX > SBT && mouseX < dim && mouseY > 0 && mouseY < FBT){
    return "quad3";
  }
  if(mouseX > 0 && mouseX < FBT && mouseY > FBT && mouseY < SBT){
    return "quad4";
  }
  if(mouseX > FBT && mouseX < SBT && mouseY > FBT && mouseY < SBT){
    return "quad5";
  }
  if(mouseX > SBT && mouseX < dim && mouseY > FBT && mouseY < SBT){
    return "quad6";
  }
  if(mouseX > 0 && mouseX < FBT && mouseY > SBT && mouseY < dim){
    return "quad7";
  }
  if(mouseX > FBT && mouseX < SBT && mouseY > SBT && mouseY < dim){
    return "quad8";
  }
  if(mouseX > SBT && mouseX < dim && mouseY > SBT && mouseY < dim){
    return "quad9";
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

  let winner = checkWinner();
  if (winner != null) {
    if(winner == 'X'){
      xScore++;
    }
    if(winner == 'O'){
      oScore++;
    }
    xTotal.textContent = xScore;
    oTotal.textContent = oScore;
    previousWinner.textContent = winner;
    winner = null;
    setup();
    }
  }
