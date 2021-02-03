import Particle from './Particle'

function Rocket(data) {
  Particle.apply(
      this,
      [{
          x: Math.random() * data.canvas.width * 2 / 3 + data.canvas.width / 6,
          y: data.canvas.height
      }]
  );

  this.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
  this.vel.y = Math.random() * -3 - 4;
  this.vel.x = Math.random() * 6 - 3;
  this.size = 2;
  this.shrink = 0.999;
  this.gravity = 0.01;
}

Rocket.prototype = new Particle();
Rocket.prototype.constructor = Rocket;

Rocket.prototype.explode = function(data) {
  var count = Math.random() * 10 + 80;

  for (var i = 0; i < count; i++) {
      var particle = new Particle(this.pos);
      var angle = Math.random() * Math.PI * 2;

      // emulate 3D effect by using cosine and put more particles in the middle
      var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

      particle.vel.x = Math.cos(angle) * speed;
      particle.vel.y = Math.sin(angle) * speed;

      particle.size = 10;

      particle.gravity = 0.2;
      particle.resistance = 0.92;
      particle.shrink = Math.random() * 0.05 + 0.93;

      particle.flick = true;
      particle.color = this.explosionColor;

      data.particles.push(particle);
  }
};

Rocket.prototype.render = function(c) {
  if (!this.exists()) {
      return;
  }

  c.save();

  c.globalCompositeOperation = 'lighter';

  var x = this.pos.x,
      y = this.pos.y,
      r = this.size / 2;

  var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
  gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
  gradient.addColorStop(0.2, "rgba(255, 180, 0, " + this.alpha + ")");

  c.fillStyle = gradient;

  c.beginPath();
  c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
  c.closePath();
  c.fill();

  c.restore();
};

export default Rocket