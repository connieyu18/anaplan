class Clock {
  constructor() {
    this.currentDate = new Date();
    this.updateInterval = 1000;
    this.animationFps = 30;
    this.secondHandAnimator = new AnimateHand(
      secondHand,
      this.currentDate.getSeconds(),
      60,
      this.animationFps
    );
  }

  showTime() {
    this.currentDate = new Date();
    const secondsRatio = this.currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + this.currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + this.currentDate.getHours()) / 12;

    this.secondHandAnimator.animate(this.currentDate.getSeconds());
    this.rotateHand(minuteHand, minutesRatio);
    this.rotateHand(hourHand, hoursRatio);
  }

  // set the hand angle
  rotateHand(element, ratio) {
    element.style.transform = `rotate(${ratio * 360}deg)`;
  }

  setNumbers() {
    let radius = 41;
    for (var i = 0; i < 12; i++) {
      let deg = i * 30 - 60;
      //covert degree to radian
      let x = Math.cos((deg * Math.PI) / 180) * radius;
      let y = Math.sin((deg * Math.PI) / 180) * radius;
      number[i].style.transform = `translate(${x}%,${y}%)`;
    }
  }

  setTicks() {
    for (var i = 0; i < 60; i++) {
      const deg = i * 6;
      const verticalLine = "\u2575";
      const tick = document.createElement("span");
      tick.appendChild(document.createTextNode("'"));
      tick.classList.add("tick");
      clock.appendChild(tick);
      tick.style.transform = `rotate(${deg}deg)`;
      i % 5 === 0 ? (tick.textContent = verticalLine) : "";
    }
  }

  showDate() {
    let currentMonth = this.currentDate.getMonth() + 1;
    currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
    month.innerHTML = currentMonth;
    day.innerHTML = this.currentDate.getDate();
    year.innerHTML = this.currentDate.getYear() + 1900;
  }

  start() {
    let self = this;
    this.setNumbers();
    setInterval(() => self.showTime(), this.updateInterval);
    this.showTime();
    this.showDate();
    this.setTicks();
  }
}
