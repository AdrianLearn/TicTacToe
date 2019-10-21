/**index.js
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
const FBT = 500/3; // stands for firstBoardThird
const SBT = 1000/3; // stands for secondBoardThird
const dim = 500; // stands for dimension
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
  switch(checkQuadrant()) {
  case "quad1":
    console.log("marker at quad1");
    board[0][0]=players[currentPlayer];
    break;
  case "quad2":
    console.log("marker at quad2");
    board[1][0]=players[currentPlayer];
    break;
  case "quad3":
    console.log("marker at quad3");
    board[2][0]=players[currentPlayer];
    break;
  case "quad4":
    console.log("marker at quad4");
    board[0][1]=players[currentPlayer];
    break;
  case "quad5":
    console.log("marker at quad5");
    board[1][1]=players[currentPlayer];
    break;
  case "quad6":
    console.log("marker at quad6");
    board[2][1]=players[currentPlayer];
    break;
  case "quad7":
    console.log("marker at quad7");
    board[0][2]=players[currentPlayer];
    break;
  case "quad8":
    console.log("marker at quad8");
    board[1][2]=players[currentPlayer];
    break;
  case "quad9":
    console.log("marker at quad9");
    board[2][2]=players[currentPlayer];
    break;
  default:
    console.log("outside canvas");
  }

  //board[i][c]=players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
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
  if(winner == null && open.length == 0) {
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
  }  if(mouseX > FBT && mouseX < SBT && mouseY > 0 && mouseY < FBT){
    return "quad2";
  }  if(mouseX > SBT && mouseX < dim && mouseY > 0 && mouseY < FBT){
    return "quad3";
  }  if(mouseX > 0 && mouseX < FBT && mouseY > FBT && mouseY < SBT){
    return "quad4";
  }  if(mouseX > FBT && mouseX < SBT && mouseY > FBT && mouseY < SBT){
    return "quad5";
  } if(mouseX > SBT && mouseX < dim && mouseY > FBT && mouseY < SBT){
    return "quad6";
  } if(mouseX > 0 && mouseX < FBT && mouseY > SBT && mouseY < dim){
    return "quad7";
  } if(mouseX > FBT && mouseX < SBT && mouseY > SBT && mouseY < dim){
    return "quad8";
  } if(mouseX > SBT && mouseX < dim && mouseY > SBT && mouseY < dim){
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

  let result = checkWinner();
  if (result != null) {
    if(result = 'tie'){
      console.log("tie");
    }
    console.log(result);
    if(mouseIsPressed()){
      setup();
    }
  }else {
    nextTurn();
  }

}
