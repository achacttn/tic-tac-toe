const dimension = document.getElementById("dimensions");
const gameBoard = document.getElementById("gameBoard");
const playButton = document.getElementById("playButton");


const createNewGrid = function(){
    let allSquares = document.getElementsByClassName("gridElement");
    while (allSquares.length>0){
        allSquares[0].parentNode.removeChild(allSquares[0]);
    }
}
const createGrid = function(){
    createNewGrid();
    
    let rowNumber = dimension.value;
    let colNumber = dimension.value;
    let boardHeight = gameBoard.clientHeight;
    let boardWidth = gameBoard.clientWidth;
    let navElement = document.getElementById("navigation");
    let headerElement = document.getElementById("headerelement");
    let gameBoardOffset = navElement.clientHeight + headerElement.clientHeight;

    
    for (var i=0; i<rowNumber; i++){
        for (var j=0; j<colNumber; j++){
            let newSquare = document.createElement("div");
            newSquare.className = "gridElement"

            // see readme for induction proof on odd-dimensional magic square value allocation
            newSquare.id = `${dimension.value*(((i+1)+(j+1) - 1 + Math.floor(dimension.value/2))%dimension.value) + (((i+1)+2*(j+1)-2)%dimension.value)+1}`;

            newSquare.style.height = (boardHeight/rowNumber) + "px";
            newSquare.style.width = (boardWidth/colNumber) + "px";
            newSquare.style.top = (boardHeight/rowNumber)*i + gameBoardOffset + "px";
            newSquare.style.left =  (boardWidth/colNumber)*j + "px";
            // newSquare.style.top = (boardWidth/rowNumber)*j + "px";
            // newSquare.style.left = (boardHeight/colNumber)*i + "px";

            gameBoard.appendChild(newSquare)
        }
    }
}

playButton.addEventListener("click", createGrid);
