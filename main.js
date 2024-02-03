
// Function to restart game
function restartGame() {
    document.getElementById('gameOverScreen').style.display='none';
    resetPlayerPosition();
       //Reset the score
       score = 0;
       updateScore();
       // Reset the level
       level = 1;
       updateLevel();
}
// Listens for the "DOMContentLoaded" event, which fires when the initial HTML document has been completely loaded and parsed.
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    drawRoad();

    function drawRoad() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#414648';
        ctx.fillRect(0,0, canvas.width, canvas.height);
                
        // Draw solid white lines on the top and bottom of rows 1 to 4
        ctx.strokeStyle = '#d39c45';
        ctx.lineWidth = 1;
        
        for (let row = 1; row <= 4; row++) {
            const y = row * 50; // center of each row
            const halfLineWidth = ctx.lineWidth / 2;
            // Draw line on top of row
            ctx.beginPath();
            ctx.moveTo(0, y - halfLineWidth);
            ctx.lineTo(canvas.width, y - halfLineWidth);
            ctx.stroke();
            // Draw line on bottom of row
            ctx.beginPath();
            ctx.moveTo(0, y + halfLineWidth);
            ctx.lineTo(canvas.width, y + halfLineWidth);
            ctx.stroke();
        }

        // Draw dotted lines in the center of rows 1 to 4
        ctx.setLineDash([5, 10]);
        ctx.lineDashOffset = 0;

        for (let row = 1; row <=4; row++) {
            const y = row * 50 +25; // center of each row
            ctx.beginPath();
            ctx.moveTo(0,y);
            ctx.lineTo(canvas.width,y);
            ctx.stroke();
        }
        
    }
    
    // Fill first row with solid land color
    ctx.fillStyle = '#3f704d'; // Adjust the color as needed
    ctx.fillRect(0, 0, canvas.width, 50); // Assuming each row is 50 pixels high

    // Fill last row with solid land color
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    const player = {positionX: 6, positionY: 6};

    const cars = [
        { positionX: 9, positionY: 5 },
        { positionX: 11, positionY: 5 },
        { positionX: 6, positionY: 5 },
        { positionX: 1, positionY: 5 },
        { positionX: 9, positionY: 3 },
        { positionX: 3, positionY: 3 },
        { positionX: 6, positionY: 3 }
    ];

    const carsRow2 = [
        { positionX: 2, positionY: 2 },
        { positionX: 7, positionY: 2 },
        { positionX: 11, positionY: 2 },
        { positionX: 9, positionY: 4 },
        { positionX: 12, positionY: 4 },
        { positionX: 5, positionY: 4 },
        { positionX: 3, positionY: 4 },
    ];


    // Get references to the gameboard elements
    const gameboard = document.getElementById('gameboard');

    // Get references to the score elements
    const scoreElement = document.getElementById('score');

    // Get references to the level elements
    const levelElement = document.getElementById('level');

    // Initialise score and level variables
    let score = 0;
    let level = 1;

    // Function to update the displayed score
    function updateScore() {
        scoreElement.textContent = `${score}`;
    }

    // Function to update the displayed level
    function updateLevel() {
        levelElement.textContent = `${level}`;
    }

    // Function to increase the player's score
    function increaseScore() {
        score++; 
        updateScore();
    }
    
    // Function to increase the game level
    function increaseLevel() {
        level++;
        updateLevel();

        // Add a pop-up message when moving to the next level
        alert(`Congratulations! You've reached Level ${level}!`);
    }


    function createPlayer() {
        player.element = document.createElement('img');
        player.element.src = 'bear.png';
        player.element.alt = 'Player'
        player.element.className = 'cell player';
        movePlayer();
        gameboard.appendChild(player.element);
    }

    function createCar(car) {
        car.element = document.createElement('img');
        car.element.src = 'car.png'; // Replace 'car.png' with the actual path to your car image
        car.element.alt = 'Car';
        car.element.className = 'cell car';
        car.element.style.width = '50px';
        car.element.style.height = '50px';
        
        moveCar(car);
        gameboard.appendChild(car.element);
    }

    function createMirroredCar(car) {
        car.element = document.createElement('img');
        car.element.src = 'car.png'; // Replace 'car.png' with the actual path to your car image
        car.element.alt = 'Car';
        car.element.className = 'cell car';
        car.element.style.width = '50px';
        car.element.style.height = '50px';
        car.element.style.transform = 'scaleX(-1)'; // Apply horizontal flip
    
        moveCar(car);
        gameboard.appendChild(car.element);
    }

    function movePlayer() {
        player.element.style.gridColumn = player.positionX; // Column where player will be located
        player.element.style.gridRow = player.positionY; // Row where player will be located
    }

    function moveCar(car) {
        car.element.style.gridColumn = car.positionX;
        car.element.style.gridRow = car.positionY;
    }

    function handleKeyPress(event) {
        // Check if the game is over
    if (document.getElementById('gameOverScreen').style.display === 'block') {
        return;
    }

        switch (event.key) {
            case 'ArrowUp':
                if (player.positionY > 0) {
                    player.positionY--;
                    movePlayer();
                    increaseScore(); // Increase the score when moving up
                    if (player.positionY === 0) {
                        increaseLevel(); // Increase level when reaching row 0
                        resetPlayerPosition(); // Reset player position to initial state
                    }
                }
                break;
            case 'ArrowLeft':
                if (player.positionX > 0) {
                    player.positionX--;
                    movePlayer();
                }
                break;
            case 'ArrowRight':
                if (player.positionX < 12) {
                    player.positionX++;
                    movePlayer();
                }
                break;
        }

         // Check for collision with cars after updating the player's position
    for (const car of cars) {
        if (checkCollision(player, car)) {
            gameOver(); // Trigger game over if collision detected
            return; // Stop further processing if collision is detected
        }
    }
}

    // Function to set player back to the initial position
    function resetPlayerPosition() {
        player.positionX = 6;
        player.positionY = 6;
        movePlayer();
    }

