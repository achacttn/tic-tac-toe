$(document).ready(function(){
    // game logic code
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

        // moves made by each player
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

        // a player wins when a combination of exactly cdValue numbers from their array of moves
        // sum to the magic number
        // magic number for a tic-tac-toe board of dimensions n is given by
        // n*(n^2+1)/2
        checkWin: function(){
            const currentMoves = this.currentPlayerChecker();
            const currentComb = [];
            // let cdConstant = this.cdValue
            // const that =
            let cdVar = this.cdValue;
            
            // recursive function to find combinations of all numbers
            const combinationFinder = (array, cd, indexer) => {
                if (cd === 0){
                    // check if combination sums to the magic number
                    console.table(currentComb);
                    let tempSum = 0;
                    for (var i=0; i<currentComb.length; i++){
                        tempSum += currentComb[i];
                    }
                    console.log(tempSum);
                    if (tempSum === this.cdValue*(this.cdValue*this.cdValue+1)/2){
                        alert(`Player ${this.currentPlayerTracker} is the winner!`)
                    }
                    return;
                }

                for (var i=indexer; i<array.length+1-cd; i++){
                    // this is an anonymous function, "this" will reference the global object
                    // console.log('this', this, this.cdValue);
                    currentComb[this.cdValue-cd] = array[i];
                    combinationFinder(array, cd-1, i+1);
                }
            }
            combinationFinder(currentMoves, cdVar,0)
        }
    }

    // DOM code
    const dimension = document.getElementById("dimensions");
    const gameBoard = document.getElementById("gameBoard");
    const playButton = document.getElementById("playButton");

    // resets grid when a new dimension is entered
    // called whenever new grid is created
    const clearGrid = function () {
        let allSquares = document.getElementsByClassName("gridElement");
        while (allSquares.length > 0) {
            allSquares[0].parentNode.removeChild(allSquares[0]);
        }
    }
    const createGrid = function () {
        clearGrid();
        
        // converts any numerical input to positive odd integer >= 3
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
                newSquare.style["font-size"] = (boardHeight/rowNumber) + "px";
                newSquare.style["line-height"] = (boardHeight/rowNumber) + "px";
                newSquare.id = `${dim * (((i + 1) + (j + 1) - 1 + ((dim-1)/ 2)) % dim) + (((i + 1) + 2 * (j + 1) - 2) % dim) + 1}`;

                let clickEvents = function (event) {
                    // returns value of each square's id
                    var clickedVal = Number(event.path[0].getAttribute("id"));
                    if (ttt.validMoveChecker(clickedVal)){
                        ttt.changeBoardState(clickedVal);
                        if (ttt.currentPlayerTracker > 0){
                            newSquare.innerHTML = "X";
                        }
                        else {
                            newSquare.innerHTML = "O"
                        }
                        // check win condition
                        console.log(ttt.currentPlayerChecker());
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
        // communicates to game logic
        ttt.generateBoardElements(dim);
    }
    playButton.addEventListener("click", createGrid);
});
