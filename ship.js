function Ship() {
    this.pos = createVector(width/2, height/2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0,0);
    this.isBoosting = false;

    // Check if ship is boosting
    this.boosting = function(b) {
        this.isBoosting = b;
    }

    // Update Ship position
    this.update = function() {
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }

    // Check if ship is hit by asteroid
    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {
          return true;
        } else {
          return false;
        }
      };

    // Sets force for boosting
    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }

    // Render Ship
    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        fill(0);
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }

    // Draws the object on the opposite side of the canvas if they pass through the edge of the canvas
    this.edges = function() {
        if(this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if(this.pos.y > width + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = width + this.r;
        }
    };

    // Sets rotation of Ship
    this.setRotation = function(a) {
        this.rotation = a;
    };

    // Turn the ship
    this.turn = function() {
        this.heading += this.rotation;
    };
}