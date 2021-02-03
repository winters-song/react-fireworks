import Rocket from './Rocket'

function launch(data) {
  if (data.rockets.length < data.MAX_ROCKETS) {
    let rocket = new Rocket(data);
    data.rockets.push(rocket);
  }
}

export function loop(data) {
  // Launch a new rocket
  launch(data);

  // Fade the background out slowly
  data.contextBuffer.clearRect(0, 0, data.canvas.width, data.canvas.height);
  data.contextBuffer.globalAlpha = 0.9;
  data.contextBuffer.drawImage(data.canvas, 0, 0);
  data.context.clearRect(0, 0, data.canvas.width, data.canvas.height);
  data.context.drawImage(data.canvasBuffer, 0, 0);

  // Update the rockets
  let existingRockets = [];
  data.rockets.forEach(function(rocket) {
    // update and render
    rocket.update();
    rocket.render(data.context);

    // random chance of 1% if rockets is above the middle
    let randomChance = rocket.pos.y < (data.canvas.height * 2 / 3) ? (Math.random() * 100 <= 1) : false;

    /* Explosion rules
        - 80% of screen
        - going down
        - close to the mouse
        - 1% chance of random explosion
    */
    if (rocket.pos.y < data.canvas.height / 5 || rocket.vel.y >= 0 || randomChance) {
      rocket.explode(data);
    } else {
      existingRockets.push(rocket);
    }
  });
  data.rockets = existingRockets;

  // Update the particles
  var existingParticles = [];
  data.particles.forEach(function(particle) {
    particle.update();

    // render and save particles that can be rendered
    if (particle.exists()) {
        particle.render(data.context);
        existingParticles.push(particle);
    }
  });
  data.particles = existingParticles;

  while (data.particles.length > data.MAX_PARTICLES) {
    data.particles.shift();
  }
}