// Define the base speed and speed multiplier
let baseSpeed = 1000; 
const speedMultiplier = 0.7; // Adjust this multiplier

function moveCarsRight() {
    for (let i = 0; i < cars.length; i++) {
        cars[i].positionX++;
        if (cars[i].positionX > 12) {
            cars[i].positionX = 0;
        }
        moveCar(cars[i]);

        // Check for collision with player
        if (checkCollision(player, cars[i])) {
            gameOver(); // Trigger game over if collision detected
        }
    }
}

function moveCarsLeft() {
    for (let i = 0; i < carsRow2.length; i++) {
        carsRow2[i].positionX--;
        if (carsRow2[i].positionX < 0) {
            carsRow2[i].positionX = 12;
        }
        moveCar(carsRow2[i]);

        // Check for collision with player
        if (checkCollision(player, carsRow2[i])) {
            gameOver(); // Trigger game over if collision detected
        }
    }
}

// Function to update the displayed level
function updateLevel() {
    levelElement.textContent = `${level}`;

    // Adjust the speed based on the level
    const adjustedSpeed = baseSpeed * Math.pow(speedMultiplier, level - 1);

    // Clear existing intervals and set the new intervals with adjusted speed
    clearInterval(moveCarsRightInterval);
    moveCarsRightInterval = setInterval(moveCarsRight, adjustedSpeed);

    clearInterval(moveCarsLeftInterval);
    moveCarsLeftInterval = setInterval(moveCarsLeft, adjustedSpeed);
}

    // Set up the initial intervals
    let moveCarsRightInterval = setInterval(moveCarsRight, baseSpeed);
    let moveCarsLeftInterval = setInterval(moveCarsLeft, baseSpeed);
    

    // Function to check for collision between player and car
    function checkCollision(player, car) {
    const collision =
        player.positionX === car.positionX &&
        player.positionY === car.positionY;

    if (collision) {
        console.log('Collision detected!');
        console.log('Player:', player.positionX, player.positionY);
        console.log('Car:', car.positionX, car.positionY);
        gameOver();
    }
}

    document.addEventListener('keydown', handleKeyPress);

    createPlayer();

    // Creating a loop initializes all cars on the board when the page loads
    for (const car of cars) {
        createMirroredCar(car);
    }

    for (const car of carsRow2) {
        createCar(car);
    }


    function gameOver() {
        // Display the game over screen
        document.getElementById('gameOverScreen').style.display = 'block';

        // Update the score on the game over screen
        document.getElementById('gameOverScore').textContent = `${score}`;
        //Reset player position to initial state
        resetPlayerPosition();
        //Reset the score
        score = 0;
        updateScore();
        // Reset the level
        level = 1;
        updateLevel();
    }

    let gameStarted = false; // Variable to track whether the game has started

    function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('startScreen').style.display = 'none'; // Hide the start screen
        }
    }

    // Add event listener for spacebar to start the game
    document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        startGame();
    }
    });

    // Display the start screen
    document.getElementById('startScreen').style.display = 'block';
});