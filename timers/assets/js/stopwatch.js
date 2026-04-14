let running = false;
let startTime = 0;
let elapsedBeforePause = 0;

document.getElementById('timerScreen').style.display = 'flex';

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault(); // stops page scrolling

    toggleTimer();
  }
});

document.addEventListener('touchstart', (event) => {
  event.preventDefault();

  toggleTimer();
}, {passive: false});

function toggleTimer() {
  if (running) {
    stopStopwatch();
  } else {
    startStopwatch();
  }
}

function startStopwatch() {
  if (running) return;

  running = true;
  startTime = performance.now();

  requestAnimationFrame(updateLoop);
}

function stopStopwatch() {
  if (!running) return;

  running = false;

  elapsedBeforePause += performance.now() - startTime;
}

function updateLoop() {
  if (!running) return;

  const now = performance.now();
  const elapsed = elapsedBeforePause + (now - startTime);

  updateDisplay(elapsed);

  requestAnimationFrame(updateLoop);
}

function updateDisplay(ms) {
  const totalCentiseconds = Math.floor(ms / 10);

  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  const cs = String(centiseconds).padStart(2, '0');

  const value = mm + ss + cs;

  const digits = document.querySelectorAll('#display .digit');

  digits.forEach((el, i) => {
    el.textContent = value[i];
  });
}