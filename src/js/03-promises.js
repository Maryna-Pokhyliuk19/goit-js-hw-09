import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector("form")

form.addEventListener('submit', onFormsubmit)


function onFormsubmit(evt) {
  evt.preventDefault();
  const delay = Number(evt.currentTarget.delay.value)
  const step = Number(evt.currentTarget.step.value)
  const amount = Number(evt.currentTarget.amount.value)

  listOfPromises(delay, step, amount)
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);

  })
  } 

function listOfPromises(delay, step, amount) {
  let stepDelay = delay

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, stepDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    stepDelay += step
  }
}

