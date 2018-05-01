const ttt = {

    // board element availability
    boardElements: [
        squareThree,
        squareFour,
        squareFive,
        squareSix,
        squareSeven,
        squareEight,
        squareNine
    ],
    
    // moves made by each player, in this example only one in each
    playerOne: [squareOne,],
    playerTwo: [squareTwo,],
    
    // tracks turn, playerOne has value 1, playerTwo has value -1
    currentPlayerTracker: 1,
    
    // checks who the turn belongs to
    currentPlayerChecker: function(){
        if (this.currentPlayerTracker > 0){
            return this.playerOne;
        }
        else {
            return this.playerTwo;
        }
    },
    
    // alternate between players
    changeTurn: function(){
        this.currentPlayerTracker *= -1;
    },
    
    // returns true chosen board element is available for assignment
    validMoveChecker: function(squareChoice){
        return (this.boardElements.indexOf(squareChoice) !== -1);
    },
    
    // changes board state for current player
    changeBoardState: function(squareChoice){
        let currentPlayer = this.currentPlayerChecker();
        let currentMove = this.boardElements.indexOf(squareChoice);
        currentPlayer.push(this.boardElements.splice(currentMove, 1)[0]);
        this.checkState();
    },
    
    // checks player for win condition
    winCondition: function(player){
        this[player];
    },
    
    addMark: function(){
    },
    
    changeMarker: function(){
    },

    // state checker
    checkState: function(){
        console.log(this.boardElements);
        console.log(this.playerOne);
        console.log(this.playerTwo);
    },
    
    // method to reset board state, and player moves
    resetBoard: function(){
        this.boardElements = [
            squareOne,
            squareTwo,
            squareThree,
            squareFour,
            squareFive,
            squareSix,
            squareSeven,
            squareEight,
            squareNine
        ],
        this.playerOne = [];
        this.playerTwo = [];
    },
}


