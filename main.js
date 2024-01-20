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

document.addEventListener('DOMContentLoaded', function() {
    const player = {
        positionX: 6,
        positionY: 6,
        element: null
    };

    const cars = [
        { positionX: 12, positionY: 5, element: null },
        { positionX: 12, positionY: 5, element: null },
        { positionX: 12, positionY: 5, element: null },
        { positionX: 12, positionY: 3, element: null },
        { positionX: 12, positionY: 3, element: null },
        { positionX: 12, positionY: 3, element: null }
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
        player.element = document.createElement('div');
        player.element.className = 'cell player';
        movePlayer();
        gameboard.appendChild(player.element);
    }

    function createCar(car) {
        car.element = document.createElement('div');
        car.element.className = 'cell car';
        moveCar(car);
        gameboard.appendChild(car.element);
    }

    function movePlayer() {
        player.element.style.gridColumn = player.positionX;
        player.element.style.gridRow = player.positionY;
    }

    function moveCar(car) {
        car.element.style.gridColumn = car.positionX;
        car.element.style.gridRow = car.positionY;
    }

    function handleKeyPress(event) {
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
        const speedIncreaseFactor = 0.9;

        // Calculate the frame delay based on the current level
        const frameDelay = baseFrameDelay * Math.pow(speedIncreaseFactor, level - 1);

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
    
            // Introduce a delay based on the index of the car
            const delay = i * gapBetweenCars;
    
            setTimeout(() => {
                if (direction === 'left') {
                    car.positionX--;
                    if (car.positionX <= -1) {
                        car.positionX = 12;
                    }
                } else if (direction === 'right') {
                    car.positionX++;
                    if (car.positionX >= 12) {
                        car.positionX = -1;
                    }
                }

            moveCar(car);

            // Check for collision with player
            if (checkCollision(player, car)) {
                gameOver(); // Trigger game over if collision detected
            }
        }, delay*frameDelay);
    }

        // Request the next animation frame
        setTimeout(() => {
        requestAnimationFrame(() => moveCarsAutomatically(cars, direction));
    },frameDelay);
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

});