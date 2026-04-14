let endTime = 0;
let interval = null;

let running = false;
let paused = false;

let remainingBeforePause = 0;

// Start and stop on Space key
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();

    toggleTimer();
  }
});

document.addEventListener('touchstart', (event) => {
  event.preventDefault();

  toggleTimer();
}, {passive: false});

function toggleTimer() {
  if (!running && !paused && totalTime > 0) {
    startCountdown();
    return;
  }

  if (running) {
    pauseCountdown();
    return;
  }

  if (paused) {
    resumeCountdown();
  }
}

function prepareTimer() {
  const hrs = parseInt(document.getElementById('hours').value) || 0;
  const mins = parseInt(document.getElementById('minutes').value) || 0;
  const secs = parseInt(document.getElementById('seconds').value) || 0;

  totalTime = hrs * 3600 + mins * 60 + secs;

  if (totalTime <= 0) {
    alert("Please set a valid time.");
    return;
  }

  // Hide setup, show timer
  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('timerScreen').style.display = 'flex';

  updateDisplay();
};

function startCountdown() {
  running = true;
  paused = false;

  endTime = performance.now() + totalTime * 1000 + 990;

  requestAnimationFrame(updateCountdown);
}

function pauseCountdown() {
  if (!running) return;

  running = false;
  paused = true;

  remainingBeforePause = endTime - performance.now();
}

function resumeCountdown() {
  if (!paused) return;

  paused = false;
  running = true;

  endTime = performance.now() + remainingBeforePause;

  requestAnimationFrame(updateCountdown);
}

function updateCountdown() {
  if (!running) return;

  const remainingMs = endTime - performance.now();

  if (remainingMs <= 0) {
    running = false;
    updateDisplay();
    return;
  }

  totalTime = Math.floor(remainingMs / 1000);
  updateDisplay();

  requestAnimationFrame(updateCountdown);
}

function updateDisplay() {
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;

  const timeString =
    String(hours).padStart(2, '0') +
    String(minutes).padStart(2, '0') +
    String(seconds).padStart(2, '0');

  const digits = document.querySelectorAll('#display .digit');

  digits.forEach((digit, index) => {
    digit.textContent = timeString[index];
  });
}