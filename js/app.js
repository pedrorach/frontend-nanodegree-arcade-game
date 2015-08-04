// Enemies our player must avoid


// Random enemy speed
var enemyRandomSpeed = function() {
    return 120 + Math.floor(Math.random() * 150);
}
// Random enemy X starting position
var enemyXrandom = function() {
    return -100 - Math.floor(Math.random(0.7, 1)*100);
}

// Enemy class
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = enemyRandomSpeed();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

     // Enemy loop (if enemy goes out of bounds, reset random x and speed)
    if(this.x > 700) {
        this.x = enemyXrandom();
        this.speed = enemyRandomSpeed();
    };

    // More enemies (between 3 and 6)
    if(this.x > 300 && allEnemies.length > 2 && allEnemies.length < 6) {
        createEnemy()
    };

    // Colision detection - player vs enemies
    if((this.y > player.y - 20 && this.y < player.y + 20) && (this.x > player.x - 70 && this.x < player.x + 70)) {
        player.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function() {
    this.x =  this.x;
    this.y =  this.y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 81;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 81;
            break;
    }

    // Player game bounds
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 401) {
        this.x = 400;
    } else if (this.y > 401) {
        this.y = 400;
    } else if (this.y <= -20) {
        player.reset();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Enemies array
var allEnemies = [];

// Enemy starting grid position - 3 possible rows - random X
var enemyRows = [[enemyXrandom(), 60],[enemyXrandom(), 145],[enemyXrandom(), 230]];

// Enemy creation per row at starting random position

function createEnemy(row) {
    for(var i = 0; i < 3; i++) {
            var enemy = new Enemy(enemyRows[i][0], enemyRows[i][1]);
            allEnemies.push(enemy);
    }
}
createEnemy();

// Player creation at fixed starting position
var player = new Player(200,390);

// Player resets to starting position if collision or win
Player.prototype.reset = function() {
            this.x = 200;
            this.y = 390;
        }

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});