import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import 'notiflix/dist/notiflix-3.2.5.min.css';
import Notiflix from 'notiflix';

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        timer.targetTime = selectedDates[0].getTime()
        if (timer.targetTime < Date.now()) {
            Notiflix.Notify.failure(`wrong date`)
            return
        }
        refs.buttonStart.disabled = false
        
    },
});

const refs = {
    buttonStart: document.querySelector('button[data-start]'),
    input: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};



class Timer  {
    constructor({ onTick }) {
        this.intervalID = null;
        this.isActive = false;
        this.onTick = onTick;
        this.targetTime = null;

    }
    
    start() {
        
        this.isActive = true;
        this.checkIsActive()

        this.intervalID = setInterval(() => {
            const currentTime = Date.now()

            const deltaTime = this.targetTime - currentTime;
            
            if (deltaTime < 1000) {
                
                clearInterval(this.intervalID)
                this.isActive = false
                this.checkIsActive()
                
            }
            const time = this.convertMs(deltaTime)
            this.checkIsActive()
            this.onTick(time);
        }, 1000)

    }
    convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
    }
    addLeadingZero(value) {
    return String(value).padStart(2, '0');
    }
    checkIsActive() {
        refs.buttonStart.disabled = this.isActive
        refs.input.disabled = this.isActive
    }
}


const timer = new Timer({
    onTick: updateClockface,
})

refs.buttonStart.addEventListener('click', () => {
    timer.start()
})

function updateClockface({ days, hours, minutes, seconds }) {

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}



