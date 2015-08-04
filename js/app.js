// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 50 * (Math.floor(Math.random() * 2)+1);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //this.y *= dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {
    //this.x *=  dt;
    //this.y *=  dt;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    //console.log(key);
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
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 401) {
        this.x = 400;
    } else if (this.y > 401) {
        this.y = 400;
    } else if (this.y < -6) {
        this.x = 200;
        this.y = 400;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Random X starting position for enemy
var xRandom = function() {
    return Math.random(0.8, 1)*100-400
}

// Enemy starting grid position
var enemyRows = [[xRandom(), 60],[xRandom(), 145],[xRandom(), 230]];

var allEnemies = [];

// Enemy creation per row at starting random position

setInterval(function() {
    for(var i = 0; i < 3; i++) {
        var enemy = new Enemy(enemyRows[i][0], enemyRows[i][1]);
        allEnemies.push(enemy);
        if (allEnemies.length > 25) {
        allEnemies.shift();
        }
    }
}, 5000);


// Player creation at starting position
var player = new Player(200,400);

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