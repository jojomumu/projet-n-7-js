class MyPopup extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    this.shadow = shadow;

    const div = document.createElement('div');
    div.setAttribute('id', 'popupDiv');
    
    div.innerHTML = `
      <div id="end">
        <button onclick="hidePopup()" id="close">  <img src="media/cross.png" alt="cross" width="40" height="40"></button>
      </div>
      <h2>Select theme :</h2>
      <select name="theme" id="change" onchange="changeTheme(this.value)">
        <option value="Simple">Simple</option>
        <option value="Classy">Classy</option>
        <option value="Impact">Impact</option>
      </select>
      <h2>Timers :</h2>
      <div id="timech">
        <input type="text" id="timeInput1" class="inputtim" value="25" oninput="updateTime(1)">
        <input type="text" id="timeInput2" class="inputtim" value="20" oninput="updateTime(2)">
        <input type="text" id="timeInput3" class="inputtim" value="5" oninput="updateTime(3)">
      </div>
      <div id="tag">
        <p>pomo</p>
        <p>long</p>
        <p>short</p>
      </div>
      <h2>Alert volume :</h2>
      <audio id="timerEndSound" src="media/bell.mp3"></audio>
      <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="0.5">
    `;

    const style = document.createElement('style');
    style.textContent = `
    #popupDiv {
      position: absolute;
      top: 50%;
      left: 48%;
      width: 500px;
      transform: translate(-50%, -50%);
      background-color: #454545;
      padding: 20px;
      display: none;
      z-index: 2;
      color: #fff;
      border-radius: 10px;
      font-family: 'Inria Sans', sans-serif;
  }

  #close{
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-self: end;
  }

  #change{
    background-color: #000000;
    color: #fff;
    width: 200px;
    border-radius: 8px;
    padding: 5px;
    font-size: 15px;
    margin-left: 45px;
    margin-bottom: 20px
  }

  #tag{
    opacity: 0.75;
    display: flex;
    justify-content: space-around;
  }

  .inputtim{
    width: 60px;
    text-align: center;
    background-color: #000000;
    font-size: 15px;
    color: #fff;
    padding: 8px;
  }
  
  #timeInput1{
    margin-left: 46px;
  }
  
  #timeInput2{
    margin-left: 80px;
  }
  
  #timeInput3{
    margin-left: 80px;
  }

  #volumeSlider {
    width: 70%;
    height: 15px;
    background-color: #ffffff;
    outline: none;
    border-radius: 30px;
    margin-left: 75px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  #volumeSlider::-webkit-slider-thumb {
    appearance: none;
    width: 30px; 
    height: 30px; 
    background-color: #ffffff;
    border-radius: 50%;
    border: solid 1px;
    cursor: pointer;
  }
  
  #volumeSlider::-moz-range-thumb {
    appearance: none;
    width: 30px; 
    height: 30px; 
    background-color: #ffffff;
    border-radius: 50%;
    border: solid 1px;
    cursor: pointer;
  }

  h2{
    margin-left: 40px;
    margin-top: 0px;
    opacity: 0.75;
  }

  #end{
    display: flex;
    justify-content: end;
  }

  @media screen and (max-width: 320px){#popupDiv {
    top: 50%;
    left: 50%;
    width: 280px;
    border-radius: 0;
}

#timeInput1{
  margin-left: 10px;
}

#timeInput2{
  margin-left: 10px;
}

#timeInput3{
  margin-left: 10px;
}

#volumeSlider {
  width: 80%;
  height: 10px;
  margin-left: 35px;
}

#volumeSlider::-webkit-slider-thumb {
  width: 25px; 
  height: 25px; 
}

#volumeSlider::-moz-range-thumb {
  width: 25px; 
  height: 25px; 
}
}

@media screen and (max-width: 541px) and (min-width: 321px){

  #popupDiv {
    top: 50%;
    left: 50%;
    width: 300px;
}

#timeInput1{
  margin-left: 15px;
}

#timeInput2{
  margin-left: 15px;
}

#timeInput3{
  margin-left: 15px;
}

#volumeSlider {
  width: 80%;
  height: 10px;
  margin-left: 35px;
}

#volumeSlider::-webkit-slider-thumb {
  width: 25px; 
  height: 25px; 
}

#volumeSlider::-moz-range-thumb {
  width: 25px; 
  height: 25px; 
}
}
    `;

    shadow.appendChild(style);
    shadow.appendChild(div);

    
  }
  
}



customElements.define('my-popup', MyPopup);




function showPopup() {
  const popupDiv = document.querySelector('my-popup').shadowRoot.getElementById('popupDiv');
  var popupOverlay = document.getElementById("popupOverlay");
  
  popupDiv.style.display = 'block';
  popupOverlay.style.display = 'block';
}

function hidePopup() {
  const popupDiv = document.querySelector('my-popup').shadowRoot.getElementById('popupDiv');
  var popupOverlay = document.getElementById("popupOverlay");
  
  popupDiv.style.display = 'none';
  popupOverlay.style.display = 'none';
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
    const targetInput = document.querySelector('my-popup').shadowRoot.getElementById(targetInputId);
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
  
  const timeInputs = document.querySelector('my-popup').shadowRoot.querySelectorAll(".inputtim");
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
  const timeInput = document.querySelector('my-popup').shadowRoot.getElementById(`timeInput${inputNumber}`);
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
  const audioElement = document.querySelector('my-popup').shadowRoot.getElementById("timerEndSound");
  const volumeSlider = document.querySelector('my-popup').shadowRoot.getElementById("volumeSlider");
  
  audioElement.volume = volumeSlider.value;
  audioElement.play();
  
  
  }

  const gearIcon = document.getElementById("gear");

gearIcon.addEventListener("click", function() {
  gearIcon.classList.toggle("rotate");
});