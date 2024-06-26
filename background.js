const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const restartButton = document.getElementById('restart');
const focusTimeInput = document.getElementById('focusMinutes');
const pauseTimeInput = document.getElementById('pauseMinutes');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const timer = document.getElementById('timer');

let interval;
let isPaused = false;
let remainingMinutes;
let remainingSeconds;

const startPomodoro = (status) => {
  if (!isPaused && status === 'start') {
    remainingMinutes = parseInt(focusTimeInput.value) - 1 || 0;
    remainingSeconds = 59;
    timer.style.color = 'green'
    minutesElement.innerHTML = remainingMinutes.toString().padStart(2, '0');
    secondsElement.innerHTML = remainingSeconds.toString().padStart(2, '0');
  } else {
    remainingMinutes = parseInt(pauseTimeInput.value) - 1 || 0;
    remainingSeconds = 59;
    timer.style.color = 'red'
    minutesElement.innerHTML = remainingMinutes.toString().padStart(2, '0');
    secondsElement.innerHTML = remainingSeconds.toString().padStart(2, '0');
  }

  isPaused = false;

  interval = setInterval(() => {
    if (!isPaused) {
      if (remainingSeconds === 0) {
        if (remainingMinutes === 0) {
          clearInterval(interval);
          status === 'start' ? alert("Pomodoro session completed!") : alert("Pomodoro pause session completed!");
          status === 'start' ? startPomodoro('pause') : startPomodoro('start')
          return;
        }
        remainingMinutes -= 1;
        remainingSeconds = 59;
      } else {
        remainingSeconds -= 1;
      }

      minutesElement.innerHTML = remainingMinutes.toString().padStart(2, '0');
      secondsElement.innerHTML = remainingSeconds.toString().padStart(2, '0');
    }
  }, 1000);
};

const pausePomodoro = () => {
  isPaused = true;
  clearInterval(interval)
}

const restartPomodoro = () => {
  clearInterval(interval)
  isPaused = false
  startPomodoro('start')
}

startButton.addEventListener('click', startPomodoro('start'));
pauseButton.addEventListener('click', pausePomodoro);
restartButton.addEventListener('click', restartPomodoro);
