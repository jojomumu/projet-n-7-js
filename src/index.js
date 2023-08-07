function showPopup() {
  var popupDiv = document.getElementById("popupDiv");
  var popupOverlay = document.getElementById("popupOverlay");
  
  popupDiv.style.display = "block";
  popupOverlay.style.display = "block";
}

function hidePopup() {
  var popupDiv = document.getElementById("popupDiv");
  var popupOverlay = document.getElementById("popupOverlay");
  
  popupDiv.style.display = "none";
  popupOverlay.style.display = "none";
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
  if (!paused) {
    resetTimer();
  }
  minutes = parseInt(timeInputs[index].value, 10);
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
    playTimerEndSound();
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

function resetTimer() {
clearInterval(intervalId);
document.getElementById("start").value = "START";
paused = true;
}

function playTimerEndSound() {
const audioElement = document.getElementById("timerEndSound");
const volumeSlider = document.getElementById("volumeSlider");

audioElement.volume = volumeSlider.value;
audioElement.play();


}

// function saveThemeToLocalStorage(theme) {
//   localStorage.setItem("selectedTheme", theme);
// }

// function saveVolumeToLocalStorage(volume) {
//   localStorage.setItem("audioVolume", volume);
// }

// function saveTimeInputsToLocalStorage(timeInputs) {
//   localStorage.setItem("timeInputs", JSON.stringify(timeInputs));
// }

// function loadThemeFromLocalStorage() {
//   const savedTheme = localStorage.getItem("selectedTheme");
//   if (savedTheme !== null) {
//     changeTheme(savedTheme);
//   }
// }


// function loadVolumeFromLocalStorage() {
//   const savedVolume = localStorage.getItem("audioVolume");
//   if (savedVolume !== null) {
//     const volumeSlider = document.getElementById("volumeSlider");
//     volumeSlider.value = savedVolume;
//   }
// }


// function loadTimeInputsFromLocalStorage() {
//   const savedTimeInputs = localStorage.getItem("timeInputs");
//   if (savedTimeInputs !== null) {
//     const parsedTimeInputs = JSON.parse(savedTimeInputs);
//     parsedTimeInputs.forEach((value, index) => {
//       timeInputs[index].value = value;
//     });
//   }
// }

// timeInputs.forEach((input, index) => {
//   input.addEventListener("input", function () {
//     if (radioButtons[index].checked) {
//       minutes = parseInt(input.value, 10);
//       updateDisplay(minutes, 0);
//       saveTimeInputsToLocalStorage(Array.from(timeInputs).map(input => input.value));
//     }
//   });
// });

// radioButtons.forEach((radio) => {
//   radio.addEventListener("change", function () {
//     saveThemeToLocalStorage(radio.value);
//   });
// });


// volumeSlider.addEventListener("input", function () {
//   saveVolumeToLocalStorage(volumeSlider.value);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   loadThemeFromLocalStorage();
//   loadVolumeFromLocalStorage();
//   loadTimeInputsFromLocalStorage();
// });