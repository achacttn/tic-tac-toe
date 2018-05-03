$(document).ready(function(){
    const ttt = {

        // pass dimension from DOM to cdValue
        cdValue: 0,
        // cd stands for current dimension
        currentDimension: function(dim){
            this.cdValue = dim;
            return this.cdValue;
        },

        // generating nxn board, each element goes into boardElements
        generateBoardElements: function (dim) {
            for (var i = 1; i <= (dim * dim); i++) {
                this.boardElements.push(i);
            }
        },
        // board element availability
        boardElements: [],

        // for games with more than 2 players, can keep all
        // players inside a single array, and mod the index
        // to cycle through
        // moves made by each player, in this example only one in each
        playerOne: [],
        playerTwo: [],

        // tracks turn, playerOne has value 1, playerTwo has value -1
        currentPlayerTracker: 1,

        // returns current player's move history
        currentPlayerChecker: function () {
            if (this.currentPlayerTracker > 0) {
                return this.playerOne;
            }
            else {
                return this.playerTwo;
            }
        },

        // alternate between players
        changeTurn: function () {
            this.currentPlayerTracker *= -1;
        },

        // returns true chosen board element is available for assignment
        validMoveChecker: function (squareChoice) {
            return (this.boardElements.indexOf(squareChoice) !== -1);
        },

        // changes board state for current player
        changeBoardState: function (squareChoice) {
            let currentPlayer = this.currentPlayerChecker();
            let currentMove = this.boardElements.indexOf(squareChoice);
            currentPlayer.push(this.boardElements.splice(currentMove, 1)[0]);
        },


        checkWin: function(){
            let currentPlayer = this.currentPlayerChecker();
            if (currentPlayer.length === this.cdValue){
                let totalSum = 0;
                for (var i=0; i<currentPlayer.length; i++){
                    totalSum += currentPlayer[i];
                }
                if (totalSum === this.cdValue*(this.cdValue*this.cdValue+1)/2){
                    console.log(`Player ${this.currentPlayerTracker} has won!`);
                }
            }
            if (currentPlayer.length > this.cdValue){

                console.log("current player");
                console.log(ttt.currentPlayerTracker);
                // define parameters of recursive function here
                // from set n, choose k combos
                let nChoosek = function(dimension, playerMoves){
                    let initialVars = playerMoves.length-dimension+1;
                    console.log(`numbOfInits is ${initialVars}`);
                    // only needs to be as many loop conds as initialVars
                    let loopConds = [];
                    for (var i=0; i<initialVars; i++){
                        loopConds.unshift(currentPlayer.length - 1 - i);
                    }
                    console.log("moves made by current player");
                    console.log(currentPlayer); // -> array of moves
                    console.log("initialized variables end loop on the following indices of player.length");
                    console.log(loopConds); // -> array
    
                    let nestChecker = function(numbOfInits, endingIndices){
                        if (numbOfInits === 0){
                            let result = "No win for you";
                            // add an if statement here when loop ends to check
                            // whether the current combination of values sum to magic number
                        }
                        else {
                            let indexer = playerMoves.length-dimension+1
                            for (var currentIndex = indexer - initialVars; currentIndex<playerMoves.length-indexer; currentIndex++){
                                nestChecker(initialVars-1, loopConds.splice(1));
                            }
                        }
                    }

                    nestChecker(initialVars, loopConds);
                }
                nChoosek(this.cdValue, this.currentPlayerChecker());
            }
        }
    }
    // method to reset board state, and player moves


    const dimension = document.getElementById("dimensions");
    const gameBoard = document.getElementById("gameBoard");
    const playButton = document.getElementById("playButton");

    const clearGrid = function () {
        let allSquares = document.getElementsByClassName("gridElement");
        while (allSquares.length > 0) {
            allSquares[0].parentNode.removeChild(allSquares[0]);
        }
    }
    const createGrid = function () {
        // add methods to clear board elements as well
        clearGrid();
        
        let dim = Number(dimension.value);
        dim = Math.round(Math.abs(dim),0);
        if (dim < 3){
            dim = 3;
        }
        if (dim%2 !== 1){
            dim--;
        }

        let rowNumber = dim;
        let colNumber = dim;
        ttt.currentDimension(dim);
        let boardHeight = gameBoard.clientHeight;
        let boardWidth = gameBoard.clientWidth;
        let navElement = document.getElementById("navigation");
        let headerElement = document.getElementById("headerelement");
        let gameBoardOffset = navElement.clientHeight + headerElement.clientHeight;


        for (var i = 0; i < rowNumber; i++) {
            for (var j = 0; j < colNumber; j++) {
                let newSquare = document.createElement("div");

                // grid element attributes
                newSquare.className = `gridElement`;
                newSquare.setAttribute("row",`${i+1}`);
                newSquare.setAttribute("column",`${j+1}`);
                newSquare.style.height = (boardHeight / rowNumber) + "px";
                newSquare.style.width = (boardWidth / colNumber) + "px";
                newSquare.style.top = (boardHeight / rowNumber) * i + gameBoardOffset + "px";
                newSquare.style.left = (boardWidth / colNumber) * j + "px";
                // see README induction proof for value allocation
                newSquare.id = `${dim * (((i + 1) + (j + 1) - 1 + Math.floor(dim / 2)) % dim) + (((i + 1) + 2 * (j + 1) - 2) % dim) + 1}`;

                let clickEvents = function (event) {
                    // returns value of square
                    var clickedVal = Number(event.path[0].getAttribute("id"));
                    console.log(clickedVal);
                    if (ttt.validMoveChecker(clickedVal)){
                        ttt.changeBoardState(clickedVal);
                        // check win condition
                        ttt.checkWin();
                        ttt.changeTurn();

                    }
                    else {
                        alert("invalid move bro");
                    }





                }
                newSquare.addEventListener("click", clickEvents);
                gameBoard.appendChild(newSquare);
            }
        }
        ttt.generateBoardElements(dim);
    }

    playButton.addEventListener("click", createGrid);



    
});
