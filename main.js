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

    const player = {positionX: 6, positionY: 6, element: null};

    const cars = [
        { positionX: 11, positionY: 5, element: null },
        { positionX: 11, positionY: 5, element: null },
        { positionX: 11, positionY: 5, element: null },
        { positionX: 11, positionY: 3, element: null },
        { positionX: 11, positionY: 3, element: null },
        { positionX: 11, positionY: 3, element: null }
    ];

    const carsRow2 = [
        { positionX: 0, positionY: 2, element: null },
        { positionX: 0, positionY: 2, element: null },
        { positionX: 0, positionY: 2, element: null },
        { positionX: 0, positionY: 4, element: null },
        { positionX: 0, positionY: 4, element: null },
        { positionX: 0, positionY: 4, element: null },
    ];

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
        car.element = document.createElement('div');
        car.element.className = 'cell car';
        car.element.style.width = '50px';
        car.element.style.height ='50px';
        
        // Draw the car shape
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');

        //Draw the main body of the car
        ctx.fillStyle = '#ba0430';
        ctx.fillRect(5,10,40,20);

        // Draw the roof
        ctx.fillStyle = '#ba0430';
        ctx.fillRect(5, 7, 40, 5);

        // Draw the shorter boot
        ctx.fillStyle = '#ba0430';
        ctx.fillRect(5, 30, 40, 10);

        // Draw windows
        ctx.fillStyle = '#52b2bf';
        ctx.fillRect(10, 10, 10, 10);
        ctx.fillRect(30, 10, 10, 10);

        // Draw door
        ctx.fillStyle = '#cd5c5c';
        ctx.fillRect(15, 25, 20, 15);

        // Draw wheels
        ctx.fillStyle = '#000';
        for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.arc(15 + i * 20, 45, 5, 0, Math.PI * 2);
        ctx.fill();
        }
        
        car.element.appendChild(canvas);
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
    }

    // Function to set player back to the initial position
    function resetPlayerPosition() {
        player.positionX = 6;
        player.positionY = 6;
        movePlayer();
    }

    function moveCarsAutomatically(cars, direction) {
        const gapBetweenCars = 4;
        const baseFrameDelay = 500;
        const speedIncreaseFactor = 2; // means will double the speed
    
        // Calculate the frame delay based on the current level
        const frameDelay = baseFrameDelay * Math.pow(speedIncreaseFactor, level - 1);
        // Initiates a loop to move cars automatically in the specified directions.
        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
    
            // Introduce a delay based on the index of the car
            const delay = i * gapBetweenCars;
    
            setTimeout(() => {
                if (direction === 'left') {
                    car.positionX--;
                    // If updated position becomes less than or equals to 1, car resets from the most rightmost position
                    if (car.positionX <= 0) { 
                        car.positionX = 12;
                    }
                } else if (direction === 'right') {
                    car.positionX++;
                    // If updated position becomes more than or equals to 12, car resets from the most leftmost position
                    if (car.positionX >= 12) {
                        car.positionX = 0;
                    }
                }
    
                moveCar(car);
    
                console.log("Current positionX:", car.positionX);
    
                // Check for collision with player
                if (checkCollision(player, car)) {
                    gameOver(); // Trigger game over if collision detected
                }
            }, delay * frameDelay);
        }
    
        // Request the next animation frame
        setTimeout(() => {
            requestAnimationFrame(() => moveCarsAutomatically(cars, direction));
        }, frameDelay);
    }
    

    // Function to check for collision between player and car
    function checkCollision(player, car) {
        return (
            player.positionX < car.positionX + 1 &&
            player.positionX + 1 > car.positionX &&
            player.positionY < car.positionY + 1 &&
            player.positionY + 1 > car.positionY
        );
    }

    document.addEventListener('keydown', handleKeyPress);

    createPlayer();

    // Creating a loop initializes all cars on the board when the page loads
    for (const car of cars) {
        createCar(car);
    }

    for (const car of carsRow2) {
        createCar(car);
    }

    // Start moving cars smoothly
    requestAnimationFrame(() => moveCarsAutomatically(cars, 'left'));
    requestAnimationFrame(() => moveCarsAutomatically(carsRow2, 'right'));

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
        requestAnimationFrame(() => moveCarsAutomatically(cars, 'left')); // Start moving cars
        requestAnimationFrame(() => moveCarsAutomatically(carsRow2, 'right'));
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