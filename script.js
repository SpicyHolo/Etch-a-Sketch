//Define size of the grid n x n
let size;
let pixelSize;
let gridPixelSize;
let length;
let grid;
let gridContainer = document.getElementById('grid');
let mouseDown = 0;

//Button reference
let buttonClear = document.getElementById('clear');
buttonClear.addEventListener('click', clearBoard);


///////////////
//Main Script//
///////////////
alert("Hold left button and draw!");
createGrid(16);
showGridParameters();

//Functions
function showGridParameters() {
    console.log(`GridSize: ${size}`);
    console.log(`pixelSize: ${pixelSize}`);
    console.log(`gridPixelSize: ${gridPixelSize}`);
}

function clearBoard() {
    if(confirm('Are you sure you want to clear the board?')) {
        let gridSize = Math.floor(prompt("what size? (square side length)"));
        if(gridSize > 0 && gridSize <= 100) {
            removeGrid();
            createGrid(gridSize);
            showGridParameters();
        }
        else {
            alert("Give a whole value between 1 and 100");
            return;
        }
    }
    else {
        return;
    }
}

function createGrid(gridSize) {
    size = gridSize;
    pixelSize = Math.floor(640/gridSize);
    gridPixelSize = pixelSize*gridSize;
    length = gridSize;
    grid = new Array(gridSize);
    gridContainer = document.getElementById('grid');
    gridContainer.style.cssText = "width: "+gridPixelSize + "px; height: " + gridPixelSize + "px;";
    for(let row = 0; row<length; row++) {
        grid[row] = new Array(gridSize);
        for(let col = 0; col<length; col++) {
            grid[row][col] = document.createElement('div');
            grid[row][col].style.width = pixelSize + "px";
            grid[row][col].style.height = pixelSize + "px";
            gridContainer.appendChild(grid[row][col]);

            grid[row][col].addEventListener('mouseover', function(e) {
                if(mouseDown) {
                    e.target.style.backgroundColor = randomColor();
                }
            });
        }
        
    }
}

function removeGrid() {
    for(let row = 0; row<length; row++) {
        for(let col = 0; col<length; col++) {
            grid[row][col].remove();
        }
        
    }
    delete grid;
}

function randomColor() {
    let r = randomNumber(0, 255);
    let g = randomNumber(0, 255);
    let b = randomNumber(0, 255);
    let color = `rgb(${r},${g},${b})`;
    console.log(color);
    return color;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * max);
}

//Detect left button press
document.body.onmousedown = function() { 
    ++mouseDown;
  }
  document.body.onmouseup = function() {
    --mouseDown;
  }