document.addEventListener('DOMContentLoaded', function () {
    // Determine the grid size
    const numRows = 6;
    const numCols = 12;

    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');


    // Create a container element    
    const gameBoard = document.getElementById('game-board');

    // Create a container element
    const container = document.createElement('div');


    // Create player element
    const player = document.createElement('div');
    player.id = 'player';

    // Create car element
    const car = document.createElement('div');
    car.id = 'car';

    // Append player and car to the container
    container.appendChild(player);
    container.appendChild(car);

    // Append the container to the gameBoard
    gameBoard.appendChild(container);
    // const player = document.createElement('div');
    // player.id = 'player';
    // gameBoard.appendChild(player);

    // const car = document.createElement('div');
    // car.id = 'car';
    // gameBoard.appendChild(car);

    const scoreElement = document.getElementById('score');
    let score = 0;

    const levelElement = document.getElementById('level');
    let level = 1;
    // Function to update the displayed score
    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    // Function to update the displayed level
    function updateLevel() {
        levelElement.textContent = `Level: ${level}`;
    }

    // Create the game board grid
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            gameBoard.appendChild(cell);
        }
    }

    function increaseScore() {
        score++; 
        scoreElement.textContent = `Score: ${score}`;
    }

    function increaseLevel() {
        level++;
        levelElement.textContent = `Level: ${level}`;
    }

    // Player's initial position
    let playerPosition = {row:6, col: 6};
    updatePlayerPosition();
    
    // Handle player movement
    document.addEventListener('keydown', function (e) {
        // Arrow keys: Left (37), Up (38), Right (39)
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
        }
        updatePlayerPosition();
    }

    function resetPlayerPosition() {
        // Set player back to the initial position
        playerPosition = { row: 6, col: 6 };
        updatePlayerPosition();
    }

    function updatePlayerPosition() {
        player.style.left = `${playerPosition.col * 50}px`; // Adjusted for border and gap
        player.style.top = `${playerPosition.row * 50}px`;  // Adjusted for border and gap
    }

    // Define the number of cars 
    const carsRow8 = [];
    const numCars = 3;
    const carsRow6 = [];
    const carsRow10 = [];

    // Define the gap variable
    const gap = 2; // Gap between the cars
        
    // Create cars on row 6 and set initial positions
    
    for (let i = 0; i < numCars; i++) {
        const car = document.createElement('div');
        car.classList.add('car');
        gameBoard.appendChild(car);
        carsRow6.push({ element: car, position: { row: 2, col: i * 3} });
        updateCarPosition(carsRow6[i]);
    }
 
    // Create cars on row 8 and set initial positions
    for (let i = 0; i < numCars; i++) {
        const car = document.createElement('div');
        car.classList.add('car');
        gameBoard.appendChild(car);
        carsRow8.push({ element: car, position: { row: 3, col: i * 3 } });
        updateCarPosition(carsRow8[i]);
    }

    // Create cars on row 10 and set initial positions
    for (let i = 0; i < numCars; i++) {
        const car = document.createElement('div');
        car.classList.add('car');
        gameBoard.appendChild(car);
        carsRow10.push({ element: car, position: { row: 4, col: i * 3} });
        updateCarPosition(carsRow10[i]);
    }

    setInterval(function () {
        moveCarsRow6(carsRow6);
        moveCarsRow8(carsRow8);
        moveCarsRow10(carsRow10);
        checkCollision(); // Check collision after moving cars
    }, 500); //move every 5s

    function moveCarsRow6(cars) {
        for (let i = 0; i < numCars; i++) {
            const car = cars[i];
            // Move the car to the left
            car.position.col--;
            // Check if the car has reached the leftmost part of the board
             if (car.position.col < 0) {
             // If so, set a random column position within the rightmost part of the board
             car.position.col = numCols - gap;
            }   
        // Update the car's position on the game board
        updateCarPosition(car);
    }
}

    function moveCarsRow8(cars) {
        for (let i = 0; i < numCars; i++) {
            const car = cars[i];
            // Move the car to the right
            car.position.col++;
            // Check if the car has reached the rightmost part of the board
            if (car.position.col >= numCols - gap) {
            // If so, wrap around to the leftmost part of the board
            car.position.col = 0;
        }
        // Update the car's position on the game board
        updateCarPosition(car);
    }
}

    function moveCarsRow10(cars) {
        for (let i = 0; i < numCars; i++) {
            const car = cars[i];
            // Move the car to the left
            car.position.col--;
            // Check if the car has reached the leftmost part of the board
            if (car.position.col < 0) {
            // If so, set a random column position within the rightmost part of the board
            car.position.col = numCols - gap;
            }   

        // Update the car's position on the game board
        updateCarPosition(car);
    }
}

    function updateCarPosition(car) {
        car.element.style.left = `${car.position.col * 50}px`;
        car.element.style.top = `${car.position.row * 50}px`;
    }


    function checkCollision() {
        checkCollisionWithCars(carsRow6);
        checkCollisionWithCars(carsRow8);
        checkCollisionWithCars(carsRow10);
    }
        
    function checkCollisionWithCars(carArray) {
        for (let i = 0; i < numCars; i++) {
            const car = carArray[i];
             // Debugging statements
        console.log("Player:", playerPosition.row, playerPosition.col);
        console.log("Car:", car.position.row, car.position.col);
            if (
                playerPosition.row === car.position.row &&
                playerPosition.col === car.position.col
            ) {
                console.log("Collision detected!");
                gameOver();
            }
        }
    }



    function gameOver() {
        alert('Game Over!');
         // Reset player position to initial state
         playerPosition = { row: 6, col: 6 };
         updatePlayerPosition();
         // Reset the score
         score = 0;
         updateScore();
         // Reset the level
         level = 1;
         updateLevel();
    }

});

// End of Code