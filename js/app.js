// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 77;
    this.speed = this.getSpeed();
};


Enemy.prototype.getSpeed = function() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return getRandomInt(50, 300);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        //out of bounds, reset position and get new speed
        this.x = -100;
        this.speed = this.getSpeed();
    } else {
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 410;
    this.width = 70;
    this.height = 83;
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 410;
}

Player.prototype.update = function() {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    //need to check position boundaries
    switch (direction) {
        case 'up':
            if (this.y > 1) this.y -= 83;
            break;
        case 'down':
            if (this.y < 410) this.y += 83;
            break;
        case 'left':
            if (this.x > 0) this.x -= 101;
            break;
        case 'right':
            if (this.x < 402) this.x += 101;
            break;
    }
    console.log(this.x + ',' + this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];
allEnemies.push(new Enemy(-100, 65));
allEnemies.push(new Enemy(-100, 145));
allEnemies.push(new Enemy(-100, 230));


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
