document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const player = document.createElement('div');
    player.id = 'player';
    gameBoard.appendChild(player);

    const scoreElement = document.getElementById('score');
    let score = 0;

    const levelElement = document.getElementById('level');
    let level = 1;

    // Adjust the grid size as needed
    const numRows = 12;
    const numCols = 12;

    // Create the game board grid
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            gameBoard.appendChild(cell);
        }}

    // Player's initial position
    let playerPosition = {row:0, col: 5};
    updatePlayerPosition();

    // Handle player movement
    document.addEventListener('keydown', function (e) {
        // Arrow keys: Left (37), Up (38), Right (39), Down (40)
        switch (e.keyCode) {
            case 37:
                movePlayer('left');
                break;
            case 38:
                movePlayer('up');
                break;
            case 39:
                movePlayer('right');
                break;
            case 40:
                movePlayer('down');
                break;
        }
    });

    function movePlayer(direction) {
        switch (direction) {
            case 'left':
                if (playerPosition.col > 0) {
                    playerPosition.col--;
                }
                break;
            case 'up':
                if (playerPosition.row > 0) {
                    playerPosition.row--;
                    increaseScore(); // Increase the score when moving up
                    if (playerPosition.row === 0) {
                        increaseLevel(); // Increase level when reaching row 0
                        resetPlayerPosition(); // Reset player position to initial state
                    }
                }
                break;
            case 'right':
                if (playerPosition.col < 12) {
                    playerPosition.col++;
                }
                break;
            case 'down':
                if (playerPosition.row < 12) {
                    playerPosition.row++;
                }
                break;
        }
        updatePlayerPosition();
    }

    function increaseLevel() {
        level++;
        levelElement.textContent = `Level: ${level}`;
    }

    function resetPlayerPosition() {
        // Set player back to the initial position
        playerPosition = { row: 0, col: 5 };
        updatePlayerPosition();
    }

    function updatePlayerPosition() {
        player.style.left = `${playerPosition.col * 50}px`; // Adjusted for border and gap
        player.style.top = `${playerPosition.row * 50}px`;  // Adjusted for border and gap
    }

    function increaseScore() {
        score++; 
        scoreElement.textContent = `Score: ${score}`;
    }
    
    // Define the number of cars 
    const cars = [];
    const numCars = 3;
    // const carsRow6 = [];

    // Create cars and set initial positions
        for (let i = 0; i < numCars; i++) {
            const car = document.createElement('div');
            car.classList.add('car');
            gameBoard.appendChild(car);
            cars.push({ element: car, position: { row: 5, col: i * 3 } });
            updateCarPosition(cars[i]);
        }

    // Create cars on row 6 and set initial positions
    
        // for (let i = 0; i < numCars; i++) {
        //     const car = document.createElement('div');
        //     car.classList.add('car');
        //     gameBoard.appendChild(car);
        //     carsRow6.push({ element: car, position: { row: 6, col: i * 3 + numCols - 3 } });
        //     updateCarPosition(carsRow6[i]);
        // }

        setInterval(function () {
            moveCars(cars);
            // moveCars(carsRow6);
            checkCollision(); // Check collision after moving cars
        }, 500);



        function moveCars() {
            for (let i = 0; i < numCars; i++) {
                const car = cars[i];
                if (car.position.col < numCols - 1) {
                    car.position.col++;
                } else {
                    car.position.col = 0;
                }
                updateCarPosition(car);
            }
        }

        function updateCarPosition(car) {
            car.element.style.left = `${car.position.col * 50}px`;
            car.element.style.top = `${car.position.row * 50}px`;
        }

    function checkCollision() {
        for (let i = 0; i < numCars; i++) {
            const car = cars[i];
            if (
                playerPosition.row === car.position.row &&
                playerPosition.col === car.position.col
            ) {
                gameOver();
            }
        }
    }


    function gameOver() {
        alert('Game Over!');
         // Reset player position to initial state
         playerPosition = { row: 0, col: 5 };
         updatePlayerPosition();
         // Reset the score
         score = 0;
         updateScore();
        // Add additional game over logic here, such as resetting the game or showing a game over screen
        // For simplicity, the example uses an alert, but you can customize this function.
        // You might want to reset the player and car positions, stop the car movement, etc.
    }

});

//     // ... (remaining code)

//     // Add additional logic for your game, like player movement, obstacles, etc.
