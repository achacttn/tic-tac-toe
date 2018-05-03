const ttt = {

    // generating nxn board, each element goes into boardElements
    generateBoardElements: function (dim) {
        for (var i = 1; i <= (dim * dim); i++) {
            this.boardElements.push(i);
        }
    },
    // board element availability
    boardElements: [],

    // moves made by each player, in this example only one in each
    playerOne: [],
    playerTwo: [],

    // tracks turn, playerOne has value 1, playerTwo has value -1
    currentPlayerTracker: 1,

    // checks who the turn belongs to
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
    // checks board to see if it is a draw
    drawCondition: function(){

    },
    
    // checks player for win condition
    winCondition: function (player) {
        this[player];
    },
    // method to reset board state, and player moves
    resetBoard: function () {
    },
}
