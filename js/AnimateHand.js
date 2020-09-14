// Class to track state and animate the hands
// - element : dom hand
// - endUnit : current unit the hand points to, int
// - totalUnits : total number of units on face, int
// - framesPerSec : frames per second to animate at
class AnimateHand {
  constructor(element, endUnit, totalUnits, framesPerSec) {
    this.element = element;
    this.totalUnits = Math.floor(totalUnits);
    this.startUnit = Math.floor(endUnit);
    this.endUnit = Math.floor(endUnit);
    // only animateUnit would be floating point
    this.animateUnit = endUnit;
    this.animationTimer = null;
    this.framesPerSec = framesPerSec;

    this.draw();
  }

  animate(endUnit) {
    var self = this;

    this.startUnit = this.endUnit;
    this.animateUnit = this.startUnit;
    this.endUnit = endUnit;

    if (this.animationTimer === null) {
      // begin animation
      this.animationTimer = setInterval(() => {
        self.animationLoop();
      }, 1000 / this.framesPerSec);
      self.animationLoop();
    }
  }

  // increment animateUnit slowly from startUnit to endUnit

  animationLoop() {
    // increment animateUnit by a fraction each loop
    let delta = this.endUnit - this.startUnit;
    if (delta < 0) {
      delta = this.totalUnits + delta;
    }

    this.animateUnit += delta / this.framesPerSec;

    if (this.animateUnit >= this.totalUnits) {
      // wrap around from max to 0
      this.animateUnit = 0;
    }

    if (Math.floor(this.animateUnit) === this.endUnit) {
      // target reached, disable timer
      console.log("animation stopped");
      clearInterval(this.animationTimer);
      this.animationTimer = null;
      this.animateUnit = this.endUnit;
      this.startUnit = this.endUnit;
    }

    // redraw on each animation loop
    this.draw();
  }

  // updates the hand on screen
  draw() {
    let ratio = this.animateUnit / this.totalUnits;
    this.element.style.setProperty("--rotation", ratio * 360);
  }
}
