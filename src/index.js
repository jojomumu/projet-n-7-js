function showPopup() {
    var popupDiv = document.getElementById("popupDiv");
    
    popupDiv.style.display = "block";
}

function hidePopup() {
    var popupDiv = document.getElementById("popupDiv");
    
    popupDiv.style.display = "none";
}

function changeTheme(theme) {
  const bodyElement = document.querySelector("body");
  bodyElement.className = theme.toLowerCase() + "mod";

  document.getElementById("logo-simple").style.display = theme === "Simple" ? "block" : "none";
  document.getElementById("logo-classy").style.display = theme === "Classy" ? "block" : "none";
  document.getElementById("logo-impact").style.display = theme === "Impact" ? "block" : "none";

  document.getElementById("gear-simple").style.display = theme === "Simple" ? "block" : "none";
  document.getElementById("gear-classy").style.display = theme === "Classy" ? "block" : "none";
  document.getElementById("gear-impact").style.display = theme === "Impact" ? "block" : "none";

  
}

function getSelectedTime() {
  const radioButtons = document.querySelectorAll(".switch");
  let selectedTime = 0;
  radioButtons.forEach((radio) => {
    if (radio.checked) {
      selectedTime = parseInt(radio.getAttribute("data-time"), 10);
    }
  });
  return selectedTime;
}


const radioButtons = document.querySelectorAll(".switch");
radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    const targetInputId = radio.getAttribute("data-target");
    const targetInput = document.getElementById(targetInputId);
    minutes = parseInt(targetInput.value, 10);
    updateDisplay(minutes, 0);
  });
});

radioButtons.forEach((radio, index) => {
  radio.addEventListener("change", function () {
    const targetInputId = radio.getAttribute("data-target");
    const targetInput = document.getElementById(targetInputId);
    minutes = parseInt(targetInput.value, 10);
    updateDisplay(minutes, 0);
  });
});

const timeInputs = document.querySelectorAll(".inputtim");
timeInputs.forEach((input, index) => {
  input.addEventListener("input", function () {
    if (radioButtons[index].checked) {
      minutes = parseInt(input.value, 10);
      updateDisplay(minutes, 0);
    }
  });
});

timeInputs.forEach((input, index) => {
  input.addEventListener("input", function () {
    if (radioButtons[index].checked) {
      minutes = parseInt(input.value, 10);
      updateDisplay(minutes, 0);
    }
  });
});


let intervalId;
let paused = true;
let minutes = 25; 

document.getElementById("start").addEventListener("click", function () {
  if (paused) {
    minutes = getSelectedTime(); 
    startTimer();
    document.getElementById("start").value = "PAUSE";
  } else {
    clearInterval(intervalId);
    document.getElementById("start").value = "START";
  }
  paused = !paused;
});

function startTimer() {
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  let minutes = parseInt(minutesElement.innerText, 10);
  let seconds = parseInt(secondsElement.innerText, 10);

  let totalSeconds = minutes * 60 + seconds;

  updateDisplay(minutes, seconds);

  intervalId = setInterval(function () {
    totalSeconds--;

    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    updateDisplay(minutes, seconds);

    if (totalSeconds <= 0) {
      clearInterval(intervalId);
      alert("Time's up!");
    }
  }, 1000);
}

function updateDisplay(minutes, seconds) {
  document.getElementById("minutes").innerText = formatTime(minutes);
  document.getElementById("seconds").innerText = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function changeTimer(newMinutes) {
  minutes = newMinutes;
  updateDisplay(minutes, 0);
}



function updateTime(inputNumber) {
  const timeInput = document.getElementById(`timeInput${inputNumber}`);
  const minutes = parseInt(timeInput.value, 10);
  if (!isNaN(minutes)) {
      changeTimer(minutes);
  }
}
