let pill = document.querySelector('.pill-panel');
let indicator = document.querySelector('.indicator');
let pillNodes = document.querySelectorAll('.pill-panel p');

const circle = document.querySelector(".progress-ring-circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
// let offset = (percent / 100) * circumference;

const focusTimeInput = document.querySelector("#focusTime");
const shortBreakTimeInput = document.querySelector("#shortBreakTime");
const longBreakTimeInput = document.querySelector("#longBreakTime");

let orangeBtn = document.querySelector(".color-selector1");
let blueBtn = document.querySelector(".color-selector2");
let purpleBtn = document.querySelector(".color-selector3");
let font1 = document.querySelector(".font-selector1");
let font2 = document.querySelector(".font-selector2");
let font3 = document.querySelector(".font-selector3");
let fonts = '';
let color = "";
let selectedBtn = null;
let selectedFont = font1;
let root = document.querySelector(":root");

const el = document.querySelector(".clock-circle");
const mindiv = document.querySelector("#minutes");
const secdiv = document.querySelector("#seconds");
const startBtn = document.querySelector("#control1");
localStorage.setItem("btn", "focus");

const settingsIcon = document.querySelector(".settings-icon");


// PILL NAVIGATION
for(let i=0; i<pillNodes.length;i++){
    pillNodes[i].addEventListener("click", ()=>{
        pill.querySelector(".active").classList.remove("active");
        pillNodes[i].classList.add("active");
        indicator.style.left= `calc(calc(calc(33% - 5px) * ${i}) + 2%)`;
    })
    pillNodes[0].addEventListener("click", ()=>{
        localStorage.setItem("btn", "focus")
        // clearTimeout(initial);
        // setProgress(0);
    })
    pillNodes[1].addEventListener("click", ()=>{
        localStorage.setItem("btn", "shortBreak");
        // clearTimeout(initial);
        // setProgress(0);
      })
    pillNodes[2].addEventListener("click", ()=>{
        localStorage.setItem("btn", "LongBreak");
        // clearTimeout(initial);
        // setProgress(0);
    })
}

//SVG ARROWS

const inputNumber1 = document.getElementById("focusTime");
const inputNumber2 = document.getElementById("shortBreakTime");
const inputNumber3 = document.getElementById("longBreakTime");
// const inputNumber = document.querySelectorAll(".input-space");
const arrowUp = document.createElement("div");
arrowUp.classList.add("arrow-up");
arrowUp.addEventListener("click", () => {
    inputNumber1.stepUp();
});
inputNumber1.after(arrowUp);

const arrowDown = document.createElement("div");
arrowDown.classList.add("arrow-down");
arrowDown.addEventListener("click", () => {
    inputNumber1.stepDown();
});
inputNumber1.after(arrowDown);

//2nd arrow
const arrowUp2 = document.createElement("div");
arrowUp2.classList.add("arrow-up2");
arrowUp2.addEventListener("click", () => {
    inputNumber2.stepUp();
});
inputNumber2.after(arrowUp2);

const arrowDown2 = document.createElement("div");
arrowDown2.classList.add("arrow-down2");
arrowDown2.addEventListener("click", () => {
    inputNumber2.stepDown();
});
inputNumber2.after(arrowDown2);

//3rd arrow
const arrowUp3 = document.createElement("div");
arrowUp3.classList.add("arrow-up3");
arrowUp3.addEventListener("click", () => {
    inputNumber3.stepUp();
});
inputNumber3.after(arrowUp3);

const arrowDown3 = document.createElement("div");
arrowDown3.classList.add("arrow-down3");
arrowDown3.addEventListener("click", () => {
    inputNumber3.stepDown();
});
inputNumber3.after(arrowDown3);


// PROGRESS
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  //let&nocircumference
  // console.log(offset);
  circle.style.strokeDashoffset = offset; 
}


// SETTINGS
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("focusTime", focusTimeInput.value);
    localStorage.setItem("shortBreakTime", shortBreakTimeInput.value);
    localStorage.setItem("longBreakTime", longBreakTimeInput.value);
    document.querySelector(".form-container").style.display= "none";
    pill.classList.remove("disable");
    settingsIcon.classList.remove("disable");
    root.style.setProperty('--textfont', fonts);
    root.style.setProperty('--theme', color);
});

const selectFont = (fon) => {
  if (selectedFont) {
      selectedFont.classList.remove("highlighted");
  }
  selectedFont = fon;
  selectedFont.classList.add("highlighted");
}

const selectButton = (btn) => {
  if (selectedBtn) {
      selectedBtn.classList.remove("selected");
  }
  selectedBtn = btn;
  selectedBtn.classList.add("selected");
}

font1.addEventListener("click", () => {
  fonts = "Kumbh Sans";
  selectFont(font1);
});

font2.addEventListener("click", () => {
  fonts = "Roboto Slab";
  selectFont(font2);
});

font3.addEventListener("click", () => {
  fonts = "Space Mono";
  selectFont(font3);
});

orangeBtn.addEventListener("click", () => {
  color = "#F87070";
  selectButton(orangeBtn);
});

blueBtn.addEventListener("click", () => {
  color = "#70F3F8";
  selectButton(blueBtn);
});

purpleBtn.addEventListener("click", () => {
  color = "#D881F8";
  selectButton(purpleBtn);
});

document.querySelector("#control3").addEventListener("click", () => {
    document.querySelector("#control3").style.display = "none";
    document.querySelector("#control1").style.display = "block";
    clearTimeout(initial);
    setProgress(0);
    mindiv.textContent = 0;
    secdiv.textContent = 0;
});

document.querySelector("#control2").addEventListener("click", () => {
    if (paused === undefined) {
      return;
    }
    if (paused) {
      paused = false;
      initial = setTimeout("decremenT()", 60);
      document.querySelector("#control2").textContent = "pause";
    } else {
      clearTimeout(initial);
      document.querySelector("#control2").textContent = "resume";
      paused = true;
    }
});
  


// TIMER
let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
    let btn = localStorage.getItem("btn");
  
    if (btn === "focus") {
      mins = +localStorage.getItem("focusTime");
    }else if(btn === "shortBreak"){
      mins = +localStorage.getItem("shortBreakTime");
    }else{
      mins = +localStorage.getItem("longBreakTime");
    }
  
    seconds = mins * 60;
    totalsecs = mins * 60;
    setTimeout(decremenT(), 60);
    // startBtn.textContent = "pause";
    document.querySelector("#control1").style.display = "none";
    document.querySelector("#control2").style.display = "block";
    paused = false;
  });

  decremenT = () => {
    mindiv.textContent = Math.floor(seconds / 60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  
    if (seconds > 0) {
      perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
      setProgress(perc);
      seconds--;
      initial = window.setTimeout("decremenT()", 1000);
    } else {
      mins = 0;
      seconds = 0;
      document.querySelector("#control2").style.display = "none";
      document.querySelector("#control3").style.display = "block";
    //   let btn = localStorage.getItem("btn");

    //   if (btn === "focus") {
    //     localStorage.setItem("btn", "shortBreak");
    //   } else if(btn === "shortbreak"){
    //     localStorage.setItem("btn", "longBreak");
    //   }else{
    //     localStorage.setItem("btn", "longBreak");
    //   }
    }
  }

  settingsIcon.addEventListener("click", () => {
    pill.classList.add("disable");
    settingsIcon.classList.add("disable");
    document.querySelector(".form-container").style.display = "block";
  })

  document.querySelector(".close-btn").addEventListener("click", ()=>{
    pill.classList.remove("disable");
    settingsIcon.classList.remove("disable");
    document.querySelector(".form-container").style.display = "none";
  })