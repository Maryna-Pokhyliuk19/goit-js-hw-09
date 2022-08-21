const refs = {
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop'),
};

console.log(refs.buttonStart)
const DELAY = 1000;

refs.buttonStart.addEventListener('click', onStartButton)
refs.buttonStop.addEventListener('click', onStopButton)

let intervalID = null;

function onStartButton() {
    intervalID = setInterval(() => {
         
        const backgroundColor = getRandomHexColor()
        document.body.style.backgroundColor = backgroundColor
    }, DELAY);
    
    refs.buttonStart.disabled = true
    refs.buttonStop.disabled = false
}


function onStopButton() {
    clearInterval(intervalID)
    refs.buttonStop.disabled = true
    refs.buttonStart.disabled = false
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}