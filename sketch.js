var ship;
var asteroids = [];
var lasers = [];

// Sets up the canvas, adds a Ship and adds the asteroids
function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

// Draw entire game to canvas
function draw() {
  background(0);

  // Check if ship is hit by asteroid
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('ooops!');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  // Draw lasers and new asteroids if they are hit
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          console.log(asteroids);
          break;
        }
      }
    }
  }

  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

// Once the key is released stop rotation or boosting
function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

// Turn or Boost ship based on key pressed
function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW || keyCode == 68) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW || keyCode == 65) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW || keyCode == 87) {
    ship.boosting(true);
  }
}