const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

let startTime = 0;
let elapsed = 0;
let timerId = null;
let lapCount = 0;

function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

function updateDisplay() {
  const current = timerId ? Date.now() - startTime : elapsed;
  display.textContent = formatTime(current);
}

function toggleStartPause() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    elapsed = Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    return;
  }

  startTime = Date.now() - elapsed;
  timerId = setInterval(updateDisplay, 10);
  startPauseBtn.textContent = "Pause";
}

function resetStopwatch() {
  clearInterval(timerId);
  timerId = null;
  startTime = 0;
  elapsed = 0;
  lapCount = 0;
  display.textContent = "00:00:00.00";
  startPauseBtn.textContent = "Start";
  laps.innerHTML = "";
}

function addLap() {
  if (!timerId && elapsed === 0) {
    return;
  }

  const current = timerId ? Date.now() - startTime : elapsed;
  lapCount += 1;
  const item = document.createElement("li");
  item.textContent = `Lap ${lapCount}: ${formatTime(current)}`;
  laps.prepend(item);
}

startPauseBtn.addEventListener("click", toggleStartPause);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);

updateDisplay();
