let countdown;
const displayTimeLeft = document.querySelector('.display__time-left');
const displayEndTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //if it's counting down, clear it
    clearInterval(countdown);

    const now = Date.now();
    const endTime = Date.now() + seconds * 1000;
    displayTimer(seconds);
    displayEnd(endTime);
    
    countdown = setInterval((seconds) => {
        let secondsLeft = Math.round((endTime - Date.now()) /1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimer(secondsLeft);
    }, 1000);

}

function displayTimer(secondsLeft) {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    const display = `${min}:${sec < 10 ? 0 : ''}${sec}`;
    displayTimeLeft.textContent = display;
    document.title = display;

}

function displayEnd(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minute = end.getMinutes();
    displayEndTime.textContent = 
        `Will be back at ${hour > 12 ? hour - 12 : ''}${hour}:${minute < 10 ? 0 : ''}${minute}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const seconds = this.minutes.value * 60;
    timer(seconds);
    this.reset();
})