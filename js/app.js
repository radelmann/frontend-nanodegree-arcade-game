//Person - generic super class
var Person = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
}

Person.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Person.call(this, x, y, 'images/enemy-bug.png');
    this.speed = this.getSpeed();
};

Enemy.prototype = Object.create(Person.prototype);
Enemy.prototype.constructor = Person;

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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Person.call(this, 200, 410, 'images/char-boy.png');
    this.score = 0;
    this.flashing = false;
}

Player.prototype = Object.create(Person.prototype);
Player.prototype.constructor = Person;

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 410;
}

Player.prototype.handleCollide = function() {
    this.reset();
    this.score = 0;
}

Player.prototype.update = function() {
    if ((this.y < 0) && (!this.flashing)) {
        this.score += 10;
        this.flashed = Resources.now();
        this.flashing = true;
    } else if ((this.flashing) && (Resources.now() - this.flashed > 3000)){
        this.reset();
        this.flashing = false;
    }
};

Player.prototype.handleInput = function(direction) {
    if (!this.flashing) {
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
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];
allEnemies.push(new Enemy(-100, 60));
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
